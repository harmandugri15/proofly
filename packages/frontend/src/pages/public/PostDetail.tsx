import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Clock, User, ArrowLeft, Share2, CheckCircle2 } from 'lucide-react';

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      const data = await api.get<any>(`/posts/read/${slug}`);
      setPost(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return <div className="p-16 text-center text-slate-400">Loading article...</div>;
  }

  if (!post) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center">
        <h2 className="text-lg font-bold text-white mb-2">Article Not Found</h2>
        <Link to="/posts" className="text-xs text-emerald-400 hover:underline">
          &larr; Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-6 sm:p-8 space-y-8">
      <div>
        <Link
          to="/posts"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Studies
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            {post.authorUsername ? (
              <Link to={`/u/${post.authorUsername}`} className="font-semibold text-emerald-400 hover:underline">
                {post.authorName}
              </Link>
            ) : (
              <span className="font-semibold text-slate-300">{post.authorName}</span>
            )}
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Share'}
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 italic">
        {post.summary}
      </div>

      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
        {post.content}
      </div>

      <div className="pt-8 border-t border-slate-800 flex flex-wrap gap-2">
        {post.tags?.map((t: string) => (
          <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
            #{t}
          </span>
        ))}
      </div>
    </article>
  );
};
