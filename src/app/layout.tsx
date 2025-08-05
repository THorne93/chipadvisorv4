// app/layout.tsx
import "./globals.css";
import 'antd/dist/reset.css';
import { getSession } from '@/lib';
import NavBar from './components/NavBar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className="overflow-x-hidden min-h-screen bg-yellow-50" style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar session={session?.user ?? null} />
          <div className='bg-yellow-50' style={{ flex: '1 0 auto', padding: '24px 0' }}>
            <div className="sm:w-5/6 w-full pt-6 mx-auto">
              <div className="text-red-500 font-bold text-3xl">TAILWIND TEST</div>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
