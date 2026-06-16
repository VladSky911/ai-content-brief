import { createContentBriefPrompt } from "../../prompts/contentBriefPrompt";
import type { StreamBriefParams } from "../../types/ai";

type ClaudeContentBlockDelta = {
  type: "content_block_delta";
  delta: {
    type: "text_delta";
    text: string;
  };
};

type ClaudeStreamEvent =
  | ClaudeContentBlockDelta
  | {
      type:
        | "message_start"
        | "content_block_start"
        | "content_block_stop"
        | "message_delta"
        | "message_stop"
        | "ping"
        | "error";
    };

export async function streamClaudeBrief({
  config,
  values,
  onText,
}: StreamBriefParams): Promise<string> {
  if (!config.model.trim()) {
    throw new Error("Please enter a Claude model name.");
  }

  const endpoint =
    config.endpoint.trim() || "https://api.anthropic.com/v1/messages";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 3000,
      stream: true,
      messages: [
        {
          role: "user",
          content: createContentBriefPrompt(values),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Claude API request failed.");
  }

  if (!response.body) {
    throw new Error("Streaming is not supported in this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (!trimmedLine.startsWith("data:")) {
        continue;
      }

      const data = trimmedLine.replace(/^data:\s*/, "");

      if (data === "[DONE]") {
        continue;
      }

      try {
        const event = JSON.parse(data) as ClaudeStreamEvent;

        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          fullText += event.delta.text;
          onText(event.delta.text);
        }
      } catch {
        // Ignore incomplete or non-JSON SSE chunks.
      }
    }
  }

  return fullText;
}
