import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { FileText, Clock, User, ArrowRight } from 'lucide-react';

export const PostsListPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await api.get<any[]>('/posts');
      setPosts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-16 text-center text-slate-400">Loading technical case studies...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Engineering Case Studies</h1>
        <p className="text-sm text-slate-400 mt-2">
          Technical deep-dives, architectural postmortems, and reflections from verified student builders.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="text-slate-300 font-semibold">{post.authorName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
              </span>
            </div>

            <Link to={`/posts/${post.slug}`} className="block">
              <h2 className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">
                {post.title}
              </h2>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{post.summary}</p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-wrap gap-1.5">
                {post.tags?.map((t: string) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    #{t}
                  </span>
                ))}
              </div>

              <Link
                to={`/posts/${post.slug}`}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
