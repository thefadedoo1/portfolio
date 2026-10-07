import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile';
import { Reveal, SectionHeading } from '../components/Primitives';
import ContactForm from '../components/ContactForm';
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <Reveal>
          <SectionHeading
            number="07"
            label="LET’S CONNECT"
            title="Good things start with a conversation."
          />
          <p>
            I’m open to software development opportunities, internships, collaborations and
            interesting technology projects.
          </p>
          <div className="contact-email">
            <Mail size={19} />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              className="icon-button"
              aria-label="Copy email address"
              title="Copy email address"
              onClick={copy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <span className="copy-status" role="status">
            {copied
              ? 'Email copied.'
              : copyError
                ? 'Please select and copy the email address above.'
                : ''}
          </span>
          <div className="contact-socials">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={17} /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} /> GitHub
            </a>
          </div>
          <div className="availability contact-availability">
            <span /> Open to the right opportunity
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
