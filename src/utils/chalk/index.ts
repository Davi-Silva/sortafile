import chalk from 'chalk';

export const successMessage = (message: string) => {
  return console.log(`[${chalk.greenBright.bold('OK')}] ${message}`);
};

export const errorMessage = (message: string) => {
  return console.log(`[${chalk.redBright.bold('ERROR')}] ${message}`);
};

export const warningMessage = (message: string) => {
  return console.log(`[${chalk.hex('#ffb638').bold('WARNING')}] ${message}`);
};
