import { getUrlById, incrementClicks } from '../lib/storage'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function RedirectPage({ params }: { params: { id: string } }) {
  const headersList = headers()
  const domain = headersList.get('host') || ''
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  
  try {
    const url = await getUrlById(params.id)
    
    if (!url) {
      return redirect('/')
    }

    // Only increment clicks if not coming from the same domain
    const referer = headersList.get('referer') || ''
    if (!referer.includes(domain)) {
      await incrementClicks(params.id)
    }

    // Ensure the URL has a protocol
    let redirectUrl = url.originalUrl
    if (!redirectUrl.startsWith('http')) {
      redirectUrl = `https://${redirectUrl}`
    }

    return redirect(redirectUrl)
  } catch (error) {
    console.error('Error redirecting:', error)
    return redirect('/')
  }
}

