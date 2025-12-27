import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const settings = JSON.parse(process.env.SECTIONS_CONFIG || "{}")
    return NextResponse.json({
      showFreeTools: settings.showFreeTools ?? true,
      showPremiumProducts: settings.showPremiumProducts ?? true,
    })
  } catch {
    return NextResponse.json({
      showFreeTools: true,
      showPremiumProducts: true,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const settings = {
      showFreeTools: body.showFreeTools,
      showPremiumProducts: body.showPremiumProducts,
    }
    // In production, save to database or persistent storage
    console.log("Sections settings updated:", settings)
    return NextResponse.json({ success: true, settings })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
