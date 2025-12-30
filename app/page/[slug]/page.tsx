import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageData {
  id: number;
  slug: string;
  title: string;
  content: string;
  product_ids: number[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_free: boolean;
}

async function getPage(slug: string): Promise<PageData | null> {
  try {
    const result = await query('SELECT * FROM pages WHERE slug = $1', [slug]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (error) {
    return null;
  }
}

async function getProducts(productIds: number[]): Promise<Product[]> {
  if (!productIds || productIds.length === 0) return [];
  try {
    const result = await query(
      'SELECT * FROM products WHERE id = ANY($1::int[])',
      [productIds]
    );
    return result.rows;
  } catch (error) {
    return [];
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  
  if (!page) {
    notFound();
  }

  const products = await getProducts(page.product_ids || []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          {page.title}
        </h1>
        
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-muted-foreground whitespace-pre-wrap text-lg">
            {page.content}
          </div>
        </div>

        {products.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-secondary/50 rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all">
                  {product.image_url && (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {product.is_free ? 'FREE' : `$${product.price}`}
                      </span>
                      <Link href="/products" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
