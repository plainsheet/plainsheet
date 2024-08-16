# Welcome! ⛴️

Thank you for being interested in the project!  
**We welcome every contribution, from anyone.**  
Feel free to reach out to use at [our Discord channel](https://discord.gg/pGzJgKKj) 🙌🏻

### How We Work

We have [a project board](https://github.com/orgs/plainsheet/projects/2), which we keep our backlogs and tasks in progress.  
Feel free to pick one and assign yourself to the item, and make a feature branch.  
From there, you can start to develop the feature, and make a PR to the main branch.

### Setting Up The Repository 💻

1. Please install [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating), if you haven't yet.
2. Run `pnpm install`
3. Run `pnpm run dev --filter {workspace that you develop}`  
   3-1. A workspace name can be found in each `package.json`
4. You should see the dev server running on the console. Happy coding!

### Frequently Used Commands

- `pnpm dev`
- Run the core dev server: `pnpm dev --filter core --filter html`
- Run the React dev server: `pnpm dev --filter react --filter next-app`
- `pnpm clean`
- `pnpm lint`
- `pnpm build`
- `pnpm changeset`
- `pnpm add --filter {workspace}`
- `pnpm add --filter {workspace} --save-dev`
