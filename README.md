# Node.js Practice Projects

A collection of small Node.js projects built while learning backend development with Express, MongoDB, Socket.IO and Discord.js.

| Project | What it does | Tech |
|---|---|---|
| [`url_shortner`](./url_shortner) | URL shortener with login and click analytics | Express, MongoDB, JWT, EJS |
| [`realtime-chat-app`](./realtime-chat-app) | Real-time group chat | Express, Socket.IO |
| [`file-upload-app`](./file-upload-app) | File upload form | Express, Multer, EJS |
| [`discord_bot`](./discord_bot) | Basic Discord bot with message and slash-command handling | Discord.js |

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally on `mongodb://127.0.0.1:27017` (only for `url_shortner`)

Each project is independent. To run one:

```bash
cd <project-folder>
npm install
node index.js        # or: npm start (uses nodemon, where available)
```

---

## 1. url_shortner

A URL shortening service where logged-in users can create short links and track how many times each one is clicked.

**Features**
- Sign up and log in (JWT-based authentication)
- Generate a short ID for any URL (using `shortid`)
- Redirect from a short link to the original URL (`/url/:shortid`)
- Visit history (timestamps) stored per link, with an analytics endpoint
- All `/url` routes are protected by a login-check middleware (reads the `uid` cookie)
- Server-rendered pages with EJS

**Run**

```bash
cd url_shortner
npm install
npm start
```

Runs on **http://localhost:8001**. Make sure MongoDB is running (database: `short_url`).

**Routes**

| Method | Route | Description |
|---|---|---|
| GET | `/` | Home page |
| GET | `/signup`, `/login` | Auth pages |
| POST | `/user` | Create a new user |
| POST | `/user/login` | Log in |
| POST | `/url` | Create a short URL (login required) |
| GET | `/url/:shortid` | Redirect to the original URL and record the visit (login required) |
| GET | `/url/analytics/:shortId` | Total clicks and visit timestamps (login required) |

**Structure:** `controllers/`, `models/`, `routes/`, `middlewares/`, `services/`, `views/`

---

## 2. realtime-chat-app

A simple real-time chat app. Any message sent by one connected user is broadcast to everyone.

**Features**
- Real-time messaging with Socket.IO
- Static front end served by Express

**Run**

```bash
cd realtime-chat-app
npm install
node index.js
```

Open **http://localhost:9000** in two or more browser tabs and send messages between them.

---

## 3. file-upload-app

Demonstrates handling `multipart/form-data` file uploads with Multer.

**Features**
- HTML form (EJS) to pick and upload a file
- Files saved to the `uploads/` folder (Multer gives them a random filename)
- Includes a second Multer config that keeps the original filename with a timestamp prefix (`diskStorage`), ready to swap in

**Run**

```bash
cd file-upload-app
npm install
mkdir uploads        # if it doesn't exist
npx nodemon index.js   # or: node index.js
```

Open **http://localhost:8000**, choose a file and click **Upload**.

---

## 4. discord_bot

A starter Discord bot built with Discord.js v14.

**Features**
- Replies to messages in a channel (ignores other bots)
- `create <url>` message command (placeholder for connecting to the URL shortener)
- Slash command registration (`/create`) and a `Pong!!` interaction reply

**Setup**

1. Create an application and bot at the [Discord Developer Portal](https://discord.com/developers/applications).
2. Enable the **Message Content Intent** under the bot settings.
3. Invite the bot to your server using the OAuth2 URL generator.
4. Create a `.env` file in `discord_bot/` (never commit it):

   ```
   DISCORD_TOKEN=your_bot_token
   CLIENT_ID=your_application_id
   ```

5. Load these values in the code via `process.env.DISCORD_TOKEN` and `process.env.CLIENT_ID`
   (for example with `node --env-file=.env index.js` on Node 20+, or the `dotenv` package).

**Run**

```bash
cd discord_bot
npm install
node command.js      # registers slash commands (run once)
npm start            # starts the bot
```

---

## Notes

These are learning projects, not production code. Known limitations:
- In `url_shortner`, `/user/login` returns the JWT as JSON; to use it with the browser pages, set it as the `uid` cookie (the `res.cookie('uid', token)` line is currently commented out).
- `url_shortner` stores passwords in plain text and needs hashing (e.g. bcrypt) before real use.
- Secrets (JWT secret, Discord token) should come from environment variables, not source code.
