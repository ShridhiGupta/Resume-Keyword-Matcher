'use client'

import { useState } from 'react'
import AnalysisForm from '@/components/AnalysisForm'
import ResultsDisplay from '@/components/ResultsDisplay'

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (resume: string, jobDescription: string) => {
    setLoading(true)
    setAnalysisResult(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume, jobDescription }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze resume')
      }

      const data = await response.json()
      setAnalysisResult(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to analyze resume. Make sure the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Resume Keyword Matcher
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Optimize your resume for ATS systems by analyzing keyword matches with job descriptions
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnalysisForm onAnalyze={handleAnalyze} loading={loading} />
          
          {analysisResult && (
            <ResultsDisplay result={analysisResult} />
          )}
        </div>

        {/* Info Section */}
        {!analysisResult && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">Paste Your Resume</h3>
                <p className="text-sm text-gray-600">
                  Copy and paste your resume text or upload it as plain text
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">Add Job Description</h3>
                <p className="text-sm text-gray-600">
                  Paste the job description you're applying for
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">Get Analysis</h3>
                <p className="text-sm text-gray-600">
                  See matched keywords, missing skills, and match percentage
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
