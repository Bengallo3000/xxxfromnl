"use client"
import { useState, useEffect } from "react"
import { Save, Trash2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface NavLink {
  id: string
  title: string
  slug: string
}

interface PopupContent {
  [slug: string]: {
    title: string
    content: string
  }
}

const NAV_LINKS_KEY = "nav_links"
const POPUP_CONTENTS_KEY = "nav_popup_contents"

const PopupContentsTab = () => {
  const [navLinks, setNavLinks] = useState<NavLink[]>([])
  const [popupContents, setPopupContents] = useState<PopupContent>({})
  const [selectedSlug, setSelectedSlug] = useState<string>("")
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadNavLinks()
    loadPopupContents()
  }, [])

  const loadNavLinks = () => {
    const saved = localStorage.getItem(NAV_LINKS_KEY)
    if (saved) {
      setNavLinks(JSON.parse(saved))
    }
  }

  const loadPopupContents = () => {
    const saved = localStorage.getItem(POPUP_CONTENTS_KEY)
    if (saved) {
      setPopupContents(JSON.parse(saved))
    }
  }

  const handleSelectLink = (slug: string) => {
    setSelectedSlug(slug)
    const existing = popupContents[slug]
    if (existing) {
      setEditTitle(existing.title)
      setEditContent(existing.content)
    } else {
      const navLink = navLinks.find((l) => l.slug === slug)
      setEditTitle(navLink?.title || "")
      setEditContent("")
    }
  }

  const handleSave = () => {
    if (!selectedSlug) return

    const updated = {
      ...popupContents,
      [selectedSlug]: {
        title: editTitle,
        content: editContent,
      },
    }

    setPopupContents(updated)
    localStorage.setItem(POPUP_CONTENTS_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event("storage"))

    toast({
      title: "Popup Saved",
      description: `Popup content for "${editTitle}" has been saved.`,
    })
  }

  const handleDelete = () => {
    if (!selectedSlug) return

    const updated = { ...popupContents }
    delete updated[selectedSlug]

    setPopupContents(updated)
    localStorage.setItem(POPUP_CONTENTS_KEY, JSON.stringify(updated))
    setEditTitle("")
    setEditContent("")
    window.dispatchEvent(new Event("storage"))

    toast({
      title: "Popup Deleted",
      description: "Popup content has been removed. The nav link will now navigate normally.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">Popup Contents</h2>
        <p className="text-sm text-muted-foreground">Add popup content to navigation links</p>
      </div>

      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Navigation Popup Editor
          </CardTitle>
          <CardDescription>
            Select a navigation link and add popup content. When content is added, clicking the nav link will show a
            popup instead of navigating.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Nav Link Selection */}
          <div className="space-y-2">
            <Label>Select Navigation Link</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  variant={selectedSlug === link.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelectLink(link.slug)}
                  className={`justify-start ${selectedSlug === link.slug ? "bg-primary text-primary-foreground" : "border-border"}`}
                >
                  {link.title}
                  {popupContents[link.slug]?.content && <span className="ml-2 w-2 h-2 rounded-full bg-accent" />}
                </Button>
              ))}
            </div>
          </div>

          {selectedSlug && (
            <>
              {/* Popup Title */}
              <div className="space-y-2">
                <Label htmlFor="popup-title">Popup Title</Label>
                <Input
                  id="popup-title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Popup title..."
                  className="bg-secondary/50 border-border"
                />
              </div>

              {/* Popup Content */}
              <div className="space-y-2">
                <Label htmlFor="popup-content">Popup Content</Label>
                <Textarea
                  id="popup-content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Enter popup content... (supports line breaks)"
                  className="bg-secondary/50 border-border min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Use line breaks for formatting. Leave empty to disable popup for this link.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Save Popup
                </Button>
                {popupContents[selectedSlug]?.content && (
                  <Button variant="destructive" onClick={handleDelete} className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                )}
              </div>
            </>
          )}

          {!selectedSlug && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a navigation link above to edit its popup content.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview of configured popups */}
      {Object.keys(popupContents).length > 0 && (
        <Card className="glass-card border-accent/20">
          <CardHeader>
            <CardTitle className="font-display text-lg">Configured Popups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(popupContents).map(
                ([slug, data]) =>
                  data.content && (
                    <div
                      key={slug}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <div>
                        <span className="font-medium text-foreground">{data.title}</span>
                        <span className="text-muted-foreground text-sm ml-2">({slug})</span>
                      </div>
                      <span className="text-xs text-accent">Active</span>
                    </div>
                  ),
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PopupContentsTab
