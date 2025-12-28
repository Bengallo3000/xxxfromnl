import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_ADMIN_CHAT_IDS = (process.env.TELEGRAM_ADMIN_CHAT_IDS || '').split(',').filter(Boolean)

async function isAdminChat(chatId: string | number): Promise<boolean> {
  const chatIdStr = String(chatId)
  if (TELEGRAM_ADMIN_CHAT_IDS.length > 0) {
    return TELEGRAM_ADMIN_CHAT_IDS.includes(chatIdStr)
  }
  try {
    const result = await query("SELECT value FROM site_settings WHERE key = 'telegram_admin_chat_ids'")
    if (result.rows.length > 0 && result.rows[0].value) {
      const adminIds = result.rows[0].value.split(',').map((id: string) => id.trim())
      return adminIds.includes(chatIdStr)
    }
  } catch (error) {
    console.error('Error checking admin chat:', error)
  }
  return false
}

async function sendTelegramMessage(chatId: string, text: string, replyMarkup?: any) {
  if (!TELEGRAM_BOT_TOKEN) return null
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        reply_markup: replyMarkup
      })
    })
    return response.json()
  } catch (error) {
    console.error('Telegram send error:', error)
    return null
  }
}

async function sendTelegramPhoto(chatId: string, photoUrl: string, caption: string) {
  if (!TELEGRAM_BOT_TOKEN) return null
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: photoUrl,
        caption,
        parse_mode: 'HTML'
      })
    })
    return response.json()
  } catch (error) {
    console.error('Telegram photo send error:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const orders = await query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 10')
    const products = await query('SELECT * FROM products ORDER BY created_at DESC LIMIT 10')
    
    return NextResponse.json({
      orders: orders.rows,
      products: products.rows
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (body.message) {
      const chatId = body.message.chat.id
      const text = body.message.text || ''
      const photo = body.message.photo
      
      if (text === '/start') {
        await sendTelegramMessage(chatId, `
<b>FromNL Shop Bot</b>

Willkommen! Verfügbare Befehle:

/orders - Alle Bestellungen anzeigen
/products - Alle Produkte anzeigen
/stats - Shop-Statistiken

<b>Bestellungen verwalten:</b>
/order_[ID] - Bestelldetails
/confirm_[ID] - Bestellung bestätigen
/ship_[ID] - Als versendet markieren

<b>Produkte verwalten:</b>
/product_[ID] - Produktdetails
/addproduct - Neues Produkt erstellen

Sende ein Foto mit Beschreibung um ein Produkt zu erstellen.
        `)
      }
      
      else if (text === '/orders') {
        const orders = await query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 10')
        if (orders.rows.length === 0) {
          await sendTelegramMessage(chatId, 'Keine Bestellungen vorhanden.')
        } else {
          let msg = '<b>Letzte 10 Bestellungen:</b>\n\n'
          for (const order of orders.rows) {
            msg += `<b>${order.order_number}</b>\n`
            msg += `Status: ${order.order_status} | Zahlung: ${order.payment_status}\n`
            msg += `Betrag: €${order.total_amount}\n`
            msg += `/order_${order.id} | /confirm_${order.id} | /ship_${order.id}\n\n`
          }
          await sendTelegramMessage(chatId, msg)
        }
      }
      
      else if (text === '/products') {
        const products = await query('SELECT * FROM products ORDER BY created_at DESC LIMIT 10')
        if (products.rows.length === 0) {
          await sendTelegramMessage(chatId, 'Keine Produkte vorhanden.')
        } else {
          let msg = '<b>Letzte 10 Produkte:</b>\n\n'
          for (const product of products.rows) {
            msg += `<b>${product.name}</b> - €${product.price}\n`
            msg += `Kategorie: ${product.category || 'Keine'}\n`
            msg += `/product_${product.id}\n\n`
          }
          await sendTelegramMessage(chatId, msg)
        }
      }
      
      else if (text === '/stats') {
        const ordersCount = await query('SELECT COUNT(*) as count FROM orders')
        const productsCount = await query('SELECT COUNT(*) as count FROM products')
        const revenue = await query("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE payment_status = 'paid'")
        const pendingOrders = await query("SELECT COUNT(*) as count FROM orders WHERE order_status = 'new'")
        
        await sendTelegramMessage(chatId, `
<b>Shop Statistiken</b>

Gesamte Bestellungen: ${ordersCount.rows[0].count}
Produkte: ${productsCount.rows[0].count}
Umsatz: €${revenue.rows[0].total}
Ausstehende Bestellungen: ${pendingOrders.rows[0].count}
        `)
      }
      
      else if (text.startsWith('/order_')) {
        const orderId = text.replace('/order_', '')
        const order = await query('SELECT * FROM orders WHERE id = $1', [orderId])
        if (order.rows.length > 0) {
          const o = order.rows[0]
          await sendTelegramMessage(chatId, `
<b>Bestellung ${o.order_number}</b>

Kunde: ${o.customer_name || 'N/A'}
Email: ${o.customer_email || 'N/A'}
Adresse: ${o.customer_address || 'N/A'}

Status: ${o.order_status}
Zahlung: ${o.payment_status}
Betrag: €${o.total_amount}
Zahlungsart: ${o.payment_method || 'N/A'}

Erstellt: ${new Date(o.created_at).toLocaleString('de-DE')}
          `)
        } else {
          await sendTelegramMessage(chatId, 'Bestellung nicht gefunden.')
        }
      }
      
      else if (text.startsWith('/confirm_')) {
        if (!await isAdminChat(chatId)) {
          await sendTelegramMessage(chatId, 'Keine Berechtigung. Kontaktiere den Administrator.')
          return NextResponse.json({ ok: true })
        }
        const orderId = text.replace('/confirm_', '')
        await query("UPDATE orders SET order_status = 'confirmed', updated_at = CURRENT_TIMESTAMP WHERE id = $1", [orderId])
        await sendTelegramMessage(chatId, `Bestellung #${orderId} wurde bestätigt.`)
      }
      
      else if (text.startsWith('/ship_')) {
        if (!await isAdminChat(chatId)) {
          await sendTelegramMessage(chatId, 'Keine Berechtigung. Kontaktiere den Administrator.')
          return NextResponse.json({ ok: true })
        }
        const orderId = text.replace('/ship_', '')
        await query("UPDATE orders SET order_status = 'shipped', updated_at = CURRENT_TIMESTAMP WHERE id = $1", [orderId])
        await sendTelegramMessage(chatId, `Bestellung #${orderId} wurde als versendet markiert.`)
      }
      
      else if (text.startsWith('/product_')) {
        const productId = text.replace('/product_', '')
        const product = await query('SELECT * FROM products WHERE id = $1', [productId])
        if (product.rows.length > 0) {
          const p = product.rows[0]
          if (p.image_url) {
            const baseUrl = process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : 'http://localhost:5000'
            await sendTelegramPhoto(chatId, `${baseUrl}${p.image_url}`, `
<b>${p.name}</b>

Preis: €${p.price}
Kategorie: ${p.category || 'Keine'}
Auf Lager: ${p.in_stock ? 'Ja' : 'Nein'}

${p.description || ''}
            `)
          } else {
            await sendTelegramMessage(chatId, `
<b>${p.name}</b>

Preis: €${p.price}
Kategorie: ${p.category || 'Keine'}
Auf Lager: ${p.in_stock ? 'Ja' : 'Nein'}

${p.description || ''}
            `)
          }
        } else {
          await sendTelegramMessage(chatId, 'Produkt nicht gefunden.')
        }
      }
      
      else if (photo && body.message.caption) {
        if (!await isAdminChat(chatId)) {
          await sendTelegramMessage(chatId, 'Keine Berechtigung für Produkterstellung. Kontaktiere den Administrator.')
          return NextResponse.json({ ok: true })
        }
        const caption = body.message.caption
        const lines = caption.split('\n')
        const name = lines[0] || 'Neues Produkt'
        const price = parseFloat(lines[1]) || 0
        const category = lines[2] || ''
        const description = lines.slice(3).join('\n')
        
        const fileId = photo[photo.length - 1].file_id
        const fileResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`)
        const fileData = await fileResponse.json()
        
        if (fileData.ok) {
          const filePath = fileData.result.file_path
          const imageUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`
          
          await query(
            'INSERT INTO products (name, description, price, image_url, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, imageUrl, category]
          )
          
          await sendTelegramMessage(chatId, `
Produkt erstellt!

<b>${name}</b>
Preis: €${price}
Kategorie: ${category || 'Keine'}
          `)
        }
      }
    }
    
    if (body.callback_query) {
      const callbackData = body.callback_query.data
      const chatId = body.callback_query.message.chat.id
      
      await sendTelegramMessage(chatId, `Aktion: ${callbackData}`)
    }
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
