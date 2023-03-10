// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  { name: "now", columns: [{ name: "name", type: "string" }] },
  {
    name: "articles",
    columns: [
      { name: "published_at", type: "text" },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "platform", type: "string" },
      { name: "url", type: "string" },
    ],
  },
  {
    name: "appearances",
    columns: [
      { name: "date", type: "text" },
      { name: "name", type: "string" },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "recording", type: "string" },
      { name: "slides", type: "string" },
      { name: "url", type: "string" },
      { name: "type", type: "string" },
      { name: "published", type: "bool" },
      { name: "isFuture", type: "bool" },
      { name: "place", type: "string" },
    ],
  },
  {
    name: "xata_survey",
    columns: [
      { name: "starter", type: "string" },
      { name: "migrations", type: "multiple" },
      { name: "email", type: "email" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Now = InferredTypes["now"];
export type NowRecord = Now & XataRecord;

export type Articles = InferredTypes["articles"];
export type ArticlesRecord = Articles & XataRecord;

export type Appearances = InferredTypes["appearances"];
export type AppearancesRecord = Appearances & XataRecord;

export type XataSurvey = InferredTypes["xata_survey"];
export type XataSurveyRecord = XataSurvey & XataRecord;

export type DatabaseSchema = {
  now: NowRecord;
  articles: ArticlesRecord;
  appearances: AppearancesRecord;
  xata_survey: XataSurveyRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://atila-r3s7jg.eu-west-1.xata.sh/db/atilaio",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
