import { createContentBriefPrompt } from "../../prompts/contentBriefPrompt";
import type { StreamBriefParams } from "../../types/ai";

type OpenAiStreamChunk = {
  choices?: Array<{
    delta?: {
      content?: string;
    };
  }>;
};

export async function streamOpenAiCompatibleBrief({
  config,
  values,
  onText,
}: StreamBriefParams): Promise<string> {
  if (!config.endpoint.trim()) {
    throw new Error("Please enter an OpenAI-compatible endpoint.");
  }

  if (!config.model.trim()) {
    throw new Error("Please enter a model name.");
  }

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
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
    throw new Error("OpenAI-compatible API request failed.");
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
        const chunk = JSON.parse(data) as OpenAiStreamChunk;
        const text = chunk.choices?.[0]?.delta?.content;

        if (text) {
          fullText += text;
          onText(text);
        }
      } catch {
        // Ignore incomplete or non-JSON SSE chunks.
      }
    }
  }

  return fullText;
}
