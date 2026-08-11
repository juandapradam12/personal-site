import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const contentRoot = path.join(process.cwd(), 'content');

function loadYaml<T>(relativePath: string): T {
  const filePath = path.join(contentRoot, relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
  return parseYaml(source) as T;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  openTo: string[];
  seo: {
    title: string;
    description: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  enabled: boolean;
}

export interface NavigationConfig {
  items: NavItem[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ResearchItem {
  title: string;
  affiliation: string;
  period: string;
  description: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface CvProjectItem {
  name: string;
  context: string;
  description: string;
}

export interface PublicationItem {
  title: string;
  authors: string;
  venue: string;
  date: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface ToolboxItem {
  category: string;
  level: number;
  items: string[];
}

export interface CvLink {
  label: string;
  href: string;
}

export interface AboutPrinciple {
  title: string;
  description?: string;
}

export interface AboutConfig {
  intro: string;
  story: string;
  principlesIntro?: string;
  principles: AboutPrinciple[];
  beyondWork: string[];
  funFacts: string[];
}

export interface CvConfig {
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: CvProjectItem[];
  research: ResearchItem[];
  publications: PublicationItem[];
  skills: SkillGroup[];
  toolbox: ToolboxItem[];
  strengths: string[];
  languages: LanguageItem[];
  links: CvLink[];
}

export function getSiteConfig(): SiteConfig {
  return loadYaml<SiteConfig>('config/site.yaml');
}

export function getNavigationConfig(): NavigationConfig {
  return loadYaml<NavigationConfig>('config/navigation.yaml');
}

export function getCvConfig(): CvConfig {
  return loadYaml<CvConfig>('config/cv.yaml');
}

export function getEnabledNavItems(): NavItem[] {
  return getNavigationConfig().items.filter((item) => item.enabled);
}

export function getAboutConfig(): AboutConfig {
  return loadYaml<AboutConfig>('config/about.yaml');
}
