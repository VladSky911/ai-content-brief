import { exportBriefToPdf } from "../lib/exportBriefToPdf";
import type { ContentBrief } from "../types/brief";

type ExportButtonProps = {
  brief: ContentBrief | null;
};

export function ExportButton({ brief }: ExportButtonProps) {
  return (
    <button
      type="button"
      disabled={!brief}
      onClick={() => {
        if (brief) {
          exportBriefToPdf(brief);
        }
      }}
      className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition duration-200 hover:scale-[1.02] hover:border-cyan-200/50 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
    >
      Export PDF
    </button>
  );
}
