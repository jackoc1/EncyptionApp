const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/app');

const { writeKeysSync, readKeysSync } = require('../src/crypto/keys');
const { dummy_data } = require('./fixtures/reqbodys');

beforeAll(() => {
    if (!fs.existsSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR))) {
        fs.mkdirSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR), { recursive: true });
        writeKeysSync(path.join(__dirname, '../keys/', process.env.KEYS_DIR));
    }
});

test('sign/verify endpoints', async () => {
    const sign_response = await request(app).post('/sign')
        .send(dummy_data)
        .expect(200);
    const signature = sign_response.body.signature;
    
    const data = dummy_data;
    const verify_request = {
        signature,
        data
    }
    console.log(verify_request)
    const verify_response = await request(app).post('/verify')
        .send(verify_request)
        .expect(204);
});