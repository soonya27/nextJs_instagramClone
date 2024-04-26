import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import FooterNavBar from '@/components/FooterNavBar';

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Instantgram",
    template: "Instantgram | %s",
  },
  description: "Instantgram Photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body className='w-full bg-neutral-50'>
        <AuthContext>
          <div className='bg-white border-b'>
            <Navbar />
          </div>
          <main className='w-full max-w-screen-xl p-4 mx-auto'>
            <SWRConfigContext >
              {children}
            </SWRConfigContext>
          </main>
          <FooterNavBar />
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
