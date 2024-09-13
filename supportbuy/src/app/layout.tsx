// src/app/layout.tsx
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../styles/globals.css'; // Import global styles here

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
