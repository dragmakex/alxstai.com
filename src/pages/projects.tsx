import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StickyPageHead from '../components/StickyPageHead';
import StickyLayout from '../components/StickyLayout';
import { useVideoAndDarkMode } from '../hooks/useVideoAndDarkMode';
import projects from '../data/projects.json';

const projectsStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Alex's Projects",
  url: "https://alxstai.com/projects",
  description: "Software Alex builds and ships — research tools, Farcaster apps, and Neovim plugins.",
  author: {
    "@type": "Person",
    name: "Alex",
    url: "https://alxstai.com/about"
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      description: project.tagline,
      url: project.href
    }))
  }
};

export default function Projects() {
  const { videoOff, darkMode, toggleDarkMode, toggleVideo } = useVideoAndDarkMode();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StickyPageHead
        title="projects"
        description="Software Alex builds and ships — autonomous research tools, Farcaster apps, Android experiments, and Neovim plugins."
        ogUrl="https://alxstai.com/projects"
        canonicalUrl="https://alxstai.com/projects"
        keywords="alex projects, alxstai, uruk, lensly, stickystein, skyage, arclet, neovim plugins, farcaster apps"
        structuredData={projectsStructuredData}
      />
      <StickyLayout
        videoOff={videoOff}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleVideo={toggleVideo}
        showVideo={true}
        loaded={loaded}
      >
        <div className="mt-8 md:mt-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-tisa_bold text-4xl md:text-5xl dark:text-gray-400">projects</h1>
            <p className="mt-3 max-w-xl font-tisa text-black/70 dark:text-gray-500">
              things i build and ship. some are live products, some are tools i use every day.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — ${project.tagline}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.06 }}
                className="group relative flex min-h-[11rem] flex-col overflow-hidden rounded-lg border-2 border-gray-400/40 bg-gray-300/70 p-6 backdrop-blur-md duration-300 hover:-translate-y-1 hover:border-gray-500 dark:border-gray-700/80 dark:bg-black/50 dark:hover:border-gray-500"
              >
                <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-purple-300 via-pink-300 to-indigo-400 opacity-0 duration-300 group-hover:opacity-100 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-500" />

                <h2 className="font-tisa_bold text-2xl text-black duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-indigo-500 group-hover:bg-clip-text md:text-3xl dark:text-gray-400 dark:group-hover:from-purple-300 dark:group-hover:via-pink-300 dark:group-hover:to-indigo-300">
                  {project.name}
                </h2>
                <p className="mt-2 font-tisa text-black/70 dark:text-gray-500">
                  {project.tagline}
                </p>

                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <span className="font-oswald text-[11px] uppercase tracking-[0.18em] text-black/50 dark:text-gray-500">
                    {project.tags.join(' · ')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-oswald text-xl leading-none text-black/40 duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black dark:text-gray-500 dark:group-hover:text-gray-400"
                  >
                    ↗
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10"
          >
            <a
              href="https://github.com/dragmakex?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-transparent font-oswald text-xs uppercase tracking-[0.18em] text-black/60 duration-300 hover:border-black hover:text-black dark:text-gray-500 dark:hover:border-gray-400 dark:hover:text-gray-400 rounded"
            >
              everything else on github
              <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        </div>
      </StickyLayout>
    </>
  );
}
