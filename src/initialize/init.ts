import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, resolve } from "node:path";

import chalk from "chalk";
import inquirer from "inquirer";

import { repo, templates } from "../constraints/templates.js";
import TemplateProvider from "../TemplateProvider/TemplateProvider.js";

export default async function init(): Promise<void> {
  //   projectName?: string,
  //   template?: string
  try {
    // if (!template) {
    //   const { selectedTemplate } = await inquirer.prompt([
    //     {
    //       type: "list",
    //       name: "selectedTemplate",
    //       message: "Choose a template:",
    //       choices: Object.keys(templates),
    //     },
    //   ]);
    //   template = selectedTemplate;
    // }

    // if (!templates[template as keyof typeof templates]) {
    //   console.error(chalk.red("\n❌ Invalid Template!"));
    //   console.log(chalk.blue("\nAvailable Templates:"));
    //   Object.keys(templates).forEach((t) =>
    //     console.log(`  - ${chalk.green(t)}`)
    //   );
    //   process.exit(1);
    // }

    // if (!projectName) {
    //   const { enteredProjectName } = await inquirer.prompt([
    //     {
    //       type: "input",
    //       name: "enteredProjectName",
    //       message: "Enter project name:",
    //       validate: (input: string) =>
    //         input ? true : "Project name is required!",
    //     },
    //   ]);
    //   projectName = enteredProjectName;
    // }

    // let projectPath = resolve(projectName as string);
    // let isCurrentDir = projectName === ".";

    // let action = "Proceed without changes";
    // if (isCurrentDir) {
    //   projectName = basename(process.cwd());
    //   projectPath = process.cwd();

    //   if (readdirSync(projectPath).length > 0) {
    //     ({ action } = await inquirer.prompt([
    //       {
    //         type: "list",
    //         name: "action",
    //         message:
    //           "The current directory is not empty. What do you want to do?",
    //         choices: [
    //           "Proceed without changes",
    //           "Clear the folder and proceed",
    //         ],
    //       },
    //     ]));
    //   }
    // } else {
    //   if (existsSync(projectPath)) {
    //     console.error(
    //       chalk.red("\n❌ Directory already exists. Choose a different name!")
    //     );
    //     return;
    //   }
    // }

    // const { confirm } = await inquirer.prompt([
    //   {
    //     type: "confirm",
    //     name: "confirm",
    //     message: "Do you want to proceed?",
    //     default: true,
    //   },
    // ]);

    // if (!confirm) {
    //   console.log(chalk.red("\n❌ Operation canceled."));
    //   return;
    // }

    // if (isCurrentDir && action === "Clear the folder and proceed") {
    //   rmSync(projectPath, { recursive: true, force: true });
    //   mkdirSync(projectPath);
    // } else if (!isCurrentDir) {
    //   mkdirSync(projectPath);
    // }

    // const repo = templates[template as keyof typeof templates];
    // if (!repo) {
    //   console.error(chalk.red("\n❌ No template found!"));
    //   return;
    // }
    const { language, selectedTemplate, projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Enter project name:",
      },
      {
        type: "list",
        name: "language",
        message: "Choose a language:",
        choices: ["typescript", "javascript"],
      },
      {
        type: "list",
        name: "selectedTemplate",
        message: "Choose a template:",
        choices: ["node", "next", "react", "scaflo-react","vite-ssr"],
      },
    ]);
    if (selectedTemplate === "scaflo-react" && language === "typescript") {
      console.error(
        chalk.blueBright(
          "\n❌ scaflo-react is not available for typescript,Hold A While! We are working on it :)"
        )
      );
      process.exit(1);
    }
    await TemplateProvider({
      projectName: projectName!,
      projectPath: projectName,
      repo: `${repo}/${language}/${selectedTemplate}`,
    });

    console.log(chalk.green("✅ Project initialized successfully!\n"));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red("\n❌ An error occurred during initialization:"));
    console.error(chalk.yellow((error as Error).message));
    process.exit(1);
  }
}
