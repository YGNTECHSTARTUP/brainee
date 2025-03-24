import PlagiarismChecker from "../components/plagrism-a"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Patent Plagiarism Checker
        </h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
          Check if your text already exists in Google Patents database
        </p>
        <PlagiarismChecker />
      </div>
    </main>
  )
}

