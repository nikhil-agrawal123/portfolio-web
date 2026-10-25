import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NotFound from "./NotFound";

type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tag: "Blog" | "Reading" | "Finding";
  summary: string;
  content: React.ReactNode;
};

// Newest first. Add a post by adding an object here.
const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Notes, readings and findings",
    date: "2026-10-25",
    tag: "Blog",
    summary: "What this page is for.",
    content: (
      <>
        <p>
          A place for short write-ups: papers I'm reading, results from experiments, and the occasional longer post.
        </p>
      </>
    ),
  },
];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const Blog = () => {
  const { slug } = useParams();

  if (slug) {
    const post = posts.find((p) => p.slug === slug);
    if (!post) return <NotFound />;
    return (
      <main className="min-h-screen max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10">
          <ArrowLeft size={16} /> All posts
        </Link>
        <p className="text-xs font-medium text-muted-foreground mb-3">
          {post.tag} · {formatDate(post.date)}
        </p>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-10">{post.title}</h1>
        <article className="prose prose-neutral dark:prose-invert max-w-none">{post.content}</article>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10">
        <ArrowLeft size={16} /> Home
      </Link>
      <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Blog</h1>
      <p className="text-muted-foreground text-lg mb-12">Writing, research readings and findings.</p>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="block rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-muted">{post.tag}</span>
                <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
              </div>
              <h2 className="text-lg font-display font-semibold text-foreground mb-1">{post.title}</h2>
              <p className="text-sm text-muted-foreground">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Blog;
