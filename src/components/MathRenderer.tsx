'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MathRendererProps {
  content: string;
}

export default function MathRenderer({ content }: MathRendererProps) {
  // Pre-process content to fix some common markdown issues
  const processedContent = useMemo(() => {
    let text = content;
    // Ensure block math ($$) is preceded and followed by a blank line for proper parsing
    // In JS replace, "$$" outputs a single "$", so we need "$$$$" to output "$$"
    text = text.replace(/([^\n])\n\s*\$\$/g, '$1\n\n$$$$');
    text = text.replace(/\$\$\s*\n([^\n])/g, '$$$$\n\n$1');
    return text;
  }, [content]);

  return (
    <div className="prose prose-slate max-w-none prose-p:leading-relaxed overflow-x-auto">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          img: ({node, ...props}) => (
            <img {...props} className="mx-auto rounded-lg shadow-md my-6 max-h-[400px] object-contain bg-white p-2" />
          ),
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-blue-900" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-blue-800" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-slate-800" {...props} />,
          p: ({node, ...props}) => <p className="my-2 leading-relaxed text-slate-700 whitespace-pre-wrap" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2 space-y-1 whitespace-pre-wrap" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2 space-y-1 whitespace-pre-wrap" {...props} />,
          li: ({node, ...props}) => <li className="text-slate-700" {...props} />,
          strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
