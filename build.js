const { exec } = require("child_process");
var archiver = require("archiver");
const fs = require("fs");

const package = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const appName = `${package.name}_${package.version}`;
const targetFolder = `./dist/${appName}`;

fs.rmdirSync("./dist", { recursive: true });

const run = exec(
  `npm run build:in -- -rn ${appName} -rv ${package.version} -d ${targetFolder}`
);
run.stdout.on("data", console.log);

run.on("close", () => {
  fs.copyFileSync("./config.example", `${targetFolder}/config`);

  const output = fs.createWriteStream(`./dist/${appName}.zip`);
  const archive = archiver("zip");
  archive.pipe(output);
  archive.directory(`${targetFolder}`, appName);
  archive.finalize();
});
