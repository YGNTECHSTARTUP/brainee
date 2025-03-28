"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Label } from "@/components/ui/label"

// Simulated patent database for demonstration
const patentDatabase = [
  {
    id: "US10123456",
    title: "Method and system for artificial intelligence based text analysis",
    excerpt:
      "This patent describes a method for analyzing text using artificial intelligence algorithms to determine semantic meaning and context.",
    similarity: 0.85,
  },
  {
    id: "US20210987654",
    title: "Neural network architecture for natural language processing",
    excerpt:
      "A novel neural network architecture designed specifically for processing and understanding natural language with improved efficiency.",
    similarity: 0.72,
  },
  {
    id: "EP3456789",
    title: "System for automated document classification",
    excerpt:
      "The invention relates to systems and methods for automatically classifying documents based on their content using machine learning techniques.",
    similarity: 0.68,
  },
]

// Function to simulate checking text against patents
const checkPlagiarism = async (
  text: string,
): Promise<{
  originalityScore: number
  matches: Array<{
    id: string
    title: string
    excerpt: string
    similarity: number
  }>
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Simple simulation logic - in a real app, this would be a proper API call
  const lowercaseText = text.toLowerCase()

  // Check for specific keywords to trigger different results
  if (lowercaseText.includes("artificial intelligence") || lowercaseText.includes("machine learning")) {
    return {
      originalityScore: 0.25,
      matches: patentDatabase.filter((p) => p.similarity > 0.7),
    }
  } else if (lowercaseText.includes("neural") || lowercaseText.includes("network")) {
    return {
      originalityScore: 0.45,
      matches: [patentDatabase[1]],
    }
  } else if (lowercaseText.length < 50) {
    return {
      originalityScore: 0.95,
      matches: [],
    }
  } else {
    // Default response for other inputs
    return {
      originalityScore: 0.78,
      matches: [patentDatabase[2]],
    }
  }
}

export default function PlagiarismChecker() {
  const [text, setText] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [results, setResults] = useState<{
    originalityScore: number
    matches: Array<{
      id: string
      title: string
      excerpt: string
      similarity: number
    }>
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) {
      setError("Please enter some text to check")
      return
    }

    setIsChecking(true)
    setError(null)
    setProgress(0)

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress > 90 ? 90 : newProgress
      })
    }, 300)

    try {
      const result = await checkPlagiarism(text)
      setResults(result)
      setProgress(100)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred while checking for plagiarism. Please try again.")
    } finally {
      clearInterval(progressInterval)
      setIsChecking(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600 dark:text-green-400"
    if (score >= 0.5) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
    if (score >= 0.5) return <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
    return <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-950 text-white">
    <main className="flex-1 flex justify-center items-start mt-16 px-4">
      <div className="container max-w-3xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-blue-400 transition">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </div>
  
        {/* Glassmorphism Card Wrapper */}
        <Card className="bg-gradient-to-r p-16 from-[#1a1a40] via-[#1a1a60] to-[#0d0d2a] border border-indigo-500/30 shadow-lg shadow-indigo-500/20 rounded-2xl  transition-all duration-300 hover:shadow-indigo-500/40">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-400">Patent Plagiarism Checker</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your text to check for similar patents
            </CardDescription>
          </CardHeader>
  
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 text-left">
                <Label htmlFor="text-input" className="text-blue-300">
                  Enter your text to check for patent plagiarism
                </Label>
                <Textarea
                  id="text-input"
                  placeholder="Enter your invention description, technical concept, or patent idea here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px] resize-y bg-black/40 border border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                  disabled={isChecking}
                />
                <p className="text-xs text-gray-400">
                  Minimum 50 characters recommended for accurate results
                </p>
              </div>
  
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300"
                disabled={isChecking || !text.trim()}
              >
                {isChecking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Check for Plagiarism"
                )}
              </Button>
            </form>
  
            {isChecking && (
              <div className="space-y-2 mt-6">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Analyzing text...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-green-500" />
              </div>
            )}
  
            {error && (
              <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
  
          {results && !isChecking && (
            <CardFooter className="flex flex-col space-y-6 mt-6 w-full">
              <div className="w-full p-4 bg-black/20 border border-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-blue-300">Originality Score</h3>
                    <p className={`text-3xl font-bold ${getScoreColor(results.originalityScore)}`}>
                      {Math.round(results.originalityScore * 100)}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getScoreIcon(results.originalityScore)}
                    <span className="font-medium">
                      {results.originalityScore >= 0.8
                        ? "Likely Original"
                        : results.originalityScore >= 0.5
                          ? "Potentially Similar"
                          : "High Similarity Detected"}
                    </span>
                  </div>
                </div>
              </div>
  
              <div className="w-full">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  {results.matches.length
                    ? `Similar Patents Found (${results.matches.length})`
                    : "No Similar Patents Found"}
                </h3>
  
                {results.matches.length > 0 ? (
                  <div className="space-y-4">
                    {results.matches.map((match) => (
                      <Card key={match.id} className="bg-black/20 border border-gray-600 rounded-lg">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-lg text-white">{match.title}</h4>
                              <p className="text-sm text-gray-400">Patent ID: {match.id}</p>
                            </div>
                            <div className="bg-black/30 px-2 py-1 rounded text-sm">
                              <span className="font-medium text-white">Similarity: </span>
                              <span className={getScoreColor(match.similarity)}>
                                {Math.round(match.similarity * 100)}%
                              </span>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-300">{match.excerpt}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <p className="text-green-200">
                        Your text appears to be original. No similar patents were found in our database.
                      </p>
                    </div>
                  </div>
                )}
              </div>
  
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
                <h3 className="text-lg font-medium text-blue-200 mb-2">Disclaimer</h3>
                <p className="text-blue-300 text-sm">
                  This tool provides a preliminary assessment only. For comprehensive patent searches, consult with a
                  qualified patent attorney or professional. Results are not legal advice.
                </p>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </main>
  </div>
  
  )
}

