# To execute:
## Download required packages
```
npm install
```

## node version: 
```
node v18.9.1, can use nvm to easily switch
```

## run tests
```
npm run test
```

Interact with the API while running on localhost through Postman, CURL or the browser console.

## Encrypt/Decrypt
Encrypt endpoint accepts any valid JSON and for each top level key returns the same key but with an encrypted value. Decrypt takes the returned JSON from Encrypt and decrypts it.

Sign endpoint accepts any valid JSON and sends back the original data along with a signature. Verify endpoint takes a signature and piece of data and verifies that the signature was generated using the data and the encryptor's private key. (Public and private keys kept on one computer for simplicity). 

**Test data**

```js
{
    "foo": "foobar",
    "bar": {
        "isBar": true
    }
}
```

## start dev server
```
npm run dev
```

# Other info
Keys are created the first time `test` or `dev` are ran. A keys folder will appear at the top level of the directory and test and dev keys will go into separate subfolders. Env files are used to switch between keys in the source code.

Error handling and dealing with edge cases was not a priority of mine doing this although there are some standard try/catch blocks in the api endpoints. 

I enjoyed doing this much more than I was expecting as there was a lot to learn despite heavily relying on libraries. It was nice to be able to use what I'd learned from various courses over summer on a project without a given solution.
