#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";

import { templates } from "./constraints/templates.js";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import init from "./initialize/init.js";

try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const packageJson = JSON.parse(
    readFileSync(join(__dirname, "../package.json"), "utf-8"),
  );

  // Basic options
  program
    .name("scaflo")
    .description(
      "Scaflo: A powerful CLI for generating Node.js, Next.js, and Vite templates effortlessly.",
    )
    .version(
      packageJson.version,
      "-v, --version",
      "Display the current version",
    );

  // List command
  program
    .command("list")
    .description("List all available templates")
    .action(() => {
      console.log(chalk.blue("\nAvailable Templates:"));
      Object.keys(templates).forEach((t) =>
        console.log(`  - ${chalk.green(t)}`),
      );
    });
  program
    .command("serve")
    .description("Serve a project")
    .action(() => {
      console.log("serve");
    });

  program
    .command("build")
    .description("Build a project")
    .action(() => {
      console.log("build");
    });

  program
    .command("dev")
    .description("Deploy a project")
    .action(() => {
      console.log("dev");
    });

  program
    .command("init")
    .description("Initialize a new project")
    .option(
      "-t, --template <type>",
      `Specify a template (Available: ${Object.keys(templates).join(", ")})`,
    )
    .action((projectName, options) => {
      init();
    });

  // Parse arguments
  program.parse(process.argv);

  // Handle case when no command is provided
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
} catch (error) {
  if (error instanceof Error) {
    console.error(chalk.red("An error occurred while running Scaflo:"));
    console.error(chalk.yellow(error.message));
  } else {
    console.error(chalk.red("An unknown error occurred while running Scaflo:"));
    console.error(chalk.yellow(String(error)));
  }
  process.exit(1); // Exit with error code
}
