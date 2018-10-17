const { execFile } = require("child_process");
const { get } = require("https");
const lernaPath = require.resolve("lerna/cli");

execFile(lernaPath, ["list", "--json"], (err, stdOut) =>
  JSON.parse(stdOut).forEach(({ name, version }) =>
    get(
      `https://www.webjars.org/deploy?webJarType=npm&nameOrUrlish=${name}&version=${version}`,
      res => {
        console.log(`started release for ${name}`);
        res.on("error", console.error);
        res.on("end", () => console.log(`done publishing ${name}`));
      }
    )
  )
);
