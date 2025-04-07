"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  role: "patient" | "doctor" | "pharmacy" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Note: For testing purposes, all users have the password 'password'
    const mockUsers: { [key: string]: User } = {
      "patient@example.com": { id: "1", name: "John Doe", role: "patient" },
      "doctor@example.com": { id: "2", name: "Dr. Smith", role: "doctor" },
      "pharmacy@example.com": { id: "3", name: "Acme Pharmacy", role: "pharmacy" },
      "admin@example.com": { id: "4", name: "Admin User", role: "admin" },
    }

    const mockUser = mockUsers[email]
    if (mockUser && password === "password") {
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } else {
      throw new Error("Invalid email or password")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

