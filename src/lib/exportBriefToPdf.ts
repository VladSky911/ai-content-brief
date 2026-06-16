import jsPDF from "jspdf";
import type { ContentBrief } from "../types/brief";

export function exportBriefToPdf(brief: ContentBrief): void {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const addPageIfNeeded = (height: number) => {
    if (y + height <= pageHeight - margin) {
      return;
    }

    doc.addPage();
    y = margin;
  };

  const addWrappedText = (
    text: string,
    options: {
      fontSize: number;
      lineHeight: number;
      fontStyle?: "normal" | "bold";
      color?: [number, number, number];
      gapAfter?: number;
    },
  ) => {
    doc.setFont("helvetica", options.fontStyle ?? "normal");
    doc.setFontSize(options.fontSize);

    if (options.color) {
      doc.setTextColor(...options.color);
    } else {
      doc.setTextColor(30, 41, 59);
    }

    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    const blockHeight = lines.length * options.lineHeight;

    addPageIfNeeded(blockHeight);

    doc.text(lines, margin, y);
    y += blockHeight + (options.gapAfter ?? 10);
  };

  addWrappedText(brief.title, {
    fontSize: 22,
    lineHeight: 28,
    fontStyle: "bold",
    color: [15, 23, 42],
    gapAfter: 18,
  });

  addWrappedText(`Topic: ${brief.meta.topic}`, {
    fontSize: 10,
    lineHeight: 14,
    color: [71, 85, 105],
    gapAfter: 4,
  });

  addWrappedText(`Audience: ${brief.meta.audience}`, {
    fontSize: 10,
    lineHeight: 14,
    color: [71, 85, 105],
    gapAfter: 4,
  });

  addWrappedText(`Tone: ${brief.meta.tone}`, {
    fontSize: 10,
    lineHeight: 14,
    color: [71, 85, 105],
    gapAfter: 14,
  });

  addWrappedText("Keywords", {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: "bold",
  });

  addWrappedText(brief.keywords.join(", "), {
    fontSize: 11,
    lineHeight: 16,
    gapAfter: 16,
  });

  addWrappedText("Search Intent", {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: "bold",
  });

  addWrappedText(brief.searchIntent, {
    fontSize: 11,
    lineHeight: 16,
    gapAfter: 16,
  });

  addWrappedText("Content Angle", {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: "bold",
  });

  addWrappedText(brief.angle, {
    fontSize: 11,
    lineHeight: 16,
    gapAfter: 16,
  });

  addWrappedText("Outline", {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: "bold",
  });

  brief.outline.forEach((item, index) => {
    addWrappedText(`${index + 1}. ${item.heading}`, {
      fontSize: 12,
      lineHeight: 16,
      fontStyle: "bold",
      gapAfter: 6,
    });

    item.points.forEach((point) => {
      addWrappedText(`- ${point}`, {
        fontSize: 10,
        lineHeight: 14,
        gapAfter: 4,
      });
    });

    y += 6;
  });

  addWrappedText("FAQs", {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: "bold",
    gapAfter: 8,
  });

  brief.faqs.forEach((faq) => {
    addWrappedText(`- ${faq}`, {
      fontSize: 10,
      lineHeight: 14,
      gapAfter: 6,
    });
  });

  addWrappedText("Call to Action", {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: "bold",
    gapAfter: 8,
  });

  addWrappedText(brief.callToAction, {
    fontSize: 11,
    lineHeight: 16,
    gapAfter: 20,
  });

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Generated with AI Content Brief Generator",
    margin,
    pageHeight - 28,
  );

  doc.save(`${brief.title.toLowerCase().replaceAll(" ", "-")}-brief.pdf`);
}
