// Static Site Generation Example
export const revalidate = 3600; // Revalidate every hour

async function getStaticData() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: {
      revalidate: 3600 // Revalidate every hour
    }
  });
  return res.json();
}

export default async function SSGPage() {
  const data = await getStaticData();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Static Site Generation (SSG) Example</h1>
      <p className="mb-4">This page is statically generated and revalidated every hour.</p>
      <p className="mb-4">Page generated at: {new Date().toISOString()}</p>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl mb-2">GitHub Next.js Repo Data (Static):</h2>
        <p>Stars: {data.stargazers_count}</p>
        <p>Forks: {data.forks_count}</p>
        <p>Last Updated: {new Date(data.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
} 