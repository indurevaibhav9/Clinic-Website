import {auth} from "./auth"
import {redirect} from "next/navigation"
import {headers} from "next/headers"

export async function requireAuth() {
    const session = await auth.api.getSession({ headers: await headers() })

    if(!session || !session.user){ 
        redirect("/login")
    }

    return session;
}

export async function requireRole(allowedRoles: string[]){
    const session = await requireAuth();
    if (!allowedRoles.includes(session.user.role || "")) {
        redirect("/unauthorized")
    }

    return session;
}

