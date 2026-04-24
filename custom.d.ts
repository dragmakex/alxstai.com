import type React from 'react';

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'webring-banner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { theme?: string };
    }
  }
}
