export type Tone =
  | "professional"
  | "friendly"
  | "technical"
  | "persuasive"
  | "casual";

export type BriefFormValues = {
  topic: string;
  audience: string;
  tone: Tone;
  keywords: string;
};

export type BriefMeta = {
  topic: string;
  audience: string;
  tone: Tone;
  keywords: string[];
};

export type BriefOutlineItem = {
  heading: string;
  points: string[];
};

export type ContentBrief = {
  title: string;
  meta: BriefMeta;
  searchIntent: string;
  angle: string;
  keywords: string[];
  outline: BriefOutlineItem[];
  faqs: string[];
  callToAction: string;
};
