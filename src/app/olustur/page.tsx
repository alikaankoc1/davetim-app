import type { Metadata } from "next";
import { EditorShell } from "@/components/editor/EditorShell";
import { getTemplateById, isTemplateId } from "@/data/templates";
import { normalizeThemeId } from "@/lib/invitation";

export const metadata: Metadata = {
  title: "Davetiye Oluştur | Davetim",
  description:
    "Şablonunu seç, bilgilerini gir ve davetiyeni anında önizle.",
};

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const params = await searchParams;
  const raw = params.theme;
  const theme = isTemplateId(raw) ? normalizeThemeId(raw) : undefined;
  const template = theme ? getTemplateById(theme) : undefined;

  return (
    <EditorShell
      initialTheme={theme}
      initialEventType={template?.category}
    />
  );
}
