const fs         = require('fs');
const path       = require('path');

const answerPath = path.resolve(__dirname, 'answer.json');
const config     = require(path.resolve(__dirname, 'util'));
    
const answer     = fs.readFileSync(answerPath, 'utf8');
var object       = JSON.parse(answer);
const cifrado    = object.cifrado;
const secret     = 26;


var chars        = cifrado.split('');

async function letterToNumber(letters) {
    var promises = letters.map((letter) => {
        return new Promise((resolve) => {
            switch (letter) {
                case ' ':
                    resolve(' ');
                    break;
                case '.':
                    resolve('.');
                    break;
                default:
                    resolve(config.NUMBERS[letter]);
            }
        });

    });
    return await Promise.all(promises);
}

async function numbersToLetters(numbers) {
    var promises = numbers.map((number) => {
        return new Promise((resolve) => {
            switch (number) {
                case ' ':
                    resolve(' ');
                    break;
                case '.':
                    resolve('.');
                    break;
                default:
                    if(number <= object.numero_casas) {
                        resolve(config.LETTERS[number + ( secret - object.numero_casas)]);
                    } else {
                    resolve(config.LETTERS[number - object.numero_casas]);
                    }
            }
        });
    });
    return await Promise.all(promises);
}

function saveJson(answer) {
    fs.writeFileSync(answerPath, answer);
}

async function decifra() {
    var numbers = await letterToNumber(chars);
    var letters = await numbersToLetters(numbers);
    var decifrado = letters.join('');
    object.decifrado = decifrado;
    var answer = JSON.stringify(object);
    saveJson(answer);
}

module.exports = decifra

