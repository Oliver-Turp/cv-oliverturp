// CV.js
'use client'; // Need this for useState in ModernProfessionalLayout

import { config } from "../config";
import { content } from "../content";
import Section from "./Section";

import MinimalistLayout from "../themes/minimalist/MinimalistLayout";
import BoldHeaderLayout from "../themes/bold-header/Bold-HeaderLayout";
import VisualTimelineLayout from "../themes/visual-timeline/VisualTimelineLayout";
import ModernProfessionalLayout from "../themes/modern-professional/ModernProfessionalLayout";

const THEMES = {
  minimalist: MinimalistLayout,
  "bold-header": BoldHeaderLayout,
  "visual-timeline": VisualTimelineLayout,
  "modern-professional": ModernProfessionalLayout
};

export default function CV() {
  // Validate theme exists
  if (!config.theme) {
    throw new Error('Missing "theme" in config.js');
  }
  
  const ThemeLayout = THEMES[config.theme];
  
  if (!ThemeLayout) {
    throw new Error(
      `Unknown theme "${config.theme}". Available themes: ${Object.keys(THEMES).join(', ')}`
    );
  }
  
  // Validate configuration type
  const hasColumns = config.columns;
  const hasSectionOrder = config.sectionOrder;
  
  if (hasColumns && hasSectionOrder) {
    throw new Error(
      'Configuration conflict: Cannot use both "columns" and "sectionOrder". ' +
      `The "${config.theme}" theme uses ${config.theme === 'modern-professional' ? '"columns"' : '"sectionOrder"'}.`
    );
  }
  
  if (!hasColumns && !hasSectionOrder) {
    throw new Error(
      'Missing configuration: Must provide either "columns" or "sectionOrder" in config.js'
    );
  }
  
  // Two-column theme (modern-professional)
  if (hasColumns) {
    if (config.theme !== 'modern-professional') {
      throw new Error(
        `Configuration mismatch: The "${config.theme}" theme requires "sectionOrder", not "columns"`
      );
    }
    
    // Validate columns structure
    if (!config.columns.sidebar || !Array.isArray(config.columns.sidebar)) {
      throw new Error('columns.sidebar must be an array');
    }
    if (!config.columns.main || !Array.isArray(config.columns.main)) {
      throw new Error('columns.main must be an array');
    }
    if (!config.columns.mobile || !Array.isArray(config.columns.mobile)) {
      throw new Error('columns.mobile must be an array');
    }
    
    // Validate all section keys exist
    const allColumnSections = [
      ...config.columns.sidebar,
      ...config.columns.main
    ];
    const invalidSections = allColumnSections.filter(
      key => !content.sections[key]
    );
    if (invalidSections.length > 0) {
      throw new Error(
        `Invalid section keys in columns: ${invalidSections.join(', ')}. ` +
        `Available sections: ${Object.keys(content.sections).join(', ')}`
      );
    }
    
    // Build all sections
    const allSections = {};
    Object.keys(content.sections).forEach(key => {
      allSections[key] = (
        <Section
          key={key}
          type={key}
          heading={content.sections[key].heading}
          data={content.sections[key]}
        />
      );
    });
    
    return (
      <ThemeLayout 
        name={content.name} 
        title={content.title} 
        columns={config.columns}
      >
        {Object.values(allSections)}
      </ThemeLayout>
    );
  }
  
  // Single-column themes (minimalist, bold-header, visual-timeline)
  if (config.theme === 'modern-professional') {
    throw new Error(
      'Configuration mismatch: The "modern-professional" theme requires "columns", not "sectionOrder"'
    );
  }
  
  // Validate all section keys exist
  const invalidSections = config.sectionOrder.filter(
    key => !content.sections[key]
  );
  if (invalidSections.length > 0) {
    throw new Error(
      `Invalid section keys in sectionOrder: ${invalidSections.join(', ')}. ` +
      `Available sections: ${Object.keys(content.sections).join(', ')}`
    );
  }
  
  return (
    <ThemeLayout name={content.name} title={content.title}>
      {config.sectionOrder.map((key) => {
        const section = content.sections[key];
        if (!section) return null;
        return (
          <Section
            key={key}
            type={key}
            heading={section.heading}
            data={section}
          />
        );
      })}
    </ThemeLayout>
  );
}