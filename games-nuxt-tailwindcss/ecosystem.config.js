module.exports = 
{
  apps: [
    {
      name: "NuxtGames",
      exec_mode: "cluster",
      instances: "2", 
      script: "./node_modules/nuxt/bin/nuxt.js",
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
          "pre-setup" : "rm -rf /APP01/pm2_deploy/source ; ls -lart ",
          "pre-deploy-local" : "echo 'This is a local executed command'",
          "post-deploy" : "cd games-nuxt-tailwindcss && npm install && npm run build && ls -lart && sudo pm2 startOrRestart ecosystem.config.js --env integracion"
         }
      
  }  
}