const request    = require('request');
const fs         = require('fs');
const path       = require('path');


const answerPath = path.resolve(__dirname, 'answer.json');
const config     = require(path.resolve(__dirname, 'util'));
const answer     = fs.readFileSync(answerPath, 'utf8');
var object       = JSON.parse(answer);

const options = {
    method: 'POST',
    url: `${config.POST_URL}${config.TOKEN}`,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    formData: {
        'answer': fs.createReadStream(answerPath)
    }
}

function post() {
    console.log(object);
    console.log("==============");
    request(options, function (error, res) {
        if (!error) {
            console.log('Post => ' + res.statusCode);
        }
    });
}

module.exports = post