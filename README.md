# lerna-webjar

Automate deploying npm packages managed by lerna to webjars.org

:notebook: this relies on the package being released to npm before the webjar release is started.

## Installation

```sh
# with npm
npm install --save-dev lerna-webjar

# or with yarn
yarn add --dev lerna-webjar
```

## Usage

_in package.json_

```diff
{
  "scripts": {
+    "publish-webjar": "lerna-webjar"
  }
}
```

then from a terminal

```sh
# with npm
npm run publish-webjar

# with yarn
yarn publish-webjar
```
