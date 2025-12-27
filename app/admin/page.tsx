"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Package, Users, DollarSign } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin") {
      setIsAuthenticated(true)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-md p-8 border-primary/20 bg-card/50 backdrop-blur">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dutch-orange/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-dutch-orange" />
            </div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            <Button type="submit" className="w-full bg-dutch-orange hover:bg-dutch-orange/90 text-white">
              Login
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your FromNL.pro store</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-dutch-orange" />
              </div>
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-3xl font-bold mb-1">127</div>
            <p className="text-sm text-muted-foreground">Products</p>
          </Card>

          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-dutch-blue" />
              </div>
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-3xl font-bold mb-1">2,543</div>
            <p className="text-sm text-muted-foreground">Customers</p>
          </Card>

          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-dutch-red/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-dutch-red" />
              </div>
              <span className="text-sm text-muted-foreground">This Month</span>
            </div>
            <div className="text-3xl font-bold mb-1">€45.2K</div>
            <p className="text-sm text-muted-foreground">Revenue</p>
          </Card>

          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <div className="text-3xl font-bold mb-1">23</div>
            <p className="text-sm text-muted-foreground">Orders</p>
          </Card>
        </div>

        <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Order #{1000 + order}</p>
                  <p className="text-sm text-muted-foreground">Premium Dutch Product</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">€{(Math.random() * 100 + 50).toFixed(2)}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-dutch-orange/10 text-dutch-orange">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
