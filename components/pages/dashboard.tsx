"use client"

import { useApp } from "@/context/app-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Key, MessageSquare, Cpu, TrendingUp } from "lucide-react"

export function DashboardPage() {
  const { currentUser, getUserApiKeys } = useApp()
  
  const userKeys = currentUser ? getUserApiKeys(currentUser.id) : []
  const usagePercent = currentUser 
    ? (currentUser.tokenUsage / currentUser.tokenLimit) * 100 
    : 0

  const stats = [
    {
      title: "API Keys",
      value: userKeys.length,
      description: "Active keys",
      icon: Key,
    },
    {
      title: "Models Available",
      value: [...new Set(userKeys.flatMap(k => k.allowedModels))].length,
      description: "Across all keys",
      icon: Cpu,
    },
    {
      title: "Token Usage",
      value: `${((currentUser?.tokenUsage || 0) / 1000).toFixed(0)}K`,
      description: "This month",
      icon: TrendingUp,
    },
    {
      title: "Chat Sessions",
      value: 12,
      description: "Last 7 days",
      icon: MessageSquare,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#eef1fb]">Dashboard</h1>
        <p className="text-[#9aa3c9] mt-1">
          Welcome back, {currentUser?.displayName}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className="border-[#2a3358] bg-[#131a2e] anim-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#9aa3c9]">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-[#9aa3c9]" />
              </CardHeader>
              <CardContent>
                <div className="font-mono text-2xl font-bold text-[#eef1fb]">{stat.value}</div>
                <p className="text-xs text-[#9aa3c9]">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Usage Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader>
            <CardTitle className="text-[#eef1fb]">Token Usage</CardTitle>
            <CardDescription className="text-[#9aa3c9]">
              Your monthly token consumption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#9aa3c9]">Used</span>
                <span className="font-mono font-medium text-[#eef1fb]">
                  {(currentUser?.tokenUsage || 0).toLocaleString()} / {(currentUser?.tokenLimit || 0).toLocaleString()}
                </span>
              </div>
              <Progress value={usagePercent} className="h-3 bg-[#1b2340]" />
            </div>
            <p className="text-sm text-[#9aa3c9]">
              {usagePercent.toFixed(1)}% of your monthly quota used
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader>
            <CardTitle className="text-[#eef1fb]">Quick Actions</CardTitle>
            <CardDescription className="text-[#9aa3c9]">
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 p-3 rounded-lg bg-[#241f4d] border border-[#2a3358]">
                <Key className="w-5 h-5 text-[#7c5cff]" />
                <div>
                  <p className="text-sm font-medium text-[#eef1fb]">Create API Key</p>
                  <p className="text-xs text-[#9aa3c9]">Generate a new key for your applications</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-[#241f4d] border border-[#2a3358]">
                <MessageSquare className="w-5 h-5 text-[#7c5cff]" />
                <div>
                  <p className="text-sm font-medium text-[#eef1fb]">Start Chat</p>
                  <p className="text-xs text-[#9aa3c9]">Interact with AI models directly</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-lg bg-[#241f4d] border border-[#2a3358]">
                <Cpu className="w-5 h-5 text-[#7c5cff]" />
                <div>
                  <p className="text-sm font-medium text-[#eef1fb]">Try Playgrounds</p>
                  <p className="text-xs text-[#9aa3c9]">Experiment with Voice and OCR features</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
