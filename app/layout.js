const './globals.css'

module.exports = metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

module.exports =  function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
