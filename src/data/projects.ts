export interface Project {
  id: string;
  name: string;
  subtitle: string;
  year: string;
  description: string;
  stack: string[];
  features: string[];
  featured?: boolean;
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
}
export const projects: Project[] = [
  {
    id: 'edistrict',
    name: 'Smart eDistrict',
    subtitle: 'Digital citizen service portal',
    year: '2026',
    featured: true,
    description:
      'Bringing citizen services into one connected workflow. A full-stack e-governance portal with dynamic applications, transparent tracking and role-based access.',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    features: [
      'Dynamic service forms',
      'Application tracking',
      'Role-based access',
      'Master-data management',
    ],
  },
  {
    id: 'consultify',
    name: 'Consultify',
    subtitle: 'Expert consultation platform',
    year: '2026',
    featured: true,
    description:
      'Connecting people with verified expertise. A full-stack platform that brings expert verification, appointment booking and video consultations together.',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Jitsi'],
    features: [
      'Authentication',
      'Expert verification',
      'Appointment booking',
      'Jitsi video consultations',
    ],
  },
  {
    id: 'bizzfinder',
    name: 'BizzFinder',
    subtitle: 'Local business discovery',
    year: '2024',
    description:
      'A local business directory with category-based search, user authentication, vendor dashboards and reviews, built on custom Django models.',
    stack: ['Python', 'Django', 'HTML', 'CSS', 'PostgreSQL'],
    features: ['Category-based search', 'Vendor dashboards', 'Business reviews'],
  },
  {
    id: 'rms',
    name: 'RMS',
    subtitle: 'Result management system',
    year: '2024',
    description:
      'A focused desktop application for managing student records and results, with a straightforward interface and complete CRUD workflows.',
    stack: ['Python', 'Tkinter', 'SQLite'],
    features: ['Student records', 'Create, read, update & delete', 'Desktop GUI'],
  },
];
