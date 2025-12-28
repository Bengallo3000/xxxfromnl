import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS navigation (
        id SERIAL PRIMARY KEY,
        label VARCHAR(255) NOT NULL,
        href VARCHAR(255) NOT NULL,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        alt_text VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT,
        category VARCHAR(255),
        in_stock BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        image_url TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS banners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        link_url TEXT,
        position VARCHAR(50) DEFAULT 'header',
        size VARCHAR(50) DEFAULT 'medium',
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS crypto_wallets (
        id SERIAL PRIMARY KEY,
        currency VARCHAR(50) NOT NULL,
        wallet_address TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_email VARCHAR(255),
        customer_name VARCHAR(255),
        customer_address TEXT,
        items JSONB NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50),
        payment_status VARCHAR(50) DEFAULT 'pending',
        order_status VARCHAR(50) DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        payment_method VARCHAR(50) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'EUR',
        transaction_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        crypto_address TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS shop_themes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT false,
        primary_color VARCHAR(20),
        secondary_color VARCHAR(20),
        accent_color VARCHAR(20),
        background_color VARCHAR(20),
        text_color VARCHAR(20),
        header_style VARCHAR(50),
        font_family VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO shop_themes (name, is_active, primary_color, secondary_color, accent_color, background_color, text_color, header_style, font_family)
      SELECT 'Dark Red', true, '#D64545', '#1a1a1a', '#FF4444', '#0a0a0a', '#ffffff', 'minimal', 'Inter'
      WHERE NOT EXISTS (SELECT 1 FROM shop_themes WHERE name = 'Dark Red');

      INSERT INTO shop_themes (name, is_active, primary_color, secondary_color, accent_color, background_color, text_color, header_style, font_family)
      SELECT 'Ocean Blue', false, '#2196F3', '#1565C0', '#64B5F6', '#0D1B2A', '#E0E1DD', 'classic', 'Roboto'
      WHERE NOT EXISTS (SELECT 1 FROM shop_themes WHERE name = 'Ocean Blue');

      INSERT INTO shop_themes (name, is_active, primary_color, secondary_color, accent_color, background_color, text_color, header_style, font_family)
      SELECT 'Forest Green', false, '#4CAF50', '#2E7D32', '#81C784', '#1B2D1B', '#E8F5E9', 'modern', 'Poppins'
      WHERE NOT EXISTS (SELECT 1 FROM shop_themes WHERE name = 'Forest Green');

      INSERT INTO shop_themes (name, is_active, primary_color, secondary_color, accent_color, background_color, text_color, header_style, font_family)
      SELECT 'Royal Purple', false, '#9C27B0', '#6A1B9A', '#CE93D8', '#1A0A1F', '#F3E5F5', 'elegant', 'Playfair Display'
      WHERE NOT EXISTS (SELECT 1 FROM shop_themes WHERE name = 'Royal Purple');

      INSERT INTO shop_themes (name, is_active, primary_color, secondary_color, accent_color, background_color, text_color, header_style, font_family)
      SELECT 'Sunset Orange', false, '#FF5722', '#E64A19', '#FFAB91', '#1F1410', '#FBE9E7', 'bold', 'Montserrat'
      WHERE NOT EXISTS (SELECT 1 FROM shop_themes WHERE name = 'Sunset Orange');

      CREATE TABLE IF NOT EXISTS popups (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        image_url TEXT,
        button_text VARCHAR(100),
        button_url TEXT,
        popup_type VARCHAR(50) DEFAULT 'banner',
        position VARCHAR(50) DEFAULT 'top',
        bg_color VARCHAR(20) DEFAULT '#D64545',
        text_color VARCHAR(20) DEFAULT '#ffffff',
        is_active BOOLEAN DEFAULT true,
        show_on_pages VARCHAR(255) DEFAULT 'all',
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } finally {
    client.release();
  }
}

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export default pool;
