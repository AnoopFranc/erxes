import ApolloProvider from "@/modules/ApolloProvider"

import "./globals.css"
import { Metadata } from "next"
import Script from "next/script"
import JotaiProvider from "@/modules/JotaiProiveder"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Exm ",
  description: "exm",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src="/js/env.js"
        />
        {/* <Script
            strategy="beforeInteractive"
            type="text/javascript"
            src="/js/main.js"
          /> */}
      </head>
      <body
        className={cn(
          "h-screen w-screen overflow-hidden bg-background font-sans text-xs font-medium antialiased xl:text-sm flex flex-col",
          fontSans.variable
        )}
        suppressHydrationWarning={true}
      >
        <ApolloProvider>
          <JotaiProvider>{children}</JotaiProvider>
        </ApolloProvider>
      </body>
    </html>
  )
}
