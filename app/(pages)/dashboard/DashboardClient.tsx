"use client"

import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

const DashboardClient = () => {

  const logoutClick = async () => {
    try {
      const session = await authClient.getSession()

      if (session.data?.user) {
        await authClient.signOut()
        toast.success("Logged out successfully.")
      } else {
        toast.error("No active session found. Already logged out.")
      }
    } catch (error) {
      toast.error("Failed to log out.")
    }
  }

  return (
    <main className="min-h-screen p-4 sm:p-5">
      <button
        className="min-h-10 rounded-2xl bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
        onClick={logoutClick}
      >
        Log out
      </button>

      <div className="mt-5 break-words">
        dashboard
      </div>
    </main>
  )
}

export default DashboardClient