import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import { profile } from '../data/profile';
const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
const configured = !!endpoint && /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'draft'>('idle');
  const [error, setError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('_gotcha')) return;
    const name = String(data.get('name') ?? '').trim(),
      email = String(data.get('email') ?? '').trim(),
      subject = String(data.get('subject') ?? '').trim(),
      message = String(data.get('message') ?? '').trim();
    if (!name || !email || !subject || message.length < 10) {
      setError('Please complete every field and write a message of at least 10 characters.');
      setStatus('error');
      return;
    }
    if (!configured) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Nitin,\n\n${message}\n\n${name}\n${email}`)}`;
      setStatus('draft');
      return;
    }
    setStatus('loading');
    setError('');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok)
        throw new Error('Could not send your message. Please try again or email me directly.');
      setStatus('success');
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error && err.name === 'AbortError'
          ? 'The request timed out. Please try again or email me directly.'
          : err instanceof Error
            ? err.message
            : 'Something went wrong. Please email me directly.',
      );
      setStatus('error');
    } finally {
      clearTimeout(timeout);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-top">
        <Mail size={18} />
        <span>Start a conversation</span>
      </div>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Smith"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Subject
        <input
          name="subject"
          placeholder="An opportunity, an idea, a hello…"
          required
          maxLength={150}
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          placeholder="Tell me a little about what you have in mind."
          rows={4}
          minLength={10}
          maxLength={5000}
          required
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this empty
        <input name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="button primary" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <Loader2 className="spin" size={16} /> Sending…
          </>
        ) : (
          <>
            {configured ? 'Send message' : 'Continue in email'}
            <Send size={16} />
          </>
        )}
      </button>
      <div className="form-status" aria-live="polite">
        {status === 'success' && (
          <p className="success">
            <CheckCircle2 size={16} /> Thanks! Your message has been sent.
          </p>
        )}
        {status === 'error' && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {status === 'draft' && (
          <p>
            Your email app was requested. Review and send the draft there. If it didn’t open, use
            the email link.
          </p>
        )}
      </div>
      {!configured && (
        <p className="form-hint">
          This opens a draft in your email app. You review and send it there.
        </p>
      )}
    </form>
  );
}
