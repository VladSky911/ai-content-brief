import type { AiProviderConfig } from "../types/ai";

export type AiModelPreset = {
  id: string;
  label: string;
  config: AiProviderConfig;
};

export const aiModelPresets: AiModelPreset[] = [
  {
    id: "mock-demo",
    label: "Mock / Demo",
    config: {
      provider: "mock",
      apiKey: "",
      endpoint: "",
      model: "",
    },
  },
  {
    id: "claude-sonnet-4-6",
    label: "Claude Sonnet 4.6",
    config: {
      provider: "claude",
      apiKey: "",
      endpoint: "https://api.anthropic.com/v1/messages",
      model: "claude-sonnet-4-6",
    },
  },
  {
    id: "claude-opus-4-8",
    label: "Claude Opus 4.8",
    config: {
      provider: "claude",
      apiKey: "",
      endpoint: "https://api.anthropic.com/v1/messages",
      model: "claude-opus-4-8",
    },
  },
  {
    id: "claude-haiku-4-5",
    label: "Claude Haiku 4.5",
    config: {
      provider: "claude",
      apiKey: "",
      endpoint: "https://api.anthropic.com/v1/messages",
      model: "claude-haiku-4-5",
    },
  },
  {
    id: "openai-gpt-5-5",
    label: "OpenAI GPT-5.5",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint: "https://api.openai.com/v1/chat/completions",
      model: "gpt-5.5",
    },
  },
  {
    id: "openai-gpt-5-4",
    label: "OpenAI GPT-5.4",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint: "https://api.openai.com/v1/chat/completions",
      model: "gpt-5.4",
    },
  },
  {
    id: "openai-gpt-5-4-mini",
    label: "OpenAI GPT-5.4 Mini",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint: "https://api.openai.com/v1/chat/completions",
      model: "gpt-5.4-mini",
    },
  },
  {
    id: "google-gemini-2-5-pro",
    label: "Google Gemini 2.5 Pro",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint:
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      model: "gemini-2.5-pro",
    },
  },
  {
    id: "google-gemini-2-5-flash",
    label: "Google Gemini 2.5 Flash",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint:
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      model: "gemini-2.5-flash",
    },
  },
  {
    id: "xai-grok-4-3",
    label: "xAI Grok 4.3",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint: "https://api.x.ai/v1/chat/completions",
      model: "grok-4.3",
    },
  },
  {
    id: "deepseek-v4-flash",
    label: "DeepSeek V4 Flash",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint: "https://api.deepseek.com/chat/completions",
      model: "deepseek-v4-flash",
    },
  },
  {
    id: "deepseek-v4-pro",
    label: "DeepSeek V4 Pro",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint: "https://api.deepseek.com/chat/completions",
      model: "deepseek-v4-pro",
    },
  },
  {
    id: "mistral-medium",
    label: "Mistral Medium",
    config: {
      provider: "openai-compatible",
      apiKey: "",
      endpoint: "https://api.mistral.ai/v1/chat/completions",
      model: "mistral-medium-latest",
    },
  },
];
