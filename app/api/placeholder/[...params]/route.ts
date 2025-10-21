import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const resolvedParams = await params;
  const [widthStr, heightStr] = resolvedParams.params;
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';

  const width = Number.parseInt(widthStr || '400', 10);
  const height = Number.parseInt(heightStr || '288', 10);

  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) {
    return new NextResponse('Invalid dimensions', { status: 400 });
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0e7ff" />
          <stop offset="100%" stop-color="#c7d2fe" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#gradient)" />
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="${Math.min(width, height) / 4}" 
        fill="#6366f1" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
    },
  });
}
