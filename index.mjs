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
            checkCash()
        } else if(action === "Depositar") {
            deposit()
            
        } else if(action === "Sacar") {
            withdraw()
         
            
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

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja depositar? '
        }]).then((answer) => {

            const amount = answer['amount'];

            //add an amount
            addAmount(accontName, amount)
            operation()

        }).catch((err) => {
            console.log(err)
        })

        
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

function addAmount(accontName, amount){
    const account = getAccount(accontName);

    if(!amount){
        console.log("Ocorreu um erro! Tente novamente mais tarde")
        return deposit()
    }

    account.balance = parseFloat(amount) + parseFloat(account.balance);

    fs.writeFileSync(
        `accounts/${accontName}.json`,
        JSON.stringify(account)

    )

    console.log("Saldo depositado! no valor de " + amount)

}

function getAccount(accountName){
    const accontJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accontJson)
}

function checkCash(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta:'
    }]).then((answer) => {
        const accountName = answer['accountName']

        if(!verifyAccontExists(accountName)){
            return checkCash()
        }

        const account = getAccount(accountName)
        console.log(`O saldo da sua conta é ${account.balance}`)
        operation()
    })
}

function withdraw(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta:'
    }]).then((answer) => {
        const accontName = answer['accountName']
        if(!verifyAccontExists(accontName)){
            console.log('Erro na digitação do nome!')
            return operation()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Quando voce deseja sacar?'
        }]).then((answer) => {
            const amount = answer['amount']
            console.log('Saque ralizado!')

            removeAccount(accontName, amount)
        })
    })
}

function removeAccount(accountName, amount) {
    const accont = getAccount(accountName)
    if(!amount){
        console.log('Digite um valor')
        return withdraw()
    }
    if(accont < amount) {
        console.log("Valor indisponivel")
        return withdraw()
    }

    accont.balance = parseFloat(accont.balance) - parseFloat(amount)

    console.log("saque realizaado")
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accont))
}