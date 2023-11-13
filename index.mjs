// Modulos externos
import inquirer from "inquirer"; 
import chalk from "chalk"; // Interface no terminal

//Modulos internor
import fs from "fs";

console.log("Iniciamos o accont!");

operation();

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
        if(action === 'Criar conta'){
            createAccont()
        } else if(action === "Consultar saldo") {

        } else if(action === "Depositar") {
            deposit()
            
        } else if(action === "Sacar") {
            
        } else if(action === "Sair") {
            return;
        }
    }).catch((err) => console.log(err))
}

//Create an accont
function createAccont() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'));

    buildAccont();
}

function buildAccont(){
    inquirer.prompt([{
        name: 'AccountName',
        message: 'Digite um nome para a sua conta: '
    }]).then((answer) => {
        const accontName = answer['AccountName'];

        console.info(accontName)

        if(!fs.existsSync('accounts')) { // Verificando se existe!
            fs.mkdirSync('accounts') // Criando o diretório!
        }

        if(fs.existsSync(`accounts/${accontName}.json`)){
            console.log(chalk.bgRed.black('Essa conta já existe!'));

            buildAccont();
            return
        }

        fs.writeFileSync(`accounts/${accontName}.json`, '{"balance": 0}', (err) => {
            console.log(err);
        })

        console.log("Sua conta foi criada!");
        operation();
    }).catch((err) => console.log(err))
}

// add an amount for user accont 
function deposit(){
    inquirer.prompt([{
        name: "accountName",
        message: "Qual o nome da sua conta: ",
    }]).then((answer) => {
        const accontName = answer['accountName'];

        // verify if accont exists
        if(!verifyAccontExists(accontName)){
            return deposit();
        } 
    }).catch((err) => {
        console.log(err)
    })
}

function verifyAccontExists(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed("Essa conta não existe!"))
        return false;
    } else {
        return true;
    }
}