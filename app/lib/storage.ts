import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'urls.json')

interface UrlData {
  id: string
  originalUrl: string
  clicks: number
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify([]))
  }
}

async function readUrls(): Promise<UrlData[]> {
  await ensureDataFile()
  const data = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

async function writeUrls(urls: UrlData[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(urls, null, 2))
}

export async function saveUrl(id: string, originalUrl: string) {
  const urls = await readUrls()
  urls.push({ id, originalUrl, clicks: 0 })
  await writeUrls(urls)
}

export async function getUrl(id: string) {
  const urls = await readUrls()
  return urls.find(url => url.id === id)
}

export async function incrementClicks(id: string) {
  const urls = await readUrls()
  const url = urls.find(url => url.id === id)
  if (url) {
    url.clicks++
    await writeUrls(urls)
  }
}

export async function getAllUrls() {
  return readUrls()
}

