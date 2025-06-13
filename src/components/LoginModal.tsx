'use client'

import React, { useState } from 'react'
import { authService } from '@/services/auth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResendConfirmation, setShowResendConfirmation] = useState(false)
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setShowResendConfirmation(false)
    setResendStatus('idle')

    try {
      console.log('Attempting to sign in with:', { email })
      const { error } = await authService.signIn(email, password)
      if (error) {
        console.error('Sign in error:', error)
        if (error.message === 'Email not confirmed') {
          setShowResendConfirmation(true)
        }
        setError(error.message || 'Failed to sign in')
      } else {
        console.log('Sign in successful')
        onClose()
      }
    } catch (err) {
      console.error('Unexpected error during sign in:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setResendStatus('loading')
    try {
      const { error } = await authService.resendConfirmationEmail(email)
      if (error) {
        console.error('Resend confirmation error:', error)
        setResendStatus('error')
      } else {
        setResendStatus('success')
      }
    } catch (err) {
      console.error('Unexpected error during resend:', err)
      setResendStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {showResendConfirmation && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p className="mb-2">Please confirm your email address before signing in.</p>
            <button
              onClick={handleResendConfirmation}
              disabled={resendStatus === 'loading'}
              className="text-yellow-700 underline hover:text-yellow-800"
            >
              {resendStatus === 'loading' ? 'Sending...' : 'Resend confirmation email'}
            </button>
            {resendStatus === 'success' && (
              <p className="text-green-600 mt-2">Confirmation email sent!</p>
            )}
            {resendStatus === 'error' && (
              <p className="text-red-600 mt-2">Failed to send confirmation email. Please try again.</p>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 