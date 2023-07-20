import { articleListSchema, talkListSchema } from "./schemas"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.SUPABASE_DB,
  import.meta.env.SUPABASE_KEY
)

export const fetchArticles = async () => {
  const { data: records } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", {
      ascending: false,
    })

  return articleListSchema.parse(records)
}

export const fetchAppearances = async () => {
  const { data: records } = await supabase.from("talks").select("*")

  return talkListSchema.parse(records)
}
