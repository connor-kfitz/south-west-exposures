import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

export default function AuthPage() {
  return (
    <div className="flex bg-[#09090b] min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm/>
      </div>
    </div>
  )
}
