import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const data = await res.json();
  
  const formatToIST = (date: Date) => {
    return date.toLocaleString('en-US', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long'
    });
  };
  
  return {
    props: {
      data: {
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        lastUpdated: formatToIST(new Date(data.updated_at)),
      },
      timestamp: formatToIST(new Date()),
    },
  };
};

export default function SSRPage({ 
  data, 
  timestamp 
}: { 
  data: { 
    stargazers_count: number; 
    forks_count: number; 
    lastUpdated: string;
  }; 
  timestamp: string;
}) {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Server-Side Rendering (SSR) Example</h1>
      <p className="mb-4 text-gray-800">This page is rendered on every request.</p>
      <p className="mb-4 text-gray-800">Server timestamp: {timestamp}</p>
      <div className="bg-gray-100 p-4 rounded shadow-sm">
        <h2 className="text-xl mb-2 text-gray-900">GitHub Next.js Repo Data:</h2>
        <p className="text-gray-800">Stars: {data.stargazers_count}</p>
        <p className="text-gray-800">Forks: {data.forks_count}</p>
        <p className="text-gray-800">Last Updated: {data.lastUpdated}</p>
      </div>
    </div>
  );
} 