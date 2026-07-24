"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Image, Upload, X, Play, FileAudio, FileImage } from "lucide-react"
import { cn } from "@/lib/utils"

export function PlaygroundsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#eef1fb]">Playgrounds</h1>
        <p className="text-[#9aa3c9] mt-1">
          Experiment with Voice and OCR capabilities
        </p>
      </div>

      <Tabs defaultValue="voice" className="w-full">
        <TabsList className="bg-[#1b2340] mb-6">
          <TabsTrigger value="voice" className="data-[state=active]:bg-[#6d4de0] data-[state=active]:text-[#f4f6ff] text-[#eef1fb]">
            <Mic className="w-4 h-4 mr-2" />
            Voice
          </TabsTrigger>
          <TabsTrigger value="ocr" className="data-[state=active]:bg-[#6d4de0] data-[state=active]:text-[#f4f6ff] text-[#eef1fb]">
            <Image className="w-4 h-4 mr-2" />
            OCR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice">
          <VoicePlayground />
        </TabsContent>

        <TabsContent value="ocr">
          <OcrPlayground />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function VoicePlayground() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && (file.type.startsWith("audio/") || file.name.endsWith(".mp3") || file.name.endsWith(".wav"))) {
      setAudioFile(file)
      setResult(null)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      setResult(null)
    }
  }

  const handleProcess = () => {
    if (!audioFile) return
    setProcessing(true)
    
    // Simulate processing
    setTimeout(() => {
      setResult(`Transcription Result:\n\n"This is a simulated transcription of the audio file: ${audioFile.name}. The actual Voice-to-Text processing would convert your audio content to text using our AI models."`)
      setProcessing(false)
    }, 2000)
  }

  const clearFile = () => {
    setAudioFile(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-[#2a3358] bg-[#131a2e]">
        <CardHeader>
          <CardTitle className="text-[#eef1fb]">Voice to Text</CardTitle>
          <CardDescription className="text-[#9aa3c9]">
            Upload an audio file to transcribe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.ogg"
            className="hidden"
            onChange={handleFileSelect}
          />
          
          {!audioFile ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                isDragging 
                  ? "border-[#7c5cff] bg-[#7c5cff]/5" 
                  : "border-[#2a3358] hover:border-[#7c5cff]/50 bg-[#1b2340]"
              )}
            >
              <Upload className="w-12 h-12 mx-auto text-[#9aa3c9] mb-4" />
              <p className="text-sm text-[#eef1fb] font-medium mb-1">
                Drag and drop audio file here
              </p>
              <p className="text-xs text-[#9aa3c9]">
                or click to browse (MP3, WAV, M4A, OGG)
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-[#2a3358] p-4 bg-[#241f4d]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#7c5cff]/20 flex items-center justify-center">
                  <FileAudio className="w-6 h-6 text-[#7c5cff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#eef1fb] truncate">
                    {audioFile.name}
                  </p>
                  <p className="text-xs text-[#9aa3c9]">
                    {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFile}
                  className="shrink-0 text-[#9aa3c9] hover:bg-[#1b2340]"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                onClick={handleProcess}
                disabled={processing}
                className="w-full mt-4 bg-[#6d4de0] text-[#f4f6ff] hover:bg-[#6d4de0]/90"
              >
                {processing ? (
                  "Processing..."
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Transcribe Audio
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-[#2a3358] bg-[#131a2e]">
        <CardHeader>
          <CardTitle className="text-[#eef1fb]">Result</CardTitle>
          <CardDescription className="text-[#9aa3c9]">
            Transcription output will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="rounded-lg bg-[#241f4d] border border-[#2a3358] p-4">
              <pre className="text-sm text-[#eef1fb] whitespace-pre-wrap font-sans">
                {result}
              </pre>
            </div>
          ) : (
            <div className="rounded-lg bg-[#1b2340] border border-[#2a3358] p-12 text-center">
              <Mic className="w-12 h-12 mx-auto text-[#9aa3c9] mb-4" />
              <p className="text-sm text-[#9aa3c9]">
                Upload an audio file to see the transcription
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function OcrPlayground() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setResult(null)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setResult(null)
    }
  }

  const handleProcess = () => {
    if (!imageFile) return
    setProcessing(true)
    
    // Simulate processing
    setTimeout(() => {
      setResult(`OCR Result:\n\nExtracted text from "${imageFile.name}":\n\n"This is simulated OCR output. The actual OCR processing would extract all visible text from your uploaded image using our typhoon-ocr model. This includes printed text, handwritten content, and text from documents, receipts, signs, etc."`)
      setProcessing(false)
    }, 2000)
  }

  const clearFile = () => {
    setImageFile(null)
    setImagePreview(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-[#2a3358] bg-[#131a2e]">
        <CardHeader>
          <CardTitle className="text-[#eef1fb]">Image to Text (OCR)</CardTitle>
          <CardDescription className="text-[#9aa3c9]">
            Upload an image to extract text
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.gif,.webp"
            className="hidden"
            onChange={handleFileSelect}
          />
          
          {!imageFile ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                isDragging 
                  ? "border-[#7c5cff] bg-[#7c5cff]/5" 
                  : "border-[#2a3358] hover:border-[#7c5cff]/50 bg-[#1b2340]"
              )}
            >
              <Upload className="w-12 h-12 mx-auto text-[#9aa3c9] mb-4" />
              <p className="text-sm text-[#eef1fb] font-medium mb-1">
                Drag and drop image here
              </p>
              <p className="text-xs text-[#9aa3c9]">
                or click to browse (PNG, JPG, GIF, WebP)
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-[#2a3358] p-4 bg-[#241f4d]">
              <div className="flex items-start gap-3">
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-24 h-24 object-cover rounded-lg border border-[#2a3358]"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#eef1fb] truncate">
                    {imageFile.name}
                  </p>
                  <p className="text-xs text-[#9aa3c9]">
                    {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFile}
                  className="shrink-0 text-[#9aa3c9] hover:bg-[#1b2340]"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                onClick={handleProcess}
                disabled={processing}
                className="w-full mt-4 bg-[#6d4de0] text-[#f4f6ff] hover:bg-[#6d4de0]/90"
              >
                {processing ? (
                  "Processing..."
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Extract Text
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-[#2a3358] bg-[#131a2e]">
        <CardHeader>
          <CardTitle className="text-[#eef1fb]">Result</CardTitle>
          <CardDescription className="text-[#9aa3c9]">
            Extracted text will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="rounded-lg bg-[#241f4d] border border-[#2a3358] p-4">
              <pre className="text-sm text-[#eef1fb] whitespace-pre-wrap font-sans">
                {result}
              </pre>
            </div>
          ) : (
            <div className="rounded-lg bg-[#1b2340] border border-[#2a3358] p-12 text-center">
              <FileImage className="w-12 h-12 mx-auto text-[#9aa3c9] mb-4" />
              <p className="text-sm text-[#9aa3c9]">
                Upload an image to see the extracted text
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
