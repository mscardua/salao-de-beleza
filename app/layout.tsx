export const metadata = {
  title: 'Salão de Beleza',
  description: 'Sistema de gestão para Salão de Beleza',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}