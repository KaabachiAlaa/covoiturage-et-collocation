import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"

export default function RidesPage() {
  return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-5xl px-5 py-16 lg:px-8"><Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Retour à l&apos;accueil</Link><div className="mt-10 rounded-3xl border border-border bg-muted/30 p-8 text-center md:p-16"><div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Search className="size-6" /></div><h1 className="mt-6 text-3xl font-semibold tracking-tight">Trouvez votre prochain trajet</h1><p className="mx-auto mt-3 max-w-lg text-muted-foreground">La recherche de trajets est prête à être connectée au service rides de l&apos;API Ftareqi.</p><Button asChild className="mt-7"><Link href="/">Rechercher depuis l&apos;accueil</Link></Button></div></main></div>
}
