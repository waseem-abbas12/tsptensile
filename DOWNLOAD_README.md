# Form/Field Tensile Architecture Website

This ZIP contains the redesigned React + Vite frontend for the tensile architecture website.

## Run locally

1. Install Node.js 20+ and pnpm.
2. Open a terminal in this folder.
3. Run `pnpm install`.
4. Run `pnpm dev`.
5. Open the local URL shown by Vite.

## Important before client delivery

Replace the placeholder brand name, phone, email, address, social links and project information in `client/src/pages/Home.tsx`. Replace the generated project imagery with the client's real project photographs. The quote form currently demonstrates the interaction and needs to be connected to the client's email, CRM or backend before production use.

The frontend references project-lifecycle image URLs generated for the Manus web project. For a standalone external deployment, a developer should download or replace those images with locally hosted, licensed assets and update the image URLs in `Home.tsx`.
