import { getUrl, incrementClicks } from '../../lib/storage'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = await getUrl(params.id)
  
  if (url) {
    await incrementClicks(params.id)
    return redirect(url.originalUrl)
  }
  
  return redirect('/')
}

