"use client"

import { mock } from "node:test"
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
    const data = { "email": email, "passwd": password };

    try {
        const response = await fetch("http://127.0.0.1:5000/api/login", {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const userData = await response.json(); // Call json() to get the data

      
        

    const mockUser = { id: userData.id, name: userData.name, role: userData.role }
    console.log(mockUser)
    if (mockUser.id && password === "pwd") {
      setUser(mockUser)

      localStorage.setItem("user", JSON.stringify(mockUser))
    } else {
      throw new Error("Invalid email or password")
    }
  } catch (error){
    console.log("Login Failed: ", error)
    throw new Error("Login Failed")
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

