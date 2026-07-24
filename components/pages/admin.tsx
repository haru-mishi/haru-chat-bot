"use client"

import { useState } from "react"
import { useApp } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Users, Key, BarChart3, UserX, UserCheck, Trash2, Settings2 } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

export function AdminPage() {
  const { currentUser } = useApp()

  // Only render for admin users
  if (currentUser?.role !== "ADMIN") {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <Card className="border-[#2a3358] bg-[#131a2e] max-w-md">
          <CardContent className="py-12 text-center">
            <UserX className="w-16 h-16 mx-auto text-[#ff5d7a] mb-4" />
            <h2 className="text-xl font-bold text-[#eef1fb] mb-2">Access Denied</h2>
            <p className="text-[#9aa3c9]">
              You do not have permission to access the Admin Control Center.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#eef1fb]">Admin Control Center</h1>
        <p className="text-[#9aa3c9] mt-1">
          Manage users, API keys, and token allocations
        </p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-[#1b2340] mb-6">
          <TabsTrigger value="users" className="data-[state=active]:bg-[#6d4de0] data-[state=active]:text-[#f4f6ff] text-[#eef1fb]">
            <Users className="w-4 h-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="data-[state=active]:bg-[#6d4de0] data-[state=active]:text-[#f4f6ff] text-[#eef1fb]">
            <Key className="w-4 h-4 mr-2" />
            API Management
          </TabsTrigger>
          <TabsTrigger value="tokens" className="data-[state=active]:bg-[#6d4de0] data-[state=active]:text-[#f4f6ff] text-[#eef1fb]">
            <BarChart3 className="w-4 h-4 mr-2" />
            Token Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="api-keys">
          <ApiManagementTab />
        </TabsContent>

        <TabsContent value="tokens">
          <TokenManagementTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function UserManagementTab() {
  const { users, suspendUser } = useApp()

  return (
    <Card className="border-[#2a3358] bg-[#131a2e]">
      <CardHeader>
        <CardTitle className="text-[#eef1fb]">All Users</CardTitle>
        <CardDescription className="text-[#9aa3c9]">
          Manage user accounts and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#2a3358]">
              <TableHead className="text-[#9aa3c9]">User ID</TableHead>
              <TableHead className="text-[#9aa3c9]">Email</TableHead>
              <TableHead className="text-[#9aa3c9]">Display Name</TableHead>
              <TableHead className="text-[#9aa3c9]">Role</TableHead>
              <TableHead className="text-[#9aa3c9]">Status</TableHead>
              <TableHead className="text-[#9aa3c9] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-[#2a3358]">
                <TableCell className="font-mono text-xs text-[#9aa3c9]">
                  {user.id}
                </TableCell>
                <TableCell className="text-[#eef1fb]">{user.email}</TableCell>
                <TableCell className="text-[#eef1fb]">{user.displayName}</TableCell>
                <TableCell>
                  <Badge 
                    className={user.role === "ADMIN" 
                      ? "bg-[#6d4de0] text-[#f4f6ff]" 
                      : "bg-[#1b2340] text-[#eef1fb]"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={user.status === "active" 
                      ? "bg-[#7c5cff]/20 text-[#7c5cff]" 
                      : "bg-[#ff5d7a]/20 text-[#ff5d7a]"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => suspendUser(user.id)}
                    className={user.status === "active" 
                      ? "text-[#ff5d7a] hover:text-[#ff5d7a] hover:bg-[#ff5d7a]/10"
                      : "text-[#7c5cff] hover:text-[#7c5cff] hover:bg-[#7c5cff]/10"
                    }
                  >
                    {user.status === "active" ? (
                      <>
                        <UserX className="w-4 h-4 mr-1" />
                        Suspend
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ApiManagementTab() {
  const { apiKeys, users, revokeApiKey } = useApp()

  const getUserEmail = (userId: string) => {
    return users.find(u => u.id === userId)?.email || "Unknown"
  }

  return (
    <Card className="border-[#2a3358] bg-[#131a2e]">
      <CardHeader>
        <CardTitle className="text-[#eef1fb]">All API Keys</CardTitle>
        <CardDescription className="text-[#9aa3c9]">
          View and manage API keys across all users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#2a3358]">
              <TableHead className="text-[#9aa3c9]">Key ID</TableHead>
              <TableHead className="text-[#9aa3c9]">Name</TableHead>
              <TableHead className="text-[#9aa3c9]">Owner</TableHead>
              <TableHead className="text-[#9aa3c9]">Models</TableHead>
              <TableHead className="text-[#9aa3c9]">Created</TableHead>
              <TableHead className="text-[#9aa3c9] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((apiKey) => (
              <TableRow key={apiKey.id} className="border-[#2a3358]">
                <TableCell className="font-mono text-xs text-[#9aa3c9]">
                  {apiKey.id}
                </TableCell>
                <TableCell className="font-medium text-[#eef1fb]">{apiKey.name}</TableCell>
                <TableCell className="text-[#eef1fb]">{getUserEmail(apiKey.userId)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {apiKey.allowedModels.slice(0, 2).map((model) => (
                      <Badge 
                        key={model} 
                        className="text-xs bg-[#241f4d] text-[#eef1fb]"
                      >
                        {model}
                      </Badge>
                    ))}
                    {apiKey.allowedModels.length > 2 && (
                      <Badge 
                        className="text-xs bg-[#241f4d] text-[#eef1fb]"
                      >
                        +{apiKey.allowedModels.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-[#9aa3c9]">
                  {apiKey.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => revokeApiKey(apiKey.id)}
                    className="text-[#ff5d7a] hover:text-[#ff5d7a] hover:bg-[#ff5d7a]/10"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function TokenManagementTab() {
  const { users, updateUser } = useApp()
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [newLimit, setNewLimit] = useState("")

  // Token usage data for charts
  const usageData = users.map(user => ({
    name: user.displayName.split(" ")[0],
    usage: user.tokenUsage / 1000,
    limit: user.tokenLimit / 1000
  }))

  const pieData = users.map(user => ({
    name: user.displayName,
    value: user.tokenUsage
  }))

  const COLORS = ["#6d4de0", "#ffc857", "#45d9e0", "#6d4de0"]

  const totalTokens = users.reduce((acc, u) => acc + u.tokenUsage, 0)
  const totalLimit = users.reduce((acc, u) => acc + u.tokenLimit, 0)

  const handleUpdateLimit = () => {
    if (selectedUserId && newLimit) {
      updateUser(selectedUserId, { tokenLimit: parseInt(newLimit) })
      setSelectedUserId(null)
      setNewLimit("")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#9aa3c9]">
              Total Token Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#eef1fb]">
              {(totalTokens / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-[#9aa3c9]">
              of {(totalLimit / 1000).toFixed(0)}K allocated
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#9aa3c9]">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#eef1fb]">
              {users.filter(u => u.status === "active").length}
            </div>
            <p className="text-xs text-[#9aa3c9]">
              of {users.length} total
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#9aa3c9]">
              Usage Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#eef1fb]">
              {((totalTokens / totalLimit) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-[#9aa3c9]">
              of total capacity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader>
            <CardTitle className="text-[#eef1fb]">Token Usage by User</CardTitle>
            <CardDescription className="text-[#9aa3c9]">
              Monthly token consumption (in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: "#9aa3c9", fontSize: 12 }}
                    axisLine={{ stroke: "#2a3358" }}
                  />
                  <YAxis 
                    tick={{ fill: "#9aa3c9", fontSize: 12 }}
                    axisLine={{ stroke: "#2a3358" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#131a2e", 
                      border: "1px solid #2a3358",
                      borderRadius: "8px"
                    }}
                    labelStyle={{ color: "#eef1fb" }}
                  />
                  <Bar dataKey="usage" fill="#6d4de0" radius={[4, 4, 0, 0]} animationDuration={500} animationEasing="ease-out" />
                  <Bar dataKey="limit" fill="#45d9e0" radius={[4, 4, 0, 0]} fillOpacity={0.35} animationDuration={500} animationEasing="ease-out" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#2a3358] bg-[#131a2e]">
          <CardHeader>
            <CardTitle className="text-[#eef1fb]">Usage Distribution</CardTitle>
            <CardDescription className="text-[#9aa3c9]">
              Token usage share by user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name.split(" ")[0]} (${(percent * 100).toFixed(0)}%)`}
                    animationDuration={500}
                    animationEasing="ease-out"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#131a2e", 
                      border: "1px solid #2a3358",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${(value / 1000).toFixed(1)}K tokens`, "Usage"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Token Limits */}
      <Card className="border-[#2a3358] bg-[#131a2e]">
        <CardHeader>
          <CardTitle className="text-[#eef1fb]">User Token Limits</CardTitle>
          <CardDescription className="text-[#9aa3c9]">
            Set monthly token limits per user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#2a3358]">
                <TableHead className="text-[#9aa3c9]">User</TableHead>
                <TableHead className="text-[#9aa3c9]">Current Usage</TableHead>
                <TableHead className="text-[#9aa3c9]">Monthly Limit</TableHead>
                <TableHead className="text-[#9aa3c9]">Progress</TableHead>
                <TableHead className="text-[#9aa3c9] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const usagePercent = (user.tokenUsage / user.tokenLimit) * 100
                return (
                  <TableRow key={user.id} className="border-[#2a3358]">
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#eef1fb]">{user.displayName}</p>
                        <p className="text-xs text-[#9aa3c9]">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#eef1fb]">
                      {(user.tokenUsage / 1000).toFixed(1)}K
                    </TableCell>
                    <TableCell className="text-[#eef1fb]">
                      {selectedUserId === user.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={newLimit}
                            onChange={(e) => setNewLimit(e.target.value)}
                            placeholder={(user.tokenLimit / 1000).toString()}
                            className="w-24 h-8 bg-[#1b2340] border-[#2a3358] text-[#eef1fb]"
                          />
                          <span className="text-xs text-[#9aa3c9]">K</span>
                        </div>
                      ) : (
                        `${(user.tokenLimit / 1000).toFixed(0)}K`
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <Progress value={usagePercent} className="h-2 bg-[#1b2340]" />
                        <p className="text-xs text-[#9aa3c9] mt-1">
                          {usagePercent.toFixed(0)}%
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {selectedUserId === user.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUserId(null)}
                            className="text-[#9aa3c9] hover:bg-[#241f4d]"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleUpdateLimit}
                            className="bg-[#6d4de0] text-[#f4f6ff] hover:bg-[#6d4de0]/90"
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUserId(user.id)
                            setNewLimit((user.tokenLimit / 1000).toString())
                          }}
                          className="text-[#9aa3c9] hover:bg-[#241f4d]"
                        >
                          <Settings2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
