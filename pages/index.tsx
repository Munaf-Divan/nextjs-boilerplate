import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Next.js Rendering Patterns Demo</h1>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
          <Link href="/ssr" className="block">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Server-Side Rendering (SSR)</h2>
            <p className="text-gray-700">Data is fetched and rendered on every request</p>
          </Link>
        </div>
        
        <div className="p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
          <Link href="/ssg" className="block">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Static Site Generation (SSG)</h2>
            <p className="text-gray-700">Page is pre-rendered at build time with hourly revalidation</p>
          </Link>
        </div>
        
        <div className="p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
          <Link href="/csg" className="block">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Client-Side Generation (CSG)</h2>
            <p className="text-gray-700">Data is fetched on the client after page load</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 