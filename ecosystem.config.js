module.exports = {

  apps: [
    {
      name: "API-AdonisGames",
      exec_mode: "cluster",
      instances: "1",
      script: "./game-api-adonis/build/server.js"
    },
    {
      name: "NuxtGames",
      exec_mode: "cluster",
      instances: "1", 
      script: "./games-nuxt-tailwindcss/node_modules/nuxt/bin/nuxt.js",
      args: "start"
    }    
  ],
  deploy: {
        "integracion" : {
          "user" : "root",
          "host" : ["localhost"],
          "ref"  : "origin/main",
          "repo" : "https://github.com/inukisoft/nuxt-adonis-pm2.git",
          "path" : "/home/ubuntu/pm2_deploy",
          "ssh_options": "StrictHostKeyChecking=no",
          "pre-setup" : "rm -rf /home/ubuntu/pm2_deploy/source",
          "pre-deploy-local" : "echo 'This is a local executed command'",
          "post-deploy" : "cd game-api-adonis && npm i && npm run build && cp .env.integracion build/.env && cd .. && cd games-nuxt-tailwindcss && npm install && npm run build && cd .. && sudo pm2 startOrRestart ecosystem.config.js --env integracion"
         }
       
  }  

}
