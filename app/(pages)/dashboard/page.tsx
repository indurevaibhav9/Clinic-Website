import { requireRole } from "@/lib/auth-guard"
import DashboardClient from "./DashboardClient" 

export default async function DashboardPage() {
  const session = await requireRole(["ADMIN", "NORMAL_USER"])
  return (
    <DashboardClient />
  )
}