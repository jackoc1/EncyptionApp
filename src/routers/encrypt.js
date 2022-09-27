const express = require('express');
const path = require('path');

const { encrypt, decrypt, isEncrypted } = require('../crypto/cipher');
const encryptRouter = new express.Router();

encryptRouter.post('/encrypt', (req, res) => {
    try {
        const encrypted_json = {};
        for (const key in req.body) {
            const stringified_value = JSON.stringify(req.body[key]);
            encrypted[key] = encrypt(stringified_value);
        }
        res.status(200).send(encrypted_json)
    } catch (e) {
        res.status(500).send();
    }
    
});

encryptRouter.post('/decrypt', (req, res) => {
    try {
        const decrypted_json = {};
        for (const key in req.body) {
            if (isEncrypted(req.body[key])) {
                const decrypted_value = decrypt(req.body[key]);
                const unstringified_value = JSON.parse(decrypted_value);
                decrypted_json[key] = unstringified_value;
            } else {
                decrypted_json[key] = req.body[key];
            }
        }
        res.status(200).send(decrypted_json);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = encryptRouter;