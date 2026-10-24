import Link from "next/link"
import { ArrowLeft, ArrowRight, Bell, Check, Home, MapPin, Search, ShieldCheck, Users } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  { icon: Search, title: "Trouvez le bon quartier", text: "Explorez les opportunités de logement selon votre ville, votre budget et votre mode de vie." },
  { icon: Users, title: "Rencontrez les bonnes personnes", text: "Des profils pensés pour créer une colocation compatible, respectueuse et agréable." },
  { icon: ShieldCheck, title: "Avancez en confiance", text: "Un espace conçu autour d'échanges clairs et d'une communauté locale de confiance." },
]

const cities = ["Tunis", "Sousse", "Sfax", "Hammamet"]

export default function ColocationPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border/60 bg-[radial-gradient(circle_at_80%_18%,oklch(0.94_0.07_75),transparent_36%),linear-gradient(110deg,oklch(0.98_0.012_80),oklch(0.99_0_0))]">
          <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Retour à l&apos;accueil</Link>
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary"><Home className="size-3.5" /> Nouveau sur Ftareqi</span>
                <h1 className="mt-6 max-w-2xl text-balance font-heading text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">Votre prochaine maison commence ici.</h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Nous préparons une expérience simple pour trouver un logement, proposer une chambre et rencontrer des colocataires compatibles partout en Tunisie.</p>
                <div className="mt-8 flex flex-wrap gap-3"><Button asChild><Link href="/"><ArrowLeft className="mr-2 size-4" /> Explorer le covoiturage</Link></Button><Button asChild variant="outline"><a href="#fonctionnement">Voir le fonctionnement <ArrowRight className="ml-2 size-4" /></a></Button></div>
              </div>
              <Card className="border-border/70 bg-card/90 shadow-xl shadow-primary/5">
                <CardContent className="p-6 md:p-8">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Bell className="size-5" /></div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight">Préparez votre recherche</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">La colocation arrive bientôt. En attendant, choisissez les villes qui vous intéressent.</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">{cities.map((city) => <div key={city} className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-sm"><MapPin className="size-4 text-primary" />{city}</div>)}</div>
                  <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Check className="size-3.5 text-primary" /> Les premières annonces seront publiées progressivement.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="fonctionnement" className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-xl"><p className="text-sm font-semibold text-primary">Pensé pour votre quotidien</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Une colocation plus humaine</h2><p className="mt-4 leading-7 text-muted-foreground">Comme pour nos trajets, nous construisons une expérience locale, lisible et centrée sur la confiance.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">{benefits.map(({ icon: Icon, title, text }) => <Card key={title} className="border-border/70 shadow-none"><CardContent className="p-6"><div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Icon className="size-5" /></div><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></CardContent></Card>)}</div>
        </section>
      </main>
    </div>
  )
}
