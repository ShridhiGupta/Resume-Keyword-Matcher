# Docker Setup Guide

This guide explains how to build and run the Resume Keyword Matcher application using Docker.

## Quick Start

### Production Build

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

3. **Stop services:**
   ```bash
   docker-compose down
   ```

### Development Build (with hot reload)

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## Testing the Application

1. **Start the containers:**
   ```bash
   docker-compose up -d
   ```

2. **Check container status:**
   ```bash
   docker-compose ps
   ```

3. **View logs:**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

4. **Test backend API:**
   ```bash
   curl http://localhost:3001/health
   ```

5. **Open browser:**
   Navigate to http://localhost:3000 and test the resume matching functionality.

## Building Individual Images

### Backend
```bash
cd backend
docker build -t resume-matcher-backend .
docker run -p 3001:3001 resume-matcher-backend
```

### Frontend
```bash
cd frontend
docker build -t resume-matcher-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:3001 resume-matcher-frontend
```

## Troubleshooting

### Port Already in Use
If ports 3000 or 3001 are already in use:
```bash
# Stop existing containers
docker-compose down

# Or change ports in docker-compose.yml
ports:
  - "3002:3001"  # Change backend port
  - "3003:3000"  # Change frontend port
```

### Rebuild After Code Changes
```bash
docker-compose up --build --force-recreate
```

### Clean Up
```bash
# Stop and remove containers
docker-compose down

# Remove images
docker-compose down --rmi all

# Remove volumes (if any)
docker-compose down -v
```

### Check Container Health
```bash
# Check backend health
docker exec resume-matcher-backend node -e "require('http').get('http://localhost:3001/health', (r) => {console.log('Status:', r.statusCode)})"

# Or use curl from host
curl http://localhost:3001/health
```

## Environment Variables

### Backend
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (production/development)

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:3001)
- `NODE_ENV`: Environment (production/development)

To override, create a `.env` file or modify `docker-compose.yml`.
