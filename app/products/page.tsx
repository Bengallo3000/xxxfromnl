import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Utrecht Premium Selection",
    price: "€149.99",
    image: "/premium-product-package.jpg",
    category: "Premium",
    description: "Best quality Dutch production from Utrecht to the world",
  },
  {
    id: 2,
    name: "Dutch Artisan Collection",
    price: "€179.99",
    image: "/luxury-product-box.jpg",
    category: "Premium",
    description: "Handcrafted excellence from the heart of the Netherlands",
  },
  {
    id: 3,
    name: "Heritage Quality Pack",
    price: "€199.99",
    image: "/premium-product-packaging.png",
    category: "Premium",
    description: "Traditional Dutch craftsmanship meets modern standards",
  },
  {
    id: 4,
    name: "Utrecht Signature Series",
    price: "€159.99",
    image: "/premium-quality-product.jpg",
    category: "Premium",
    description: "Finest selection sourced directly from Utrecht producers",
  },
  {
    id: 5,
    name: "Dutch Master Quality",
    price: "€189.99",
    image: "/high-quality-product.jpg",
    category: "Premium",
    description: "Superior Dutch production quality recognized worldwide",
  },
  {
    id: 6,
    name: "Netherlands Elite Range",
    price: "€169.99",
    image: "/premium-item-box.jpg",
    category: "Premium",
    description: "Premium Dutch goods exported from Utrecht to every corner of the globe",
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Premium Products</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Best quality Dutch production from Utrecht to the world. Each product represents the finest craftsmanship
            and excellence the Netherlands has to offer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden border-primary/20 bg-card/50 backdrop-blur group hover:border-dutch-orange/50 transition-all"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-dutch-orange/10 text-dutch-orange">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-dutch-orange">{product.price}</span>
                  <Button size="sm" className="bg-dutch-orange hover:bg-dutch-orange/90 text-white">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
