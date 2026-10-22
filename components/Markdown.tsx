// Affiche le texte des leçons (écrit en Markdown) en HTML lisible.
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children: linkChildren }) => {
          const external = typeof href === "string" && /^https?:\/\//.test(href);
          return (
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {linkChildren}
            </a>
          );
        },
        table: ({ children: tableChildren }) => (
          <div className="table-wrap">
            <table>{tableChildren}</table>
          </div>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
