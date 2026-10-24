"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, CalendarDays, CarFront, Loader2, MapPin, Search, SlidersHorizontal } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ridesService } from "@/services/rides.service"
import { getErrorMessage } from "@/services/api-client"
import type { RideSearchResult } from "@/types/ride"

function formatDate(value: string) { return new Intl.DateTimeFormat("fr-TN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) }

export default function RidesPage() {
  const params = useSearchParams()
  const [from, setFrom] = useState(params.get("depart") ?? "")
  const [to, setTo] = useState(params.get("arrivee") ?? "")
  const [date, setDate] = useState(params.get("date") ?? "")
  const [rides, setRides] = useState<RideSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  async function search() {
    setLoading(true); setError(""); setSearched(true)
    try {
      // Ftareqi's verified search contract currently accepts coordinates, not city names.
      // Keep the UI ready for geocoding while only rendering real API responses.
      const result = await ridesService.search({ page: 1, pageSize: 20, criteria: date ? { departureTime: new Date(`${date}T00:00:00`).toISOString() } : undefined })
      setRides(result?.items ?? [])
    } catch (err) { setRides([]); setError(getErrorMessage(err)) } finally { setLoading(false) }
  }

  useEffect(() => { if (params.get("date")) void search() }, [])

  return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-6xl px-5 py-10 lg:px-8"><Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Retour à l&apos;accueil</Link><div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-semibold text-primary">Covoiturage</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Trouvez votre trajet</h1><p className="mt-3 text-muted-foreground">Les résultats affichés proviennent du backend Ftareqi.</p></div><Button asChild><Link href="/covoiturage/publier"><CarFront className="mr-2 size-4" /> Publier un trajet</Link></Button></div><Card className="mt-8"><CardContent className="p-5"><div className="grid gap-4 md:grid-cols-[1fr_1fr_180px_auto]"><label className="text-sm font-medium">Départ<Input value={from} onChange={e => setFrom(e.target.value)} placeholder="Ville de départ" className="mt-2" /></label><label className="text-sm font-medium">Arrivée<Input value={to} onChange={e => setTo(e.target.value)} placeholder="Ville d'arrivée" className="mt-2" /></label><label className="text-sm font-medium">Date<Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-2" /></label><Button onClick={search} className="mt-auto"><Search className="mr-2 size-4" /> Rechercher</Button></div><div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><SlidersHorizontal className="size-3.5" /> La recherche API est basée sur les critères réellement disponibles dans le contrat C#.</div></CardContent></Card>{loading && <div className="flex justify-center py-20"><Loader2 className="size-7 animate-spin text-primary" /></div>}{error && <Card className="mt-8 border-destructive/30 bg-destructive/5"><CardContent className="p-5 text-sm text-destructive">{error}</CardContent></Card>}{!loading && !error && searched && rides.length === 0 && <Card className="mt-8"><CardContent className="flex flex-col items-center p-12 text-center"><MapPin className="size-8 text-primary" /><h2 className="mt-4 text-xl font-semibold">Aucun trajet trouvé</h2><p className="mt-2 max-w-md text-sm text-muted-foreground">Aucun résultat réel n&apos;a été renvoyé par l&apos;API pour ces critères. Essayez une autre date ou publiez votre trajet.</p></CardContent></Card>}{!searched && <div className="mt-8 rounded-3xl border border-dashed p-12 text-center text-muted-foreground">Lancez une recherche pour consulter les trajets disponibles.</div>}{rides.length > 0 && <div className="mt-8 grid gap-4">{rides.map(ride => <Card key={ride.rideId}><CardContent className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-3 font-semibold"><span>{ride.startAddress}</span><span className="text-primary">→</span><span>{ride.endAddress}</span></div><p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" /> {formatDate(ride.departureTime)}</p><p className="mt-1 text-sm text-muted-foreground">Conducteur : {ride.driverName} · {ride.availableSeats} place(s)</p></div><div className="flex items-center gap-4"><span className="text-lg font-semibold">{ride.pricePerSeat.toFixed(2)} TND</span><Button asChild variant="outline"><Link href={`/covoiturage/${ride.rideId}`}>Voir le trajet</Link></Button></div></CardContent></Card>)}</div>}</main></div>
}
