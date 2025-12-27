import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-primary/30 bg-background/50 backdrop-blur">
      <div className="absolute bottom-0 left-0 right-0 h-1 dutch-stripe" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-dutch-orange to-dutch-red flex items-center justify-center font-bold text-white text-sm">
                NL
              </div>
              <span className="font-bold">
                <span className="text-dutch-orange">From</span>
                <span className="text-dutch-blue">NL</span>
                <span className="text-muted-foreground">.pro</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium Dutch quality products. Direct from the Netherlands.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-dutch-orange transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-dutch-orange transition-colors">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-dutch-orange transition-colors">
                  Standard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-dutch-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-dutch-orange transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-dutch-orange transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Languages</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-muted-foreground hover:text-dutch-orange transition-colors">🇩🇪 Deutsch</button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-dutch-orange transition-colors">🇬🇧 English</button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-dutch-orange transition-colors">
                  🇳🇱 Nederlands
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FromNL.pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
