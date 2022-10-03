const express = require('express');
const { rmSync } = require('fs');
const { sign, verify } = require('../crypto/sign');

const signatureRouter = new express.Router();

signatureRouter.post('/sign', (req, res) => {
    try {
        const signature = sign(req.body);
        res.status(200).send({signature});
    } catch (e) {
        res.status(500).send();
    }       
});

signatureRouter.post('/verify', (req, res) => {
    try {
        const match = verify(req.body.signature, req.body.data);
        if (match) {
            res.status(204).send();
        } else {
            res.status(400).send();
        }
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = signatureRouter;