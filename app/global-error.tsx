// app/dashboard/error.tsx
'use client'  // Indique que le composant doit être exécuté côté client
import { Button } from "@/components/ui/button"

 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Il y a eu un probléme !</h2>
      <Button variant="outline" onClick={reset}>Retour</Button>
    </div>
  );
}
