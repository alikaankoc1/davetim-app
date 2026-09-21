import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedInvitation } from "@/app/actions/invitations";
import { InvitationView } from "@/components/invitation/InvitationView";
import { displayNames } from "@/lib/invitation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getPublishedInvitation(slug);
  const title = invitation
    ? displayNames(invitation)
    : slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" & ");

  return {
    title: `${title || "Davetiye"} | Davetim`,
    description: "Dijital davetiye — tarih, mekan, LCV ve fotoğraf albümü.",
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPublishedInvitation(slug);
  if (!data) notFound();
  return <InvitationView data={data} />;
}
