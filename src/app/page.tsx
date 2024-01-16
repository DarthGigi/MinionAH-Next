export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <a
            href="https://minionah.com"
            target="_blank"
            className="underline underline-offset-1"
          >
            MinionAH{" "}
          </a>
          OG Generator
        </h1>
        <p className="text-center text-2xl">
          This project generates Open Graph images for{" "}
          <a
            href="https://minionah.com"
            target="_blank"
            className="underline underline-offset-1"
          >
            MinionAH
          </a>{" "}
          on the{" "}
          <a
            href="https://vercel.com/docs/functions/edge-functions"
            target="_blank"
            className="underline underline-offset-1"
          >
            Edge
          </a>
          , deployed on{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            className="underline underline-offset-1"
          >
            Vercel
          </a>
          .
          <br />
          <br />
          Open-source on{" "}
          <a
            href="https://github.com/DarthGigi/MinionAH-OG"
            target="_blank"
            className="underline underline-offset-1"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
