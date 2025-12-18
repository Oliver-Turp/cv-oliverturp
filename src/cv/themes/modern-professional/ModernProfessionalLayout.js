'use client';

import { useState, useEffect } from 'react';
import "./modern-professional.css";

export default function ModernProfessionalLayout({ name, title, children, columns }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 800);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const childrenArray = Array.isArray(children) ? children : [children];
  const childrenMap = {};
  childrenArray.forEach(child => {
    if (child?.key) childrenMap[child.key] = child;
  });

  // Desktop: separate columns
  const sidebarChildren = columns.sidebar.map(key => childrenMap[key]).filter(Boolean);
  const mainChildren = columns.main.map(key => childrenMap[key]).filter(Boolean);

  // Mobile: single ordered list
  const mobileChildren = columns.mobile.map(key => childrenMap[key]).filter(Boolean);

  return (
    <main className="modern-professional">
      <header className="header">
        <h1>{name}</h1>
        <h2>{title}</h2>
      </header>

      {/* Always render both layouts, control visibility with CSS */}
      <div className={`${isMobile ? 'content desktop hidden' : 'content desktop'}`}>
        <aside className="sidebar">{sidebarChildren}</aside>
        <div className="main-content">{mainChildren}</div>
      </div>

      <div className={`${isMobile ? 'content mobile' : 'content mobile hidden'}`}>
        {mobileChildren}
      </div>
    </main>
  );
}