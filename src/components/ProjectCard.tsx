import { FolderGit2, Star, GitFork } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function ProjectCard({ repo }: { repo: Repository }) {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)] group border border-white/5 hover:border-blue-500/30">
      <div className="flex justify-between items-start mb-4">
        <FolderGit2 className="text-blue-400 w-10 h-10 group-hover:text-blue-300 transition-colors" />
        <div className="flex space-x-3 text-slate-400 text-sm">
          <span className="flex items-center">
            <Star className="w-4 h-4 mr-1" /> {repo.stargazers_count}
          </span>
          <span className="flex items-center">
            <GitFork className="w-4 h-4 mr-1" /> {repo.forks_count}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {repo.name}
      </h3>
      
      <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
        {repo.description || "Sem descrição disponível."}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300">
          {repo.language || "Misto"}
        </span>
        <div className="flex space-x-3">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Demo
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}
