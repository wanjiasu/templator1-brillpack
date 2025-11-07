import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogPosts, type BlogPostListItem } from "@/lib/strapi";

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    fetchBlogPosts()
      .then((data) => {
        if (mounted) setPosts(data);
      })
      .catch((e: any) => {
        if (mounted) setError(e?.message || "Error loading posts");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return (
    <p className="p-4 text-red-600">
      {error}
    </p>
  );

  const formatDate = (value: string | null) => {
    if (!value) return "";
    const iso = String(value);
    const datePart = iso.includes("T") ? iso.split("T")[0] : iso.slice(0, 10);
    return datePart;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg overflow-hidden">
            {post.coverImageUrl && (
              <img
                src={post.coverImageUrl}
                alt={post.title ?? "Cover image"}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <small className="text-muted-foreground">{formatDate(post.createdAt)}</small>
              {post.excerpt && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}