"use client"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authService } from "@/services/auth.service"
import { getErrorMessage } from "@/services/api-client"

export default function VerificationPage() { const params = useSearchParams(); const router = useRouter(); const phone = params.get("phone") ?? ""; const [otp, setOtp] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false); async function verify(e: React.FormEvent) { e.preventDefault(); setBusy(true); setError(""); try { await authService.verifyPhone({ phoneNumber: phone, otp }); router.push("/covoiturage") } catch (err) { setError(getErrorMessage(err)) } finally { setBusy(false) } } return <div className="min-h-screen bg-background"><SiteHeader /><main className="mx-auto max-w-md px-5 py-16"><Link href="/inscription" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4" /> Modifier mes informations</Link><Card className="mt-8"><CardContent className="p-7"><h1 className="text-3xl font-semibold">Vérifiez votre téléphone</h1><p className="mt-2 text-sm text-muted-foreground">Saisissez le code reçu par SMS au {phone}.</p><form onSubmit={verify} className="mt-7 space-y-4"><label className="text-sm font-medium">Code de vérification<Input value={otp} onChange={e => setOtp(e.target.value)} required inputMode="numeric" maxLength={6} className="mt-2 text-center text-xl tracking-[0.35em]" /></label>{error && <p className="text-sm text-destructive">{error}</p>}<Button className="w-full" disabled={busy}>{busy && <Loader2 className="mr-2 size-4 animate-spin" />} Vérifier mon compte</Button></form><button className="mt-5 w-full text-sm font-medium text-primary" onClick={() => authService.resendVerificationOtp(phone)}>Renvoyer le code</button></CardContent></Card></main></div> }
