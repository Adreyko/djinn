import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import Header from '@/shared/components/ui/header';
import { ClerkProvider } from '@clerk/nextjs';
import QueryProvider from '@/shared/api/QueryProvider';
import UserProvider from '@/core/user/provider/user';
import QueryDevTools from '@/shared/lib/components/QueryDevTools';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {/* @ts-ignore*/}
      <ClerkProvider>
        <UserProvider>
          <html lang='en'>
            <body className={inter.className}>
              <div className='flex flex-col h-screen w-full'>
                <Header />
                <div className='grow flex-1 overflow-y-auto h-[calc(100vh-var(--header-height)] flex flex-col items-center '>
                  <QueryDevTools />
                  <div className='container flex flex-col justify-center mt-14'>
                    {children}
                  </div>
                </div>
              </div>
            </body>
          </html>
        </UserProvider>
      </ClerkProvider>
    </QueryProvider>
  );
}
