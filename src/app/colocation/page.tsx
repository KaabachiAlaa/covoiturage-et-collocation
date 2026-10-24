import Link from "next/link"
import { ArrowLeft, Home, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"

export default function ColocationPage() {
  return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-5xl px-5 py-16 lg:px-8"><Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Retour à l&apos;accueil</Link><div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-secondary/40 p-8 md:p-16"><Sparkles className="size-7 text-primary" /><h1 className="mt-6 text-4xl font-semibold tracking-tight">La colocation, bientôt sur Ftareqi.</h1><p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">Un espace de confiance pour trouver une chambre, proposer un logement et rencontrer les bons colocataires.</p><Button asChild className="mt-8"><Link href="/"><Home className="mr-2 size-4" /> Découvrir Ftareqi</Link></Button></div></main></div>
}
