import { useState } from "react";
import { BriefForm } from "../components/BriefForm";
import { TopBar } from "../components/TopBar";
import { streamContentBrief } from "../services/claudeService";
import { StreamingText } from "../components/StreamingText";
import type { BriefFormValues } from "../types/brief";

export function App() {
  const [apiKey, setApiKey] = useState("");

  const [formValues, setFormValues] = useState<BriefFormValues>({
    topic: "",
    audience: "",
    tone: "professional",
    keywords: "",
  });

  const [streamedText, setStreamedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Claude API key.");
      return;
    }

    if (!formValues.topic.trim() || !formValues.audience.trim()) {
      setError("Please fill in topic and target audience.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setStreamedText("");

    try {
      await streamContentBrief({
        apiKey,
        values: formValues,
        onText: (text) => {
          setStreamedText((currentText) => currentText + text);
        },
      });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-[#e6edf3]">
      <TopBar apiKey={apiKey} onApiKeyChange={setApiKey} />

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[420px_1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <BriefForm
            values={formValues}
            isLoading={isLoading}
            onChange={setFormValues}
            onSubmit={handleGenerate}
          />
        </section>

        <section className="min-h-[520px] rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          {error ? (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          {streamedText ? (
            <StreamingText text={streamedText} isStreaming={isLoading} />
          ) : (
            <div className="flex min-h-[420px] items-center justify-center text-center text-sm text-slate-400">
              Your generated content brief will appear here.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
