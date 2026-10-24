"use client"

import Link from "next/link"
import { ArrowRight, CalendarDays, CarFront, Check, ChevronRight, MapPin, Search, ShieldCheck, Sparkles, Users, WalletCards } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TUNISIAN_CITIES } from "@/lib/cities"

const popular = [
  { from: "Tunis", to: "Sousse", price: "à partir de 18 TND", tone: "bg-emerald-50" },
  { from: "Tunis", to: "Hammamet", price: "à partir de 12 TND", tone: "bg-amber-50" },
  { from: "Sfax", to: "Djerba", price: "à partir de 22 TND", tone: "bg-teal-50" },
]

export default function HomePage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const router = useRouter()

  function searchRides(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams({ ...(from && { depart: from }), ...(to && { arrivee: to }), ...(date && { date }) })
    router.push(`/covoiturage?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_78%_25%,oklch(0.95_0.06_163),transparent_34%),linear-gradient(110deg,oklch(0.98_0.012_80),oklch(0.99_0_0))]">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary"><Sparkles className="size-3.5" /> La mobilité, autrement en Tunisie</div>
              <h1 className="text-balance font-heading text-5xl font-semibold leading-[1.06] tracking-tight text-foreground md:text-6xl">Voyagez ensemble,<br /><span className="text-primary">dépensez moins.</span></h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">Trouvez des trajets partout en Tunisie, partagez vos déplacements et voyagez plus simplement.</p>
              <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Conducteurs vérifiés</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Prix transparents</span></div>
            </div>

            <Card className="relative border-border/70 bg-card/95 shadow-xl shadow-primary/5 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Commencer un voyage</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Où allez-vous ?</h2></div>
                <form onSubmit={searchRides} className="space-y-4">
                  <label className="block text-sm font-medium">Départ<div className="relative mt-2"><MapPin className="absolute left-3 top-3 size-4 text-primary" /><Input required value={from} onChange={(e) => setFrom(e.target.value)} list="cities" placeholder="Ville de départ" className="h-11 pl-10" /></div></label>
                  <label className="block text-sm font-medium">Arrivée<div className="relative mt-2"><MapPin className="absolute left-3 top-3 size-4 text-primary" /><Input required value={to} onChange={(e) => setTo(e.target.value)} list="cities" placeholder="Ville d&apos;arrivée" className="h-11 pl-10" /></div></label>
                  <label className="block text-sm font-medium">Date du trajet<div className="relative mt-2"><CalendarDays className="absolute left-3 top-3 size-4 text-primary" /><Input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 pl-10" /></div></label>
                  <datalist id="cities">{TUNISIAN_CITIES.map((city) => <option key={city.slug} value={city.name} />)}</datalist>
                  <Button type="submit" className="h-12 w-full gap-2 text-base font-semibold"><Search className="size-4" /> Rechercher un trajet</Button>
                </form>
                <p className="mt-4 text-center text-xs text-muted-foreground">Les résultats sont fournis par l&apos;API du projet lorsqu&apos;elle est connectée.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-primary">Destinations populaires</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Les trajets du moment</h2></div><Link href="/covoiturage" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:flex">Voir tous les trajets <ArrowRight className="size-4" /></Link></div><div className="mt-8 grid gap-4 md:grid-cols-3">{popular.map((trip) => <Link href={`/covoiturage?depart=${trip.from}&arrivee=${trip.to}`} key={`${trip.from}-${trip.to}`}><Card className={`group border-0 ${trip.tone} shadow-none transition hover:-translate-y-1 hover:shadow-md`}><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="font-semibold">{trip.from} <span className="mx-1 text-primary">→</span> {trip.to}</p><p className="mt-2 text-sm text-muted-foreground">{trip.price}</p></div><ChevronRight className="size-5 text-primary transition group-hover:translate-x-1" /></div></CardContent></Card></Link>)}</div></section>

        <section className="border-y border-border/60 bg-muted/35"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="max-w-xl"><p className="text-sm font-semibold text-primary">Simple comme bonjour</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Votre trajet en trois étapes</h2></div><div className="mt-10 grid gap-8 md:grid-cols-3">{[[Search, "Recherchez", "Indiquez votre départ, votre destination et la date qui vous convient."], [Users, "Choisissez", "Comparez les trajets disponibles et choisissez celui qui vous ressemble."], [CarFront, "Voyagez", "Retrouvez votre conducteur et profitez du trajet en toute simplicité."]].map(([Icon, title, text], index) => { const IconComponent = Icon as typeof Search; return <div key={title as string} className="flex gap-4"><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><IconComponent className="size-5" /></div><div><div className="mb-1 text-xs font-semibold text-primary">0{index + 1}</div><h3 className="font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p></div></div> })}</div></div></section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2 lg:px-8"><div className="rounded-3xl bg-primary p-8 text-primary-foreground md:p-10"><WalletCards className="size-8 opacity-80" /><h2 className="mt-6 text-3xl font-semibold">Vous conduisez ?</h2><p className="mt-3 max-w-md leading-7 opacity-85">Partagez vos places libres, réduisez vos frais et rencontrez votre prochaine communauté de voyageurs.</p><Link href="/covoiturage/publier" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-white/90">Publier un trajet <ArrowRight className="size-4" /></Link></div><div className="rounded-3xl border border-border bg-secondary/45 p-8 md:p-10"><ShieldCheck className="size-8 text-primary" /><h2 className="mt-6 text-3xl font-semibold">La colocation arrive</h2><p className="mt-3 max-w-md leading-7 text-muted-foreground">Nous préparons un espace pour trouver votre future colocation et rencontrer vos prochains colocataires partout en Tunisie.</p><Link href="/colocation" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">En savoir plus <ArrowRight className="size-4" /></Link></div></section>
      </main>
      <footer className="border-t border-border/70"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 Covoiturage et Colocation</span><span>Une mobilité plus simple, partout en Tunisie.</span></div></footer>
    </div>
  )
}
