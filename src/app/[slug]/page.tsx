import type { Metadata } from "next";
import { InvitationView } from "@/components/invitation/InvitationView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pretty = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" & ");

  return {
    title: `${pretty || "Davetiye"} | Davetim`,
    description: "Dijital davetiye — tarih, mekan, LCV ve fotoğraf albümü.",
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;
  return <InvitationView slug={slug} />;
}
