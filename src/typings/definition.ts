import { z } from 'zod'

import { Color, ColorSchema } from '@typings/color'
import {
  LangLevel,
  LangLevelSchema,
} from '@typings/lang_level'
import { Appearance } from '@typings/appearance'

interface Badge {
  text: string
  color: Color
}

const BadgeSchema = z.object({
  text: z.string(),
  color: ColorSchema,
})

interface Experience {
  title: string
  period: string
  description: string[]
}

const ExperienceSchema = z.object({
  title: z.string(),
  period: z.string(),
  description: z.array(z.string()),
})

interface Project {
  title: string
  description: string[]
  link: string
  image_uri?: string
}

const ProjectSchema = z.object({
  title: z.string(),
  description: z.array(z.string()),
  link: z.string(),
  image_uri: z.string().optional(),
})

export interface Definition {
  avatar_uri: string
  name: string
  intro: string
  _about_me: string
  about_me: string
  _experience: string
  badges: Badge[]
  experience: Experience[]
  _project: string
  project: Project[]
  _contact: string
  _phone: string
  phone: string[]
  _email: string
  email: string
  _wechat: string
  wechat: string
  _github: string
  github: string
  _langlevel: {
    basic: string
    intermediate: string
    advanced: string
    native: string
  }
}

export const DefinitionSchema = z
  .object({
    avatar_uri: z.string(),
    name: z.string(),
    intro: z.string(),
    _about_me: z.string(),
    about_me: z.string(),
    _experience: z.string(),
    badges: z.array(BadgeSchema),
    experience: z.array(ExperienceSchema),
    _project: z.string(),
    project: z.array(ProjectSchema),
    _contact: z.string(),
    _phone: z.string(),
    phone: z.array(z.string()),
    _email: z.string(),
    email: z.string(),
    _wechat: z.string(),
    wechat: z.string(),
    _github: z.string(),
    github: z.string(),
    _langlevel: z.object({
      basic: z.string(),
      intermediate: z.string(),
      advanced: z.string(),
      native: z.string(),
    }),
  })
  .strict()

interface Education {
  institution: string
  period: string
  degree: string
  comment?: string
  themeColor?: Color
}

const EducationSchema = z
  .object({
    institution: z.string(),
    period: z.string(),
    degree: z.string(),
    comment: z.string().optional(),
    themeColor: ColorSchema.optional(),
  })
  .strict()

interface Work {
  company: string
  department: string
  role: string
  period: string
  description: string[]
  comment?: string
  themeColor?: Color
}

const WorkSchema = z
  .object({
    company: z.string(),
    department: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.array(z.string()),
    comment: z.string().optional(),
    themeColor: ColorSchema.optional(),
    keywords: z.array(BadgeSchema).optional(),
  })
  .strict()

interface TechStack {
  title: string
  description: string
  comment?: string
  themeColor?: Color
}

const TechStackSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    comment: z.string().optional(),
    themeColor: ColorSchema.optional(),
  })
  .strict()

interface Language {
  lang: string
  level: LangLevel
  comment?: string
  themeColor?: Color
}

const LanguageSchema = z
  .object({
    lang: z.string(),
    level: LangLevelSchema,
    comment: z.string().optional(),
    themeColor: ColorSchema.optional(),
  })
  .strict()

export interface ResumeDefinition {
  _education: string
  education: Education[]
  education_keywords?: Badge[]
  _work: string
  work: Work[]
  work_keywords?: Badge[]
  _tech_stack: string
  tech_stack: TechStack[]
  _language: string
  language: Language[]
  language_keywords?: Badge[]
}

export const ResumeDefinitionSchema = z
  .object({
    _education: z.string(),
    education: z.array(EducationSchema),
    education_keywords: z.array(BadgeSchema).optional(),
    _work: z.string(),
    work: z.array(WorkSchema),
    work_keywords: z.array(BadgeSchema).optional(),
    _tech_stack: z.string(),
    tech_stack: z.array(TechStackSchema),
    _language: z.string(),
    language: z.array(LanguageSchema),
    language_keywords: z.array(BadgeSchema).optional(),
  })
  .strict()

interface RProject {
  name: string
  period: string
  description: string[]
  media_uri: string
  media_type?: string
  comment?: string
  themeColor?: Color
  keywords?: Badge[]
}

const RProjectSchema = z
  .object({
    name: z.string(),
    period: z.string(),
    description: z.array(z.string()),
    media_uri: z.string(),
    media_type: z.string().optional(),
    comment: z.string().optional(),
    themeColor: ColorSchema.optional(),
    keywords: z.array(BadgeSchema).optional(),
  })
  .strict()

export interface ProjectDefinition {
  project: RProject[]
}

export const ProjectDefinitionSchema = z
  .object({
    project: z.array(RProjectSchema),
  })
  .strict()

interface RWork {
  company: string
  department: string
  role: string
  period: string
  description: string[]
  comment?: string
  themeColor?: Color
  keywords?: Badge[]
}

export interface WorkDefinition {
  work: RWork[]
}

export const WorkDefinitionSchema = z
  .object({
    work: z.array(WorkSchema),
  })
  .strict()

export interface ContactDefinition {
  _contact: string
  _phone: string
  phone: string[]
  _email: string
  email: string
  _wechat: string
  wechat: string
  _github: string
  github: string
  _linkedin: string
  linkedin: string
  comment?: string
}

export const ContactDefinitionSchema = z
  .object({
    _contact: z.string(),
    _phone: z.string(),
    phone: z.array(z.string()),
    _email: z.string(),
    email: z.string(),
    _wechat: z.string(),
    wechat: z.string(),
    _github: z.string(),
    github: z.string(),
    _linkedin: z.string(),
    linkedin: z.string(),
    comment: z.string().optional(),
  })
  .strict()

interface NavigatorItem {
  name: string
  path: string
}

const NavigatorItemSchema = z
  .object({
    name: z.string(),
    path: z.string(),
  })
  .strict()

export interface NavbarDefinition {
  site_icon_uri: string
  navigator_items: NavigatorItem[]
}

export const NavbarDefinitionSchema = z
  .object({
    site_icon_uri: z.string(),
    navigator_items: z.array(NavigatorItemSchema),
  })
  .strict()

interface Path {
  name: string
  path: string
}

const PathSchema = z
  .object({
    name: z.string(),
    path: z.string(),
  })
  .strict()

export interface AppDefinition {
  path: Path[]
  defaultThemeColor: Color
  defaultAppearance: Appearance
  $error_title: string
  $error_description: string
  $error_redirect: string
}

export const AppDefinitionSchema = z
  .object({
    path: z.array(PathSchema),
    defaultThemeColor: ColorSchema,
    defaultAppearance: z.string(),
    $error_title: z.string(),
    $error_description: z.string(),
    $error_redirect: z.string(),
  })
  .strict()

export enum DefinitionModule {
  APP = 'app',
  INDEX = 'index',
  NAVBAR = 'navbar',
  RESUME = 'resume',
  PROJECT = 'project',
  WORK = 'work',
  CONTACT = 'contact',
}
