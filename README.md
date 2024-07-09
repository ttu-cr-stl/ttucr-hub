# TailwindCSS Style Guide

Since TailwindCSS applies styles by adding classes to elements, the order in which classes are added can make it so that styling becomes hard to mantain and keep conistent

This document outlines in which order, and what priority should be given when applying classes to an element

    <div class="(position) (display) (align & justify) (width) (height) (margin) (padding) (tailwind-spacing) (animate) (border & rounded) (shadow) (color) (text & font)">
    </div>

When styling elements the above order should be followed, if an element lacks any of the detailed styling it is ommitted and order is preserved.

Tailwind decorators for breakpoints, hover, focus, etc.. (such as `sm:width hover:bg-color focus:color`) should be placed directly after the default styles.

`animate` refers to the tailwind animate decorators <br>
`rounded` refers to the tailwind style for rounded corners <br>
`shadow` refers to the tailwind box-shadow implementation <br>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
