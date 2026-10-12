
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Blocks, Brain, Check, Monitor } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Praktikality</Link>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="flex-1 flex flex-col gap-6">
            <h1 className="text-5xl font-bold text-center">Där ambition möter möjlighet: AI-drivna projektidéer och smidiga projekt idéer för CodeX-deltagare.</h1>
            <h3 className="text-3xl text-center">Så fungerar Praktikality – från första idé till verklig praktikplats</h3>
            <section className="grid grid-cols-2 grid-rows-4 gap-10">
              <article className="col-span-1">
                <p className="font-semibold">Praktikality är en intern plattform utvecklad för CodeX som hjälper unga programmerare att upptäcka relevanta partnerföretag och utforska konkreta möjligheter till praktik och arbetslivserfarenhet. Genom att samla företagsprofiler, teknikstackar och direkta kontaktvägar på ett och samma ställe blir steget ut i techbranschen betydligt enklare och mer tillgängligt för alla deltagare.</p>
              </article>
              <article className="col-span-1 flex justify-center">
                <Monitor className="w-28 h-auto" />
              </article>
              <article className="col-span-1 flex justify-center">
                <Brain className="w-28 h-auto" />
              </article>
              <article className="col-span-1">
                <p className="font-semibold">En av plattformens mest innovativa funktioner är den AI-drivna idégenereringen, som analyserar ett företags teknikstack för att ta fram skräddarsydda och värdefulla projektförslag. Detta hjälper deltagarna att övervinna tröskeln kring vad de faktiskt kan bygga eller bidra med, vilket gör dem till betydligt starkare och mer förberedda kandidater när de söker sig till arbetslivet.</p>
              </article>
              <article className="col-span-1">
                <p className="font-semibold">När en deltagare hittar ett företag som väcker intresse kan de enkelt markera sitt engagemang med ett klick på ”Ja, Gärna”. Systemet skickar då en automatisk e-postnotis till CodeX personal, som smidigt kan ta vid och koordinera den mänskliga matchningsprocessen mellan deltagaren och företaget.</p>
              </article>
              <article className="col-span-1 flex justify-center">
                <Check className="w-28 h-auto" />
              </article>
              <article className="col-span-1 flex justify-center">
                <Blocks className="w-28 h-auto" />
              </article>
              <article className="col-span-1">
                <p className="font-semibold">Plattformen bygger på moderna teknologier som Next.js, TypeScript och Supabase, och är för närvarande under aktiv utveckling med ett starkt fokus på säkerhet och användarvänlighet. Det yttersta målet är att korta avståndet mellan en dröm om en arbetsplats och en konkret, meningsfull konversation om framtida uppdrag.</p>
              </article>
            </section>
          </main>
        </div>

        <Footer />
      </div>
    </main>
  );
}
