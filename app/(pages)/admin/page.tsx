
import { requireRole } from "@/lib/auth-guard"
import AdminClient from "./AdminClient"

export default async function page() {
  const session = await requireRole(["ADMIN"])

  return (
    <AdminClient />
  )
}