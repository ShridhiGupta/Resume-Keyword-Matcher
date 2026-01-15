const express = require('express');
const cors = require('cors');
const { analyzeResume } = require('./utils/textProcessor');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Resume Matcher API is running' });
});

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        error: 'Both resume and jobDescription are required'
      });
    }

    const analysis = analyzeResume(resume, jobDescription);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({
      error: 'Failed to analyze resume',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
