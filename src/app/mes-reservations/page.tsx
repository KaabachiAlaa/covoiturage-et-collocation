import Link from "next/link"
import { ArrowLeft, LockKeyhole } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ReservationsPage() { return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-4xl px-5 py-12 lg:px-8"><Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4" /> Accueil</Link><div className="mt-8"><p className="text-sm font-semibold text-primary">Espace personnel</p><h1 className="mt-2 text-4xl font-semibold">Mes réservations</h1><p className="mt-3 text-muted-foreground">Consultez vos trajets réservés depuis votre espace connecté.</p></div><Card className="mt-8"><CardContent className="flex flex-col items-center p-12 text-center"><LockKeyhole className="size-8 text-primary" /><h2 className="mt-4 text-xl font-semibold">Connexion requise</h2><p className="mt-2 max-w-md text-sm text-muted-foreground">Le backend Ftareqi ne fournit pas encore d&apos;endpoint de réservation voyageur. Cette page est prête à accueillir les statuts lorsque l&apos;API les exposera.</p><Button asChild className="mt-6"><Link href="/connexion">Se connecter</Link></Button></CardContent></Card></main></div> }
