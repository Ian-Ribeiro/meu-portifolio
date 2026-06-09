import ProjectCard from "./ProjectCard";

// Replace 'vercel' with your actual GitHub username
const GITHUB_USERNAME = "Ian-Ribeiro";

async function getProjects() {
  // Using Next.js fetch with revalidation (ISR) - revalidates every 24 hours
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    // Return empty array if fetch fails, but log error
    console.error("Failed to fetch GitHub projects");
    return [];
  }

  return res.json();
}

export default async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Meus Projetos</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Uma seleção dos meus projetos de código aberto mais recentes no GitHub.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((repo: {
            id: number;
            name: string;
            description: string;
            html_url: string;
            homepage: string;
            stargazers_count: number;
            forks_count: number;
            language: string;
          }) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500 py-10 glass rounded-2xl">
          <p>Nenhum projeto encontrado ou erro ao carregar da API do GitHub.</p>
        </div>
      )}

      <div className="mt-16 text-center">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover font-medium transition-colors"
        >
          <span>Ver todos os repositórios no GitHub</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
