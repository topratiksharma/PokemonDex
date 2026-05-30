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
      className="min-w-full min-h-full box-border pt-16 md:pt-10 px-6 md:px-[8%] lg:px-14 pb-16"
      style={{ color: 'var(--c-text-2)' }}
    >
      <style>{`
        .md-body h1, .md-body h2, .md-body h3 {
          color: var(--c-text);
          font-family: "Bricolage Grotesque", sans-serif;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }
        .md-body h1 { font-size: 2.2rem; margin: 2rem 0 1rem; }
        .md-body h2 { font-size: 1.4rem; margin: 2.5rem 0 0.75rem; }
        .md-body h3 { font-size: 1.05rem; margin: 1.5rem 0 0.5rem; }
        .md-body p { font-size: 14px; line-height: 1.75; margin-bottom: 0.75rem; }
        .md-body a { color: var(--c-text); text-decoration: underline; text-underline-offset: 2px; opacity: 0.7; }
        .md-body a:hover { opacity: 1; }
        .md-body code {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 5px;
          background: var(--c-search);
          color: var(--c-text);
          border: 1px solid var(--c-rim);
        }
        .md-body pre {
          border-radius: 10px;
          padding: 16px;
          overflow-x: auto;
          margin: 1rem 0;
          background: var(--c-search);
          border: 1px solid var(--c-rim);
        }
        .md-body pre code { background: none; border: none; padding: 0; }
        .md-body ul, .md-body ol { padding-left: 1.25rem; }
        .md-body li { font-size: 14px; line-height: 1.75; margin-top: 0.25rem; }
        .md-body hr { border: none; border-top: 1px solid var(--c-rim); margin: 2rem 0; }
        .md-body strong { font-weight: 600; color: var(--c-text); }
      `}</style>

      {loading && (
        <p style={{ color: 'var(--c-text-3)', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', letterSpacing: '0.12em' }} className="mt-8 uppercase">
          Loading…
        </p>
      )}
      {error && (
        <p style={{ color: 'var(--c-text-2)' }} className="mt-8 text-[14px]">
          Failed to load content.
        </p>
      )}
      {!loading && !error && (
        <div className="md-body">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
      )}
    </div>
  );
};
