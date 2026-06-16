import type { StreamBriefParams } from "../types/ai";
import { streamClaudeBrief } from "./providers/claudeProvider";
import { streamMockBrief } from "./providers/mockProvider";
import { streamOpenAiCompatibleBrief } from "./providers/openAiCompatibleProvider";

export async function streamAiContentBrief(
  params: StreamBriefParams,
): Promise<string> {
  switch (params.config.provider) {
    case "mock":
      return streamMockBrief(params);

    case "claude":
      return streamClaudeBrief(params);

    case "openai-compatible":
      return streamOpenAiCompatibleBrief(params);

    default: {
      const exhaustiveCheck: never = params.config.provider;
      throw new Error(`Unsupported provider: ${exhaustiveCheck}`);
    }
  }
}
