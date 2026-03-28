import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

const posts = [
  { title: "How BYLD Reduces Project Delays by 40%", date: "Mar 15, 2026", excerpt: "Learn how real-time site updates and AI-powered analytics help construction teams stay on schedule.", category: "Case Study" },
  { title: "The Future of Construction Tech in 2026", date: "Mar 8, 2026", excerpt: "An overview of emerging trends in construction technology, from BIM integration to drone surveys.", category: "Industry" },
  { title: "5 Tips for Better Budget Management", date: "Feb 28, 2026", excerpt: "Practical strategies for keeping your construction project finances under control.", category: "Guide" },
  { title: "Introducing AI Risk Prediction", date: "Feb 15, 2026", excerpt: "Our new AI feature analyzes project data to predict potential delays before they happen.", category: "Product" },
];

const BlogPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Blog</h1>
      <p className="text-lg text-muted-foreground mb-10">Insights on construction management, product updates, and industry trends.</p>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.title} className="rounded-xl border border-border bg-card p-6 byld-card-hover cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BlogPage;
