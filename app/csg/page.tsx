'use client';

import { useState, useEffect } from 'react';

// Client-Side Generation Example
export default function CSGPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/vercel/next.js');
        const jsonData = await res.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Client-Side Generation (CSG) Example</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Client-Side Generation (CSG) Example</h1>
      <p className="mb-4">This data is fetched on the client side after the page loads.</p>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl mb-2">GitHub Next.js Repo Data (Client-Side):</h2>
        {data && (
          <>
            <p>Stars: {data.stargazers_count}</p>
            <p>Forks: {data.forks_count}</p>
            <p>Last Updated: {new Date(data.updated_at).toLocaleString()}</p>
          </>
        )}
      </div>
    </div>
  );
} 