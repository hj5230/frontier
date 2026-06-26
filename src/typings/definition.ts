import { z } from 'zod'

import { ColorSchema } from '@typings/color'
import { LangLevelSchema } from '@typings/lang_level'
import { Appearance } from '@typings/appearance'

/**
 * All definition types are derived from their Zod schema via `z.infer`,
 * so the static types and the runtime validators are guaranteed to stay
 * in sync (no more hand-maintained interface/schema drift).
 */

const BadgeSchema = z.object({
  text: z.string(),
  color: ColorSchema,
})

const ExperienceSchema = z.object({
  title: z.string(),
  period: z.string(),
  description: z.array(z.string()),
})

const ProjectSchema = z.object({
  title: z.string(),
  description: z.array(z.string()),
  link: z.string(),
  image_uri: z.string().optional(),
})

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

const EducationSchema = z
  .object({
    institution: z.string(),
    period: z.string(),
    degree: z.string(),
    comment: z.string().optional(),
    themeColor: ColorSchema.optional(),
  })
  .strict()

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

const TechStackSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    comment: z.string().optional(),
    themeColor: ColorSchema.optional(),
  })
  .strict()

const LanguageSchema = z
  .object({
    lang: z.string(),
    level: LangLevelSchema,
    comment: z.string().optional(),
    themeColor: ColorSchema.optional(),
  })
  .strict()

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

export const ProjectDefinitionSchema = z
  .object({
    project: z.array(RProjectSchema),
  })
  .strict()

export const WorkDefinitionSchema = z
  .object({
    work: z.array(WorkSchema),
  })
  .strict()

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

const NavigatorItemSchema = z
  .object({
    name: z.string(),
    path: z.string(),
  })
  .strict()

export const NavbarDefinitionSchema = z
  .object({
    site_icon_uri: z.string(),
    navigator_items: z.array(NavigatorItemSchema),
  })
  .strict()

const PathSchema = z
  .object({
    name: z.string(),
    path: z.string(),
  })
  .strict()

export const AppDefinitionSchema = z
  .object({
    path: z.array(PathSchema),
    defaultThemeColor: ColorSchema,
    defaultAppearance: z.nativeEnum(Appearance),
    $error_title: z.string(),
    $error_description: z.string(),
    $error_redirect: z.string(),
  })
  .strict()

export type Badge = z.infer<typeof BadgeSchema>
export type Definition = z.infer<typeof DefinitionSchema>
export type ResumeDefinition = z.infer<
  typeof ResumeDefinitionSchema
>
export type ProjectDefinition = z.infer<
  typeof ProjectDefinitionSchema
>
export type WorkDefinition = z.infer<
  typeof WorkDefinitionSchema
>
export type ContactDefinition = z.infer<
  typeof ContactDefinitionSchema
>
export type NavbarDefinition = z.infer<
  typeof NavbarDefinitionSchema
>
export type AppDefinition = z.infer<
  typeof AppDefinitionSchema
>

export enum DefinitionModule {
  APP = 'app',
  INDEX = 'index',
  NAVBAR = 'navbar',
  RESUME = 'resume',
  PROJECT = 'project',
  WORK = 'work',
  CONTACT = 'contact',
}
