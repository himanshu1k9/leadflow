type Props = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailsPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1>Lead Details</h1>
      <p>Lead ID: {id}</p>
    </div>
  );
}
