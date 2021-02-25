const { exec } = require("child_process");
const fs = require("fs");

const package = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

fs.rmdirSync("./dist", { recursive: true });

const run = exec(
  `npm run build:in -- -rn ${package.name}_${package.version} -rv ${package.version}`
);
run.stdout.on("data", console.log);

run.on("close", () => {
  fs.copyFileSync("./config.example", "./dist/config");
  fs.unlinkSync("./dist/index.js");
});
