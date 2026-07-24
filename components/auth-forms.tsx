"use client"

import { useState } from "react"
import Image from "next/image"
import { useApp } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const { login } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    
    const success = login(email, password)
    if (!success) {
      setError("Invalid credentials or account suspended")
    }
  }

  return (
    <Card className="w-full max-w-md border-[#2a3358] bg-[#131a2e] shadow-[0_8px_40px_-8px_rgba(109,77,224,0.35)]">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4 anim-fade-in-up" style={{ animationDelay: "0ms" }}>
          <Image src="/haru-logo.png" alt="Haru AI" width={80} height={80} />
        </div>
        <CardTitle
          className="font-display text-2xl font-semibold text-[#eef1fb] anim-fade-in-up"
          style={{ animationDelay: "90ms" }}
        >
          Welcome Back
        </CardTitle>
        <CardDescription className="text-[#9aa3c9] anim-fade-in-up" style={{ animationDelay: "150ms" }}>
          Sign in to Haru AI Hub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="anim-fade-in-up" style={{ animationDelay: "220ms" }}>
            <Field>
              <FieldLabel htmlFor="email" className="text-[#eef1fb]">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="admin@admin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1b2340] border-[#2a3358] text-[#eef1fb] placeholder:text-[#9aa3c9]"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-[#eef1fb]">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1b2340] border-[#2a3358] text-[#eef1fb] placeholder:text-[#9aa3c9]"
              />
            </Field>
          </FieldGroup>

          {error && (
            <p className="text-[#ff5d7a] text-sm mt-2 anim-fade-in-up">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full mt-6 bg-[#6d4de0] text-[#f4f6ff] hover:bg-[#6d4de0]/90 anim-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            Sign In
          </Button>

          <p className="text-center text-sm text-[#9aa3c9] mt-4 anim-fade-in-up" style={{ animationDelay: "360ms" }}>
            {"Don't have an account? "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#7c5cff] hover:underline font-medium"
            >
              Register
            </button>
          </p>

          <div
            className="mt-4 p-3 rounded-lg bg-[#241f4d] border border-[#2a3358] anim-fade-in-up"
            style={{ animationDelay: "420ms" }}
          >
            <p className="text-xs text-[#9aa3c9] text-center">
              <strong className="text-[#eef1fb]">Demo:</strong> Use admin@admin.com / admin for ADMIN role
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const { register } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !password || !displayName) {
      setError("Please fill in all fields")
      return
    }
    
    const success = register(email, password, displayName)
    if (!success) {
      setError("Email already exists")
    }
  }

  return (
    <Card className="w-full max-w-md border-[#2a3358] bg-[#131a2e] shadow-[0_8px_40px_-8px_rgba(109,77,224,0.35)]">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4 anim-fade-in-up" style={{ animationDelay: "0ms" }}>
          <Image src="/haru-logo.png" alt="Haru AI" width={80} height={80} />
        </div>
        <CardTitle
          className="font-display text-2xl font-semibold text-[#eef1fb] anim-fade-in-up"
          style={{ animationDelay: "90ms" }}
        >
          Create Account
        </CardTitle>
        <CardDescription className="text-[#9aa3c9] anim-fade-in-up" style={{ animationDelay: "150ms" }}>
          Join Haru AI Hub today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="anim-fade-in-up" style={{ animationDelay: "220ms" }}>
            <Field>
              <FieldLabel htmlFor="displayName" className="text-[#eef1fb]">Display Name</FieldLabel>
              <Input
                id="displayName"
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-[#1b2340] border-[#2a3358] text-[#eef1fb] placeholder:text-[#9aa3c9]"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="regEmail" className="text-[#eef1fb]">Email</FieldLabel>
              <Input
                id="regEmail"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1b2340] border-[#2a3358] text-[#eef1fb] placeholder:text-[#9aa3c9]"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="regPassword" className="text-[#eef1fb]">Password</FieldLabel>
              <Input
                id="regPassword"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1b2340] border-[#2a3358] text-[#eef1fb] placeholder:text-[#9aa3c9]"
              />
            </Field>
          </FieldGroup>

          {error && (
            <p className="text-[#ff5d7a] text-sm mt-2 anim-fade-in-up">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full mt-6 bg-[#6d4de0] text-[#f4f6ff] hover:bg-[#6d4de0]/90 anim-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-[#9aa3c9] mt-4 anim-fade-in-up" style={{ animationDelay: "360ms" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#7c5cff] hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
