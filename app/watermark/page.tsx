"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Droplet, Upload, ArrowLeft, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function WatermarkPage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [watermarkText, setWatermarkText] = useState<string>("")
  const [watermarkSymbol, setWatermarkSymbol] = useState<string>("droplet")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setProcessedFileUrl(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !watermarkText) return
    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setProcessedFileUrl(`/processed-${fileName}`)
    } catch (error) {
      console.error("Error processing document:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (processedFileUrl) {
      const link = document.createElement("a");
      link.href = processedFileUrl;
      link.download = "project.pdf"; // Correct filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-950 text-white">
      <main className="flex-1 flex justify-center items-center mt-16">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-blue-400 transition">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <Card className="bg-gradient-to-r from-[#1a1a40] via-[#1a1a60] to-[#0d0d2a] border border-indigo-500/30 shadow-lg shadow-indigo-500/20 rounded-2xl p-4 transition-all duration-300 hover:shadow-indigo-500/40">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-blue-400">Create Watermark</CardTitle>
                <CardDescription className="text-gray-300">Upload a document and customize your watermark</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Upload Document */}
                  <div className="space-y-2 text-left">
                    <Label htmlFor="document" className="text-blue-300">Upload Document</Label>
                    <div
                      className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
                        file ? "border-blue-500 bg-black/30" : "border-gray-500 hover:border-blue-400 bg-black/20 hover:bg-black/30"
                      }`}
                      onClick={() => document.getElementById("document")?.click()}
                    >
                      {file ? (
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="w-8 h-8 mb-2 text-blue-400" />
                          <p className="mb-1 text-sm">{fileName}</p>
                          <p className="text-xs text-gray-400">Click to change file</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-1 text-sm text-gray-400">
                            <span className="font-semibold text-blue-300">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG (MAX. 10MB)</p>
                        </div>
                      )}
                    </div>
                    <Input
                      id="document"
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Watermark Text */}
                  <div className="space-y-2 text-left">
                    <Label htmlFor="watermark-text" className="text-blue-300">Watermark Text</Label>
                    <Input
                      id="watermark-text"
                      placeholder="Enter text for watermark"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="bg-black/40 border border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Watermark Symbol */}
                  <div className="space-y-2 text-left">
                    <Label className="text-blue-300">Watermark Symbol</Label>
                    <RadioGroup
                      value={watermarkSymbol}
                      onValueChange={setWatermarkSymbol}
                      className="grid grid-cols-3 gap-4"
                    >
                      {[
                        { value: "droplet", label: "Droplet", icon: <Droplet className="h-6 w-6" /> },
                        { value: "check", label: "Check", icon: <Check className="h-6 w-6" /> },
                        { value: "none", label: "None", icon: <span className="h-6 w-6 flex items-center justify-center">-</span> },
                      ].map((option) => (
                        <div key={option.value} className="bg-black/20 rounded-md p-1">
                          <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                          <Label
                            htmlFor={option.value}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-600 p-4 text-white hover:bg-black/30 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-black/40 transition-all duration-200"
                          >
                            {option.icon}
                            <span className="text-xs mt-2 text-white">{option.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300"
                    disabled={!file || !watermarkText || isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Process Document
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>

              {/* Download Button */}
              {processedFileUrl && (
  <div className="flex items-center justify-center mt-4">
    <Button
      onClick={handleDownload}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300"
    >
      Download Processed File
    </Button>
  </div>
)}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
