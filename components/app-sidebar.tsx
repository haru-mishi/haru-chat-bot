"use client"

import { useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import { useApp } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Key,
  MessageSquare,
  Beaker,
  User,
  Shield,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "playgrounds", label: "Playgrounds", icon: Beaker },
  { id: "profile", label: "Profile Settings", icon: User },
]

export function AppSidebar({ currentPage, onNavigate }: AppSidebarProps) {
  const { currentUser, logout } = useApp()
  const navRef = useRef<HTMLUListElement>(null)
  const [pill, setPill] = useState<{ top: number; height: number } | null>(null)

  // Track the active nav item's position so the highlight can slide to it,
  // instead of the highlight instantly teleporting between items.
  useLayoutEffect(() => {
    const activeEl = navRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    if (activeEl && navRef.current) {
      const containerRect = navRef.current.getBoundingClientRect()
      const elRect = activeEl.getBoundingClientRect()
      setPill({ top: elRect.top - containerRect.top, height: elRect.height })
    }
  }, [currentPage, currentUser?.role])

  return (
    <aside className="w-64 h-screen bg-[#0d1226] border-r border-[#2a3358] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a3358]">
        <div className="flex items-center gap-3">
          <Image src="/haru-logo.png" alt="Haru AI" width={44} height={44} className="rounded-lg" />
          <div>
            <h1 className="font-display font-semibold text-lg text-[#eef1fb]">Haru AI Hub</h1>
            <p className="text-xs text-[#9aa3c9]">AI Model Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul ref={navRef} className="relative flex flex-col gap-1">
          {pill && (
            <div
              aria-hidden
              className="absolute left-0 right-0 rounded-lg bg-[#6d4de0] shadow-[0_4px_18px_-2px_rgba(109,77,224,0.5)] transition-[transform,height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={{ transform: `translateY(${pill.top}px)`, height: pill.height }}
            />
          )}
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li key={item.id} className="relative">
                <button
                  data-active={isActive}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "relative z-10 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-[#f4f6ff]"
                      : "text-[#eef1fb] hover:bg-[#241f4d]"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            )
          })}

          {/* Admin Control Center - Only for ADMIN */}
          {currentUser?.role === "ADMIN" && (
            <li className="relative">
              <button
                data-active={currentPage === "admin"}
                onClick={() => onNavigate("admin")}
                className={cn(
                  "relative z-10 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  currentPage === "admin"
                    ? "text-[#f4f6ff]"
                    : "text-[#eef1fb] hover:bg-[#241f4d]"
                )}
              >
                <Shield className="w-5 h-5" />
                Admin Control Center
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-[#2a3358]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#7c5cff]/20 flex items-center justify-center">
            <User className="w-5 h-5 text-[#7c5cff]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#eef1fb] truncate">
              {currentUser?.displayName}
            </p>
            <p className="text-xs text-[#9aa3c9] truncate">
              {currentUser?.email}
            </p>
          </div>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium",
            currentUser?.role === "ADMIN" 
              ? "bg-[#7c5cff]/20 text-[#7c5cff]" 
              : "bg-[#241f4d] text-[#eef1fb]"
          )}>
            {currentUser?.role}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full border-[#2a3358] bg-[#131a2e] text-[#eef1fb] hover:bg-[#ff5d7a]/10 hover:text-[#ff5d7a] hover:border-[#ff5d7a]/50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
