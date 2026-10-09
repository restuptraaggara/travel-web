import React, { useRef, useEffect } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';
import './GhostFibers.css';

const hexToRgb = (hex) => {
  const clean = hex.trim().replace(/^#/, '');
  const expanded = clean.length === 3 ? clean.replace(/./g, (c) => c + c) : clean;
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expanded);
  return match
    ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255]
    : [1, 1, 1];
};

const updateColorUniform = (uniform, hex) => {
  const [r, g, b] = hexToRgb(hex);
  uniform.value[0] = r;
  uniform.value[1] = g;
  uniform.value[2] = b;
};

const vertexShader = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uLayers;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uWaveSpeed;
uniform float uLayerSpeed;
uniform float uTwist;
uniform float uTwistFrequency;
uniform float uTwistSpeed;
uniform float uLineFrequency;
uniform float uLineSpacing;
uniform float uLineSharpness;
uniform float uGlowFalloff;
uniform float uGlowIntensity;
uniform float uBrightness;
uniform float uBlueBoost;
uniform float uVignette;
uniform float uGrain;
uniform float uRotationSpeed;
uniform float uLightMode;
uniform vec3 uLineColor;
uniform vec3 uGlowColor;

out vec4 fragColor;

#define MAX_LAYERS 10

mat2 rotate2d(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

float grainHash(vec2 point) {
  point = floor(point);
  float hash = 52.9829189 * fract(dot(point, vec2(0.065, 0.005)));
  return fract(hash);
}

float layeredGrain(vec2 fragmentPixel) {
  vec2 point = mod(fragmentPixel + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
  vec2 rotated = mat2(0.8, -0.5, 0.5, 0.8) * point;
  float grain = 0.0;
  grain += 0.40 * grainHash(rotated);
  grain += 0.25 * grainHash(rotated * 2.0 + 17.0);
  grain += 0.20 * grainHash(rotated * 4.0 + 47.0);
  grain += 0.10 * grainHash(rotated * 8.0 + 113.0);
  grain += 0.05 * grainHash(rotated * 16.0 + 191.0);
  return grain;
}

void main() {
  vec2 resolution = max(uResolution, vec2(1.0));
  vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / resolution.y;
  float time = uTime * uSpeed;
  vec3 backdrop = mix(vec3(0.015, 0.035, 0.025), vec3(1.0), step(0.5, uLightMode));
  vec3 centerTone = max(uLineColor * 0.85567 - uGlowColor * 0.06186, vec3(0.0));
  vec3 cloudTone = uLineColor * 0.19588 + uGlowColor * 0.2268;
  vec2 p = uv;
  p /= max(uScale, 0.05);
  p = rotate2d(radians(uRotation) + time * uRotationSpeed) * p;
  vec3 color = vec3(0.0);
  float fiberField = 0.0;

  for (int index = 0; index < MAX_LAYERS; index++) {
    float fi = float(index) + 1.0;
    if (fi > uLayers) break;

    p += uWaveAmplitude * sin(p.yx * fi * uWaveFrequency + time * (uWaveSpeed + fi * uLayerSpeed));

    float radius = length(p);
    float polarAngle = atan(p.y, p.x);
    polarAngle += sin(radius * uTwistFrequency - time * uTwistSpeed + fi) * uTwist;
    p = vec2(cos(polarAngle), sin(polarAngle)) * radius;

    float lines = abs(sin(p.x * (uLineFrequency + fi * uLineSpacing) + sin(p.y * 3.0 + time)));
    lines = pow(max(0.0, 1.0 - lines), uLineSharpness);
    fiberField += lines / fi;
    color += uLineColor * lines / fi;

    float glow = exp(-uGlowFalloff * abs(sin(p.x * 3.0 + time + fi)));
    color += uGlowColor * glow * uGlowIntensity / (fi * 2.0);
  }

  float center = exp(-2.2 * dot(uv, uv));
  color += centerTone * center;

  float cloud = exp(-1.5 * length(uv + vec2(sin(time * 0.3) * 0.25, cos(time * 0.25) * 0.18)));
  color += cloudTone * cloud;

  float vignette = 1.0 - smoothstep(0.35, 1.45, length(uv));
  color *= mix(1.0 - uVignette, 1.0, vignette);
  color = 1.0 - exp(-color * uBrightness);
  color.b *= uBlueBoost;

  vec3 outputColor;
  if (uLightMode > 0.5) {
    float edgeFade = mix(1.0 - uVignette, 1.0, vignette);
    float fibers = pow(smoothstep(0.12, 1.05, fiberField) * edgeFade, 1.5);
    float atmosphere = (center * 0.025 + cloud * 0.015) * edgeFade;
    vec3 fiberInk = mix(backdrop, uLineColor, 0.52);
    vec3 airColor = mix(backdrop, uGlowColor, 0.16);

    outputColor = mix(backdrop, airColor, atmosphere);
    outputColor = mix(outputColor, fiberInk, fibers * 0.3);
  } else {
    outputColor = backdrop + color;
  }

  float noise = (layeredGrain(gl_FragCoord.xy) - 0.5) * uGrain;
  outputColor = clamp(outputColor + noise, 0.0, 1.0);
  fragColor = vec4(outputColor, 1.0);
}
`;

const stateStore = new WeakMap();

export default function GhostFibers({
  lineColor = '#042F24',
  glowColor = '#10B981',
  speed = 0.18,
  scale = 2.2,
  rotation = 0,
  rotationSpeed = 0.25,
  layers = 5,
  waveAmplitude = 0.02,
  waveFrequency = 2.8,
  waveSpeed = 0.15,
  layerSpeed = 0.08,
  twist = 0.1,
  twistFrequency = 5,
  twistSpeed = 1.2,
  lineFrequency = 5,
  lineSpacing = 2,
  lineSharpness = 16,
  glowFalloff = 10,
  glowIntensity = 1.6,
  brightness = 1.7,
  blueBoost = 1.25,
  vignette = 0.8,
  grain = 0.05,
  lightMode = false,
  dpr = 1,
  fps = 60,
  paused = false,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: false,
        antialias: false,
        dpr: Math.min(Math.max(dpr, 0.5), 2),
      });
    } catch (e) {
      console.warn('WebGL 2 not supported for GhostFibers:', e);
      return;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uResolution: { value: new Float32Array([1, 1]) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uRotation: { value: rotation },
        uRotationSpeed: { value: rotationSpeed },
        uLayers: { value: layers },
        uWaveAmplitude: { value: waveAmplitude },
        uWaveFrequency: { value: waveFrequency },
        uWaveSpeed: { value: waveSpeed },
        uLayerSpeed: { value: layerSpeed },
        uTwist: { value: twist },
        uTwistFrequency: { value: twistFrequency },
        uTwistSpeed: { value: twistSpeed },
        uLineFrequency: { value: lineFrequency },
        uLineSpacing: { value: lineSpacing },
        uLineSharpness: { value: lineSharpness },
        uGlowFalloff: { value: glowFalloff },
        uGlowIntensity: { value: glowIntensity },
        uBrightness: { value: brightness },
        uBlueBoost: { value: blueBoost },
        uVignette: { value: vignette },
        uGrain: { value: grain },
        uLightMode: { value: lightMode ? 1 : 0 },
        uLineColor: { value: new Float32Array(hexToRgb(lineColor)) },
        uGlowColor: { value: new Float32Array(hexToRgb(glowColor)) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let rafId = 0;
    let accumulatedTime = 0;
    let lastTime = performance.now();
    let lastFrameTime = 0;
    let targetFps = fps;
    let isPaused = paused;
    let isIntersecting = true;
    let isDocumentVisible = !document.hidden;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const renderScene = () => renderer.render({ scene: mesh });

    const stopLoop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const shouldAnimate = () =>
      isIntersecting && isDocumentVisible && !isPaused && !prefersReducedMotion.matches;

    const animateLoop = (now) => {
      rafId = 0;
      if (!shouldAnimate()) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      accumulatedTime += delta;

      if (now - lastFrameTime >= 1000 / targetFps - 0.5) {
        program.uniforms.uTime.value = accumulatedTime;
        renderScene();
        lastFrameTime = now;
      }

      rafId = requestAnimationFrame(animateLoop);
    };

    const startLoop = () => {
      if (!shouldAnimate() || rafId !== 0) return;
      lastTime = performance.now();
      rafId = requestAnimationFrame(animateLoop);
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      program.uniforms.uResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.uResolution.value[1] = gl.drawingBufferHeight;
      renderScene();
    };

    const handleVisibility = () => {
      isDocumentVisible = !document.hidden;
      shouldAnimate() ? startLoop() : stopLoop();
    };

    const handleReducedMotion = () => {
      shouldAnimate() ? startLoop() : (stopLoop(), renderScene());
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        shouldAnimate() ? startLoop() : stopLoop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    document.addEventListener('visibilitychange', handleVisibility);
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

    stateStore.set(container, {
      renderer,
      program,
      mesh,
      render: renderScene,
      setPaused(p) {
        isPaused = p;
        shouldAnimate() ? startLoop() : (stopLoop(), renderScene());
      },
      setFps(f) {
        targetFps = Math.min(Math.max(f, 1), 120);
      },
    });

    handleResize();
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      prefersReducedMotion.removeEventListener('change', handleReducedMotion);
      stateStore.delete(container);
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) loseContext.loseContext();
    };
  }, [dpr]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const state = stateStore.get(container);
    if (!state) return;

    const uniforms = state.program.uniforms;
    updateColorUniform(uniforms.uLineColor, lineColor);
    updateColorUniform(uniforms.uGlowColor, glowColor);
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uRotation.value = rotation;
    uniforms.uRotationSpeed.value = rotationSpeed;
    uniforms.uLayers.value = Math.min(Math.max(Math.round(layers), 1), 10);
    uniforms.uWaveAmplitude.value = waveAmplitude;
    uniforms.uWaveFrequency.value = waveFrequency;
    uniforms.uWaveSpeed.value = waveSpeed;
    uniforms.uLayerSpeed.value = layerSpeed;
    uniforms.uTwist.value = twist;
    uniforms.uTwistFrequency.value = twistFrequency;
    uniforms.uTwistSpeed.value = twistSpeed;
    uniforms.uLineFrequency.value = lineFrequency;
    uniforms.uLineSpacing.value = lineSpacing;
    uniforms.uLineSharpness.value = lineSharpness;
    uniforms.uGlowFalloff.value = glowFalloff;
    uniforms.uGlowIntensity.value = glowIntensity;
    uniforms.uBrightness.value = brightness;
    uniforms.uBlueBoost.value = blueBoost;
    uniforms.uVignette.value = vignette;
    uniforms.uGrain.value = grain;
    uniforms.uLightMode.value = lightMode ? 1 : 0;

    state.setFps(fps);
    state.setPaused(paused);
    state.render();
  }, [
    lineColor,
    glowColor,
    speed,
    scale,
    rotation,
    rotationSpeed,
    layers,
    waveAmplitude,
    waveFrequency,
    waveSpeed,
    layerSpeed,
    twist,
    twistFrequency,
    twistSpeed,
    lineFrequency,
    lineSpacing,
    lineSharpness,
    glowFalloff,
    glowIntensity,
    brightness,
    blueBoost,
    vignette,
    grain,
    lightMode,
    fps,
    paused,
  ]);

  return (
    <div
      ref={containerRef}
      className={`ghost-fibers-container pointer-events-none select-none ${className}`.trim()}
      style={style}
    />
  );
}
