import type { StreamBriefParams } from "../types/ai";
import { streamMockBrief } from "./providers/mockProvider";
import { streamOpenAiCompatibleBrief } from "./providers/openAiCompatibleProvider";

export async function streamAiContentBrief(
  params: StreamBriefParams,
): Promise<string> {
  switch (params.config.provider) {
    case "mock":
      return streamMockBrief(params);

    case "openai-compatible":
      return streamOpenAiCompatibleBrief(params);

    case "claude":
      throw new Error("Claude provider is not connected yet.");

    default: {
      const exhaustiveCheck: never = params.config.provider;
      throw new Error(`Unsupported provider: ${exhaustiveCheck}`);
    }
  }
}
