import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LazyMotion, domAnimation } from 'framer-motion';
import axe from 'axe-core';
import App from '../src/App';
import Navbar from '../src/components/Navbar';
import Contact from '../src/sections/Contact';
import ContactForm from '../src/components/ContactForm';
import { projects } from '../src/data/projects';
import { experience } from '../src/data/experience';
import { profile } from '../src/data/profile';
import type { ReactNode } from 'react';
const wrap = (node: ReactNode) => <LazyMotion features={domAnimation}>{node}</LazyMotion>;
function fillForm() {
  fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Test Visitor' } });
  fireEvent.change(screen.getByLabelText('Email address'), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Portfolio inquiry' } });
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'This is a test inquiry, not a real message.' },
  });
}
describe('Portfolio behavior', () => {
  it('renders all requested sections, verified records and valid internal anchors', () => {
    const { container } = render(<App />);
    for (const id of [
      'home',
      'projects',
      'about',
      'achievements',
      'experience',
      'skills',
      'education',
      'contact',
    ])
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    expect(projects).toHaveLength(4);
    expect(experience).toHaveLength(3);
    for (const a of container.querySelectorAll('a[href^="#"]'))
      expect(container.querySelector(a.getAttribute('href')!)).not.toBeNull();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Nitin Kaundal');
  });
  it('toggles theme and persists the preference', async () => {
    render(wrap(<Navbar />));
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('nk-theme')).toBe('light');
    await userEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
  it('opens mobile navigation and closes it with Escape, restoring focus', async () => {
    render(wrap(<Navbar />));
    const button = screen.getByRole('button', { name: 'Open navigation' });
    await userEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeTruthy();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(button.getAttribute('aria-expanded')).toBe('false'));
    expect(document.activeElement).toBe(button);
  });
  it('mobile navigation closes when selecting a section', async () => {
    render(wrap(<Navbar />));
    await userEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    const nav = screen.getByRole('navigation', { name: 'Mobile navigation' });
    await userEvent.click(nav.querySelector('a[href="#projects"]')!);
    expect(
      screen.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'),
    ).toBe('false');
  });
  it('copies the exact contact email', async () => {
    const copy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: copy },
    });
    render(wrap(<Contact />));
    fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
    await waitFor(() => expect(copy).toHaveBeenCalledWith(profile.email));
    expect(screen.getByRole('status').textContent).toBe('Email copied.');
  });
  it('does not fabricate repository or demo URLs', () => {
    for (const p of projects) {
      expect(p.repoUrl).toBeUndefined();
      expect(p.liveUrl).toBeUndefined();
    }
    render(<App />);
    expect(screen.queryByText('Live demo')).toBeNull();
    expect(screen.getAllByText('Discuss this project')).toHaveLength(4);
  });
  it('requires form fields and clearly identifies the unconfigured email fallback', () => {
    render(<ContactForm />);
    for (const label of ['Your name', 'Email address', 'Subject', 'Message'])
      expect(screen.getByLabelText(label).hasAttribute('required')).toBe(true);
    expect(screen.getByRole('button', { name: 'Continue in email' })).toBeTruthy();
    fireEvent.submit(screen.getByRole('button', { name: 'Continue in email' }).closest('form')!);
    expect(screen.getByRole('alert').textContent).toContain('complete every field');
  });
  it('handles a configured form success only after provider confirmation', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/testendpoint');
    vi.resetModules();
    const { default: ConfiguredForm } = await import('../src/components/ContactForm');
    const request = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', request);
    render(<ConfiguredForm />);
    fillForm();
    fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form')!);
    await waitFor(() =>
      expect(screen.getByText('Thanks! Your message has been sent.')).toBeTruthy(),
    );
    expect(request).toHaveBeenCalledTimes(1);
    expect((screen.getByLabelText('Your name') as HTMLInputElement).value).toBe('');
  });
  it('preserves entered data and gives an error when the provider rejects', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/testendpoint');
    vi.resetModules();
    const { default: ConfiguredForm } = await import('../src/components/ContactForm');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    render(<ConfiguredForm />);
    fillForm();
    fireEvent.submit(screen.getByRole('button', { name: 'Send message' }).closest('form')!);
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Could not send'));
    expect((screen.getByLabelText('Your name') as HTMLInputElement).value).toBe('Test Visitor');
  });
  it('has no detectable axe violations in document semantics (layout rules require browser QA)', async () => {
    const { container } = render(<App />);
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(
      result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    ).toEqual([]);
  });
});
