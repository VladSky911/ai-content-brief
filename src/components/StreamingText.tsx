type StreamingTextProps = {
  text: string;
  isStreaming: boolean;
};

export function StreamingText({ text, isStreaming }: StreamingTextProps) {
  return (
    <div className="mt-4 text-sm leading-6 text-slate-100">
      <pre className="whitespace-pre-wrap break-words font-sans">
        {text}
        {isStreaming ? (
          <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-sm bg-cyan-300 align-[-2px]" />
        ) : null}
      </pre>
    </div>
  );
}
