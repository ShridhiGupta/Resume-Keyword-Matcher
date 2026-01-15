/**
 * Text preprocessing and keyword extraction utilities
 */

// Common stop words to filter out
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they', 'have',
  'had', 'what', 'said', 'each', 'which', 'their', 'time', 'if',
  'up', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her',
  'would', 'make', 'like', 'into', 'him', 'has', 'two', 'more',
  'very', 'after', 'words', 'long', 'than', 'first', 'been', 'call',
  'who', 'oil', 'sit', 'now', 'find', 'down', 'day', 'did', 'get',
  'come', 'made', 'may', 'part'
]);

// Common technical skills keywords (can be expanded)
const SKILL_KEYWORDS = [
  'javascript', 'python', 'java', 'react', 'node', 'express', 'sql',
  'mongodb', 'postgresql', 'aws', 'docker', 'kubernetes', 'git',
  'typescript', 'angular', 'vue', 'html', 'css', 'tailwind', 'bootstrap',
  'redux', 'graphql', 'rest', 'api', 'microservices', 'ci/cd', 'jenkins',
  'terraform', 'linux', 'agile', 'scrum', 'machine learning', 'ai',
  'data science', 'analytics', 'tableau', 'power bi', 'excel', 'r',
  'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'spark',
  'hadoop', 'kafka', 'redis', 'elasticsearch', 'nginx', 'apache',
  'php', 'ruby', 'rails', 'django', 'flask', 'spring', 'net', 'c#',
  'c++', 'go', 'rust', 'swift', 'kotlin', 'scala', 'php', 'laravel',
  'next.js', 'gatsby', 'webpack', 'babel', 'jest', 'cypress', 'selenium',
  'jira', 'confluence', 'slack', 'figma', 'adobe', 'photoshop', 'illustrator'
];

/**
 * Preprocess text: lowercase, remove punctuation, split into words
 */
function preprocessText(text) {
  if (!text || typeof text !== 'string') return [];
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .split(' ')
    .filter(word => word.length > 2); // Filter out very short words
}

/**
 * Extract keywords from text
 */
function extractKeywords(text) {
  const words = preprocessText(text);
  const keywordMap = new Map();
  
  words.forEach(word => {
    // Skip stop words
    if (STOP_WORDS.has(word)) return;
    
    // Count word frequency
    keywordMap.set(word, (keywordMap.get(word) || 0) + 1);
  });
  
  return keywordMap;
}

/**
 * Extract skill keywords from text (both single words and phrases)
 */
function extractSkills(text) {
  const lowerText = text.toLowerCase();
  const foundSkills = new Set();
  
  // Check for multi-word skills first
  SKILL_KEYWORDS.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.add(skill.toLowerCase());
    }
  });
  
  // Also extract single-word technical terms
  const words = preprocessText(text);
  words.forEach(word => {
    // Check if word matches any skill keyword
    SKILL_KEYWORDS.forEach(skill => {
      if (skill.toLowerCase() === word || skill.toLowerCase().includes(word)) {
        foundSkills.add(skill.toLowerCase());
      }
    });
  });
  
  return Array.from(foundSkills);
}

/**
 * Calculate match percentage and analyze resume against job description
 */
function analyzeResume(resume, jobDescription) {
  // Extract keywords from both texts
  const resumeKeywords = extractKeywords(resume);
  const jobKeywords = extractKeywords(jobDescription);
  
  // Extract skills
  const resumeSkills = extractSkills(resume);
  const jobSkills = extractSkills(jobDescription);
  
  // Calculate matched keywords
  const matchedKeywords = [];
  const missingKeywords = [];
  
  jobKeywords.forEach((frequency, keyword) => {
    if (resumeKeywords.has(keyword)) {
      matchedKeywords.push({
        keyword,
        frequency: resumeKeywords.get(keyword),
        jobFrequency: frequency
      });
    } else {
      missingKeywords.push({
        keyword,
        frequency
      });
    }
  });
  
  // Calculate matched skills
  const matchedSkills = resumeSkills.filter(skill => 
    jobSkills.some(jobSkill => 
      jobSkill.includes(skill) || skill.includes(jobSkill)
    )
  );
  
  const missingSkills = jobSkills.filter(jobSkill =>
    !resumeSkills.some(resumeSkill =>
      resumeSkill.includes(jobSkill) || jobSkill.includes(resumeSkill)
    )
  );
  
  // Calculate match percentage
  const totalJobKeywords = jobKeywords.size;
  const matchedCount = matchedKeywords.length;
  const keywordMatchPercentage = totalJobKeywords > 0
    ? Math.round((matchedCount / totalJobKeywords) * 100)
    : 0;
  
  // Calculate skill match percentage
  const totalJobSkills = jobSkills.length;
  const matchedSkillsCount = matchedSkills.length;
  const skillMatchPercentage = totalJobSkills > 0
    ? Math.round((matchedSkillsCount / totalJobSkills) * 100)
    : 0;
  
  // Overall match percentage (weighted: 60% keywords, 40% skills)
  const overallMatchPercentage = Math.round(
    keywordMatchPercentage * 0.6 + skillMatchPercentage * 0.4
  );
  
  // Sort matched keywords by job frequency (most important first)
  matchedKeywords.sort((a, b) => b.jobFrequency - a.jobFrequency);
  
  // Sort missing keywords by frequency (most important first)
  missingKeywords.sort((a, b) => b.frequency - a.frequency);
  
  return {
    overallMatchPercentage,
    keywordMatchPercentage,
    skillMatchPercentage,
    matchedKeywords: matchedKeywords.slice(0, 50), // Top 50 matches
    missingKeywords: missingKeywords.slice(0, 50), // Top 50 missing
    matchedSkills,
    missingSkills,
    stats: {
      totalJobKeywords,
      matchedKeywordCount: matchedCount,
      totalJobSkills,
      matchedSkillCount: matchedSkillsCount,
      resumeKeywordCount: resumeKeywords.size,
      resumeSkillCount: resumeSkills.length
    }
  };
}

module.exports = {
  analyzeResume,
  extractKeywords,
  extractSkills,
  preprocessText
};
