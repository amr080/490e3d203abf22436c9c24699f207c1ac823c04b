import { getUrlById } from '../actions'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = await getUrlById(params.id)
  
  if (url) {
    return redirect(url.originalUrl)
  }
  
  return redirect('/')
}

