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
    <div className="min-w-full min-h-full box-border pt-16 md:pt-6 px-6 md:px-[10%] lg:px-8 [&_p]:text-white/70 [&_hr]:my-6 [&_hr]:border-t [&_hr]:border-white/30 [&_hr]:border-b-0 [&_p]:leading-6 [&_li]:leading-6 [&_li]:mt-3">
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load content.</p>}
      {!loading && !error && (
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      )}
    </div>
  );
};
