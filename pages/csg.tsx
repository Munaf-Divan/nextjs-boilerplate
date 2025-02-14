'use client';

import { useState, useEffect } from 'react';

interface RepoData {
  stargazers_count: number;
  forks_count: number;
  lastUpdated: string;
}

export default function CSGPage() {
  const [data, setData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formatToIST = (date: Date) => {
      return date.toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short'
      });
    };

    const fetchData = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/Munaf-Divan/nextjs-boilerplate');
        const jsonData = await res.json();
        setData({
          stargazers_count: jsonData.stargazers_count,
          forks_count: jsonData.forks_count,
          lastUpdated: formatToIST(new Date(jsonData.pushed_at)),
        });
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Client-Side Generation (CSG) Example</h1>
        <p className="text-gray-800">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Client-Side Generation (CSG) Example</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Client-Side Generation (CSG) Example</h1>
      <p className="mb-4 text-gray-800">This data is fetched on the client side after the page loads.</p>
      <div className="bg-gray-100 p-4 rounded shadow-sm">
        <h2 className="text-xl mb-2 text-gray-900">GitHub Next.js Repo Data (Client-Side):</h2>
        {data && (
          <>
            <p className="text-gray-800">Stars: {data.stargazers_count}</p>
            <p className="text-gray-800">Forks: {data.forks_count}</p>
            <p className="text-gray-800">Last Updated: {data.lastUpdated}</p>
          </>
        )}
      </div>
    </div>
  );
} 