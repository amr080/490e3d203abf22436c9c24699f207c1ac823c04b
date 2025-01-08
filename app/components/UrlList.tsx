'use client'

import { useState, useEffect } from 'react'
import { UrlData } from '../types'
import { getAllUrls } from '../actions'
import ShortLink from './ShortLink'

export default function UrlList({ initialUrls }: { initialUrls: UrlData[] }) {
  const [urls, setUrls] = useState(initialUrls)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const updatedUrls = await getAllUrls()
      setUrls(updatedUrls)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Shortened URLs</h2>
      <ul className="space-y-4">
        {urls.map((url) => (
          <li key={url.id} className="p-4 bg-gray-100 rounded">
            <p style={{ fontFamily: 'Arial, sans-serif' }}>
              Original: <a href={url.originalUrl} className="text-blue-600 break-all">{url.originalUrl}</a>
            </p>
            <p style={{ fontFamily: 'Arial, sans-serif' }}>
              Shortened: <ShortLink id={url.id} />
            </p>
            <p style={{ fontFamily: 'Arial, sans-serif' }}>Clicks: {url.clicks}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

