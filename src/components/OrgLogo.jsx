import perseverance from "../assets/perseverance.png";
import lpu from "../assets/lpu.png";

const LOGOS = { perseverance, lpu };

// real org logos, greyscale until hovered so the page stays black and white
const OrgLogo = ({ name, alt }) => (
  <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-white p-1.5">
    <img src={LOGOS[name]} alt={alt} className="org-logo size-full object-contain" loading="lazy" />
  </span>
);

export default OrgLogo;
