/**
 * FlowingMenu — React Bits (JS + CSS variant)
 * Source: https://reactbits.dev/text-animations/flowing-menu
 *
 * Disesuaikan untuk NusantaraVista:
 *  - <a> diganti dengan React Router <Link>
 *  - gsap dipakai untuk animasi marquee speed & clip reveal halus
 *  - warna disesuaikan brand palette (#FAF8F5 / #17231C)
 */

import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './FlowingMenu.css';

// ─────────────────────────────────────────────
// FlowingMenu — root wrapper
// ─────────────────────────────────────────────
export default function FlowingMenu({ items = [] }) {
  return (
    <nav className="menu" aria-label="Expedition Routes Menu">
      {items.map((item, idx) => (
        <MenuItem key={idx} {...item} />
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────
// MenuItem — individual hoverable row
// ─────────────────────────────────────────────
function MenuItem({ text, link, image }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  // GSAP: animate marquee translate Y on mouse enter / leave
  useEffect(() => {
    const item = itemRef.current;
    const marquee = marqueeRef.current;
    const marqueeInner = marqueeInnerRef.current;
    if (!item || !marquee || !marqueeInner) return;

    // Set initial state (hidden below)
    gsap.set(marquee, { yPercent: 101 });

    const handleMouseEnter = () => {
      gsap.killTweensOf(marquee);
      gsap.to(marquee, {
        yPercent: 0,
        duration: 0.45,
        ease: 'power3.out',
      });
      // Speed up inner marquee on hover
      gsap.to(marqueeInner, { duration: 0.4, ease: 'none' });
    };

    const handleMouseLeave = () => {
      gsap.killTweensOf(marquee);
      gsap.to(marquee, {
        yPercent: 101,
        duration: 0.45,
        ease: 'power3.in',
      });
    };

    item.addEventListener('mouseenter', handleMouseEnter);
    item.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      item.removeEventListener('mouseenter', handleMouseEnter);
      item.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Build repeating marquee content (enough copies to fill width smoothly)
  const repeats = 6;
  const marqueeContent = Array.from({ length: repeats }).map((_, i) => (
    <span className="menu__item-copy" key={i} aria-hidden={i > 0}>
      <img
        src={image}
        alt={text}
        className="menu__item-copy-img"
        loading="lazy"
      />
      <span style={{ color: '#17231C', fontWeight: 700 }}>{text}</span>
    </span>
  ));

  return (
    <div className="menu__item" ref={itemRef}>
      {/* Main link text — visible by default, hides visually when marquee overlays */}
      <Link
        className="menu__item-link font-bold tracking-wider"
        style={{ color: '#FAF8F5' }}
        to={link}
      >
        {text}
      </Link>

      {/* Marquee overlay — slides up on hover */}
      <div className="marquee" ref={marqueeRef} aria-hidden="true">
        <div className="marquee__inner-wrap">
          {/* Double the content for seamless loop */}
          <div className="marquee__inner" ref={marqueeInnerRef}>
            {marqueeContent}
            {marqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}
