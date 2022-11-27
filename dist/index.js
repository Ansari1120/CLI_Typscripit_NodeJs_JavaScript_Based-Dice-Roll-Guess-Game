#! /usr/bin/env node
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import randomeInteger from "random-int";
import gradient from 'gradient-string';
import { createSpinner } from "nanospinner";
import PromptSync from "prompt-sync";
//let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const sleep2 = (ms = 500) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to the Dice Roll Guessing Game \n');
    await sleep();
    rainbowTitle.stop();
}
await welcome();
const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
        return 'Player';
    },
});
function winner() {
    figlet(`Congrats , ${answers.player_name} !\n`, (err, data) => {
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
        // {
        //     name : "cont",
        //     type: "confirm",
        //     message:"want to continue yes or no ?"
        // },
    ]);
    const spinner = createSpinner('Checking answer...').start();
    await sleep2();
    if (!(answer.guess === computer_guess)) {
        spinner.error({ text: `\nSorry Mate ! Your Guess is ${chalk.bgRed('Wrong')} ${answers.player_name}. \n${chalk.magenta(`Better luck Next Time`)}` });
        // console.log(`Sorry Mate ! ${chalk.bgCyan(answers.player_name)} Your Guess is ${chalk.bgRed('Wrong'
        // )}`);
    }
    else {
        spinner.success({ text: `\nNice work ${chalk.bgCyan(answers.player_name)}. You'r Lucky ` });
        //    console.log(`\nNice work ${chalk.bgCyan(answers.player_name)}. You'r Lucky `);
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
