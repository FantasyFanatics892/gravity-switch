# Gravity Switch - Web Game

Gravity Switch adalah game endless runner yang menantang dimainkan melalui browser dengan mekanik flip gravity. Dibangun dengan React, TypeScript, dan HTML5 Canvas.

## Daftar Isi

* [Persyaratan Sistem](#persyaratan-sistem)
* [Instalasi](#instalasi)
* [Konfigurasi](#konfigurasi)
* [Menjalankan Aplikasi](#menjalankan-aplikasi)
* [Mengakses dari Jaringan Lokal](#mengakses-dari-jaringan-lokal)
* [Setup Domain & HTTPS](#setup-domain--https)
* [Cloudflare Tunnel (Recommended)](#cloudflare-tunnel-recommended)
* [Nginx Reverse Proxy + SSL](#nginx-reverse-proxy--ssl)
* [Mekanik Game](#mekanik-game)
* [Teknologi](#teknologi)
* [Struktur Proyek](#struktur-proyek)
* [API Backend](#api-backend)
* [Troubleshooting](#troubleshooting)

---

# Persyaratan Sistem

## Minimum Requirements

* **OS**: Debian 11+ (Bullseye atau lebih baru), Ubuntu 20.04+, atau distro Linux lainnya
* **Node.js**: v18.0.0 atau lebih baru
* **npm**: v8.0.0 atau lebih baru
* **RAM**: 512 MB minimum
* **Disk Space**: 1 GB untuk instalasi

## Recommended

* **OS**: Debian 12 (Bookworm), Ubuntu 22.04 LTS
* **Node.js**: v20 LTS
* **RAM**: 2 GB atau lebih
* **Network**: Koneksi internet stabil untuk pengunduhan dependencies

---

# Instalasi

## 1. Update Sistem

```bash
sudo apt update
sudo apt upgrade -y
```

## 2. Install Node.js dan npm

### Opsi A: NodeSource Repository (Recommended)

```bash
sudo apt install -y curl gnupg2 ca-certificates lsb-release ubuntu-keyring

curl https://deb.nodesource.com/setup_20.x | sudo bash

sudo apt install -y nodejs

node --version
npm --version
```

### Opsi B: Repository Default

```bash
sudo apt install -y nodejs npm

node --version
npm --version
```

## 3. Clone Project

```bash
git clone <repository-url> gravity-switch
cd gravity-switch
```

## 4. Install Dependencies

```bash
npm install
```

Verifikasi:

```bash
npm list | head -20
```

---

# Konfigurasi

## 1. Membuat File .env

```bash
cp .env.example .env
nano .env
```

Contoh konfigurasi:

```env
PORT=4000
SESSION_SECRET=your-random-secret-key
VITE_API_URL=https://yourdomain.com/api
```

Generate SESSION_SECRET:

```bash
openssl rand -base64 32
```

## 2. Folder Database

```bash
mkdir -p server/data
```

---

# Menjalankan Aplikasi

## Development Mode

```bash
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:4000
```

## Production Mode

Build aplikasi:

```bash
npm run build
```

Jalankan production:

```bash
NODE_ENV=production npm run server
```

---

# Menjalankan Dengan PM2 (Recommended)

Install PM2:

```bash
sudo npm install -g pm2
```

Start aplikasi:

```bash
pm2 start "npm run dev" --name gravity-switch
```

Melihat status:

```bash
pm2 status
```

Melihat log:

```bash
pm2 logs gravity-switch
```

Auto start saat boot:

```bash
pm2 startup
pm2 save
```

---

# Mengakses dari Jaringan Lokal

Cek IP lokal:

```bash
hostname -I
```

Contoh output:

```txt
192.168.1.100
```

Akses:

```txt
http://192.168.1.100:5173
```

---

# Setup Domain & HTTPS

Project ini support custom domain dan HTTPS.

Ada 2 metode yang direkomendasikan:

1. **Cloudflare Tunnel (Paling mudah & aman)**
2. **Nginx Reverse Proxy + SSL Let's Encrypt**

---

# Cloudflare Tunnel (Recommended)

Cloudflare Tunnel memungkinkan aplikasi diakses publik tanpa membuka port router.

Keuntungan:

* HTTPS otomatis
* Tidak perlu port forwarding
* Aman karena IP server disembunyikan
* Gratis
* Mudah dikonfigurasi

## Requirement

* Domain yang terhubung ke Cloudflare
* Akun Cloudflare
* Debian/Ubuntu VPS atau server lokal

---

## 1. Tambahkan Domain ke Cloudflare

Masuk ke dashboard Cloudflare.

Tambahkan domain:

```txt
example.com
```

Ubah nameserver domain ke nameserver Cloudflare.

Tunggu propagasi DNS selesai.

---

## 2. Install Cloudflared

```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

sudo dpkg -i cloudflared-linux-amd64.deb
```

Verifikasi:

```bash
cloudflared --version
```

---

## 3. Login Cloudflare

```bash
cloudflared tunnel login
```

Browser akan terbuka.

Pilih domain yang ingin digunakan.

---

## 4. Membuat Tunnel

```bash
cloudflared tunnel create gravity-switch
```

Contoh output:

```txt
Tunnel credentials written to:
/root/.cloudflared/xxxxxxxx.json
```

---

## 5. Membuat Config Tunnel

Buat file:

```bash
nano ~/.cloudflared/config.yml
```

Isi:

```yml
tunnel: gravity-switch
credentials-file: /root/.cloudflared/xxxxxxxx.json

ingress:
  - hostname: game.example.com
    service: http://localhost:5173

  - service: http_status:404
```

Ganti:

```txt
game.example.com
```

Dengan domain/subdomain milikmu.

---

## 6. Hubungkan DNS ke Tunnel

```bash
cloudflared tunnel route dns gravity-switch game.example.com
```

---

## 7. Jalankan Tunnel

```bash
cloudflared tunnel run gravity-switch
```

Sekarang website dapat diakses melalui:

```txt
https://game.example.com
```

HTTPS otomatis aktif.

---

## 8. Menjalankan Tunnel di Background

Install sebagai service:

```bash
sudo cloudflared service install
```

Enable service:

```bash
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Cek status:

```bash
systemctl status cloudflared
```

---

# Nginx Reverse Proxy + SSL

Jika tidak ingin menggunakan Cloudflare Tunnel, gunakan Nginx.

Metode ini cocok untuk:

* VPS publik
* Dedicated server
* Server dengan port publik terbuka

---

## 1. Install Nginx

```bash
sudo apt install nginx -y
```

Start nginx:

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## 2. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

---

## 3. Build Project

```bash
npm run build
```

---

## 4. Jalankan Backend

Gunakan PM2:

```bash
pm2 start "NODE_ENV=production npm run server" --name gravity-switch
```

---

## 5. Membuat Konfigurasi Nginx

Buat file:

```bash
sudo nano /etc/nginx/sites-available/gravity-switch
```

Isi:

```nginx
server {
    server_name game.example.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/gravity-switch /etc/nginx/sites-enabled/
```

Test config:

```bash
sudo nginx -t
```

Restart nginx:

```bash
sudo systemctl restart nginx
```

---

## 6. Setup HTTPS SSL

Pastikan domain sudah mengarah ke IP server.

Jalankan:

```bash
sudo certbot --nginx -d game.example.com
```

Ikuti instruksi di terminal.

Jika berhasil:

```txt
Congratulations! Your certificate and chain have been saved.
```

Sekarang website dapat diakses melalui:

```txt
https://game.example.com
```

---

## 7. Auto Renew SSL

Certbot biasanya otomatis.

Test:

```bash
sudo certbot renew --dry-run
```

---

# Firewall Configuration

Jika port diblokir:

```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 4000
sudo ufw allow 5173
```

Cek status:

```bash
sudo ufw status
```

---

# Mekanik Game

## Kontrol

### Desktop

* Space
* Click
* Arrow Up
* Arrow Down

### Mobile

* Tap layar

## Tujuan

* Hindari obstacle
* Raih skor setinggi mungkin
* Masuk leaderboard global

---

# Teknologi

## Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* HTML5 Canvas

## Backend

* Node.js
* Express
* SQLite3
* bcrypt
* express-session

---

# Struktur Proyek

```txt
gravity-switch/
├── src/
├── server/
├── public/
├── dist/
├── node_modules/
├── .env
├── package.json
├── vite.config.ts
└── README.md
```

---

# API Backend

## Register

```http
POST /api/register
```

Body:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

---

## Login

```http
POST /api/login
```

---

## Save Score

```http
POST /api/score
```

---

## Leaderboard

```http
GET /api/leaderboard
```

---

# Troubleshooting

## Port Sudah Digunakan

```bash
lsof -i :4000
kill -9 <PID>
```

---

## Nginx Error

Cek config:

```bash
sudo nginx -t
```

Lihat log:

```bash
sudo journalctl -u nginx
```

---

## Cloudflare Tunnel Tidak Jalan

Cek status:

```bash
systemctl status cloudflared
```

Lihat log:

```bash
journalctl -u cloudflared -f
```

Restart:

```bash
sudo systemctl restart cloudflared
```

---

## SSL Error

Renew SSL manual:

```bash
sudo certbot renew
```

---

# Tips Production

## Gunakan PM2

```bash
pm2 save
pm2 startup
```

---

## Gunakan HTTPS

HTTPS wajib untuk:

* Keamanan login
* Session cookies
* Browser modern
* SEO

---

## Gunakan Cloudflare

Keuntungan:

* DDoS Protection
* Free CDN
* HTTPS otomatis
* DNS cepat
* Hide IP server

---

# License

MIT License

---

**Version**: 1.1.0
**Last Updated**: May 2026
**Recommended Deployment**: Cloudflare Tunnel + PM2
