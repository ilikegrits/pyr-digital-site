# PYR Digital — Website

A single-page site for PYR Digital: hero, service tiers, approach, founder bio, and contact.
Plain HTML/CSS/JS served by a tiny Express server, ready for Railway.

## File structure
```
pyr-site/
  server.js          <- serves the /public folder
  package.json
  public/
    index.html
    styles.css
    script.js
```

## 1. Get the code into a GitHub repo
Railway deploys from GitHub (easiest) or the Railway CLI.

```bash
cd pyr-site
git init
git add .
git commit -m "PYR Digital site"
```
Create a new repo on GitHub (e.g. `pyr-digital-site`), then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/pyr-digital-site.git
git branch -M main
git push -u origin main
```

## 2. Deploy on Railway
1. Go to railway.app and sign in (GitHub login is simplest).
2. **New Project → Deploy from GitHub repo** → select `pyr-digital-site`.
3. Railway auto-detects Node.js via `package.json` and runs `npm install` then `npm start`. No extra config needed.
4. Once deployed, Railway gives you a temporary URL like `pyr-digital-site-production.up.railway.app` — open it to confirm the site is live.

(Alternative: install the Railway CLI — `npm i -g @railway/cli` — then from the `pyr-site` folder run `railway login` and `railway up`. Requires network access, which this environment doesn't have, so run it from your own machine.)

## 3. Connect pyr.digital
In your Railway project:
1. Open the service → **Settings → Networking → Custom Domain**.
2. Add `pyr.digital` (and `www.pyr.digital` if you want both).
3. Railway will show you a DNS target, typically a CNAME record pointing to something like `xxxx.up.railway.app`.
4. Go to wherever pyr.digital is registered (e.g. GoDaddy, Namecheap, Google Domains) → DNS settings, and add:
   - **Type:** CNAME
   - **Name/Host:** `@` (root domain) — some registrars require an ALIAS/ANAME record instead of CNAME at the root; use whichever your registrar supports for root-domain forwarding, or point the root via redirect and put the real record on `www`.
   - **Value:** the target Railway gives you
5. If you're also adding `www.pyr.digital`, add a second CNAME record with **Name/Host:** `www` pointing to the same Railway target.
6. DNS propagation usually takes a few minutes to a few hours. Railway auto-issues an SSL certificate once it verifies the domain — no extra steps needed.

## 4. Editing content later
Everything is in `public/index.html` — pricing tiers, founder bio text, and the contact email are all plain text in there, no build step required. Push a commit to your `main` branch and Railway redeploys automatically.

## Local preview (on your own machine, with network access)
```bash
cd pyr-site
npm install
npm start
```
Then open `http://localhost:3000`.
