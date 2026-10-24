"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Route, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { APP_NAME } from "@/lib/config"

const links = [
  { href: "/", label: "Accueil" },
  { href: "/covoiturage", label: "Covoiturage" },
  { href: "/colocation", label: "Colocation" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${APP_NAME}, accueil`}>
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Route className="size-5" strokeWidth={2.5} />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:block">
            Covoiturage <span className="text-primary">et</span> Colocation
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                {link.label}
              </Link>
            )
          })}
          <Link href="/covoiturage/publier" className="ml-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
            Publier un trajet
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/connexion" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Connexion</Link>
          <Link href="/inscription" className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">Inscription</Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Ouvrir le menu"><Menu /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-semibold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Fermer le menu"><X /></Button>
            </div>
            <nav className="flex flex-col gap-2" aria-label="Navigation mobile">
              {links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">{link.label}</Link>)}
              <Link onClick={() => setOpen(false)} href="/covoiturage/publier" className="mt-2 rounded-lg bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground">Publier un trajet</Link>
              <Link onClick={() => setOpen(false)} href="/connexion" className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">Connexion</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
