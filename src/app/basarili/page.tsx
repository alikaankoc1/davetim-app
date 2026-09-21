import type { Metadata } from "next";
import { SuccessView } from "@/components/editor/SuccessView";

export const metadata: Metadata = {
  title: "Davetiye Hazır | Davetim",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const params = await searchParams;
  const slug = params.slug?.trim() || "davet";

  return <SuccessView slug={slug} />;
}
