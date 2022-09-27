const express = require('express');
const path = require('path');
const { 
    encrypt,
    decryptJSON
} = require('../crypto/cipher');

const encryptRouter = new express.Router();

encryptRouter.post('/encrypt', (req, res) => {
    try {
        const encrypted_json = {};
        for (const key in req.body) {
            const stringified_value = JSON.stringify(req.body[key]);
            encrypted_json[key] = encrypt(stringified_value);
        }
        res.status(200).send(encrypted_json)
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
    
});

encryptRouter.post('/decrypt', (req, res) => {
    try {
        const decrypted_json = decryptJSON(req.body);
        res.status(200).send(decrypted_json);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = encryptRouter;