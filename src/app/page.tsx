export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="container flex max-w-[70rem] flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <a href="https://minionah.com" target="_blank" className="underline underline-offset-1">
            MinionAH{" "}
          </a>
          Next
        </h1>
        <p className="text-center text-2xl">
          This is a NextJS project for MinionAH. It is used to build stuff MinionAH needs that can't be done with Svelte/SvelteKit because a package isn't available or the ecosystem isn't mature enough.
          <br />
          <br />
          This project currently includes:
        </p>

        <ul className="list-inside list-disc text-left text-2xl">
          <li>OG - This is an Open Graph image generator</li>
          <li>Resend - This is an email sending service</li>
        </ul>
        <p className="text-center text-2xl">
          Open-source on{" "}
          <a href="https://github.com/DarthGigi/MinionAH-OG" target="_blank" className="underline underline-offset-1">
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
