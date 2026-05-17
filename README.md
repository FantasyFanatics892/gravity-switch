# Gravity Switch - Web Game

Gravity Switch adalah game endless runner yang menantang dimainkan melalui browser dengan mekanik flip gravity. Dibangun dengan React, TypeScript, dan HTML5 Canvas.

## Daftar Isi

- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Mengakses dari Jaringan Lokal](#mengakses-dari-jaringan-lokal)
- [Mekanik Game](#mekanik-game)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [API Backend](#api-backend)
- [Troubleshooting](#troubleshooting)

## Persyaratan Sistem

### Minimum Requirements
- **OS**: Debian 11+ (Bullseye atau lebih baru), Ubuntu 20.04+, atau distro Linux lainnya
- **Node.js**: v18.0.0 atau lebih baru
- **npm**: v8.0.0 atau lebih baru
- **RAM**: 512 MB minimum
- **Disk Space**: 1 GB untuk instalasi

### Recommended
- **OS**: Debian 12 (Bookworm), Ubuntu 22.04 LTS
- **Node.js**: v20 LTS
- **RAM**: 2 GB atau lebih
- **Network**: Koneksi internet stabil untuk pengunduhan dependencies

## Instalasi

### 1. Update Sistem

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Node.js dan npm

**Opsi A: Menggunakan NodeSource Repository (Recommended)**

```bash
# Install dependencies
sudo apt install -y curl gnupg2 ca-certificates lsb-release ubuntu-keyring

# Tambahkan NodeSource GPG key
curl https://deb.nodesource.com/setup_20.x | sudo bash

# Install Node.js (termasuk npm)
sudo apt install -y nodejs

# Verifikasi instalasi
node --version
npm --version
```

**Opsi B: Menggunakan apt repository default**

```bash
sudo apt install -y nodejs npm

# Verifikasi versi
node --version
npm --version
```

### 3. Clone atau Persiapkan Proyek

```bash
# Jika belum memiliki proyek, clone dari repository
git clone <repository-url> gravity-switch
cd gravity-switch

# Atau jika sudah ada folder proyek
cd path/to/gravity-switch
```

### 4. Install Dependencies

```bash
# Install semua dependencies NPM
npm install

# Tunggu hingga selesai (bisa memakan waktu 2-5 menit)
```

Verifikasi instalasi berhasil:
```bash
npm list | head -20
```

## Konfigurasi

### 1. Membuat File .env

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Edit file `.env`:

```bash
nano .env
# atau gunakan editor lain: vi, vim, gedit, etc
```

**Konten .env untuk Local Network:**

```env
# Backend Server
PORT=4000

# Session Secret (gunakan random string yang aman)
SESSION_SECRET=your-random-secret-key-min-32-chars

# Frontend (opsional)
VITE_API_URL=http://0.0.0.0:4000/api
```

**Membuat SESSION_SECRET yang Aman:**

```bash
# Menggunakan openssl
openssl rand -base64 32

# atau menggunakan node
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Contoh output:
```
L1k2m3n4o5p6q7r8s9t0u1v2w3x4y5z6/A==
```

Gunakan string tersebut di `.env`:
```env
SESSION_SECRET=L1k2m3n4o5p6q7r8s9t0u1v2w3x4y5z6/A==
```

### 2. Membuat Folder Data (Opsional, auto-generated)

```bash
# Folder ini akan dibuat otomatis saat pertama kali dijalankan
mkdir -p server/data

# Atau biarkan aplikasi membuat saat runtime
```

## Menjalankan Aplikasi

### Mode Development (dengan Auto-reload)

Jalankan aplikasi dengan frontend dan backend bersama-sama:

```bash
npm run dev
```

Output yang diharapkan:
```
> gravity-switch@1.0.0 dev
> concurrently "npm run server" "npm run frontend"

[0]
[0] > gravity-switch@1.0.0 server
[0] > node server/index.js
[0] Backend listening on http://localhost:4000

[1] > gravity-switch@1.0.0 frontend
[1] > vite
[1] VITE v5.4.10 running at:
[1] ➜  Local:   http://localhost:5173/
[1] ➜  press h + enter to show help
```

### Mode Production (Optimized)

Jika ingin menjalankan di production:

```bash
# Build aplikasi
npm run build

# Jalankan dengan NODE_ENV=production
NODE_ENV=production npm run server
```

Server akan serve file static dari folder `dist/` pada port 4000.

### Menjalankan di Background (Daemon Mode)

Gunakan `nohup` atau `screen`:

**Menggunakan nohup:**
```bash
nohup npm run dev > app.log 2>&1 &

# Melihat process ID
ps aux | grep "npm run dev"

# Membaca log
tail -f app.log

# Menghentikan
kill <PID>
```

**Menggunakan screen:**
```bash
# Membuat session baru
screen -S gravity-switch

# Di dalam session:
npm run dev

# Detach session: Ctrl+A kemudian D

# List sessions
screen -ls

# Reattach session
screen -r gravity-switch

# Terminate session
screen -X -S gravity-switch quit
```

**Menggunakan PM2 (Recommended):**
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start aplikasi
pm2 start "npm run dev" --name gravity-switch

# Melihat status
pm2 status

# Melihat log
pm2 logs gravity-switch

# Stop
pm2 stop gravity-switch

# Start on boot
pm2 startup
pm2 save
```

## Mengakses dari Jaringan Lokal

### Mendapatkan IP Address Lokal

```bash
# Cara 1: Menggunakan hostname -I
hostname -I

# Cara 2: Menggunakan ip command
ip addr show | grep "inet " | grep -v "127.0.0.1"

# Cara 3: Menggunakan ifconfig (jika tersedia)
ifconfig | grep -A 1 "eth0\|wlan0"
```

Contoh output:
```
192.168.1.100
```

### Konfigurasi Server untuk Akses Dari Luar localhost

Edit file `server/index.js` atau ubah port binding:

**Opsi 1: Menggunakan environment variable**

```bash
# Jalankan server dengan IP binding
NODE_ENV=development npm run dev
```

Server akan listen di `0.0.0.0:4000` (default).

**Opsi 2: Edit server configuration (Opsional)**

Jika perlu custom binding, edit `server/index.js`:

```javascript
const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '0.0.0.0'  // Tambahkan ini

app.listen(PORT, HOST, () => {
  console.log(`Backend listening on http://${HOST}:${PORT}`)
})
```

### Akses dari Device Lain di Jaringan

**Dari Browser:**

```
Frontend:  http://192.168.1.100:5173
Backend:   http://192.168.1.100:4000

Contoh URL lengkap:
http://192.168.1.100:5173/
http://192.168.1.100:5173/game
http://192.168.1.100:5173/leaderboard
```

**Dari Terminal untuk Testing:**

```bash
# Cek apakah server accessible
curl http://192.168.1.100:4000/api/leaderboard

# Test dengan verbose
curl -v http://192.168.1.100:4000/api/leaderboard
```

### Firewall Configuration (jika needed)

Jika firewall blocking koneksi:

**Buka port untuk lokal network:**
```bash
# UFW (Uncomplicated Firewall)
sudo ufw allow from 192.168.1.0/24 to any port 5173
sudo ufw allow from 192.168.1.0/24 to any port 4000

# atau izinkan semua lokal network
sudo ufw allow 5173
sudo ufw allow 4000

# Lihat status
sudo ufw status
```

**Disable UFW (hanya untuk testing):**
```bash
sudo ufw disable
```

## Mekanik Game

### Kontrol
- **Mobile/Touch**: Tap layar untuk flip gravity
- **Desktop**: Klik atau tekan Space/Up/Down untuk flip gravity

### Tujuan
- Hindari spike dan obstacle
- Tingkatkan skor dengan melewati obstacle
- Kompetisi di leaderboard global

### Tipe Obstacle
- Floor Spike - Spike dari bawah
- Ceiling Spike - Spike dari atas
- Both Spikes - Spike dari dua sisi
- Floor Block - Balok di lantai
- Ceiling Block - Balok di plafon
- Gap Block - Balok di kedua sisi dengan celah

## Teknologi

### Frontend
- **React** 18.3 - UI library
- **TypeScript** 5.6 - Type safety
- **Vite** 5.4 - Build tool & dev server
- **React Router** 6.28 - Routing
- **Tailwind CSS** 3.4 - Styling
- **HTML5 Canvas** - Game rendering

### Backend
- **Node.js** - Runtime
- **Express** 4.18 - Web framework
- **SQLite3** 5.1 - Database
- **bcrypt** 5.1 - Password hashing
- **express-session** 1.17 - Session management

## Struktur Proyek

```
gravity-switch/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── Game.tsx             # Main game component
│   │   ├── ui/                  # UI components
│   │   │   ├── button.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── Trophy.tsx
│   │   └── ...
│   ├── pages/                    # Page components
│   │   ├── AuthPage.tsx         # Login/Register page
│   │   ├── GamePage.tsx         # Game page
│   │   └── LeaderboardPage.tsx  # Leaderboard page
│   ├── hooks/
│   │   ├── useAuth.ts           # Auth logic hook
│   │   └── useGame.ts           # Game logic hook
│   ├── context/
│   │   └── AuthContext.tsx      # Auth context
│   ├── api/                      # API calls
│   │   └── auth.ts
│   ├── lib/
│   │   ├── game/                # Game engine
│   │   └── utils.ts
│   ├── App.tsx                  # Root component
│   └── index.css                # Global styles
│
├── server/                       # Backend source code
│   ├── index.js                 # Main server file
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── leaderboard.js       # Leaderboard endpoint
│   │   └── score.js             # Score endpoint
│   ├── data/                     # Database files (auto-created)
│   │   ├── game.db              # SQLite database
│   │   └── sessions.db          # Session store
│   └── db.js                    # Database setup
│
├── public/                       # Static assets
├── dist/                         # Built files (production)
├── node_modules/                # Dependencies
├── .env                         # Environment variables
├── package.json                 # Project metadata
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind configuration
└── README.md                    # Documentation ini

```

## API Backend

### Authentication Endpoints

#### Register User
```
POST /api/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

Response:
{
  "username": "testuser",
  "topScore": 0
}
```

#### Login User
```
POST /api/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

Response:
{
  "username": "testuser",
  "topScore": 0
}
```

#### Get Current User
```
GET /api/user

Response:
{
  "username": "testuser",
  "topScore": 100
}
```

#### Logout
```
POST /api/logout

Response:
{
  "success": true
}
```

### Game Endpoints

#### Save Score
```
POST /api/score
Content-Type: application/json

{
  "score": 150
}

Response:
{
  "topScore": 150
}
```

#### Get Leaderboard
```
GET /api/leaderboard

Response:
{
  "data": [
    {
      "rank": 1,
      "username": "testuser",
      "topScore": 500
    },
    ...
  ]
}
```

## Troubleshooting

### Issue: Port sudah digunakan

**Error:** `Error: listen EADDRINUSE: address already in use :::4000`

**Solusi:**
```bash
# Cari process yang menggunakan port
lsof -i :4000
# atau
netstat -tulpn | grep 4000

# Kill process
kill -9 <PID>

# Atau gunakan port berbeda
PORT=4001 npm run dev
```

### Issue: Node.js tidak terinstall

**Error:** `command not found: node`

**Solusi:**
```bash
# Cek instalasi
which node
node --version

# Reinstall Node.js
curl https://deb.nodesource.com/setup_20.x | sudo bash
sudo apt install -y nodejs
```

### Issue: Dependencies gagal install

**Error:** `npm ERR! code ERESOLVE`

**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install

# Jika masih gagal, gunakan legacy peer deps
npm install --legacy-peer-deps
```

### Issue: Database Error

**Error:** `SQLITE_CANTOPEN`

**Solusi:**
```bash
# Pastikan folder data ada
mkdir -p server/data

# Berikan permission
chmod 755 server/data

# Hapus database lama dan rebuild
rm -f server/data/*.db
npm run dev
```

### Issue: Cannot access dari device lain

**Problem:** Akses dari IP lokal tidak working

**Solusi:**
```bash
# 1. Verifikasi server running di 0.0.0.0
curl http://localhost:5173
curl http://localhost:4000

# 2. Cek firewall
sudo ufw status
sudo ufw allow 5173 4000

# 3. Verifikasi IP address
hostname -I

# 4. Test dari device lain
curl http://192.168.1.100:4000/api/leaderboard
```

### Issue: Session tidak persist

**Problem:** User logout saat page refresh

**Solusi:**
1. Pastikan cookies enabled di browser
2. Cek SESSION_SECRET di .env sudah di-set
3. Rebuild aplikasi:
   ```bash
   rm -rf server/data/sessions.db
   npm run dev
   ```

### Issue: Build gagal

**Error:** `TypeScript error in ...`

**Solusi:**
```bash
# Check TypeScript
npx tsc --noEmit

# Fix types
npm run build -- --force

# Atau hapus dist dan rebuild
rm -rf dist
npm run build
```

## Tips dan Tricks

### Monitor Aplikasi Real-time
```bash
# Menggunakan watch
watch -n 1 'lsof -i :4000 -i :5173'

# Atau gunakan htop
htop
# Cari process npm
```

### Development Tips

**1. Hot Module Replacement (HMR)**
Vite otomatis refresh page saat code berubah. Tidak perlu restart manual.

**2. Debug Mode**
```bash
# Start dengan debug logging
DEBUG=* npm run dev
```

**3. API Testing dengan curl**
```bash
# Test backend connection
curl -X GET http://localhost:4000/api/leaderboard

# Test dengan data
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

### Performance Optimization

**1. Production Build**
```bash
npm run build
NODE_ENV=production npm run server
```

**2. Check Build Size**
```bash
npm run build
du -sh dist/
```

**3. Optimize Images**
```bash
# Install imagemin
npm install --save-dev imagemin

# Optimize
npx imagemin public/images -o public/images
```

## Support & Resources

- **Bug Report**: Buka issue di repository
- **Documentation**: Lihat file `.md` lainnya
- **Game Logic**: Cek `src/lib/game/`
- **Backend Routes**: Cek `server/routes/`

## License

MIT License - Bebas digunakan untuk project pribadi dan komersial

---

**Terakhir diupdate**: May 2024  
**Version**: 1.0.0  
**Node.js Requirement**: v18.0.0 atau lebih baru
