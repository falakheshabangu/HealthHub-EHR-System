"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function withRoleCheck(WrappedComponent: React.ComponentType, allowedRoles: string[]) {
  return function WithRoleCheck(props: any) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user || !allowedRoles.includes(user.role)) {
        router.push("/")
      }
    }, [user, router, allowedRoles])

    if (!user || !allowedRoles.includes(user.role)) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

