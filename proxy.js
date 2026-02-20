import { NextResponse } from 'next/server'
import { PUBLIC_ROUTES,LOGIN,ROOT } from './lib/routes'
import { auth } from './auth'

export const proxy = auth((req) =>{
  const path = req.nextUrl.pathname
  const isPublicRoute = PUBLIC_ROUTES.some((route)=> path.startsWith(route) ) || path === ROOT
 
  const isAuthenticated = !!req.auth

  console.log(req.auth,'auth data')
 
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN, req.nextUrl))
  }
  
  return NextResponse.next()


})
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}