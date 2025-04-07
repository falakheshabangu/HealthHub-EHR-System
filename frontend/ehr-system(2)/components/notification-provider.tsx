"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

type NotificationContextType = {
  showNotification: (message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast()

  const showNotification = (message: string) => {
    toast({
      description: message,
    })
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <ToastProvider>
        {children}
        <ToastViewport />
      </ToastProvider>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

