# 🎮 ROBLOX STORE — Premium International Gaming Marketplace

A complete, production-ready e-commerce marketplace for Roblox players worldwide. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

Designed with a high-end dark neon gaming aesthetic, instant automated order processing, official Roblox Catalog API integration, multi-currency support (**USD $** & **INR ₹**), and verified payment channels (**Indian UPI QR**, **USDT BEP20**, and **USDT TRC20**).

---

## 🚀 Quick Start (Local Development)

To run the store locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

To build the production bundle:
```bash
npm run build
```
The optimized static build will be generated in the `/dist` directory.

---

## 📦 How to Upload to GitHub (Step-by-Step)

Follow these simple steps to upload your store to GitHub:

### Option A: Using the Terminal / Git CLI

1. **Extract your ZIP file** to a folder on your computer if you downloaded it.
2. Open a terminal (Command Prompt, PowerShell, or macOS/Linux Terminal) in the project folder.
3. Initialize a Git repository and commit the files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete ROBLOX STORE website"
   ```
4. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Name your repository (for example: `roblox-store` or `roblox-marketplace`).
   - Leave it **Public** (required for free GitHub Pages).
   - Do **NOT** check "Initialize with README", .gitignore, or license (we already have them).
   - Click **Create repository**.
5. Connect your local files to your GitHub repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPOSITORY-NAME>.git
   git push -u origin main
   ```

### Option B: Using GitHub Desktop
1. Open **GitHub Desktop**.
2. Click **File** > **Add Local Repository...** and choose your unzipped project folder.
3. Click **Create a repository** if prompted.
4. Click **Publish repository** to push it to your GitHub account.

---

## 🌐 Deploying to GitHub Pages (Automated)

The project includes an automated GitHub Actions deployment workflow in `.github/workflows/deploy.yml`.

1. Go to your repository on [GitHub.com](https://github.com).
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Source**, choose **GitHub Actions** from the dropdown.
5. That's it! Every time you push to the `main` branch, GitHub will automatically build and publish your website.
6. You will see your live website URL in the GitHub Pages settings (e.g. `https://<YOUR-USERNAME>.github.io/<REPO>/` or your custom domain).

---

## 🌍 Connecting Your Custom Domain

A `CNAME` file is already included in both `/CNAME` and `/public/CNAME`. When the project builds, Vite automatically places `CNAME` in the root of `/dist`.

### Step 1: Update the CNAME File
1. Open the file `public/CNAME` in your editor.
2. Replace `yourcustomdomain.com` with your actual domain name:
   ```text
   example.com
   ```
   *(or `store.example.com` if using a subdomain).*
3. Commit and push the change to GitHub:
   ```bash
   git add public/CNAME CNAME
   git commit -m "Update custom domain"
   git push origin main
   ```

### Step 2: Configure DNS Records in Your Domain Provider
Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains, Hostinger, etc.) and add these DNS records:

#### If using an apex domain (e.g. `yourdomain.com`):
Add **four `A` records** pointing to GitHub Pages IP addresses:
- **Type**: `A` | **Host/Name**: `@` | **Value**: `185.199.108.153`
- **Type**: `A` | **Host/Name**: `@` | **Value**: `185.199.109.153`
- **Type**: `A` | **Host/Name**: `@` | **Value**: `185.199.110.153`
- **Type**: `A` | **Host/Name**: `@` | **Value**: `185.199.111.153`

Add **one `CNAME` record** for `www`:
- **Type**: `CNAME` | **Host/Name**: `www` | **Value**: `<YOUR-GITHUB-USERNAME>.github.io.`

#### If using a subdomain (e.g. `store.yourdomain.com`):
- **Type**: `CNAME` | **Host/Name**: `store` | **Value**: `<YOUR-GITHUB-USERNAME>.github.io.`

### Step 3: Enable Enforce HTTPS in GitHub
1. Go to your repository **Settings** > **Pages**.
2. Under **Custom domain**, verify your domain is shown.
3. Check the box **Enforce HTTPS** (GitHub will automatically provision a free SSL certificate for your domain within 15–30 minutes).

---

## 🔄 Direct Links & Page Refresh Support (SPA Routing)

GitHub Pages is a static host that returns a 404 error when refreshing non-root pages (such as `/robux` or `/skins`).

This project solves this completely with:
1. **`public/404.html`**: Catches any direct page refresh or bookmark, converts the path, and redirects to the index file seamlessly.
2. **`index.html` decoder script**: Restores the URL path and state instantly without flashing.
3. **`StoreContext.tsx` dual-routing**: Supports both direct paths (`/robux`, `/skins`) and hash routes (`/#robux`, `/#checkout`, `/#orders`, `/#admin`), ensuring browser Back/Forward buttons and bookmarks work everywhere.

---

## 💳 Payment Options & QR Codes

The store includes 3 payment methods:
1. **India UPI Payment**:
   - Original Paytm / UPI QR image located at `public/indian_upi_qr.jpg`.
   - VPA / UPI ID: `wepteam@ptyes` (Payee: Ram Kailash).
   - Includes Download QR button and payment copy helper.
2. **BEP20 (BNB Smart Chain - USDT)**:
   - Wallet Address: `0x70685190F17B71dFB0DACb802751dEA2dBd5fAFA`
   - Verified scannable QR image at `public/bep20_qr.jpg`.
3. **TRC20 (Tron - USDT)**:
   - Wallet Address: `THDha3vFBE4Lov5McPep6czmtqPsoLuAk5`
   - Verified scannable QR image at `public/trc20_qr.jpg`.

To change any QR image in the future, simply replace the corresponding file in `/public/` with your new image!

---

## 🛠️ Merchant / Admin Console

To access the store management dashboard:
- Navigate to `/#admin` or click **Merchant Console** in the footer.
- The admin console allows you to:
  - View all incoming customer orders.
  - Track payments and handle refund / review requests.
  - Update prices and toggle package availability.
  - Manage reviews and customer feedback.
  - Customize UPI and crypto wallet settings.

---

## 📁 Project Structure

```
roblox-store/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── 404.html                # GitHub Pages SPA refresh handler
│   ├── CNAME                   # Custom domain configuration
│   ├── indian_upi_qr.jpg       # Authentic India UPI QR image
│   ├── bep20_qr.jpg            # Authentic BEP20 USDT QR image
│   ├── trc20_qr.jpg            # Authentic TRC20 USDT QR image
│   └── assets/                 # Brand and product images
├── src/
│   ├── assets/                 # Icons and artwork
│   ├── components/             # Reusable UI components (Header, Footer, Cart, Modals)
│   ├── context/                # StoreContext (state, cart, currency, orders, routing)
│   ├── data/                   # Initial catalog, mock packages, store settings
│   ├── pages/                  # Page views (Home, Robux, Skins, Gift Cards, Checkout, Admin, etc.)
│   ├── services/               # Roblox Official Catalog API integration
│   ├── types/                  # TypeScript interface definitions
│   ├── App.tsx                 # Main layout & router
│   ├── index.css               # Tailwind CSS theme & custom styling
│   └── main.tsx                # React root mount
├── index.html                  # HTML entry point with SPA redirect decoder
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration (base: './', proxy plugins)
└── README.md                   # Complete documentation & deployment guide
```

---

## ⚖️ License & Disclaimer

ROBLOX STORE is an independent gaming marketplace platform. Roblox, Robux, and all associated marks and logos are trademarks of Roblox Corporation. This project is not affiliated with or endorsed by Roblox Corporation.
