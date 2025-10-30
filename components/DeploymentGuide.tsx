import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Server, DollarSign, Cloud, Key } from 'lucide-react';

const DeploymentGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-gray-800/50 border border-gray-700 rounded-lg text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-3 font-bold text-gray-300 hover:bg-gray-700/50"
      >
        <div className="flex items-center space-x-2">
          <Server size={16} />
          <span>MVP Deployment Guide</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-700 text-left text-gray-400 space-y-4 animate-fade-in-down">
          <p>For a cost-effective MVP deployment, consider these options:</p>
          <ul className="list-disc list-inside space-y-3">
            <li>
              <strong className="text-cyan-400">Static Site Hosting:</strong> Since this is a frontend-only React app (a Single Page Application), you can use services that have generous free tiers for static sites.
              <ul className="list-disc list-inside ml-6 mt-1 text-gray-500">
                <li><strong>Vercel:</strong> Excellent for Next.js but also fantastic for standard React apps. Offers free hosting with CI/CD from your Git repository.</li>
                <li><strong>Netlify:</strong> Another top choice with a great free tier, continuous deployment, and serverless functions if you need a simple backend later.</li>
                <li><strong>GitHub Pages:</strong> Completely free hosting directly from your GitHub repository. A great starting point.</li>
              </ul>
            </li>
             <li>
              <strong className="text-cyan-400">Environment Variables:</strong> To manage Dev/Test vs. Production settings (like the login requirement), use environment variables.
              <ul className="list-disc list-inside ml-6 mt-1 text-gray-500">
                <li>Services like Vercel and Netlify allow you to set production-only environment variables (e.g., `NODE_ENV=production`).</li>
                <li>Your application can read these to enable production-specific features, making your deployment process robust and secure.</li>
              </ul>
            </li>
            <li>
              <strong className="text-cyan-400">Cloud Storage Hosting:</strong> Services like AWS S3, Google Cloud Storage, or Azure Blob Storage can host static websites very cheaply, often within their free tiers for low traffic.
            </li>
          </ul>
          <div className="flex items-start p-3 rounded-lg bg-gray-900/50 space-x-3">
             <DollarSign size={32} className="text-green-400 flex-shrink-0 mt-1"/>
            <div>
              <h4 className="font-bold text-green-400">Key to Cost-Effectiveness:</h4>
              <p>The "backend" (Gemini API) is serverless. You only pay for what you use. The frontend can be hosted for free or very low cost on static hosts. This combination is extremely budget-friendly for an MVP.</p>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in-down {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-down {
            animation: fade-in-down 0.3s ease-out;
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DeploymentGuide;
