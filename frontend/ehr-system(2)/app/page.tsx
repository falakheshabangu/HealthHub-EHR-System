import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to HealthHub</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Our Electronic Health Record (EHR) system provides a secure and efficient way to manage patient information,
        schedule appointments, and streamline healthcare processes for patients, doctors, pharmacies, and
        administrators.
      </p>
      <Link
        href="/login"
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        Get Started
      </Link>
    </div>
  )
}

