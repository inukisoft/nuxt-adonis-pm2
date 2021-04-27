module.exports = {

  apps: [
    {
      name: "API-AdonisGames",
      exec_mode: "cluster",
      instances: "2",
      script: "server.js"
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
          "pre-setup" : "rm -rf /APP01/pm2_deploy/source ; ls -lart ",
          "pre-deploy-local" : "echo 'This is a local executed command'",
          "post-deploy" : "cd game-api-adonis ; npm ci --production && npm run build && sudo pm2 startOrRestart ecosystem.config.js --env integracion"
         }
       
  }  

}