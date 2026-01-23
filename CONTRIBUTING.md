# Welcome! ⛴️

Thank you for being interested in the project!  
We welcome every contribution, from anyone.

### How We Work

We have [a project board](https://github.com/orgs/plainsheet/projects/2), which we keep our backlogs and tasks.  
Feel free to pick one and assign yourself to the item, and make a feature branch.  
From there, you can start developing the feature, and make a PR.

If you want to co-author with other collaborators, consider using [coauthors](https://github.com/coauthors/coauthors)! it's a handy tool to add a co-author to your commits.

### Setting Up The Repository 💻

1. Please install [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating), if you haven't yet.
2. Run `nvm use`
3. Run `pnpm install`
4. Run `pnpm run dev --filter {workspace that you want to develop}`  
   3-1. A workspace name can be found in each `package.json`
5. You should see the dev server running on the console. Happy coding!

### Frequently Used Commands

#### Run the core dev server

```shell
pnpm dev --filter @plainsheet/core --filter html
```

#### Run the React dev server

```shell
pnpm dev --filter @plainsheet/core --filter @plainsheet/react --filter nextjs
```

#### Run the official website

```shell
pnpm dev --filter @plainsheet/core --filter @plainsheet/react --filter website
```

#### Managing Packages

- `pnpm add --filter {workspace}`
- `pnpm add --filter {workspace} --save-dev`

#### ETC

- `pnpm dev`
- `pnpm clean`
- `pnpm build`
- `pnpm lint`
