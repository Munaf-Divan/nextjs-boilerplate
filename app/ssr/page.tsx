// Server-Side Rendering Example
async function getServerSideData() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    // This ensures the data is fetched on every request
    cache: 'no-store'
  });
  return res.json();
}

export default async function SSRPage() {
  const data = await getServerSideData();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Server-Side Rendering (SSR) Example</h1>
      <p className="mb-4">This page is rendered on every request. Current timestamp: {new Date().toISOString()}</p>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl mb-2">GitHub Next.js Repo Data:</h2>
        <p>Stars: {data.stargazers_count}</p>
        <p>Forks: {data.forks_count}</p>
        <p>Last Updated: {new Date(data.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
} 