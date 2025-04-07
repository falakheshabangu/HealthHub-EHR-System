"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Button asChild variant={pathname === "/" ? "default" : "ghost"}>
        <Link href="/">Home</Link>
      </Button>
      <Button asChild variant={pathname.startsWith("/patient") ? "default" : "ghost"}>
        <Link href="/patient">Patient</Link>
      </Button>
      <Button asChild variant={pathname.startsWith("/doctor") ? "default" : "ghost"}>
        <Link href="/doctor">Doctor</Link>
      </Button>
      <Button asChild variant={pathname.startsWith("/pharmacy") ? "default" : "ghost"}>
        <Link href="/pharmacy">Pharmacy</Link>
      </Button>
      <Button asChild variant={pathname.startsWith("/admin") ? "default" : "ghost"}>
        <Link href="/admin">Admin</Link>
      </Button>
    </nav>
  )
}

