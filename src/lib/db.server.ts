import { neon } from "@neondatabase/serverless";
import { articleListSchema, talkListSchema } from "./schemas";

// const sql = neon(process.env.NEON_DB_URL!);
const sql = neon(
  "***REMOVED***"
);

export const fetchArticles = async () => {
  const records = await sql`
    SELECT * FROM articles
    ORDER BY published_at DESC
  `;

  return articleListSchema.parse(records);
};

export const fetchAppearances = async () => {
  const records = await sql`
    SELECT * FROM talks
    ORDER BY date_string DESC
  `;

  return talkListSchema.parse(records);
};
