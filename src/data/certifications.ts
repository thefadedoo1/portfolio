export interface Certification {
  name: string;
  provider: string;
  url?: string;
  credentialId?: string;
  date?: string;
  logo?: string;
}
export const certifications: Certification[] = [
  { name: 'Generative AI Fundamentals', provider: 'Google Cloud' },
  { name: 'Prompt Engineering', provider: 'Google Cloud' },
  { name: 'Gen AI Exchange Program', provider: 'Google Cloud / Hack2Skill' },
];
