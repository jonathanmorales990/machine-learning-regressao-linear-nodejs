const ml = require('ml-regression'); // biblioteca de machine learning, essa é específicia para regressão linear
const csv = require('csvtojson/v1'); // biblioteca que transforma csv em objetos javascript
const SLR = ml.SLR;
const readline = require('readline'); // Para utilizar o prompt no nodeJS

const arquivoCsv = 'planodesaude.csv'; // Arquivo CSV

let regressionModel,
    csvData = [], // Variavél para armazenar os dados do csv
    x = [], // Entrada
    y = []; // Saída

// X e Y são necessários na regressão linear

//Configurção de entrada e saída prompt
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Lê o arquivo
csv()
    .fromFile(arquivoCsv)
    .on('json', (jsonObj) => {
        // Faz o push para o array csv data
        csvData.push(jsonObj);
    })
    .on('done', () => {
        csvData.forEach((linha) => {
            x.push(parseFloat(linha.Idade)); // Idade é X
            y.push(parseFloat(linha.Valor)); // Valor do Plano é Y
        });
        criarRegressao(); // Cria a regressão
    });

function criarRegressao() {
    regressionModel = new SLR(x, y); // Instância o modelo
    console.log('Fórmula:', regressionModel.toString(3)); // Fórmula criada pela biblioteca ML
    previsaoSaida();
}

function previsaoSaida() {
    rl.question('Insira a entrada X para a previsão (Pressione CTRL+C para sair) : ', (resposta) => {
        // Utiliza da função predict da lib para fazer a previsão
        console.log(`Em X = ${resposta}, y =  ${regressionModel.predict(parseFloat(resposta))}`);
        previsaoSaida();
    });
}