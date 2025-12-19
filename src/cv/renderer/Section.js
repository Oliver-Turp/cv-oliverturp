import About from "./sections/About";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Publications from "./sections/Publications";
import Certifications from "./sections/Certifications";
import Awards from "./sections/Awards";
import Contact from "./sections/Contact";
import Interests from "./sections/Interests";

const SECTIONS = {
  about: About,
  experience: Experience,
  education: Education,
  skills: Skills,
  projects: Projects,
  publications: Publications,
  certifications: Certifications,
  awards: Awards,
  contact: Contact,
  interests: Interests,
};

export default function Section({ type, heading, data }) {
  const Component = SECTIONS[type];
  if (!Component) return null;

  return <Component heading={heading} data={data} />;
}