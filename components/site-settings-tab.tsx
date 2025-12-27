"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { Upload, Save, ImageIcon, X, Loader2, ToggleLeft as Toggle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const STORAGE_KEY = "site_settings"
const SECTIONS_KEY = "site_sections"

interface SiteSettings {
  site_name: string
  logo_url: string | null
  og_image_url: string | null
}

interface SectionSettings {
  showFreeTools: boolean
  showPremiumProducts: boolean
}

const getDefaultSettings = (): SiteSettings => ({
  site_name: "FROMNL.PRO",
  logo_url: null,
  og_image_url: null,
})

const getDefaultSections = (): SectionSettings => ({
  showFreeTools: true,
  showPremiumProducts: true,
})

const SiteSettingsTab = () => {
  const [settings, setSettings] = useState<SiteSettings>(getDefaultSettings())
  const [sections, setSections] = useState<SectionSettings>(getDefaultSections())
  const [uploading, setUploading] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const ogInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadSettings()
    loadSections()
  }, [])

  const loadSettings = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }

  const loadSections = () => {
    const saved = localStorage.getItem(SECTIONS_KEY)
    if (saved) {
      setSections(JSON.parse(saved))
    }
  }

  const saveSettings = (newSettings: SiteSettings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
    setSettings(newSettings)
    window.dispatchEvent(new Event("storage"))
  }

  const saveSections = (newSections: SectionSettings) => {
    localStorage.setItem(SECTIONS_KEY, JSON.stringify(newSections))
    setSections(newSections)
    window.dispatchEvent(new Event("sections-updated"))
  }

  const handleSaveSiteName = () => {
    saveSettings(settings)
    toast({ title: "Site Name gespeichert" })
  }

  const toggleSection = (section: keyof SectionSettings) => {
    const newSections = {
      ...sections,
      [section]: !sections[section],
    }
    saveSections(newSections)
    toast({
      title: `${section === "showFreeTools" ? "Free Tools" : "Premium Products"} ${newSections[section] ? "aktiviert" : "deaktiviert"}`,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "og") => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      const newSettings = {
        ...settings,
        [type === "logo" ? "logo_url" : "og_image_url"]: base64,
      }
      saveSettings(newSettings)
      toast({ title: `${type === "logo" ? "Logo" : "OG Image"} hochgeladen` })
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = (type: "logo" | "og") => {
    const newSettings = {
      ...settings,
      [type === "logo" ? "logo_url" : "og_image_url"]: null,
    }
    saveSettings(newSettings)
    toast({ title: `${type === "logo" ? "Logo" : "OG Image"} entfernt` })
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl text-foreground">Site Settings</h2>

      {/* Section Visibility Toggles */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="font-display text-lg">Sektionen anzeigen/verbergen</CardTitle>
          <CardDescription>Kontrolliere die Sichtbarkeit von Seiten-Sektionen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700">
              <div>
                <p className="font-medium text-white">Free Tools & Software</p>
                <p className="text-sm text-slate-400">Zeige/verberge die Free Tools Sektion</p>
              </div>
              <Button
                variant={sections.showFreeTools ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSection("showFreeTools")}
                className="gap-2"
              >
                <Toggle2 className="w-4 h-4" />
                {sections.showFreeTools ? "Aktiv" : "Inaktiv"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700">
              <div>
                <p className="font-medium text-white">Premium Products</p>
                <p className="text-sm text-slate-400">Zeige/verberge die Premium Products Sektion</p>
              </div>
              <Button
                variant={sections.showPremiumProducts ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSection("showPremiumProducts")}
                className="gap-2"
              >
                <Toggle2 className="w-4 h-4" />
                {sections.showPremiumProducts ? "Aktiv" : "Inaktiv"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Site Name */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="font-display text-lg">Site Name</CardTitle>
          <CardDescription>The name of your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="bg-input"
              placeholder="FROMNL.PRO"
            />
            <Button onClick={handleSaveSiteName} className="gap-2">
              <Save className="w-4 h-4" />
              Speichern
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logo Upload */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="font-display text-lg">Logo</CardTitle>
          <CardDescription>Logo für Header (empfohlen: PNG mit Transparenz)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "logo")}
          />

          {settings.logo_url ? (
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-16 bg-muted rounded flex items-center justify-center overflow-hidden">
                <img
                  src={settings.logo_url || "/placeholder.svg"}
                  alt="Logo"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => logoInputRef.current?.click()} disabled={uploading}>
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ändern"}
                </Button>
                <Button variant="destructive" size="icon" onClick={() => removeImage("logo")}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => logoInputRef.current?.click()}
              disabled={uploading}
              className="gap-2"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Logo hochladen
            </Button>
          )}
        </CardContent>
      </Card>

      {/* OG Image Upload */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="font-display text-lg">OG Image (Social Media)</CardTitle>
          <CardDescription>Vorschaubild für Social Media (1200x630px empfohlen)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={ogInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "og")}
          />

          {settings.og_image_url ? (
            <div className="space-y-4">
              <div className="relative w-full max-w-md aspect-[1200/630] bg-muted rounded overflow-hidden">
                <img
                  src={settings.og_image_url || "/placeholder.svg"}
                  alt="OG Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => ogInputRef.current?.click()} disabled={uploading}>
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ändern"}
                </Button>
                <Button variant="destructive" size="icon" onClick={() => removeImage("og")}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-full max-w-md aspect-[1200/630] bg-muted rounded flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">1200 x 630 px</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => ogInputRef.current?.click()}
                disabled={uploading}
                className="gap-2"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                OG Image hochladen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SiteSettingsTab
