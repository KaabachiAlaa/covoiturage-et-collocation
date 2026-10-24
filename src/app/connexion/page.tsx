"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Loader2, LockKeyhole, Phone } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authService } from "@/services/auth.service"
import { getErrorMessage } from "@/services/api-client"

export default function LoginPage() { const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); async function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); setError(""); const data = new FormData(e.currentTarget); try { await authService.login({ phoneNumber: String(data.get("phone")), password: String(data.get("password")) }); router.push("/covoiturage") } catch (err) { setError(getErrorMessage(err)) } finally { setBusy(false) } } return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-md px-5 py-16"><Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4" /> Accueil</Link><Card className="mt-8"><CardContent className="p-7"><div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><LockKeyhole /></div><h1 className="mt-5 text-3xl font-semibold">Connexion</h1><p className="mt-2 text-sm text-muted-foreground">Connectez-vous à votre compte Ftareqi.</p><form onSubmit={submit} className="mt-7 space-y-4"><label className="text-sm font-medium"><Phone className="mr-2 inline size-4" /> Téléphone<Input name="phone" required placeholder="+216 20 000 000" className="mt-2" /></label><label className="text-sm font-medium">Mot de passe<Input name="password" required type="password" className="mt-2" /></label>{error && <p className="text-sm text-destructive">{error}</p>}<Button className="w-full" disabled={busy}>{busy && <Loader2 className="mr-2 size-4 animate-spin" />} Se connecter</Button></form><p className="mt-6 text-center text-sm text-muted-foreground">Pas encore de compte ? <Link href="/inscription" className="font-semibold text-primary">Inscription</Link></p></CardContent></Card></main></div> }
