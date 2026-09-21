type PageProps = {
  searchParams: Promise<{ paket?: string }>;
};

export default async function OdemePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const paket = params.paket?.trim() || "";

  return (
    <main>
      <h1>Ödeme sayfası</h1>
      {paket ? <p>Paket: {paket}</p> : null}
    </main>
  );
}
