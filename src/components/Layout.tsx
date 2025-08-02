import { Link } from 'react-router-dom'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wide">NirogGyan</Link>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <a href="mailto:support@niroggyan.com" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} NirogGyan — All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Layout
