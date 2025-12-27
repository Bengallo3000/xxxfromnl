# FromNL Shop - cPanel Deployment Guide

## ⚠️ KRITISCH: Schritt 0 - Node.js Version prüfen

### 0.1 Node.js Version checken
```bash
node --version
```

**Notwendig: Node.js 18.17.0 oder höher (am besten 20.x LTS)**

### 0.2 Wenn Node.js zu alt ist:
1. cPanel → "Node.js Manager"
2. Upgrade auf **20.x LTS** (oder mindestens 18.17.0)
3. Nach Update: Terminal neustarten

### 0.3 Wenn Node.js nicht installiert:
1. cPanel → "Node.js Manager" 
2. Installiere **20.x LTS**
3. Warte auf Installation (~2 Minuten)

---

## ✅ Schritt 1: Vorbereitung auf cPanel

### 1.1 SSH/cPanel Zugang holen
- Melde dich im cPanel an
- Gehe zu "Terminal" oder verbinde dich über SSH
- Navigiere zu deinem Public HTML Ordner: `cd public_html`

### 1.2 Alle Dateien hochladen
1. Lade ALLE Dateien aus diesem v0 Projekt herunter (ZIP Download)
2. Lade sie auf cPanel hoch (über File Manager oder SFTP):
   ```
   /public_html/fromnl/  (alle Dateien hier)
   ```

## ✅ Schritt 2: MySQL Database Setup

### 2.1 Datenbank in cPanel erstellen
1. Gehe zu "MySQL Databases"
2. Erstelle neue Datenbank: `fromnl_db`
3. Erstelle neuen MySQL Benutzer: `fromnl_user`
4. Passwort: Wähle ein sicheres Passwort
5. Benutzer zur Datenbank hinzufügen (alle Privilegien)

### 2.2 Tabellen erstellen
1. Gehe zu "phpMyAdmin"
2. Wähle deine `fromnl_db` Datenbank
3. Gehe zum "SQL" Tab
4. Kopiere den kompletten Inhalt aus `scripts/database-schema.sql`
5. Führe den SQL aus

## ✅ Schritt 3: Environment Variablen konfigurieren

### 3.1 .env.local Datei anpassen
```bash
# SSH/Terminal
cd /public_html/fromnl
nano .env.local
```

Folgende Werte eintragen:
```env
DB_HOST=localhost
DB_USER=fromnl_user
DB_PASSWORD=DEIN_PASSWORT_HIER
DB_NAME=fromnl_db

ADMIN_PASSWORD=DEIN_ADMIN_PASSWORT
TELEGRAM_BOT_TOKEN=DEIN_BOT_TOKEN_OPTIONAL
NEXT_PUBLIC_SITE_NAME=FROMNL.PRO
```

Speichern: `CTRL+O`, `ENTER`, `CTRL+X`

## ✅ Schritt 4: Node.js Dependencies installieren

```bash
# Im Terminal
cd /public_html/fromnl
npm install
```

Warte bis alle Packages installiert sind (~5-10 Minuten)

## ✅ Schritt 5: Next.js bauen

```bash
npm run build
```

Das erstellt den optimierten Production Build

## ✅ Schritt 6: Server starten

### Option A: Mit PM2 (Empfohlen für Produktion)
```bash
npm install -g pm2
pm2 start "npm start" --name "fromnl-shop"
pm2 startup
pm2 save
```

### Option B: Mit nohup (Einfach)
```bash
nohup npm start > fromnl.log 2>&1 &
```

## ✅ Schritt 7: Domain konfigurieren

1. Gehe in cPanel zu "Addon Domains"
2. Verbinde deine fromnl.pro Domain mit `/public_html/fromnl`
3. Warte 15-30 Minuten auf DNS Propagation

## ✅ Zugriff auf Admin Panel

- URL: `https://fromnl.pro/admin`
- Password: Das Passwort aus .env.local ADMIN_PASSWORD

## ✅ Troubleshooting

### Node.js Version Fehler
```bash
# Überprüfe aktuelle Version
node --version

# Falls falsch, upgrade in cPanel Node.js Manager
# Dann Terminal neustarten
```

### Port 3000 wird bereits verwendet
```bash
lsof -i :3000
kill -9 PID_HIER
```

### Datenbank Fehler
- Prüfe DB_HOST (sollte localhost sein)
- Prüfe DB_USER und DB_PASSWORD
- Stelle sicher dass alle SQL Tabellen erstellt wurden

### Fotos werden nicht hochgeladen
- Ordner `/public/uploads` muss existieren
- Permissions: `chmod 755 public/uploads`

## 🚀 Fertig!

Dein FromNL Shop läuft jetzt unabhängig auf deinem cPanel Hosting!

Alle Admin-Funktionen sind jetzt operational:
- ✅ Produkte hinzufügen/bearbeiten
- ✅ Foto-Upload
- ✅ Navigation links verwalten
- ✅ Categories, Banners, Pages
- ✅ Logo/Einstellungen
