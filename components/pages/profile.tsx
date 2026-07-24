"use client"

import { useState } from "react"
import { useApp } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Save } from "lucide-react"

export function ProfilePage() {
  const { currentUser, updateUser } = useApp()
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "")
  const [saved, setSaved] = useState(false)

  const usagePercent = currentUser 
    ? (currentUser.tokenUsage / currentUser.tokenLimit) * 100 
    : 0

  const handleSave = () => {
    if (currentUser) {
      updateUser(currentUser.id, { displayName })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#eef1fb]">Profile Settings</h1>
        <p className="text-[#9aa3c9] mt-1">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Personal Information */}
        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader>
            <CardTitle className="text-[#eef1fb]">Personal Information</CardTitle>
            <CardDescription className="text-[#9aa3c9]">
              Update your profile details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="displayName" className="text-[#eef1fb]">Display Name</FieldLabel>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-[#1b2340] border-[#2a3358] text-[#eef1fb]"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-[#eef1fb]">Email</FieldLabel>
                <Input
                  id="email"
                  value={currentUser?.email || ""}
                  disabled
                  className="bg-[#241f4d] border-[#2a3358] text-[#9aa3c9] cursor-not-allowed"
                />
              </Field>
              <Field>
                <FieldLabel className="text-[#eef1fb]">Role</FieldLabel>
                <div className="pt-1">
                  <Badge 
                    className={currentUser?.role === "ADMIN" 
                      ? "bg-[#6d4de0] text-[#f4f6ff]" 
                      : "bg-[#1b2340] text-[#eef1fb]"
                    }
                  >
                    {currentUser?.role}
                  </Badge>
                </div>
              </Field>
            </FieldGroup>
            
            <div className="mt-6 flex items-center gap-3">
              <Button 
                onClick={handleSave}
                className="bg-[#6d4de0] text-[#f4f6ff] hover:bg-[#6d4de0]/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              {saved && (
                <span className="text-sm text-[#7c5cff]">Changes saved!</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quota Overview */}
        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader>
            <CardTitle className="text-[#eef1fb]">Quota Overview</CardTitle>
            <CardDescription className="text-[#9aa3c9]">
              Your current monthly token usage and limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#9aa3c9]">Monthly Token Usage</span>
                <span className="font-medium text-[#eef1fb]">
                  {(currentUser?.tokenUsage || 0).toLocaleString()} / {(currentUser?.tokenLimit || 0).toLocaleString()}
                </span>
              </div>
              <Progress value={usagePercent} className="h-4 bg-[#1b2340]" />
              <p className="text-xs text-[#9aa3c9] mt-2">
                {usagePercent.toFixed(1)}% of your monthly quota used
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#241f4d] border border-[#2a3358]">
                <p className="text-sm text-[#9aa3c9]">Tokens Used</p>
                <p className="text-2xl font-bold text-[#eef1fb]">
                  {((currentUser?.tokenUsage || 0) / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#241f4d] border border-[#2a3358]">
                <p className="text-sm text-[#9aa3c9]">Tokens Remaining</p>
                <p className="text-2xl font-bold text-[#eef1fb]">
                  {(((currentUser?.tokenLimit || 0) - (currentUser?.tokenUsage || 0)) / 1000).toFixed(1)}K
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
