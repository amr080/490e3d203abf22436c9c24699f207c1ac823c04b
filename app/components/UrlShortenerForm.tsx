'use client'

import { useState } from 'react'
import { shortenUrl } from '../actions'
import ShortLink from './ShortLink'

export default function UrlShortenerForm() {
  const [url, setUrl] = useState('')
  const [shortId, setShortId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await shortenUrl(url)
    if (result) {
      setShortId(result.id)
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to shorten"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        style={{ fontFamily: 'Arial, sans-serif' }}
      />
      <button
        type="submit"
        className="w-full p-2 bg-black text-white rounded"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        Shorten URL
      </button>
      {shortId && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p style={{ fontFamily: 'Arial, sans-serif' }}>Shortened URL:</p>
          <ShortLink id={shortId} />
        </div>
      )}
    </form>
  )
}

