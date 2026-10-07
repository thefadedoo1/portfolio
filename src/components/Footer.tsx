import { ArrowUp } from 'lucide-react';
import { SocialLinks } from './Primitives';
export default function Footer() {
  return (
    <footer className="container footer">
      <div>
        <a className="brand-mark" href="#home" aria-label="Back to home">
          nk<span>.</span>
        </a>
        <p>
          © {new Date().getFullYear()} Nitin Kaundal
          <br />
          <span>Designed & built by Nitin Kaundal</span>
        </p>
      </div>
      <div className="footer-right">
        <span>Built with React & Tailwind CSS</span>
        <SocialLinks />
        <a className="icon-button" href="#home" aria-label="Back to top" title="Back to top">
          <ArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
}
