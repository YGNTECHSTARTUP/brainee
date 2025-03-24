"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
// import { useRouter } from "next/navigation"
import { Droplet, Upload, Download, ArrowLeft, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Slider } from "@radix-ui/react-slider" // Update the path to the correct location of the Slider component

export default function WatermarkPage() {
//   const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [watermarkText, setWatermarkText] = useState<string>("")
  const [watermarkSymbol, setWatermarkSymbol] = useState<string>("droplet")
//   const [opacity, setOpacity] = useState<number>(30)
//   const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)
      // Reset processed file when a new file is selected
      setProcessedFileUrl(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !watermarkText) return

    setIsProcessing(true)

    try {
      // In a real application, we would upload the file and process it
      // For this demo, we'll simulate processing with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate a processed file URL
      setProcessedFileUrl(`/processed-${fileName}`)
    } catch (error) {
      console.error("Error processing document:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    // In a real application, this would download the actual processed file
    // For this demo, we'll just alert
    alert("In a real application, this would download your watermarked document.")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Droplet className="h-6 w-6 text-primary" />
            <span>WatermarkPro</span>
          </Link>
        </div>
      </header> */}
      <main className="flex-1 justify-center items-center mt-20 ">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-primary">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create Watermark</CardTitle>
                <CardDescription>Upload a document and customize your watermark</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="document">Upload Document</Label>
                    <div className="grid w-full items-center gap-1.5">
                      <div
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                          file ? "border-primary" : "border-gray-300"
                        }`}
                        onClick={() => document.getElementById("document")?.click()}
                      >
                        {file ? (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FileText className="w-8 h-8 mb-2 text-primary" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">{fileName}</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Click to change file</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, JPG, PNG (MAX. 10MB)</p>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="watermark-text">Watermark Text</Label>
                    <Input
                      id="watermark-text"
                      placeholder="Enter text for watermark"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Watermark Symbol</Label>
                    <RadioGroup
                      value={watermarkSymbol}
                      onValueChange={setWatermarkSymbol}
                      className="grid grid-cols-4 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="droplet" id="droplet" className="peer sr-only" />
                        <Label
                          htmlFor="droplet"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Droplet className="mb-3 h-6 w-6" />
                          <span className="text-xs">Droplet</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="check" id="check" className="peer sr-only" />
                        <Label
                          htmlFor="check"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Check className="mb-3 h-6 w-6" />
                          <span className="text-xs">Check</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="none" id="none" className="peer sr-only" />
                        <Label
                          htmlFor="none"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <span className="mb-3 h-6 w-6 flex items-center justify-center">-</span>
                          <span className="text-xs">None</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      {/* <Label htmlFor="opacity">Opacity: {opacity}%</Label> */}
                    </div>
                    {/* <Slider
                      id="opacity"
                      min={10}
                      max={90}
                      step={5}
                      value={[opacity]}
                      onValueChange={(value) => setOpacity(value[0])}
                    /> */}
                  </div>

                  <Button type="submit" className="w-full" disabled={!file || !watermarkText || isProcessing}>
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
              {processedFileUrl && (
                <CardFooter>
                  <Button onClick={handleDownload} variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Watermarked Document
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
      {/* <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} WatermarkPro. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  )
}

