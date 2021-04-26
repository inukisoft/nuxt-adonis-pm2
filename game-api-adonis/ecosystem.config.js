module.exports = {
    apps: [
      {
        name: 'ApiAdonisGames',
        exec_mode: 'cluster',
        instances: '2', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ],

    deploy : {
        // "production" is the environment name
        "integracion" : {
          "user" : "root",
          "host" : ["felis.sii.cl"],
          "ref"  : "origin/master",
          "repo" : "http://cefio.sii.cl/arq/arsii/poc/nuxt-adonis-arsii.git",
          "path" : "/APP01/pm2_deploy",
          "ssh_options": "StrictHostKeyChecking=no",
          "pre-setup" : "rm -rf /APP01/pm2_deploy/source ; ls -lart ",
          "pre-deploy-local" : "echo 'This is a local executed command'",
          "post-deploy" : "cd game-api-adonis ;  ls -lart ; npm i && npm run build && cp .env.integracion ./build && sudo pm2 start build/server.js --name API -i 2  --env integracion"
         },
      }    

  }