import { z } from "zod"

export const talkTypesSchema = z.union([
  z.literal("workshop"),
  z.literal("conference"),
  z.literal("meetup"),
  z.literal("podcast"),
  z.literal("livestream"),
])

export const articlePlatformSchema = z.union([
  z.literal("smashing"),
  z.literal("dev-to"),
  z.literal("css-tricks"),
])

export const talkSchema = z.object({
  id: z.string(),
  date_string: z.string().catch("TBD"),
  event_name: z.string().catch("To be announced"),
  title: z.string().catch("To be announced"),
  description: z.string().catch("To be announced"),
  recording: z.string().optional().nullable(),
  slides: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  kind: talkTypesSchema,
  published: z.boolean().catch(false),
  isFuture: z.boolean().catch(true),
  place: z.string().optional().nullable(),
})

export const talkListSchema = z.array(talkSchema)

export const articleListSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string().optional().nullable(),
    published_at: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    url: z.string().optional().nullable(),
    platform_name: articlePlatformSchema,
  }),
)

export type ArticlePlatformType = z.infer<typeof articlePlatformSchema>
export type TalkType = z.infer<typeof talkTypesSchema>

export type YearlyMap = {
  [key: string]: z.infer<typeof talkListSchema>
}
