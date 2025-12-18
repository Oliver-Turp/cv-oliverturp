// export const config = {
//   theme: "minimalist",
//   sectionOrder: [
//     "about",
//     "experience",
//     "education",
//     "skills",
//     "projects",
//     "publications",
//     "certifications",
//     "awards",
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
//     "projects",
//     "publications",
//     "certifications",
//     "awards"
//   ]
// };

// export const config = {
//   theme: "visual-timeline",
//   sectionOrder: [
//     "about",
//     "experience",
//     "education",
//     "skills",
//     "projects",
//     "contact"
//   ]
// };

export const config = {
  theme: "modern-professional",

  // Two-column layout config (replaces sectionOrder for this theme)
  columns: {
    sidebar: ["contact", "skills", "education"],
    main: ["about", "experience", "projects"],
    mobile: ["about", "contact", "experience", "skills", "education", "projects"]
  }
};