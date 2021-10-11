// // this script prepare all apps in one directory for to ne deployed in docker containers
// import { cwd } from "process";
import * as utils from "./utils";
import { resolve } from "path";
//  compile all apps and generate package json for each
// copy each docker file into corresponding application
import * as shelljs from "shelljs";
import * as fs from "fs";

const dir = resolve.bind("../");

const generateAppsToDeploy = async () => {
  utils.removeOnlyDirectories(dir("deploy/*"));
  await utils.exec("nx", [
    "run-many",
    "--target=build",
    "--projects=landing",
    "--configuration=production",
  ]);

  try {
    if (!fs.existsSync(utils.baseDir("deploy"))) {
      fs.mkdirSync("deploy");
    }
  } catch (error) {}
  //   console.log(utils.baseDir('dist/apps/'));
  //   console.log(fs.existsSync(utils.baseDir('dist/apps/')));
  //    utils.cmd("cp" , [utils.baseDir('dist/apps/')  , ""])
  await utils.copy(dir("dist/apps/"), dir("deploy/"));
  // TODO: remove only directories  affected
  await utils.removeRecursively(dir("dist"));
};
const copyDockerfiles = async () => {
  try {
    const appsForDeploy = await utils.getListOfFiles(dir("./deploy/*"));
    const apps = await utils.getListOfFiles(dir("./apps/*"));

    let namesAvalible = appsForDeploy.map(utils.nameOfPath);
    for await (const app of apps) {
      const pathDocker = `${app}/Dockerfile`;
      const nameofApp = utils.nameOfPath(app);
      const idxPath = namesAvalible.findIndex((d) => d == nameofApp);
      if (idxPath == -1) {
        continue;
      }
      const existDockerfile = fs.existsSync(pathDocker);
      if (existDockerfile && idxPath !== -1) {
        const target = appsForDeploy[idxPath];
        console.log(`copy ${pathDocker} --> ${target}`);
        fs.copyFileSync(pathDocker, target + "/Dockerfile");
      }
    }
    // await utils.copy(dir("./forcopy/apps"), dir("./forcopy2"));
  } catch (error) {
    console.log(error);
  }
};

const bootstrapScript = async () => {
  await generateAppsToDeploy();
  await copyDockerfiles();
};

bootstrapScript();
