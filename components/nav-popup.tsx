"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface NavPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

const NavPopup = ({ isOpen, onClose, title, content }: NavPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-primary">{title}</DialogTitle>
        </DialogHeader>
        <div
          className="prose prose-invert max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Button onClick={onClose} variant="outline" className="mt-4 bg-transparent">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default NavPopup
