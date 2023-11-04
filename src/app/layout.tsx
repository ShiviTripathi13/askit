import "~/styles/globals.css";

import { headers } from "next/headers";
import { GeistSans } from 'geist/font'
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}