import type { StreamBriefParams } from "../types/ai";
import { streamMockBrief } from "./providers/mockProvider";

export async function streamAiContentBrief(
  params: StreamBriefParams,
): Promise<string> {
  switch (params.config.provider) {
    case "mock":
      return streamMockBrief(params);

    case "claude":
      throw new Error("Claude provider is not connected yet.");

    case "openai-compatible":
      throw new Error("OpenAI-compatible provider is not connected yet.");

    default: {
      const exhaustiveCheck: never = params.config.provider;
      throw new Error(`Unsupported provider: ${exhaustiveCheck}`);
    }
  }
}
