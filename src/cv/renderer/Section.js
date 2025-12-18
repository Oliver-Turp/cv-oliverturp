import About from "./sections/About";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const SECTIONS = {
  about: About,
  experience: Experience,
  education: Education,
  skills: Skills,
  projects: Projects,
  contact: Contact
};

export default function Section({ type, heading, data }) {
  const Component = SECTIONS[type];
  if (!Component) return null;

  return <Component heading={heading} data={data} />;
}
