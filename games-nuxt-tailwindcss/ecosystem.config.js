module.exports = {
    apps: [
      {
        name: 'NuxtGames',
        exec_mode: 'cluster',
        instances: '2', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ],

    deploy : {
        // "production" is the environment name
        "production" : {
          "user" : "root",
          "host" : ["felis.sii.cl"],
          "ref"  : "origin/master",
          "repo" : "http://cefio.sii.cl/arq/arsii/poc/nuxt-adonis-arsii",
          "path" : "/APP01/pm2_deploy",
          "post-deploy" : "cd games-nuxt-tailwindcss; npm i; npm run build ;"
         },
      }    

  }