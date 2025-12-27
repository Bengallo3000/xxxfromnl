"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, Save, GripVertical, ExternalLink, Eye, EyeOff } from "lucide-react"
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
}

interface CustomPage {
  id: string
  title: string
  slug: string
  content: string
  is_visible: boolean
  sort_order: number
}

const STORAGE_KEY = "nav_links"
const PAGES_STORAGE_KEY = "custom_pages"

const getDefaultNavLinks = (): NavLink[] => [
  { id: "1", title: "Home", slug: "home", url: "/", is_external: false, is_visible: true, sort_order: 0 },
  {
    id: "2",
    title: "Products",
    slug: "products",
    url: "#products",
    is_external: false,
    is_visible: true,
    sort_order: 1,
  },
  { id: "3", title: "Contact", slug: "contact", url: "#contact", is_external: false, is_visible: true, sort_order: 2 },
]

const getDefaultPages = (): CustomPage[] => []

export default function NavigationTab() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([])
  const [customPages, setCustomPages] = useState<CustomPage[]>([])
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null)
  const [activeTab, setActiveTab] = useState<"nav" | "pages">("nav")
  const [editingLink, setEditingLink] = useState<NavLink | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadNavLinks()
    loadCustomPages()
  }, [])

  const loadCustomPages = () => {
    const saved = localStorage.getItem(PAGES_STORAGE_KEY)
    if (saved) {
      setCustomPages(JSON.parse(saved))
    }
  }

  const loadNavLinks = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted))
    setNavLinks(sorted)
    window.dispatchEvent(new Event("storage"))
  }

  const saveCustomPages = (pages: CustomPage[]) => {
    const sorted = [...pages].sort((a, b) => a.sort_order - b.sort_order)
    localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(sorted))
    setCustomPages(sorted)
    window.dispatchEvent(new Event("storage"))
  }

  const handleSaveLink = () => {
    if (!editingLink) return

    let updatedLinks: NavLink[]

    if (editingLink.id && navLinks.find((l) => l.id === editingLink.id)) {
      updatedLinks = navLinks.map((link) => (link.id === editingLink.id ? editingLink : link))
      toast({ title: "Link aktualisiert" })
    } else {
      const newLink = {
        ...editingLink,
        id: Date.now().toString(),
        sort_order: editingLink.sort_order || navLinks.length,
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

  const handleSavePage = () => {
    if (!editingPage || !editingPage.title.trim() || !editingPage.slug.trim()) {
      toast({ title: "Bitte Titel und Slug ausfüllen", variant: "destructive" })
      return
    }

    let updatedPages: CustomPage[]

    if (editingPage.id && customPages.find((p) => p.id === editingPage.id)) {
      updatedPages = customPages.map((page) => (page.id === editingPage.id ? editingPage : page))
      toast({ title: "Seite aktualisiert" })
    } else {
      const newPage = {
        ...editingPage,
        id: Date.now().toString(),
        slug: editingPage.slug.toLowerCase().replace(/\s+/g, "-"),
        sort_order: editingPage.sort_order || customPages.length,
      }
      updatedPages = [...customPages, newPage]
      toast({ title: "Seite hinzugefügt" })
    }

    saveCustomPages(updatedPages)
    setEditingPage(null)
  }

  const handleDeletePage = (id: string) => {
    const updatedPages = customPages.filter((page) => page.id !== id)
    saveCustomPages(updatedPages)
    toast({ title: "Seite gelöscht" })
  }

  const togglePageVisibility = (page: CustomPage) => {
    const updatedPages = customPages.map((p) => (p.id === page.id ? { ...p, is_visible: !p.is_visible } : p))
    saveCustomPages(updatedPages)
  }

  if (loading) {
    return <div className="text-muted-foreground">Laden...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("nav")}
          className={`px-4 py-2 font-medium ${activeTab === "nav" ? "border-b-2 border-dutch-orange text-dutch-orange" : "text-muted-foreground"}`}
        >
          Navigation Links
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`px-4 py-2 font-medium ${activeTab === "pages" ? "border-b-2 border-dutch-orange text-dutch-orange" : "text-muted-foreground"}`}
        >
          Custom Pages
        </button>
      </div>

      {activeTab === "nav" && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-foreground">Header Navigation</h2>
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
                })
              }
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Neuer Link
            </Button>
          </div>

          {editingLink && (
            <Card className="glass-card border-primary/30 animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display">{editingLink.id ? "Link bearbeiten" : "Neuer Link"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titel</Label>
                    <Input
                      value={editingLink.title}
                      onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                      className="bg-input"
                      placeholder="z.B. About"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={editingLink.slug}
                      onChange={(e) =>
                        setEditingLink({ ...editingLink, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                      }
                      className="bg-input"
                      placeholder="z.B. about"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>URL / Anker</Label>
                  <Input
                    value={editingLink.url || ""}
                    onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                    className="bg-input"
                    placeholder="z.B. /about oder #section oder https://..."
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingLink.is_external}
                      onCheckedChange={(checked) => setEditingLink({ ...editingLink, is_external: checked })}
                    />
                    <Label>Externer Link</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingLink.is_visible}
                      onCheckedChange={(checked) => setEditingLink({ ...editingLink, is_visible: checked })}
                    />
                    <Label>Sichtbar</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Reihenfolge</Label>
                    <Input
                      type="number"
                      value={editingLink.sort_order}
                      onChange={(e) =>
                        setEditingLink({ ...editingLink, sort_order: Number.parseInt(e.target.value) || 0 })
                      }
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
                <CardContent className="p-4 flex items-center gap-4">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-sm text-foreground">{link.title}</h4>
                      {link.is_external && <ExternalLink className="w-3 h-3 text-muted-foreground" />}
                      {!link.is_visible && <EyeOff className="w-3 h-3 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{link.url || `/${link.slug}`}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">#{link.sort_order}</span>
                  <Button variant="ghost" size="sm" onClick={() => toggleVisibility(link)} className="h-8 w-8 p-0">
                    {link.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingLink(link)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteLink(link.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            {navLinks.length === 0 && (
              <Card className="glass-card border-border/50">
                <CardContent className="p-8 text-center text-muted-foreground">
                  Keine Navigationslinks vorhanden.
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}

      {activeTab === "pages" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-foreground">Custom Pages</h2>
            <Button
              onClick={() =>
                setEditingPage({
                  id: "",
                  title: "",
                  slug: "",
                  content: "",
                  is_visible: true,
                  sort_order: customPages.length,
                })
              }
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Neue Seite
            </Button>
          </div>

          {editingPage && (
            <Card className="glass-card border-primary/30 animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display">{editingPage.id ? "Seite bearbeiten" : "Neue Seite"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Seitentitel</Label>
                    <Input
                      value={editingPage.title}
                      onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                      className="bg-input"
                      placeholder="z.B. About Us"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL Slug</Label>
                    <Input
                      value={editingPage.slug}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                      }
                      className="bg-input"
                      placeholder="z.B. about-us"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Seiteninhalt</Label>
                  <textarea
                    value={editingPage.content}
                    onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                    className="w-full h-32 bg-input rounded border p-3 text-sm resize-none"
                    placeholder="Geben Sie den Inhalt der Seite ein..."
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingPage.is_visible}
                      onCheckedChange={(checked) => setEditingPage({ ...editingPage, is_visible: checked })}
                    />
                    <Label>Sichtbar im Header</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Reihenfolge</Label>
                    <Input
                      type="number"
                      value={editingPage.sort_order}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, sort_order: Number.parseInt(e.target.value) || 0 })
                      }
                      className="bg-input w-20"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSavePage} className="gap-2">
                    <Save className="w-4 h-4" />
                    Speichern
                  </Button>
                  <Button variant="outline" onClick={() => setEditingPage(null)}>
                    Abbrechen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {customPages.map((page) => (
              <Card key={page.id} className="glass-card border-border/50">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-sm text-foreground">{page.title}</h4>
                      {!page.is_visible && <EyeOff className="w-3 h-3 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground">/{page.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePageVisibility(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingPage(page)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeletePage(page.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {customPages.length === 0 && (
              <Card className="glass-card border-border/50">
                <CardContent className="p-8 text-center text-muted-foreground">
                  Keine Custom Pages vorhanden.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
