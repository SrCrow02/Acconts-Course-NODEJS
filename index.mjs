// Modulos externos
import inquirer from "inquirer"; 
import chalk from "chalk"; // Interface no terminal

//Modulos internor
import fs from "fs";

console.log("Iniciamos o accont!")

operation()

function operation() {
    inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }]).then((answer) => {
        const action = answer['action'];
        console.log(answer)
    }).catch((err) => console.log(err))
}