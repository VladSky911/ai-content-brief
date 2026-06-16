import type { BriefFormValues } from "../types/brief";

export function createContentBriefPrompt(values: BriefFormValues): string {
  return `
You are an expert SEO content strategist.

Create a detailed SEO content brief based on the following inputs:

Topic: ${values.topic}
Target audience: ${values.audience}
Tone: ${values.tone}
Keywords: ${values.keywords || "None provided"}

Return ONLY valid JSON.
Do not include markdown.
Do not include backticks.
Do not include explanations outside JSON.

The JSON must match this exact structure:
{
  "title": "string",
  "meta": {
    "topic": "string",
    "audience": "string",
    "tone": "professional | friendly | technical | persuasive | casual",
    "keywords": ["string"]
  },
  "searchIntent": "string",
  "angle": "string",
  "keywords": ["string"],
  "outline": [
    {
      "heading": "string",
      "points": ["string"]
    }
  ],
  "faqs": ["string"],
  "callToAction": "string"
}
`.trim();
}
