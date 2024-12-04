import chalk from 'chalk';

export function logger(message, level = 'info', value = "") {
    const now = new Date().toISOString();
    const colors = {
        info: chalk.green,
        warn: chalk.yellow,
        error: chalk.red,
        success: chalk.blue,
        debug: chalk.magenta,
    };

    const color = colors[level] || chalk.white;

    // Palitan ng yellow yung banner name
    const bannerName = chalk.yellow("OpenLoop BETA CLI");

    console.log(color(`[${now}] [${level.toUpperCase()}]: ${message} ${bannerName}`), chalk.yellow(value));
}
