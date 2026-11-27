<div align="center">

# 💾 Rickware Labs — Discord Asset Scraper

**Free, all-in-one Discord asset toolkit that runs right inside your browser.**
Shop collectibles, your own inventory, quest rewards, emojis, stickers, profiles and servers — captured, named and packed for you.

![Version](https://img.shields.io/badge/Version-9-7b2cbf?style=for-the-badge)
![Price](https://img.shields.io/badge/Price-Free-22c55e?style=for-the-badge)
![Discord](https://img.shields.io/badge/Discord-Web-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Browser](https://img.shields.io/badge/Browser-Chrome%20%7C%20Edge%20%7C%20Brave-F44336?style=for-the-badge&logo=googlechrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Dependencies](https://img.shields.io/badge/Dependencies-None-9d4edd?style=for-the-badge)

[Features](#-features) • [Quick Start](#-quick-start) • [Output](#-output-structure) • [Safety](#-safety--privacy) • [FAQ](#-faq) • [License](#-license)

</div>

---

## 📸 Preview

| Shop Scraper | Emoji Scraper — Entire Server | Emoji Scraper — Single Emoji | Emoji Scraper — Multiple Emojis |
|---|---|---|---|
| ![Shop Scraper Preview](https://i.imgur.com/54wLALH.png) | ![Emoji Scraper Entire Server Emojis Preview](https://i.imgur.com/KMjMmeA.png) | ![Emoji Scraper Single Emoji Preview](https://i.imgur.com/AWuSdVX.png) | ![Emoji Scraper Multiple Emojis Preview](https://i.imgur.com/eq8vn0m.png) |

| User Scraper | Message Scraper | Server Scraper | Settings |
|---|---|---|---|
| ![User Scraper Preview](https://i.imgur.com/Rbgk2pE.png) | ![Message Scraper Preview](https://i.imgur.com/kl8vzXe.png) | ![Server Scraper Preview](https://i.imgur.com/DYqEZ3b.png) | ![Scraper Settings Preview](https://i.imgur.com/aKJkrw0.png) |

---

## ✨ Highlights

- **8 tools in one floating window** — Shop, Inventory, Quests, Emoji, User, Message, Server and Settings.
- **Full-quality assets** — animated avatar decorations (APNG), nameplate videos (WebM), every layer of profile effects and profile frames, plus a `layout.json` with the original timing and positioning.
- **Get items that left the shop** — download collectibles you own, even when they are no longer sold.
- **Quest rewards** — extract the avatar decorations, effects, frames and nameplates offered by Discord Quests.
- **No install, no dependencies** — pure vanilla JavaScript, runs as a bookmarklet or console snippet.
- **Account-friendly by design** — uses your normal Discord session headers, configurable delays, rate-limit handling and no automatic DM creation.
- **100% free.**

---

## 📑 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Output Structure](#-output-structure)
- [Settings](#️-settings)
- [Safety & Privacy](#-safety--privacy)
- [Technical Details](#️-technical-details)
- [Known Limitations](#-known-limitations)
- [FAQ](#-faq)
- [License](#-license)

---

## 🚀 Features

### 🛒 Shop
Captures every collectible on the Discord Shop while you browse — **Featured**, **Browse**, **search results**, **filters** and **collection pages**.

- Detects **Nameplates, Avatar Decorations, Profile Effects and Profile Frames** per card, so mixed search results are always sorted correctly.
- Reads the real product names — no more generic or duplicated file names.
- Avatar decorations are saved **animated** automatically — no hovering required.
- Profile effects include **all layers** (intro + loop), thumbnail and reduced-motion version.
- Profile frames include **all layers**, including those hidden in the small card preview.
- Bundles are skipped (they only contain preview art).
- Live counters per category, progress bar and an option to **skip items downloaded in earlier sessions**.

### 🎒 Inventory
Downloads the collectibles **you own** — the perfect way to keep items that are no longer available in the shop.

- **Entire Inventory** or **Single Asset** mode.
- Filter by category or show **only items removed from the shop**.
- Asset picker with preview thumbnails and name search.
- Export your inventory list as JSON.

### 🎯 Quests
Extracts the collectible rewards of Discord Quests.

- **All Quest Rewards** or **Single Quest Reward** mode.
- Filter by category or **only active quests**.
- Works for rewards of quests that have already ended, as long as Discord still lists them.
- Export the reward list (incl. quest name and expiry) as JSON.

### 😀 Emoji & Stickers
- **Single Emoji** — by ID, `<a:name:id>` tag or CDN link.
- **Multiple Emojis** — one per line, packed into a single ZIP.
- **Entire Server Emojis** — every custom emoji of a server.
- **Entire Server Stickers** — PNG, APNG, GIF and Lottie stickers.
- Static emojis are saved as `.png`, animated ones as `.gif`.

### 👤 User
Exports the public profile of a user, a channel's participants or a server's members.

- Username, display name, bio, pronouns, badges, Nitro / booster status, connected accounts, theme colors, profile widgets and account creation date.
- Avatar and banner in full resolution (animated when available).
- **Profile cosmetics as files:** avatar decoration, nameplate, profile effect, profile frame and server tag badge.
- Server-specific avatar and banner when used in server or channel mode.

### 💬 Message
- Exports the messages of a DM, group chat or server channel.
- Readable `messages.txt` transcript with display names, timestamps, replies, attachments, embeds and stickers.
- Machine-readable `messages.json` plus all attachments, zipped together.

### 🏠 Server
- **Live preview** of the server icon, banner and splash images — sections only appear when the server actually has them.
- Owner, member and online count, creation date, boost level, vanity URL, verification and NSFW level, emoji / sticker counts, features, roles and channel breakdown.
- Downloads icon, banner, invite splash, discovery splash, all stickers, roles and a full JSON dump.

---

## ⚡ Quick Start

> Requires a Chromium-based browser (Chrome, Edge, Brave, Opera) and being logged in to [discord.com](https://discord.com) in that browser.

### Option A — Bookmarklet (recommended)
1. Create a new bookmark in your browser.
2. Paste the complete content of `main.js` as the bookmark's URL, prefixed with `javascript:`.
3. Open `discord.com` and click the bookmark.

### Option B — Developer Console
1. Open `discord.com`.
2. Press `F12` → **Console**.
3. Paste the complete content of `main.js` and press **Enter**.

The floating window appears in the bottom-right corner. Drag it by the header, minimize it with **−** or close it with **×**.
Injecting the script again cleanly replaces the running version — no reload needed.

---

## 📦 Output Structure

Downloads are bundled into a ZIP — or saved directly into the folders you choose in **Settings**. A single file (for example one inventory item) is downloaded directly without a ZIP.

<details>
<summary><strong>Shop / Inventory / Quests</strong></summary>

```
Avatars/
├── Cat Ears Noir.png                 ← animated APNG
└── Hex's Hat.png
Nameplates/
└── Star Struck Noir.webm             ← animated video
Profiles/
└── Shattered Wings Noir/
    ├── Shattered Wings Noir_part_1.png   ← intro layer
    ├── Shattered Wings Noir_part_2.png   ← loop layer
    ├── Shattered Wings Noir_part_3.png   ← thumbnail
    ├── Shattered Wings Noir_part_4.png   ← reduced motion
    └── layout.json
Frames/
└── Vengeance Noir/
    ├── Vengeance Noir_part_1.png
    ├── Vengeance Noir_part_2.png
    ├── Vengeance Noir_part_3.png
    └── layout.json
```

**layout.json (profile effect)**
```json
{
    "itemName": "Shattered Wings Noir",
    "parts": [
        {
            "filename": "Shattered Wings Noir_part_1.png",
            "style": { "role": "effect", "layer_index": 0, "loop": false, "duration": 4000, "start": 0, "z_index": 100 }
        },
        {
            "filename": "Shattered Wings Noir_part_2.png",
            "style": { "role": "effect", "layer_index": 1, "loop": true, "duration": 3000, "start": 6000, "loop_delay": 3000, "z_index": 101 }
        }
    ]
}
```
</details>

<details>
<summary><strong>User Scraper</strong></summary>

```
username_123456789012345678/
├── data.json
├── avatar.gif
├── banner.png
└── cosmetics/
    ├── avatar_decoration.png
    ├── nameplate.webm
    ├── server_tag_badge.png
    ├── profile_effect/
    │   ├── part_1.png … part_4.png
    │   └── layout.json
    └── profile_frame/
        ├── part_1.png … part_n.png
        └── layout.json
```
</details>

<details>
<summary><strong>Message Scraper</strong></summary>

```
channel_123456789012345678/
├── messages.json
├── messages.txt
└── attachments/
    └── 1345678901234567890_screenshot.png
```

**messages.txt**
```
[2026-11-27 10:15:30 UTC] Example User (@example_user): (reply to @friend) Looks great! [attachments: screenshot.png] (edited)
```
</details>

<details>
<summary><strong>Server Scraper</strong></summary>

```
Guild Assets/
├── icon_123456789012345678.gif
├── banner_123456789012345678.png
├── splash_123456789012345678.png
├── discovery_splash_123456789012345678.png
├── Stickers/
│   └── sticker_name_987654321098765432.png
├── server_info_123456789012345678.json
└── roles_123456789012345678.txt
```
</details>

<details>
<summary><strong>Emoji & Sticker Scraper</strong></summary>

```
Emojis/
├── pepeLaugh_123456789012345678.gif   ← animated
└── thinkingFace_987654321098765432.png ← static
Stickers/
└── wave_111222333444555666.png
```
</details>

---

## ⚙️ Settings

| Setting | Description |
|---|---|
| Save folders | Separate target folder per category (Nameplates, Avatar Decorations, Profile Effects, Profile Frames). Without a folder, downloads are zipped. |
| Min / Max delay | Random pause between requests and downloads. Higher values are gentler on your account. |
| UI opacity | Transparency of the floating window. |
| Debug mode | Verbose error logging in the developer console. |

Settings are stored locally in your browser and restored automatically the next time you start the tool.

---

## 🔐 Safety & Privacy

- **Runs 100% locally.** No external servers, no telemetry, no tracking. The only network traffic goes to Discord's own API and CDN — exactly like the Discord client itself.
- **Uses your existing session.** You never paste a token. The tool reuses the logged-in session of the open Discord tab.
- **Client-like requests.** API calls carry the same client headers as the official web client, respect `Retry-After` on rate limits and use your configured delays.
- **No side effects.** The tool only reads data — it never sends messages, creates DMs, joins servers or changes your account.
- **Lookups only when you ask.** ID fields wait until you finish typing before anything is requested.

> ⚠️ **Responsible use:** This tool acts as your own account. Automating a user account is against Discord's Terms of Service, so use it moderately and at your own risk. Profile and message exports can contain other people's data — only use them where you have the right to, and never redistribute what you export.

---

## 🛠️ Technical Details

- Pure vanilla JavaScript, zero dependencies, no build step.
- Custom in-browser ZIP writer (`LabsZip`) with CRC32, local file headers, central directory and EOCD.
- Shop detection based on Discord's product cards and product data, so names, types and all asset layers are resolved reliably.
- Media type detection by file signature (PNG / APNG, GIF, WebP, JPEG, WebM, MP4).
- Exponential backoff with jitter for CDN downloads, `Retry-After` handling for the API.
- File System Access API for direct folder saving (Chromium browsers).
- Clean teardown: closing or re-injecting the tool removes all timers, listeners and hooks.

---

## 🧩 Known Limitations

- **Built for Chromium browsers.** Direct folder saving needs the File System Access API; without it, the tool falls back to ZIP downloads.
- **Quest rewards** are limited to the quests Discord currently returns for your account; rewards that are not collectibles (Orbs, game codes) contain no downloadable assets.
- **Shop layout changes** by Discord can require an update of the tool.

---

## ❓ FAQ

<details>
<summary><strong>The "Download all items" button is greyed out.</strong></summary>

It becomes active as soon as you are on a Discord Shop page and at least one product card has been detected. Scroll the page a little if items are still loading.
</details>

<details>
<summary><strong>Do I need to hover over the items?</strong></summary>

No. Animated versions, all effect layers and all frame layers are resolved automatically.
</details>

<details>
<summary><strong>Can I download items I own that are no longer in the shop?</strong></summary>

Yes — open the **Inventory** tab, click **Load Inventory** and enable *Only items removed from the shop* to see exactly those items.
</details>

<details>
<summary><strong>"Auth Error" or "could not be loaded" appears.</strong></summary>

Make sure you are logged in to Discord in the same browser tab, reload the page and start the tool again.
</details>

<details>
<summary><strong>A download failed or was rate limited.</strong></summary>

The tool retries automatically and reports failed items in the notification. If it happens often, raise the Min / Max delay in **Settings**.
</details>

<details>
<summary><strong>Does it work in Firefox or Safari?</strong></summary>

The tool is built and tested for Chromium-based browsers (Chrome, Edge, Brave, Opera). Saving directly into folders requires the File System Access API; without it, the tool automatically falls back to regular ZIP downloads.
</details>

<details>
<summary><strong>Is it really free?</strong></summary>

Yes. Rickware Labs Discord Asset Scraper is and stays free.
</details>

---

## 📜 License

**Free for personal use.**

- ✅ Free to download and use for personal, non-commercial purposes.
- ❌ Reselling, re-uploading, rebranding or distributing modified versions is not allowed.
- ❌ Commercial use is not allowed.

**Rickware Labs © 2026** — All rights reserved.

---

<div align="center">

**Made with 💜 by Rickware Labs**

[Discord](https://discord.gg/Rw-Labs) • [Website](https://rickware-labs-official.github.io/Launcher/)

</div>
