"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Banner from "@/components/banner"

interface NavLink {
  id: string
  title: string
  slug: string
  url: string | null
  is_external: boolean
  is_visible: boolean
  sort_order: number
  is_page?: boolean
  content?: string
}

export default function DynamicPage() {
  const params = useParams()
  const router = useRouter()
  const [page, setPage] = useState<NavLink | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPage = () => {
      console.log("[v0] Loading page with slug:", params.slug)
      const saved = localStorage.getItem("nav_links")
      if (saved) {
        const links: NavLink[] = JSON.parse(saved)
        const foundPage = links.find((l) => l.slug === params.slug && l.is_page)
        console.log("[v0] Found page:", foundPage)
        if (foundPage) {
          setPage(foundPage)
        } else {
          console.log("[v0] Page not found, redirecting to home")
          router.push("/")
        }
      } else {
        router.push("/")
      }
      setLoading(false)
    }

    loadPage()

    const handleStorageChange = () => {
      loadPage()
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [params.slug, router])

  if (loading) return <div className="container mx-auto py-20 text-center">Loading...</div>
  if (!page) return <div className="container mx-auto py-20 text-center">Page not found</div>

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-[0_0_20px_rgba(255,102,0,0.5)]">{page.title}</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{page.content}</p>
        </div>
      </div>
      <Banner />
    </main>
  )
}
