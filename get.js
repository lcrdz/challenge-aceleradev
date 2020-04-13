const request    = require('request');
const fs         = require('fs');
const path       = require('path');

const answerPath = path.resolve(__dirname, 'answer.json');
const config     = require(path.resolve(__dirname, 'util'));

const options = {
    method: 'GET',
    url: `${config.GET_URL}${config.TOKEN}`
}

async function getJson() {
    return new Promise((resolve) => {
        request(options, function (error, res) {
            answer = res.body;
            resolve(answer);
        })
    });
}

async function saveJson(answer) {
    return new Promise((resolve) => {
        fs.writeFileSync(answerPath, answer);
        resolve();
    });
}

async function get() {
    answer = await getJson()
    await saveJson(answer);
}

module.exports = get