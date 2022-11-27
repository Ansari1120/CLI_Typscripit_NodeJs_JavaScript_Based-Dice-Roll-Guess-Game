#! /usr/bin/env node
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import randomeInteger from "random-int";
import gradient from 'gradient-string';
import { createSpinner } from "nanospinner";
import PromptSync from "prompt-sync";
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const sleep2 = (ms = 500) => new Promise((r) => setTimeout(r, ms));
function Intro_screen() {
    console.log(gradient('cyan', 'pink').multiline(figlet.textSync(`Welcome to the \n\nDice Roll Guessing Game !\n`), { interpolation: 'hsv' }) + '\n');
}
Intro_screen();
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('This Game is Developed By Ahmed Ali Ansari PIAIC 171908');
    await sleep();
    rainbowTitle.stop();
}
const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
        return 'Player';
    },
});
await welcome();
function winner() {
    figlet(`Congrats , ${answers.player_name} !\n`, (_err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
    });
    sleep();
}
var points;
points = 0;
do {
    var computer_guess = randomeInteger(0, 6);
    var answer = await inquirer.prompt([
        {
            name: "guess",
            type: "number",
            message: "Computer Just Rolled A dice ! whats your Guess ? "
        },
    ]);
    const spinner = createSpinner('Checking answer...').start();
    await sleep2();
    if (!(answer.guess === computer_guess)) {
        spinner.error({ text: `\nSorry Mate ! Your Guess is ${chalk.bgRed('Wrong')} ${answers.player_name}. \n${chalk.magenta(`Better luck Next Time`)}` });
        console.log(`\nComputer Guess : ${chalk.blue(computer_guess)} Does Not Matched with Your Guess : ${chalk.blue(answer.guess)} `);
    }
    else {
        spinner.success({ text: `\nNice work ${chalk.bgCyan(answers.player_name)}. You'r Lucky ` });
        points += 10;
        console.log(chalk.bgGreen(`\nYou Have Just earned `));
        console.log(`\nPoints :  ${chalk.yellow(points)}  🎉`);
        console.log(`\nComputer Guess : ${chalk.blue(computer_guess)} Matched with Your Guess : ${chalk.blue(answer.guess)} `);
        winner();
    }
    const prompt1 = PromptSync();
    var check = prompt1("want to Continue y or n ? ");
} while (!(check == 'n'));
console.log("\nThankYou FOr playing the Game Comback Leter !");
