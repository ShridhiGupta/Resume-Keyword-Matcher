'use client'

interface AnalysisResult {
  overallMatchPercentage: number
  keywordMatchPercentage: number
  skillMatchPercentage: number
  matchedKeywords: Array<{ keyword: string; frequency: number; jobFrequency: number }>
  missingKeywords: Array<{ keyword: string; frequency: number }>
  matchedSkills: string[]
  missingSkills: string[]
  stats: {
    totalJobKeywords: number
    matchedKeywordCount: number
    totalJobSkills: number
    matchedSkillCount: number
    resumeKeywordCount: number
    resumeSkillCount: number
  }
}

interface ResultsDisplayProps {
  result: AnalysisResult
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600 bg-green-100'
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Analysis Results
      </h2>

      {/* Overall Match Percentage */}
      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getMatchColor(result.overallMatchPercentage)} mb-4`}>
          <span className="text-4xl font-bold">{result.overallMatchPercentage}%</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Overall Match</h3>
        <p className="text-sm text-gray-600">
          {result.overallMatchPercentage >= 70
            ? 'Great match! Your resume aligns well with the job description.'
            : result.overallMatchPercentage >= 50
            ? 'Good match, but there\'s room for improvement.'
            : 'Consider adding more relevant keywords and skills.'}
        </p>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{result.keywordMatchPercentage}%</div>
          <div className="text-sm text-gray-600">Keyword Match</div>
          <div className="text-xs text-gray-500 mt-1">
            {result.stats.matchedKeywordCount} / {result.stats.totalJobKeywords} keywords
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{result.skillMatchPercentage}%</div>
          <div className="text-sm text-gray-600">Skill Match</div>
          <div className="text-xs text-gray-500 mt-1">
            {result.stats.matchedSkillCount} / {result.stats.totalJobSkills} skills
          </div>
        </div>
      </div>

      {/* Matched Skills */}
      {result.matchedSkills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Matched Skills ({result.matchedSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matchedSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {result.missingSkills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Missing Skills ({result.missingSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Consider adding these skills to your resume if you have experience with them
          </p>
        </div>
      )}

      {/* Top Matched Keywords */}
      {result.matchedKeywords.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Top Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matchedKeywords.slice(0, 20).map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                title={`Appears ${item.frequency} time(s) in resume, ${item.jobFrequency} time(s) in job description`}
              >
                {item.keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Missing Keywords */}
      {result.missingKeywords.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Important Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missingKeywords.slice(0, 20).map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                title={`Appears ${item.frequency} time(s) in job description`}
              >
                {item.keyword}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 These keywords appear frequently in the job description but not in your resume
          </p>
        </div>
      )}
    </div>
  )
}
