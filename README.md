# Frontier

A flexible and customizable personal website template powered by Radix UI. Crafted with a modern development stack including TypeScript, Prettier, ESLint, and Husky for robust code quality. Bundled with the cutting-edge Rsbuild tool from ByteDance. Designed for easy personalization and development. View a live deployment at hj5230.com.

## CLI Commands

- if bun binary is not installed, `npm i -g bun`

- rembember to setup your `.env` file based on `.env.example`

- `bun run bootstrap` To start the project initialization

- `bun run dev` To start development server

- `bun run build` To bundle the project

- `bun run serve` To start built project

- `bun run pack` To pack project for deployment

## TO DO

- ~~fix main panel overflow to inner scroll~~
- ~~eject info text to .json~~ *resolved: @assets/definition.\*.js*
- ~~fill out all pages~~
- **responsive design for tablet and mobile**
- ~~implement search & locate~~
- ~~implement tree shaking logic at bundle~~
- ~~allows badge color definition (resolve typing constraits)~~
- ~~home page add guide to path pages~~
- ~~implement copy contact info to clipboard~~
- ~~add type constraints for definition modules~~
- should implement notification provider
- ~~glowing cards shall have lifting effect when mouse hovering~~
- abstract a state manager that load user settings (apperance, draggable-hub position, etc.) when app is mounted, and save when update | unmount
- ~~add a license~~
- ~~build project route's content~~
- ~~deprecate local definition files with network request~~
- switch inline styles into css modules
- replace all `<br />` next line with actual stylings

## Notes

- ~~`navigator_items` in definition.navbar is order sensitive, as router path dependes on it, should figure out a way to better define it (order sensitive is not resolvable though)~~
- ~~currently 404 fallback to home page, consider add a 404 page~~
- ~~bundler have warnings blow, modify bundle process to avoid bundle samples~~
