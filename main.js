const get = require('./get');

async function main() {
    await get();

    const decifra = require('./decifra');
    await decifra();

    const crypto = require('./crypto');
    await crypto();

    const post = require('./post');
    post();
}

main();