import { aiModelPresets } from "../lib/aiModelPresets";
import type { RefObject } from "react";
import type { AiProvider, AiProviderConfig } from "../types/ai";

type TopBarProps = {
  config: AiProviderConfig;
  onConfigChange: (config: AiProviderConfig) => void;
  apiKeyInputRef?: RefObject<HTMLInputElement | null>;
  shouldShakeApiKey?: boolean;
};

const providerOptions: Array<{ value: AiProvider; label: string }> = [
  { value: "mock", label: "Mock" },
  { value: "claude", label: "Claude" },
  { value: "openai-compatible", label: "OpenAI compatible" },
];

export function TopBar({
  config,
  onConfigChange,
  apiKeyInputRef,
  shouldShakeApiKey = false,
}: TopBarProps) {
  const updateConfig = <Key extends keyof AiProviderConfig>(
    key: Key,
    value: AiProviderConfig[Key],
  ) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div>
        <p className="text-sm text-cyan-200/80">AI SEO Workspace</p>
        <h1 className="text-xl font-semibold text-[#e6edf3]">
          AI Content Brief Generator
        </h1>
      </div>

      <select
        value=""
        onChange={(event) => {
          const preset = aiModelPresets.find(
            (item) => item.id === event.target.value,
          );

          if (!preset) {
            return;
          }

          onConfigChange({
            ...preset.config,
            apiKey: config.apiKey,
          });
        }}
        className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-[#e6edf3] outline-none transition duration-200 focus:border-cyan-300/60"
      >
        <option value="" className="bg-slate-900 text-slate-100">
          Model preset
        </option>

        {aiModelPresets.map((preset) => (
          <option
            key={preset.id}
            value={preset.id}
            className="bg-slate-900 text-slate-100"
          >
            {preset.label}
          </option>
        ))}
      </select>

      <div className="grid gap-3 lg:grid-cols-[190px_180px_1fr_1fr_220px]">
        <select
          value={config.provider}
          onChange={(event) =>
            updateConfig("provider", event.target.value as AiProvider)
          }
          className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-[#e6edf3] outline-none transition duration-200 focus:border-cyan-300/60 focus:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
        >
          {providerOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-slate-900 text-slate-100"
            >
              {option.label}
            </option>
          ))}
        </select>

        <input
          ref={apiKeyInputRef}
          type="password"
          value={config.apiKey}
          onChange={(event) => updateConfig("apiKey", event.target.value)}
          placeholder="API key"
          disabled={config.provider === "mock"}
          className={`rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#e6edf3] outline-none transition duration-200 placeholder:text-slate-400 focus:border-cyan-300/60 focus:shadow-[0_0_24px_rgba(34,211,238,0.25)] disabled:cursor-not-allowed disabled:opacity-50 ${
            shouldShakeApiKey ? "animate-[shake_220ms_ease-in-out_0s_2]" : ""
          }`}
        />

        <input
          value={config.endpoint}
          onChange={(event) => updateConfig("endpoint", event.target.value)}
          placeholder="Endpoint"
          disabled={config.provider === "mock"}
          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#e6edf3] outline-none transition duration-200 placeholder:text-slate-400 focus:border-cyan-300/60 focus:shadow-[0_0_24px_rgba(34,211,238,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
        />

        <input
          value={config.model}
          onChange={(event) => updateConfig("model", event.target.value)}
          placeholder="Model"
          disabled={config.provider === "mock"}
          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#e6edf3] outline-none transition duration-200 placeholder:text-slate-400 focus:border-cyan-300/60 focus:shadow-[0_0_24px_rgba(34,211,238,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </header>
  );
}
