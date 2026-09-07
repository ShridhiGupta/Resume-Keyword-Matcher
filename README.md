# Resume Keyword Matcher

A lightweight ATS-style full-stack web application that analyzes a candidate’s resume against a job description and calculates a keyword match percentage. The system highlights matched and missing skills to help candidates optimize resumes for automated screening systems used by recruiters.

---

## How It Works

1. User pastes resume text and job description
2. Backend preprocesses both inputs:
   - Converts text to lowercase
   - Removes punctuation and stop words
   - Tokenizes text into keywords
3. Keywords from the resume are matched against job description keywords
4. The system calculates:
   - Match percentage
   - Matched keywords
   - Missing keywords
5. Results are returned to the frontend and displayed in a clean UI

---

## Key Features

- Paste resume and job description text
- ATS-style keyword matching logic
- Match percentage calculation
- Highlighted matched and missing skills
- Clean and responsive UI
- Backend API for text analysis
- Dockerized for easy deployment

---

## Tech Stack

### Frontend
- Next.js (React)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js

### Core Logic
- Text preprocessing
- Keyword extraction
- Frequency-based matching

### DevOps & Deployment
- Docker & Docker Compose
- Vercel (Frontend)
- Render / Railway (Backend)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- Docker (optional)

---

## Installation

### Option 1: Install all dependencies at once
```bash
npm run install:all
