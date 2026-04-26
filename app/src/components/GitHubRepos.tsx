import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.github.com/users/maazkareem-ai/repos?sort=updated&per_page=6");
      if (!response.ok) throw new Error("Failed to fetch repos");
      const data = await response.json();
      setRepos(data);
    } catch {
      setError("Unable to load GitHub repositories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const languageColors: Record<string, string> = {
    Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    Jupyter: "#DA5B0B", HTML: "#e34c26", CSS: "#563d7c",
    "C++": "#f34b7d", Java: "#b07219",
  };

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Live Data</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-foreground">
              GitHub <span className="gradient-text">Repositories</span>
            </h2>
          </div>
          <button onClick={fetchRepos} className="p-3 rounded-xl glass hover:bg-primary/10 transition-colors border border-border" disabled={loading}>
            <RefreshCw className={`w-5 h-5 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
          </button>
        </motion.div>

        {error && (
          <div className="glass rounded-xl p-6 text-center border border-border">
            <p className="text-muted-foreground">{error}</p>
            <button onClick={fetchRepos} className="mt-4 px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse border border-border">
                <div className="h-5 bg-primary/10 rounded w-3/4 mb-3" />
                <div className="h-3 bg-muted rounded w-full mb-2" />
                <div className="h-3 bg-muted rounded w-2/3 mb-6" />
                <div className="flex gap-4">
                  <div className="h-3 bg-muted rounded w-16" />
                  <div className="h-3 bg-muted rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300 block border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{repo.name}</h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">{repo.description || "No description available"}</p>
                <div className="flex items-center gap-4 text-xs">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] || "#8b949e" }} />
                      <span className="text-muted-foreground">{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-muted-foreground/60"><Star className="w-3.5 h-3.5" />{repo.stargazers_count}</div>
                  <div className="flex items-center gap-1 text-muted-foreground/60"><GitFork className="w-3.5 h-3.5" />{repo.forks_count}</div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground/30">
                  Updated {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
