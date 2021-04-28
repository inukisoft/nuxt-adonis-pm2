module.exports = {

  apps: [
    {
      name: "API-AdonisGames",
      exec_mode: "cluster",
      instances: "2",
      script: "./game-api-adonis/build/server.js"
    },
    {
      name: "NuxtGames",
      exec_mode: "cluster",
      instances: "2", 
      script: "./games-nuxt-tailwindcss/node_modules/nuxt/bin/nuxt.js",
      args: "start"
    }    
  ],
  deploy: {
        "integracion" : {
          "user" : "root",
          "host" : ["felis.sii.cl"],
          "ref"  : "origin/master",
          "repo" : "http://cefio.sii.cl/arq/arsii/poc/nuxt-adonis-arsii.git",
          "path" : "/APP01/pm2_deploy",
          "ssh_options": "StrictHostKeyChecking=no",
          "pre-setup" : "rm -rf /APP01/pm2_deploy/source",
          "pre-deploy-local" : "echo 'This is a local executed command'",
          "post-deploy" : "cd game-api-adonis && npm i && npm run build && cp .env.integracion build/.env && cd .. && cd games-nuxt-tailwindcss && npm install && npm run build && cd .. && sudo pm2 startOrRestart ecosystem.config.js --env integracion"
         }
       
  }  

}
