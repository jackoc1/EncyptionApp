const crypto = require('crypto');
const path = require('path');
const { readCipherKeySync } = require('../crypto/keys');

const dir = path.join(__dirname, '../../keys/', process.env.KEYS_DIR);
const encrypted_regex = /^[A-Fa-f0-9]+:[A-Fa-f0-9]+$/;  // Match 2 hex strings separated by :

const encrypt = (plain_text) => {
    const secret_key = readCipherKeySync(dir);
    const init_vector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-128-cbc', secret_key, init_vector);

    const encrypted = crypto.update(plain_text);
    const final_buffer = crypto.concat([encrypted, cipher.final()]);
    // : is not a hex character so works as separator for init vector for cipher and the encrypted text
    // init vector I believe works on similar lines to salts where it prevents rainbow table type attacks
    const encrypted_hex = init_vector.toString('hex') + ':' + final_buffer.toString('hex');
    
    return encrypted_hex;
}

const decrypt = (encrypted_hex) => {
    const secret_key = readCipherKeySync(dir);
    const encrypted_array = encrypted_hex.split(':');
    const init_vector = Buffer.from(encrypted_array[0], 'hex');
    const encrypted = Buffer.from(encrypted_array[1], 'hex');

    const decipher = Crypto.createDecipheriv('aes-128-cbc', secret_key, init_vector);
    const decrypted = decipher.update(encrypted);
    const clear_text = Buffer.concat([decrypted, decipher.final()]).toString();

    return clear_text;
}

const isEncrypted = (hex) => {
    return encrypted_regex.test(hex);  // This is obviously not a bulletproof solution
}

const decryptJSON = (encypted_json) => {
    const decrypted_json = {}
    for (const key in encypted_json) {
        if (isEncrypted(encypted_json[key])) {
            const decrypted_value = decrypt(encypted_json[key]);
            const unstringified_value = JSON.parse(decrypted_value);
            decrypted_json[key] = unstringified_value;
        } else {
            decrypted_json[key] = encypted_json[key];
        }
    }
    return decrypted_json;
}

module.exports = {
    encrypt,
    decrypt,
    isEncrypted,
    decryptJSON
}