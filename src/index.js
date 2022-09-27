const app = require('./app');
const path = require('path');
const { writeKeysSync } = require('./crypto/keys');

const port = process.env.PORT;

if (!fs.existsSync(path.join('../keys/', process.env.KEYS_DIR))) {
    fs.mkdirSync(path.join('../keys/', process.env.KEYS_DIR));
    writeKeysSync(path.join('../keys/', process.env.KEYS_DIR));
}

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});