# MinionAH Next

This is a NextJS project for [MinionAH](https://minionah.com). It is used to build stuff MinionAH needs that can't be done with Svelte/SvelteKit because a package isn't available or the ecosystem isn't mature enough.

This project currently includes:

## OG

This is an Open Graph image generator built with [NextJS](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/) on the [Edge](https://vercel.com/docs/functions/edge-functions) network.

It generates images for [MinionAH](https://minionah.com) based on the URL path.

## Resend

This is a simple API that sends emails to users using [Resend](https://resend.com/). It's needed to be in NextJS because a react-email like library doesn't exist for Svelte.
