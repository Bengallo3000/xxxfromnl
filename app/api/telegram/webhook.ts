import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const update = await req.json()
    const message = update.message
    const chatId = message?.chat?.id
    const text = message?.text

    if (!text) return NextResponse.json({ ok: true })

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramAPI = `https://api.telegram.org/bot${botToken}`

    // Command handling
    if (text === "/start") {
      await fetch(`${telegramAPI}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "FromNL Bot - Produktverwaltung\n\n/products - Alle Produkte\n/add - Neues Produkt hinzufügen\n/orders - Bestellungen anzeigen",
          reply_markup: {
            keyboard: [[{ text: "/products" }, { text: "/orders" }], [{ text: "/add" }]],
            resize_keyboard: true,
          },
        }),
      })
    } else if (text === "/products") {
      // List products
      await fetch(`${telegramAPI}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Aktuelle Produkte:\n\n1. Premium Product - €199.99\n2. Standard Product - €99.99",
        }),
      })
    } else if (text === "/add") {
      await fetch(`${telegramAPI}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Bitte sende Produktdetails im Format:\n\nName\nPreis\nBeschreibung\nKategorie",
        }),
      })
    } else if (text === "/orders") {
      await fetch(`${telegramAPI}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Letzte Bestellungen:\n\nOrder #1 - €199.99 - Ausstehend\nOrder #2 - €99.99 - Versendet",
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Telegram webhook error:", error)
    return NextResponse.json({ ok: false })
  }
}
