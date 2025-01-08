'use server'

import { saveUrl, getUrl, getAllUrls, incrementClicks } from './lib/storage'

function generateId(): string {
  return Math.random().toString(36).substr(2, 6)
}

export async function shortenUrl(originalUrl: string) {
  const id = generateId()
  await saveUrl(id, originalUrl)
  return { id, originalUrl }
}

export async function getUrlById(id: string) {
  const url = await getUrl(id)
  if (url) {
    await incrementClicks(id)
  }
  return url
}

export { getAllUrls }

