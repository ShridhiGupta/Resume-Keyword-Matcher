# Netlify Deployment Guide

This guide explains how to deploy the Resume Keyword Matcher frontend to Netlify.

## ⚠️ Important Notes

**Netlify is deploying the FRONTEND only.** The backend needs to be deployed separately to:
- Render
- Railway
- Heroku
- Or any Node.js hosting service

After deploying the backend, update the `NEXT_PUBLIC_API_URL` environment variable in Netlify to point to your backend URL.

---

## 🚀 Quick Deploy Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider (GitHub, GitLab, etc.)
   - Select the `Resume-Keyword-Matcher` repository

2. **Configure Build Settings**
   
   The `netlify.toml` file should auto-detect, but verify these settings:
   
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/out`
   - **Node version**: `18`

3. **Set Environment Variables**
   
   Click "Add environment variable" and add:
   
   ```
   NEXT_PUBLIC_NETLIFY=true
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```
   
   Replace `https://your-backend-url.com` with your actual backend URL.

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at `https://resume-keyword-matcher.netlify.app`

### Option 2: Manual Configuration

If auto-detection doesn't work, manually set:

**Build settings:**
- Base directory: `frontend`
- Build command: `NEXT_PUBLIC_NETLIFY=true npm run build`
- Publish directory: `frontend/out`

**Environment variables:**
- `NEXT_PUBLIC_NETLIFY=true`
- `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
- `NODE_VERSION=18`

---

## 🔧 Build Configuration

The `netlify.toml` file in the root directory contains:

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "frontend/out"

[build.environment]
  NODE_VERSION = "18"
  NEXT_PUBLIC_NETLIFY = "true"
```

---

## 🌐 Backend Deployment

Before deploying the frontend, deploy your backend:

### Render
1. Create new Web Service
2. Connect repository
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Copy the service URL

### Railway
1. Create new project
2. Deploy from GitHub
3. Set root directory to `backend`
4. Railway auto-detects Node.js
5. Copy the service URL

### Update Netlify Environment Variable
After backend is deployed, update `NEXT_PUBLIC_API_URL` in Netlify:
- Site settings → Environment variables
- Update `NEXT_PUBLIC_API_URL` to your backend URL

---

## ✅ Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Backend health check works: `https://your-backend.com/health`
- [ ] `NEXT_PUBLIC_API_URL` is set in Netlify
- [ ] `NEXT_PUBLIC_NETLIFY=true` is set
- [ ] Frontend build completes successfully
- [ ] Test the application: paste resume and job description
- [ ] Verify API calls work (check browser console)

---

## 🐛 Troubleshooting

### Build Fails
- Check Node version is 18+
- Verify `frontend/package.json` exists
- Check build logs in Netlify dashboard

### API Calls Fail
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend CORS settings allow your Netlify domain
- Test backend URL directly: `curl https://your-backend.com/health`

### 404 Errors
- Verify `publish` directory is `frontend/out`
- Check `netlify.toml` redirect rules

### CORS Issues
Update backend `server.js` to allow your Netlify domain:
```javascript
app.use(cors({
  origin: ['https://resume-keyword-matcher.netlify.app', 'http://localhost:3000']
}));
```

---

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_NETLIFY` | Yes | Enables static export | `true` |
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL | `https://api.example.com` |
| `NODE_VERSION` | No | Node.js version | `18` |

---

## 🔗 Useful Links

- [Netlify Docs](https://docs.netlify.com/)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [Render Deployment](https://render.com/docs/deploy-node)
- [Railway Deployment](https://docs.railway.app/deploy/builds)
