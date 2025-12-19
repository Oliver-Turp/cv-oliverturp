// export const config = {
//   theme: "minimalist",
//   sectionOrder: [
//     "about",
//     "experience",
//     "education",
//     "skills",
//     "certifications",
//     "contact"
//   ]
// };

// export const config = {
//   theme: "bold-header",
//   sectionOrder: [
//     "contact",
//     "about",
//     "experience",
//     "education",
//     "skills",
//     "certifications",
//   ]
// };

// export const config = {
//   theme: "visual-timeline",
//   sectionOrder: [
//     "about",
//     "experience",
//     "education",
//     "skills",
//     "certifications",
//     "contact"
//   ]
// };

export const config = {
  theme: "modern-professional",

  // Two-column layout config (replaces sectionOrder for this theme)
  columns: {
    sidebar: ["contact", "skills", "education", "certifications", "interests"],
    main: ["about", "experience"],
    mobile: [
      "about",
      "experience",
      "education",
      "skills",
      "certifications",
      "interests",
      "contact"
    ]
  }
};