import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchBlogBySlug, type BlogPostDetail } from "@/lib/strapi";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    if (!slug) {
      setError("Invalid blog slug");
      setLoading(false);
      return;
    }
    fetchBlogBySlug(slug)
      .then((data) => {
        if (mounted) setPost(data);
      })
      .catch((e: any) => {
        if (mounted) setError(e?.message || "Error loading blog");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return (
    <p className="p-4 text-red-600">
      {error}
    </p>
  );
  if (!post) return <p className="p-4">Not found</p>;

  const formatDate = (value: string | null) => {
    if (!value) return "";
    const iso = String(value);
    const datePart = iso.includes("T") ? iso.split("T")[0] : iso.slice(0, 10);
    return datePart;
  };

  return (
    <article className="container mx-auto px-4 py-8 prose prose-neutral max-w-3xl">
      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt={post.title ?? "Cover image"}
          className="w-full h-auto rounded-md mb-6"
        />
      )}
      <h1 className="!mb-2">{post.title}</h1>
      <small className="text-muted-foreground">{formatDate(post.createdAt)}</small>
      <div className="mt-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.contentMarkdown}</ReactMarkdown>
      </div>
    </article>
  );
}