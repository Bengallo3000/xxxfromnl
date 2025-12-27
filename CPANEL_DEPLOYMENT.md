# Deployment auf cPanel Hosting

## 1. Datenbank Setup

1. Melde dich in deinem cPanel an
2. Gehe zu "MySQL Datenbanken"
3. Erstelle eine neue Datenbank: `fromnl_db`
4. Erstelle einen Benutzer: `fromnl_user` mit starkem Passwort
5. Verbinde den Benutzer mit der Datenbank (Alle Privilegien)
6. Gehe zu "phpMyAdmin"
7. Wähle deine Datenbank und importiere die `database-schema.sql` Datei

## 2. Environment Variables

1. Bearbeite `.env.local` mit deinen Datenbank-Zugriffsdate:
   - DB_HOST: localhost
   - DB_USER: fromnl_user
   - DB_PASSWORD: [dein Passwort]
   - DB_NAME: fromnl_db

## 3. Next.js Build & Deploy

```bash
npm install
npm run build
npm run start
```

## 4. PM2 oder Apache Setup

Wenn du Node.js direkt laufen lässt (empfohlen):
- Verwende PM2 oder Passenger
- Oder verwende cPanel's "Setup Node.js App"

Wenn du mit Apache läufst:
- Verwende Next.js Static Export (für reine Frontend)
- Oder nutze ein Reverse Proxy Setup

## 5. Admin Panel Zugang

- URL: `/admin`
- Passwort: `admin` (ändern Sie dies im Admin Panel!)
