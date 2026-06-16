import type { ContentBrief } from "../types/brief";

type BriefOutputProps = {
  brief: ContentBrief;
};

export function BriefOutput({ brief }: BriefOutputProps) {
  return (
    <article className="space-y-6">
      <div>
        <p className="text-sm text-cyan-200/80">Generated SEO Brief</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#e6edf3]">
          {brief.title}
        </h2>
      </div>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Topic
          </p>
          <p className="mt-2 text-sm text-slate-100">{brief.meta.topic}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Audience
          </p>
          <p className="mt-2 text-sm text-slate-100">{brief.meta.audience}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Tone</p>
          <p className="mt-2 text-sm capitalize text-slate-100">
            {brief.meta.tone}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <h3 className="text-sm font-semibold text-cyan-100">Search intent</h3>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          {brief.searchIntent}
        </p>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <h3 className="text-sm font-semibold text-cyan-100">Content angle</h3>
        <p className="mt-2 text-sm leading-6 text-slate-200">{brief.angle}</p>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-cyan-100">Keywords</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {brief.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-cyan-100">Outline</h3>
        <div className="mt-3 space-y-3">
          {brief.outline.map((item) => (
            <div
              key={item.heading}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
            >
              <h4 className="text-sm font-semibold text-slate-100">
                {item.heading}
              </h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-cyan-100">FAQs</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
          {brief.faqs.map((faq) => (
            <li
              key={faq}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
            >
              {faq}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4">
        <h3 className="text-sm font-semibold text-cyan-100">Call to action</h3>
        <p className="mt-2 text-sm leading-6 text-slate-100">
          {brief.callToAction}
        </p>
      </section>
    </article>
  );
}
