*If I've mistakenly left any info out that you require please let me know :).*

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

Postman was also used. I had one request per endpoint. Encrypt and sign both used the dummy data for request bodys. Response data such as signature or encrypted fields would be manually copied into the postman requests for verify and decrypt. It did not seem expedient to setup some postman environment variables/scripts to fully automate the process.

**Test data**

```js
{
    "foo": "foobar",
    "bar": {
        "isBar": true
    }
}
```

## start dev server (Postman requests are always handy)
```
npm run dev
```

# Production
If this were to be deployed I'd use Heroku. All that is needed is to set a git remote. The port environment variable and other production env variables would be configured on the Heroku website. The entry point would be `npm run start`.


# Other info
Keys are created the first time `test` or `dev` are ran. A keys folder will appear at the top level of the directory and test and dev keys will go into separate subfolders. Env files are used to switch between keys in the source code.

Public keys are just kept with private keys since I've no idea where else I'd put them. Publishing on public CA cert repositories is not something I have ever looked at.

Error handling and dealing with edge cases was not a priority of mine doing this although there are some standard try/catch blocks in the api endpoints. 

I enjoyed doing this much more than I was expecting as there was a lot to learn despite heavily relying on libraries. It was nice to be able to use what I'd learned from various courses over summer on a project without a defined solution.

# Time to do
`git log` should give an accurate enough representation of the pace I was going at bar certain events like me eating dinner/going for strolls. I have not used Cryptography libraries before in Node and Buffer/Hex inexperience also led to a few bugs as well so the time taken was longer than 4 hours.

For what it's worth the first hour was me realising my node version on my laptop was heavily out of date causing crashes since I've only ever used Node on a previous work machine.