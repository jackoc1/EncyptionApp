const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/app');

const { writeKeysSync, readKeysSync } = require('../src/crypto/keys');
const { dummy_data } = require('./fixtures/reqbodys');

beforeAll(() => {
    if (!fs.existsSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR))) {
        fs.mkdirSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR));
        writeKeysSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR));
    }
});

test('Encrypt/decrypt endpoints', async () => {
    const encrypt_response = await request(app).post('/encrypt')
        .send(dummy_data)
        .expect(200);

    const decrypt_data = {
        ...encrypt_response.body,
        noEncrypt: "Comes back normal"
    }

    const decrypt_response = await request(app).post('/decrypt')
        .send(decrypt_data)
        .expect(200);

    expect(decrypt_response.foo == encrypt_response.foo);
    expect(decrypt_response.bar == encrypt_response.bar);
    expect(decrypt_response.noEncrypt == "Comes back normal");
});