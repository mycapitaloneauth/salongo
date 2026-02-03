# Railway deployment

Steps to deploy this Node.js backend to Railway from GitHub:

1. Commit and push this repository to GitHub.
2. On Railway (https://railway.app) create a new project and choose "Deploy from GitHub".
3. Select this repository and the branch to deploy.
4. Set the environment variables in Railway Project Settings:
   - `BOT_TOKEN` - your Telegram bot token
   - `CHAT_ID` - the chat id to send messages to
   - (optional) `PORT` - default 3000 if unset
5. Railway will detect `package.json` and run `npm start`. If you prefer Docker, enable Dockerfile-based deployment.

Local run:

```powershell
npm install
npm start
```
