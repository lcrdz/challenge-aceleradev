const crypto     = require('crypto');
const fs         = require('fs');
const path       = require('path');

const answerPath = path.resolve(__dirname, 'answer.json');

const answer     = fs.readFileSync(answerPath, 'utf8');
var object       = JSON.parse(answer);
const decifrado  = object.decifrado;

async function encrypt() {
    object.resumo_criptografico = crypto.createHash('sha1').update(decifrado).digest('hex');
    var answer = JSON.stringify(object);
    saveJson(answer);
}

function saveJson(answer) {
    fs.writeFileSync(answerPath, answer);
}

module.exports = encrypt