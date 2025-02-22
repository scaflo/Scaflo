import chalk from "chalk";
import degit from "degit";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
const spinner = ora({
  text: chalk.blue("Downloading template..."),
  spinner: "dots",
  color: "cyan",
});
export default async function TemplateProvider({
  repo,
  projectName,
  projectPath,
}) {
  if (!repo) {
    console.error(chalk.red("❌ No template found!"));
    return;
  }
  console.log(repo);
  console.log(
    chalk.blue(`\nCreating project: ${chalk.bold(projectName)}...\n`),
  );
  try {
    spinner.start();
    const emitter = degit(repo, { cache: false, force: true });
    await emitter.clone(projectPath);
    spinner.succeed(chalk.green("Template downloaded successfully! 🚀"));
  } catch (error) {
    spinner.fail(chalk.red("Failed to download template! ❌"));
    console.error(chalk.red(error));
    return;
  }
  const packageJsonPath = path.join(projectPath, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = projectName;
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n",
    );
  }
  console.log(chalk.green("\nSetup complete! 🎉"));
  console.log("\nRun the following commands:\n");
  console.log(chalk.cyan(`cd ${projectName} && yarn && yarn dev`));
}
