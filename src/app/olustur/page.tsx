import type { Metadata } from "next";
import { EditorShell } from "@/components/editor/EditorShell";
import { THEMES, type ThemeId } from "@/lib/invitation";

export const metadata: Metadata = {
  title: "Davetiye Oluştur | Davetim",
  description:
    "Şablonunu seç, bilgilerini gir ve davetiyeni anında önizle.",
};

function isTheme(value: string | undefined): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const params = await searchParams;
  const initialTheme = isTheme(params.theme) ? params.theme : undefined;

  return <EditorShell initialTheme={initialTheme} />;
}
