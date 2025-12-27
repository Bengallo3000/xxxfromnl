"use client"

import { useState, useEffect } from "react"
import { Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

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

const STORAGE_KEY = "nav_links"

const getDefaultNavLinks = (): NavLink[] => [
  {
    id: "1",
    title: "Home",
    slug: "home",
    url: "/",
    is_external: false,
    is_visible: true,
    sort_order: 0,
    is_page: false,
  },
  {
    id: "2",
    title: "Products",
    slug: "products",
    url: "#products",
    is_external: false,
    is_visible: true,
    sort_order: 1,
    is_page: false,
  },
  {
    id: "3",
    title: "Contact",
    slug: "contact",
    url: "#contact",
    is_external: false,
    is_visible: true,
    sort_order: 2,
    is_page: false,
  },
]

export default function NavigationTab() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([])
  const [editingLink, setEditingLink] = useState<NavLink | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadNavLinks()
  }, [])

  const loadNavLinks = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    console.log("[v0] Loaded nav links from localStorage:", saved)
    if (saved) {
      setNavLinks(JSON.parse(saved))
    } else {
      const defaults = getDefaultNavLinks()
      setNavLinks(defaults)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults))
    }
    setLoading(false)
  }

  const saveNavLinks = (links: NavLink[]) => {
    const sorted = [...links].sort((a, b) => a.sort_order - b.sort_order)
    console.log("[v0] Saving nav links to localStorage:", sorted)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted))
    setNavLinks(sorted)
    window.dispatchEvent(new Event("storage"))
  }

  const handleSaveLink = () => {
    if (!editingLink) return
    if (!editingLink.title.trim() || !editingLink.slug.trim()) {
      toast({ title: "Bitte Titel und Slug ausfüllen", variant: "destructive" })
      return
    }

    let updatedLinks: NavLink[]

    if (editingLink.id && navLinks.find((l) => l.id === editingLink.id)) {
      updatedLinks = navLinks.map((link) => (link.id === editingLink.id ? editingLink : link))
      toast({ title: "Link aktualisiert" })
    } else {
      const newLink = {
        ...editingLink,
        id: Date.now().toString(),
        sort_order: editingLink.sort_order || navLinks.length,
        slug: editingLink.slug.toLowerCase().replace(/\s+/g, "-"),
      }
      updatedLinks = [...navLinks, newLink]
      toast({ title: "Link hinzugefügt" })
    }

    saveNavLinks(updatedLinks)
    setEditingLink(null)
  }

  const handleDeleteLink = (id: string) => {
    const updatedLinks = navLinks.filter((link) => link.id !== id)
    saveNavLinks(updatedLinks)
    toast({ title: "Link gelöscht" })
  }

  const toggleVisibility = (link: NavLink) => {
    const updatedLinks = navLinks.map((l) => (l.id === link.id ? { ...l, is_visible: !l.is_visible } : l))
    saveNavLinks(updatedLinks)
  }

  if (loading) {
    return <div className="text-muted-foreground">Laden...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">Navigation & Seiten</h2>
        <Button
          onClick={() =>
            setEditingLink({
              id: "",
              title: "",
              slug: "",
              url: "",
              is_external: false,
              is_visible: true,
              sort_order: navLinks.length,
              is_page: false,
              content: "",
            })
          }
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Neuer Link / Seite
        </Button>
      </div>

      {editingLink && (
        <Card className="glass-card border-primary/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="font-display">{editingLink.id ? "Bearbeiten" : "Neu hinzufügen"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titel</Label>
                <Input
                  value={editingLink.title}
                  onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                  className="bg-input"
                  placeholder="z.B. Premium Courses"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug / URL-Name</Label>
                <Input
                  value={editingLink.slug}
                  onChange={(e) =>
                    setEditingLink({ ...editingLink, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                  }
                  className="bg-input"
                  placeholder="z.B. premium-courses"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingLink.is_page || false}
                  onCheckedChange={(checked) =>
                    setEditingLink({
                      ...editingLink,
                      is_page: checked,
                      url: checked ? null : editingLink.url,
                    })
                  }
                />
                <Label>Als Seite (mit Inhalt)</Label>
              </div>
            </div>

            {!editingLink.is_page ? (
              <div className="space-y-2">
                <Label>URL / Anker</Label>
                <Input
                  value={editingLink.url || ""}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  className="bg-input"
                  placeholder="z.B. /about oder #section oder https://..."
                />
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingLink.is_external}
                    onCheckedChange={(checked) => setEditingLink({ ...editingLink, is_external: checked })}
                  />
                  <Label>Externer Link</Label>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Seiteninhalt</Label>
                <textarea
                  value={editingLink.content || ""}
                  onChange={(e) => setEditingLink({ ...editingLink, content: e.target.value })}
                  className="w-full h-32 bg-input rounded border p-3 text-sm resize-none"
                  placeholder="Geben Sie den Inhalt der Seite ein..."
                />
              </div>
            )}

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingLink.is_visible}
                  onCheckedChange={(checked) => setEditingLink({ ...editingLink, is_visible: checked })}
                />
                <Label>Im Header sichtbar</Label>
              </div>
              <div className="flex items-center gap-2">
                <Label>Reihenfolge</Label>
                <Input
                  type="number"
                  value={editingLink.sort_order}
                  onChange={(e) => setEditingLink({ ...editingLink, sort_order: Number.parseInt(e.target.value) || 0 })}
                  className="bg-input w-20"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveLink} className="gap-2">
                <Save className="w-4 h-4" />
                Speichern
              </Button>
              <Button variant="outline" onClick={() => setEditingLink(null)}>
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {navLinks.map((link) => (
          <Card key={link.id} className="glass-card border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-display text-sm text-foreground">{link.title}</h4>
                <p className="text-xs text-muted-foreground">{link.is_page ? "Seite" : link.url || `/${link.slug}`}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => toggleVisibility(link)} className="text-xs">
                  {link.is_visible ? "Sichtbar" : "Verborgen"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setEditingLink(link)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteLink(link.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
