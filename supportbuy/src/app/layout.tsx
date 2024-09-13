import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css'; // Import global styles here

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-100 ml-64 md:ml-0 md:pl-0">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
