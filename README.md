# ui5-monaco-editor

Showcases the integration of the [Monaco](https://microsoft.github.io/monaco-editor/) editor into a UI5 application using [`ui5-tooling-modules`](https://www.npmjs.com/package/ui5-tooling-modules).

## Description

This showcase integrates the AMD version of the Monaco editor in a UI5 application using a UI5 control wrapper (to integrate into UI5s' lifecycle). For the integration, I followed the instruction from the [Integrating the AMD version of the Monaco Editor](https://github.com/microsoft/monaco-editor/blob/HEAD/docs/integrate-amd.md) and adopted it for UI5.

## Running the samples

The repository is using npm workspaces. To get started you need to install the dependencies first:

```sh
npm install
```

### JavaScript

Run the JavaScript example:

```sh
npm start -w ui5.monaco
```

Build the JavaScript example:

```sh
npm run build -w ui5.monaco
```

Run the built version of the JavaScript example:

```sh
npm run start:dist -w ui5.monaco
```

### TypeScript

Run the TypeScript example:

```sh
npm start -w ui5.monaco.ts
```

Build the TypeScript example:

```sh
npm run build -w ui5.monaco.ts
```

Run the built version of the TypeScript example:

```sh
npm run start:dist -w ui5.monaco.ts
```

## License

This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
