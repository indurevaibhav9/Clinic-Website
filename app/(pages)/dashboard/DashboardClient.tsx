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
      console.log("logout error:", error)
      toast.error("Failed to log out.")
    }
  }

  return (
    <div className="p-5">
      <button
        className="bg-primary rounded-2xl p-1 pl-2 pr-2 text-primary-foreground hover:bg-primary/90"
        onClick={logoutClick}
      >
        Log out
      </button>

      <div className="mt-5">
        dashboard
      </div>
    </div>
  )
}

export default DashboardClient