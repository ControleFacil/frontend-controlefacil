import { PortableText } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="blog-p">{children}</p>
    ),

    h1: ({ children }: any) => (
      <h1 className="blog-h1">{children}</h1>
    ),

    h2: ({ children }: any) => (
      <h2 className="blog-h2">{children}</h2>
    ),

    h3: ({ children }: any) => (
      <h3 className="blog-h3">{children}</h3>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="blog-quote">{children}</blockquote>
    ),
  },

  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="blog-link"
        target="_blank"
      >
        {children}
      </a>
    ),

    code: ({ children }: any) => (
      <code className="blog-inline-code">{children}</code>
    ),
  },

  types: {
    image: ({ value }: any) => (
      <img
        src={value.asset.url}
        alt=""
        className="blog-image"
      />
    ),

    code: ({ value }: any) => (
      <SyntaxHighlighter
        style={dark}
        language={value.language || "javascript"}
        className="blog-code"
      >
        {value.code}
      </SyntaxHighlighter>
    ),
  },
};

export default function PortableTextRenderer({ value }: any) {
  return <PortableText value={value} components={components} />;
}