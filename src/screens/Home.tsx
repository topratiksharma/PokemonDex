import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import README from '../README.md';

export const Home = () => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(README as string)
      .then((res) => res.text())
      .then((res) => {
        setMarkdown(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="
        min-w-full min-h-full box-border pt-16 md:pt-10 px-6 md:px-[8%] lg:px-14 pb-16
        [&_h1]:text-[2.5rem] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:tracking-tight
        [&_h2]:text-[1.6rem] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:mt-10 [&_h2]:mb-3
        [&_h3]:text-[1.05rem] [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:leading-7 [&_p]:text-[15px] [&_p]:mb-3
        [&_a]:underline [&_a]:underline-offset-2
        [&_code]:font-mono [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px]
        [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4
        [&_ul]:leading-7 [&_li]:mt-2 [&_li]:text-[15px]
        [&_hr]:my-8 [&_hr]:border-t [&_hr]:border-b-0
        [&_strong]:font-semibold
      "
      style={{
        '--tw-prose-body': 'rgba(255,255,255,0.55)',
        color: 'rgba(255,255,255,0.55)',
      } as React.CSSProperties}
    >
      <style>{`
        .prose-dark h1, .prose-dark h2, .prose-dark h3 { color: rgba(255,255,255,0.92); }
        .prose-dark a { color: rgba(255,255,255,0.7); }
        .prose-dark code { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.08); }
        .prose-dark pre { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); }
        .prose-dark hr { border-color: rgba(255,255,255,0.08); }
        .prose-dark strong { color: rgba(255,255,255,0.85); }
      `}</style>

      {loading && (
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', letterSpacing: '0.12em' }} className="mt-8 uppercase">
          Loading…
        </p>
      )}
      {error && (
        <p style={{ color: 'rgba(255,255,255,0.3)' }} className="mt-8 text-[15px]">
          Failed to load content.
        </p>
      )}
      {!loading && !error && (
        <div className="prose-dark">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
      )}
    </div>
  );
};
