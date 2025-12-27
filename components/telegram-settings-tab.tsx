"use client"
import { useState, useEffect } from "react"
import { Bot, Key, Save, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface TelegramSettings {
  botToken: string
  adminChatId: string
}

const TelegramSettingsTab = () => {
  const [settings, setSettings] = useState<TelegramSettings>({
    botToken: "",
    adminChatId: "",
  })
  const [showToken, setShowToken] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem("telegram_bot_settings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse telegram settings")
      }
    }
  }, [])

  const handleSave = () => {
    setIsSaving(true)

    // Save to localStorage
    localStorage.setItem("telegram_bot_settings", JSON.stringify(settings))

    setTimeout(() => {
      setIsSaving(false)
      toast({ title: "Telegram settings saved" })
    }, 500)
  }

  const handleTestConnection = async () => {
    if (!settings.botToken) {
      toast({ title: "Bot token required", variant: "destructive" })
      return
    }

    setIsTesting(true)
    setTestResult(null)

    try {
      // Test the bot token by calling getMe
      const response = await fetch(`https://api.telegram.org/bot${settings.botToken}/getMe`)
      const data = await response.json()

      if (data.ok) {
        setTestResult({
          success: true,
          message: `Bot connected: @${data.result.username}`,
        })
        toast({ title: "Connection successful!", description: `Bot: @${data.result.username}` })
      } else {
        setTestResult({
          success: false,
          message: data.description || "Connection failed",
        })
        toast({ title: "Connection failed", description: data.description, variant: "destructive" })
      }
    } catch (error: any) {
      setTestResult({
        success: false,
        message: error.message || "Network error",
      })
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }

    setIsTesting(false)
  }

  const handleSendTestMessage = async () => {
    if (!settings.botToken || !settings.adminChatId) {
      toast({ title: "Bot token and chat ID required", variant: "destructive" })
      return
    }

    setIsTesting(true)

    try {
      const response = await fetch(`https://api.telegram.org/bot${settings.botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: settings.adminChatId,
          text: "🤖 *Test Message*\n\nTelegram bot connection is working!",
          parse_mode: "Markdown",
        }),
      })

      const data = await response.json()

      if (data.ok) {
        toast({ title: "Test message sent!" })
      } else {
        toast({ title: "Send failed", description: data.description, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }

    setIsTesting(false)
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Telegram Bot Configuration
          </CardTitle>
          <CardDescription>Configure your Telegram bot for spam functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bot Token */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Bot Token
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showToken ? "text" : "password"}
                  value={settings.botToken}
                  onChange={(e) => setSettings((prev) => ({ ...prev, botToken: e.target.value }))}
                  placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz..."
                  className="bg-input pr-10 font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Create a bot with @BotFather on Telegram and paste the token here.
            </p>
          </div>

          {/* Admin Chat ID */}
          <div className="space-y-2">
            <Label>Admin Chat ID</Label>
            <Input
              value={settings.adminChatId}
              onChange={(e) => setSettings((prev) => ({ ...prev, adminChatId: e.target.value }))}
              placeholder="-1001234567890 or 123456789"
              className="bg-input font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Chat ID for admin notifications. Use @userinfobot to find your chat ID.
            </p>
          </div>

          {/* Test Result */}
          {testResult && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                testResult.success
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-destructive/10 border border-destructive/30"
              }`}
            >
              {testResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive" />
              )}
              <span className={testResult.success ? "text-green-400" : "text-destructive"}>{testResult.message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={isTesting || !settings.botToken}
              className="gap-2 bg-transparent"
            >
              <Bot className="w-4 h-4" />
              {isTesting ? "Testing..." : "Test Connection"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSendTestMessage}
              disabled={isTesting || !settings.botToken || !settings.adminChatId}
              className="gap-2 bg-transparent"
            >
              Send Test Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="font-display text-lg">Setup Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">1. Create Bot</h4>
            <p>Open Telegram and search for @BotFather. Send /newbot and follow the instructions.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">2. Copy Token</h4>
            <p>After creation, you'll receive a token like: 123456789:ABCdefGHI...</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">3. Find Chat ID</h4>
            <p>For groups: Add @userinfobot to the group.</p>
            <p>For private: Send /start to @userinfobot.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">4. Add Bot to Groups</h4>
            <p>Add your bot as an admin to the groups where you want to spam.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TelegramSettingsTab
