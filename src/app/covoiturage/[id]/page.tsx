import RideDetailsClient from "./ride-details-client"

export const instant = false

export default async function RideDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <RideDetailsClient id={id} />
}
