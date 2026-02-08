import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listing Lens - Instant Marketplace Intelligence',
  description: 'Upload any marketplace listing. Get comprehensive buyer intelligence in seconds. $5 per report.',
  keywords: ['marketplace', 'listing analysis', 'buyer intelligence', 'hidden costs', 'recall check'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
