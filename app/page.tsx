"use client"

import { useState } from "react"
import { useApp } from "@/context/app-context"
import { LoginForm, RegisterForm } from "@/components/auth-forms"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardPage } from "@/components/pages/dashboard"
import { ProfilePage } from "@/components/pages/profile"
import { ChatPage } from "@/components/pages/chat"
import { ApiKeysPage } from "@/components/pages/api-keys"
import { PlaygroundsPage } from "@/components/pages/playgrounds"
import { AdminPage } from "@/components/pages/admin"

export default function Home() {
  const { isAuthenticated } = useApp()
  const [authView, setAuthView] = useState<"login" | "register">("login")
  const [currentPage, setCurrentPage] = useState("dashboard")

  // Auth screens
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 anim-starfield-drift">
        <div className="w-full max-w-md anim-fade-in-up-focal">
          {authView === "login" ? (
            <LoginForm onSwitchToRegister={() => setAuthView("register")} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setAuthView("login")} />
          )}
        </div>
      </main>
    )
  }

  // Main app layout
  return (
    <div className="min-h-screen flex">
      <AppSidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1 overflow-hidden">
        <div key={currentPage} className="h-screen overflow-y-auto anim-fade-in">
          {currentPage === "dashboard" && <DashboardPage />}
          {currentPage === "profile" && <ProfilePage />}
          {currentPage === "chat" && <ChatPage />}
          {currentPage === "api-keys" && <ApiKeysPage />}
          {currentPage === "playgrounds" && <PlaygroundsPage />}
          {currentPage === "admin" && <AdminPage />}
        </div>
      </main>
    </div>
  )
}
