import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

const authMiddleware = withAuth({
  pages: {
    signIn: '/login',
  }
})

export default function proxy(req: NextRequest) {
  return (authMiddleware as any)(req)
}

export const config = {
  matcher: ['/admin/:path*'],
}
