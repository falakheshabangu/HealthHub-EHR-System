"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function NavBar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          HealthHub
        </Link>
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0`}>
          <div className="lg:flex-grow">
            <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-300 mr-4">
              Home
            </Link>
            <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-300 mr-4">
              About
            </Link>
            {user && (
              <Link href={`/${user.role}`} className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-300 mr-4">
                Dashboard
              </Link>
            )}
          </div>
          <div>
            {user ? (
              <Button onClick={handleLogout} variant="ghost" className="text-white hover:text-gray-300 mt-4 lg:mt-0">
                Logout
              </Button>
            ) : (
              <Link href="/login" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-300">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

