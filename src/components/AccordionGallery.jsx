import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './AccordionGallery.css';

const DEFAULT_ITEMS = [
  { image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85', label: 'Labuan Bajo & Komodo', link: '/destinasi' },
  { image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=85', label: 'Bromo & Kawah Ijen', link: '/destinasi' },
  { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85', label: 'Danau Toba & Harau', link: '/destinasi' },
  { image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85', label: 'Kepulauan Derawan', link: '/destinasi' },
  { image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=85', label: 'Raja Ampat Papua', link: '/destinasi' }
];

export default function AccordionGallery({
  items = DEFAULT_ITEMS,
  defaultIndex = 1,
  accentColor = '#D4A373',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 500,
  gap = 14,
  radius = 20,
  expandRatio = 0.50,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 6,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = false,
  className = ''
}) {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const overlayBg = `linear-gradient(180deg, transparent 35%, color-mix(in srgb, ${overlayColor} 80%, transparent) 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, 0.25) * 100%), transparent)`;

  const applyLayout = useCallback(
    (animate) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i) => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i, e) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery flex ${vertical ? 'flex-col' : 'flex-row'} w-full max-w-full [perspective:1400px] max-[640px]:!flex-col max-[640px]:[perspective:none] ${className}`}
      style={{ gap: `${gap}px`, height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px` }}
      role="list"
      aria-label="Destinasi Wisata Pilihan"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const isInternalLink = item.link && (item.link.startsWith('/') || !item.link.startsWith('http'));

        const commonProps = {
          ref: (el) => {
            panelRefs.current[i] = el;
          },
          className:
            "group accordion-gallery-panel relative block min-w-0 min-h-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-[#112218] no-underline outline-none [transform-style:preserve-3d] [transform-origin:center] shadow-[0_12px_36px_-12px_rgba(27,67,50,0.3)] focus-visible:[box-shadow:0_0_0_2px_var(--ag-accent),0_10px_30px_-18px_rgba(0,0,0,0.8)] max-[640px]:min-h-[96px] max-[640px]:!transform-none",
          style: {
            borderRadius: `${radius}px`,
            '--ag-accent': accentColor,
            willChange: 'flex-grow, transform'
          },
          onClick: (e) => handleClick(i, e),
          onMouseEnter: () => handleEnter(i),
          onFocus: () => setActive(i),
          onKeyDown: (e) => handleKeyDown(i, e),
          role: "listitem",
          tabIndex: 0,
          'aria-current': isActive ? 'true' : undefined,
          'aria-label': item.label
        };

        const innerContent = (
          <>
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              <span
                ref={(el) => {
                  mediaRefs.current[i] = el;
                }}
                className="absolute top-1/2 left-1/2 [filter:grayscale(var(--ag-gray,0))]"
                style={{
                  width: vertical ? '100%' : 'var(--ag-media-size, 320px)',
                  height: vertical ? 'var(--ag-media-size, 320px)' : '100%',
                  willChange: 'transform, filter'
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.label || ''}
                  draggable={false}
                  className="block h-full w-full select-none object-cover [-webkit-user-drag:none]"
                />
              </span>
              <span
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{ background: overlayBg }}
                aria-hidden="true"
              />
            </span>
            {showLabels && (
              <span
                className="pointer-events-none absolute bottom-6 left-6 right-6 z-[2] flex items-center gap-3.5"
                aria-hidden="true"
              >
                <span
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  className="h-[28px] w-[3.5px] flex-none rounded-[3px] opacity-0"
                  style={{
                    background: accentColor,
                    boxShadow: `0 0 12px color-mix(in srgb, ${accentColor} 60%, transparent)`
                  }}
                />
                <span
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-lg sm:text-xl font-bold tracking-tight opacity-0 [text-shadow:0_2px_14px_rgba(0,0,0,0.7)]"
                  style={{ color: textColor }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </>
        );

        if (item.link) {
          if (isInternalLink) {
            return (
              <Link key={i} to={item.link} {...commonProps}>
                {innerContent}
              </Link>
            );
          }
          return (
            <a key={i} href={item.link} {...commonProps}>
              {innerContent}
            </a>
          );
        }

        return (
          <div key={i} {...commonProps}>
            {innerContent}
          </div>
        );
      })}
    </div>
  );
}
