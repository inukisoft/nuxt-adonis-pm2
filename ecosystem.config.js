module.exports = {

  apps: [
    {
      name: "API-AdonisGames",
      cwd: "./game-api-adonis",
      exec_mode: "cluster",
      instances: "1",
      script: "build/server.js"
    },
    {
      name: "NuxtGames",
      cwd: "./games-nuxt-tailwindcss",
      exec_mode: "cluster",
      instances: "1", 
      script: "node_modules/nuxt/bin/nuxt.js",
      args: "start"
    }    
  ],
  deploy: {
        "integracion" : {
          "user" : "ubuntu",
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
