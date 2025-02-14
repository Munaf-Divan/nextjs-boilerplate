import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://api.github.com/repos/Munaf-Divan/nextjs-boilerplate');
  const data = await res.json();
  
  const formatToIST = (date: Date) => {
    return date.toLocaleString('en-US', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });
  };
  
  return {
    props: {
      data: {
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        lastUpdated: formatToIST(new Date(data.pushed_at)),
      },
      generatedAt: formatToIST(new Date()),
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default function SSGPage({ 
  data, 
  generatedAt 
}: { 
  data: {
    stargazers_count: number;
    forks_count: number;
    lastUpdated: string;
  };
  generatedAt: string;
}) {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Static Site Generation (SSG) Example</h1>
      <p className="mb-4 text-gray-800">This page is statically generated and revalidated every hour.</p>
      <p className="mb-4 text-gray-800">Page generated at: {generatedAt}</p>
      <div className="bg-gray-100 p-4 rounded shadow-sm">
        <h2 className="text-xl mb-2 text-gray-900">GitHub Next.js Repo Data (Static):</h2>
        <p className="text-gray-800">Stars: {data.stargazers_count}</p>
        <p className="text-gray-800">Forks: {data.forks_count}</p>
        <p className="text-gray-800">Last Updated: {data.lastUpdated}</p>
      </div>
    </div>
  );
} 