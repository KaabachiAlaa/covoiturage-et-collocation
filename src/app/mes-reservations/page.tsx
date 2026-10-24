"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Loader2, MapPin, XCircle } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cancelBooking, getUpcomingBookings } from "@/services/bookings.service"
import { getErrorMessage } from "@/services/api-client"
import { tokenStore } from "@/services/token-store"
import { BookingStatus, type Booking } from "@/types/booking"

const statusLabels: Record<BookingStatus, string> = {
  [BookingStatus.Pending]: "En attente",
  [BookingStatus.Accepted]: "Confirmée",
  [BookingStatus.Declined]: "Refusée",
  [BookingStatus.Cancelled]: "Annulée",
  [BookingStatus.Completed]: "Terminée",
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
}

export default function ReservationsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [cancelling, setCancelling] = useState<number>()

  useEffect(() => {
    const controller = new AbortController()
    if (!tokenStore.getAccessToken() && !tokenStore.getRefreshToken()) {
      setLoading(false)
      return () => controller.abort()
    }
    getUpcomingBookings({ page: 1, pageSize: 20 }, controller.signal)
      .then((result) => setBookings(result?.items ?? []))
      .catch((reason) => {
        if (reason.name !== "AbortError") setError(getErrorMessage(reason))
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  async function handleCancel(bookingId: number) {
    setCancelling(bookingId)
    try {
      await cancelBooking(bookingId)
      setBookings((current) => current.filter((booking) => booking.bookingId !== bookingId))
    } catch (reason) {
      setError(getErrorMessage(reason))
    } finally {
      setCancelling(undefined)
    }
  }

  const isAuthenticated = Boolean(tokenStore.getAccessToken() || tokenStore.getRefreshToken())

  return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-5xl px-5 py-12 lg:px-8"><Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4" /> Accueil</Link><div className="mt-8"><p className="text-sm font-semibold text-primary">Espace personnel</p><h1 className="mt-2 text-4xl font-semibold">Mes réservations</h1><p className="mt-3 text-muted-foreground">Retrouvez vos demandes et vos trajets confirmés.</p></div>{!isAuthenticated ? <Card className="mt-8"><CardContent className="p-10 text-center"><h2 className="text-xl font-semibold">Connexion requise</h2><p className="mt-2 text-sm text-muted-foreground">Connectez-vous pour consulter vos réservations.</p><Button asChild className="mt-6"><Link href="/connexion">Se connecter</Link></Button></CardContent></Card> : loading ? <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-primary" /></div> : error ? <Card className="mt-8 border-destructive/30"><CardContent className="p-8 text-center"><p className="text-sm text-destructive">{error}</p><Button variant="outline" className="mt-5" onClick={() => window.location.reload()}>Réessayer</Button></CardContent></Card> : bookings.length === 0 ? <Card className="mt-8"><CardContent className="p-10 text-center"><CalendarDays className="mx-auto size-8 text-primary" /><h2 className="mt-4 text-xl font-semibold">Aucune réservation à venir</h2><p className="mt-2 text-sm text-muted-foreground">Trouvez un trajet adapté à votre prochaine destination.</p><Button asChild className="mt-6"><Link href="/covoiturage">Rechercher un trajet</Link></Button></CardContent></Card> : <section className="mt-8 grid gap-4">{bookings.map((booking) => <Card key={booking.bookingId}><CardContent className="p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{statusLabels[booking.status] ?? "Réservation"}</span><h2 className="mt-4 text-lg font-semibold">{booking.startAddress} <span className="text-muted-foreground">→</span> {booking.endAddress}</h2><p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" /> {formatDate(booking.departureTime)}</p><p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" /> Conducteur : {booking.driverName} · {booking.seats} place{booking.seats > 1 ? "s" : ""}</p></div><div className="text-right"><p className="text-xl font-semibold">{booking.totalAmount.toFixed(2)} €</p>{booking.status === BookingStatus.Pending || booking.status === BookingStatus.Accepted ? <Button variant="ghost" size="sm" className="mt-3 text-destructive hover:text-destructive" disabled={cancelling === booking.bookingId} onClick={() => handleCancel(booking.bookingId)}><XCircle className="mr-2 size-4" />{cancelling === booking.bookingId ? "Annulation…" : "Annuler"}</Button> : null}</div></div></CardContent></Card>)}</section>}</main></div>
}
