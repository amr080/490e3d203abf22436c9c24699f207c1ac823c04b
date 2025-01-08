'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUrlById } from '../actions'

export default function ShortLink({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const shortUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${id}`

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setLoading(true)
    const url = await getUrlById(id)
    if (url) {
      router.push(url.originalUrl)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <a
      href={shortUrl}
      onClick={handleClick}
      className={`text-blue-600 break-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {loading ? 'Redirecting...' : shortUrl}
    </a>
  )
}

