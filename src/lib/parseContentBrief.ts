import type { ContentBrief } from "../types/brief";

export type ParseContentBriefResult =
  | {
      ok: true;
      data: ContentBrief;
    }
  | {
      ok: false;
      rawText: string;
      message: string;
    };

export function parseContentBrief(rawText: string): ParseContentBriefResult {
  const cleanedText = rawText.trim();

  try {
    return {
      ok: true,
      data: JSON.parse(cleanedText) as ContentBrief,
    };
  } catch {
    return {
      ok: false,
      rawText: cleanedText,
      message: "The response was generated, but it was not valid JSON.",
    };
  }
}
