const path = require('path');
const fs = require('fs');
const app = require('./app');
const { writeKeysSync } = require('./crypto/keys');

if (!fs.existsSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR))) {
    fs.mkdirSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR));
    writeKeysSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR));
}

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});