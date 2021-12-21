import { useState, useCallback } from "react"
import Head from "next/head"
import Image from "next/image"

import styles from "~/styles/Home.module.css"

export default function Home() {
  const [state, setState] = useState(null);

  const makeLua = useCallback(() => {
    if (state === null) {
      alert("Please create at least one quest first!");
    }

    // Code from https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
    // Licensed under CC-BY-SA 4.0
    const fileContents = JSON.stringify(state, false, 2)
      .replace(/"(\w+)":/g, "$1 =")
      .replace(/\[/g, "{")
      .replace(/\]/g, "}");
    const file = new Blob([fileContents], { type: "text/plain" });
    const filename = "dialogue.lua";

    if (window.navigator.msSaveOrOpenBlob) { // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
      let a = document.createElement("a");
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
      }, 0);
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <Head>
        <title>make-conversation</title>
        <meta name="description" content="Create a conversation tree as a Lua data structure for Adventure Kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          make-conversation
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
