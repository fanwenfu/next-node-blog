## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init next-app --example with-mobx-state-tree-typescript with-mobx-state-tree-typescript-app
# or
yarn create next-app --example with-mobx-state-tree-typescript with-mobx-state-tree-typescript-app
```

### Download manually

Download the example [or clone the repo](https://github.com/zeit/next.js):

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-mobx-state-tree-typescript
cd with-mobx-state-tree-typescript
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [ZEIT Now](https://zeit.co/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example is a typescript and mobx-state-tree port of the [with-redux](https://github.com/zeit/next.js/tree/master/examples/with-redux) example, by way of the javascript and mobx-state-tree port [with-mobx-state-tree](https://github.com/zeit/next.js/tree/master/examples/with-mobx-state-tree). Decorator support is activated by adding a `.babelrc` file at the root of the project:

```json
{
  "presets": ["next/babel"],
  "plugins": ["transform-decorators-legacy"]
}
```
