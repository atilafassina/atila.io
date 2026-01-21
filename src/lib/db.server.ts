import { neon } from "@neondatabase/serverless";
import { articleListSchema, talkListSchema } from "./schemas";

// const sql = neon(process.env.NEON_DB_URL!);
const sql = neon(
  "postgresql://neondb_owner:npg_pQxrZcJHPj93@ep-winter-frog-a2861s8c.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
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
