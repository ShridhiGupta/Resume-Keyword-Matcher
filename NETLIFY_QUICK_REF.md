# Netlify Deployment - Quick Reference

## 📋 Netlify Form Settings

When deploying via Netlify UI, use these settings:

### Build Settings

| Field | Value |
|-------|-------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | *(Leave empty - Netlify plugin handles it)* |

**Note:** The `netlify.toml` file automatically configures the `@netlify/plugin-nextjs` plugin.

### Environment Variables (Click "Add environment variables")

Add this variable:

1. **Variable name**: `NEXT_PUBLIC_API_URL`  
   **Value**: `https://your-backend-url.com`  
   *(Replace with your actual backend URL after deploying backend)*

### Functions Directory
Leave as default: `netlify/functions` (not needed for this app)

---

## ⚡ Quick Steps

1. **Connect Repository** ✅
2. **Set Base directory**: `frontend`
3. **Set Build command**: `npm run build`
4. **Set Publish directory**: *(Leave empty)*
5. **Add Environment Variable**:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
6. **Click "Deploy"** 🚀

**Note:** The `@netlify/plugin-nextjs` plugin is automatically installed from `netlify.toml`

---

## ⚠️ Important

- The `netlify.toml` file should auto-configure most settings
- **Backend must be deployed first** (Render/Railway/Heroku)
- Update `NEXT_PUBLIC_API_URL` after backend is live
- Test the backend health endpoint: `https://your-backend.com/health`

---

## 🔍 After Deployment

1. Check build logs for any errors
2. Test the site: `https://resume-keyword-matcher.netlify.app`
3. Open browser console to verify API calls work
4. Test with sample resume and job description
