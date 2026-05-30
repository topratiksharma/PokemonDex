import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import README from '../README.md';

export const Home = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load content.</p>}
      {!loading && !error && (
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      minWidth: '100%',
      minHeight: '100%',
      padding: '24px 20%',
      boxSizing: 'border-box',
      '& p': {
        color: 'rgba(255,255,255,.68)',
      },
      '& hr': {
        margin: '24px 0px',
        borderTop: '1px solid rgba(255,255,255,.3)',
        borderBottom: '0px',
        borderLeft: '0px',
        borderRight: '0px',
      },
      '& p, & li': {
        lineHeight: '24px',
      },
      '& li': {
        marginTop: '12px',
      },
    },
    '@media (min-width: 1024px)': {
      root: {
        padding: '24px 32px',
      },
    },
  },
  { name: 'Home' }
);
