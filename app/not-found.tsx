import { Button } from "@/components/ui/button"
import Link from 'next/link'

 
export default function NotFound() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Page introuvable
              </h1>
              <p className="mt-1 text-base">
                Veuillez vérifier l&apos;URL dans la barre d&apos;adresse et réessayer.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <Link href={"/"}>
                <Button variant="outline">Retour</Button>
            </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}