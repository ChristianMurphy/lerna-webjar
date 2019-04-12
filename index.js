#!/usr/bin/env node

const { execFile } = require("child_process");
const { promisify } = require("util");
const lernaPath = require.resolve("lerna/cli");
const ky = require("ky-universal");
const Listr = require("listr");
const qs = require("qs");

const execFileP = promisify(execFile);

execFileP(lernaPath, ["list", "--json"])
  .then(out => {
    return JSON.parse(out.stdout).map(({ name, version }) => {
      return {
        title: `publishing ${name}`,
        task: () =>
          ky
            .get(
              `https://www.webjars.org/deploy?${qs.stringify({
                webJarType: "npm",
                nameOrUrlish: name,
                version
              })}`,
              {
                // wait up to 20 minutes
                timeout: 1200000
              }
            )
            .text()
      };
    });
  })
  .then(taskList => {
    const taskCLI = new Listr(taskList, {
      concurrent: true,
      exitOnError: false
    });
    return taskCLI.run();
  })
  .catch(console.error);
