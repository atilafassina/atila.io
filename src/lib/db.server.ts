import { articleListSchema, talkListSchema } from "./schemas"
import { XataClient } from "./xata.codegen"

const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
})

export const fetchArticles = async () => {
  const resp = await fetch("https://api.atila.io/writings")
  const records = await resp.json()
  return articleListSchema.parse(records)
}

export const fetchAppearances = async () => {
  const resp = await fetch("https://api.atila.io/talks")
  const records = await resp.json()

  return talkListSchema.parse(records)
}

export const fetchPaginatedArticles = async () => {
  const list = await xata.db.articles
    .sort("published_at", "desc")
    .getPaginated({
      pagination: {
        size: 10,
      },
    })

  return list
}
