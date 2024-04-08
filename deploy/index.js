const ci = require("miniprogram-ci");
const util = require("util");

const exec = util.promisify(require("child_process").exec);

const path = require("path");
const { apps } = require("./apps");

var argv = require("minimist")(process.argv.slice(2));

async function upload(app) {
  console.log("deploy " + app.name);

  await exec(`APP_ID=${app.appid} yarn build:weapp`);

  const project = new ci.Project({
    appid: app.appid,
    type: "miniProgram",
    projectPath: path.join(__dirname, `../dist`),
    privateKeyPath: path.join(__dirname, `./key/private.${app.appid}.key`),
    ignores: ["node_modules/**/*"],
  });

  await ci.upload({
    project,
    version: argv.version,
    desc: argv.desc,
    onProgressUpdate: () => {
      return;
    },
    setting: {
      minifyJS: false,
      autoPrefixWXSS: false,
    },
  });
  console.log("upload miniapp successfully");
}

apps.forEach((app) => {
  upload(app).catch((e) => {
    console.error(e);
    process.exit(1);
  });
});
// upload({ name: "墨鱼百宝箱", appid: "wxe95a9c2b869d9ab7" });
