type TopBarProps = {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
};

export function TopBar({ apiKey, onApiKeyChange }: TopBarProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 backdrop-blur-xl">
      <div>
        <p className="text-sm text-cyan-200/80">AI SEO Workspace</p>
        <h1 className="text-xl font-semibold text-[#e6edf3]">
          AI Content Brief Generator
        </h1>
      </div>

      <input
        type="password"
        value={apiKey}
        onChange={(event) => onApiKeyChange(event.target.value)}
        placeholder="Claude API key"
        className="w-72 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#e6edf3] outline-none transition duration-200 placeholder:text-slate-400 focus:border-cyan-300/60 focus:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
      />
    </header>
  );
}
