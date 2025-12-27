"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminCaptcha from "./AdminCaptcha"

interface HiddenAdminButtonProps {
  isVisible: boolean
  onHide: () => void
}

const HiddenAdminButton = ({ isVisible, onHide }: HiddenAdminButtonProps) => {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const navigate = useNavigate()

  if (!isVisible) return null

  const handleAdminClick = () => {
    setShowCaptcha(true)
  }

  const handleCaptchaVerified = () => {
    setShowCaptcha(false)
    navigate("/admin")
  }

  const handleCaptchaCancel = () => {
    setShowCaptcha(false)
    onHide()
  }

  return (
    <>
      {/* Hidden Admin Button - appears fixed in bottom right */}
      <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
        <Button
          onClick={handleAdminClick}
          variant="outline"
          size="sm"
          className="gap-2 bg-background/80 backdrop-blur-sm border-accent/30 text-accent hover:bg-accent/10 hover:border-accent shadow-lg"
        >
          <Settings className="w-4 h-4" />
          Admin
        </Button>
      </div>

      {/* Captcha Modal */}
      {showCaptcha && <AdminCaptcha onVerified={handleCaptchaVerified} onCancel={handleCaptchaCancel} />}
    </>
  )
}

export default HiddenAdminButton
