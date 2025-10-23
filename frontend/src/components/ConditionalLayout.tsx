'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  // Update body class based on route
  useEffect(() => {
    const body = document.body;
    if (isAdminRoute) {
      body.className = body.className.replace('flex flex-col', '');
    } else {
      if (!body.className.includes('flex flex-col')) {
        body.className = `${body.className} min-h-screen flex flex-col`;
      }
    }
  }, [isAdminRoute]);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? 'h-screen' : 'pt-20 flex-grow'}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
