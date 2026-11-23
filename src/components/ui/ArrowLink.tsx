import type { ReactNode } from 'react';

export default function ArrowLink({ href, children, external = false }: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="font-oswald text-[.8em] font-normal text-[#4b5563] underline-offset-4 hover:underline dark:text-[#9ca3af]"
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
