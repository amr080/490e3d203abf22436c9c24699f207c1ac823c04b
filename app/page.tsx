import UrlShortenerForm from './components/UrlShortenerForm'
import UrlList from './components/UrlList'
import { getAllUrls } from './actions'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const urls = await getAllUrls()

  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">URL Shortener</h1>
      <UrlShortenerForm />
      <UrlList initialUrls={urls} />
    </main>
  )
}

