def MVN_PROFILE="integracion"; // Por default, por el momento sin uso especifico.
def PROPERTIES_PATH=''; // Ruta de las properties descargadas desde Estabilizacion Negocios
def FAIL_BUILD_ON_CVSS = 9; // Nota de seguridad para que el Test Owasp sea fallido. // TODO: Esto debe ir dentro de Jenkins (no modiificable)
def ACCESS_TOKEN_GIT='Sc9zTEQ5KBCcFicezKyt' // change it! Cada proyecto pone su access token (asociado a un usuario)

// Definiendo los proyectos MS (backend) y Front UI
def ui = ['games-nuxt-tailwindcss']; // proyectos backend (nombres de directorios)
def ms = ['game-api-adonis']; // proyectos backend (nombres de directorios)

@NonCPS
def getBuildUser() {
    return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
}

pipeline {
 
  environment { 
    HTTP_PROXY = 'http://laurel.sii.cl:3128'
    HTTPS_PROXY = 'http://laurel.sii.cl:3128'
    NO_PROXY = 'localhost,127.0.0.1,172.17.0.1,*.sii.cl'

    NEXUS_VERSION = "nexus3"
    NEXUS_PROTOCOL = "http"
    NEXUS_URL = "apus.sii.cl:8081"
    NEXUS_REPOSITORY = "sii-repo-releases"
    NEXUS_CREDENTIAL_ID = "nexus-user-deploy"    
  }

  agent any
  
  stages {


    stage('Setup parameters') {
      steps {
        script { 
          properties([
            parameters([
              choice(
                choices: ['integracion', 'release'],
                description: 'Cuál es su acción o destino?',  
                name: 'STAGE'
              ),           
              string(
                defaultValue: '', 
                name: 'VERSION',
                description: 'Versión? por ejemplo 0.0.1-SNAPSHOT si es integracion o 0.0.1 si es release', 
                trim: true
              )              
            ])
          ])
        }
      }
    }

    stage ('Validate Version') {
      steps {
        script {
[]          // tenemos que validar que la version sea valida y del formato requerido
          def current_tag = params.VERSION
          def snapshot = current_tag.endsWith("-SNAPSHOT")
          if(!current_tag || current_tag == '' || (params.STAGE == 'integracion' && !snapshot) || (params.STAGE == 'release' && snapshot)){
              error "Se requiere setear versión y debe estar en formato X.Y.Z-SNAPSHOT si es integracion o X.Y.Z si es release: ${params.VERSION}" 
          } else{
	          def major = (current_tag =~ /\d+\.\d+\.\d+[-]?(alpha|rc)?(\d)?{1,2}/)
	          if (major) { 
	            // significa que cumple con la regla de tag en nombrado y es deployable.
	            println major.group()
	          } else {
	            error "Tag sin formato válido : ${params.VERSION} " 
	          }              
          }
        }
      }
    }

    stage('Build Frontend SSR') {
      agent {
          docker {
              image 'node:16'
          }
      }
      steps {

        script {
          ui.each {

            dir(path: "./${it}") {
              sh 'npm_config_cache=npm-cache'
              sh 'HOME=.'
              // cache sobre nexus
              sh 'npm config set registry http://apus.sii.cl:8081/repository/npm-sii-group/'
              sh "echo \"VUE_APP_GIT_COMMIT=${GIT_COMMIT}\" >> .env"
              sh 'npm install'
              echo "fijando la version frontend a la ${params.VERSION}"
              sh "npm version ${params.VERSION} --allow-same-version"
              sh 'npm run build'
            } // end dir
          }
        } 
      }
    }

    stage('Build Backend MS') {
      agent {
          docker {
              image 'node:16'
          }
      }
      steps {

        script {
          ms.each {

            dir(path: "./${it}") {
              sh 'npm_config_cache=npm-cache'
              sh 'HOME=.'
              // cache sobre nexus
              sh 'npm config set registry http://apus.sii.cl:8081/repository/npm-sii-group/'
              sh "echo \"VUE_APP_GIT_COMMIT=${GIT_COMMIT}\" >> .env"
              sh 'npm -v'
              sh 'npm install'
              echo "fijando la version frontend a la ${params.VERSION}"
              sh "npm version ${params.VERSION} --allow-same-version"
              sh 'npm run build'
            } // end dir
          }
        } 
      }
    }

    // DEPLOY EN INTEGRACION //

    stage('Deploy Frontend - Integracion') {
      agent {
          docker {
              image 'inukisoft/sii-node-pm2:nueva'
          }
      }
      when { expression { return params.STAGE == "integracion" } }
      steps {

        script {
            
          withCredentials([sshUserPrivateKey(credentialsId: "ssh-felis-credencial", keyFileVariable: 'keyfile')]) {

            sh 'npm_config_cache=npm-cache'
            sh 'HOME=.'
            // cache sobre nexus
            sh 'npm config set registry http://apus.sii.cl:8081/repository/npm-sii-group/'
                          
            ui.each {                
                dir(path: "${it}") {
                    
                    sh "eval `ssh-agent -s` && ssh-add  ${keyfile} && pm2 deploy ecosystem.config.js integracion setup"
                    sh "eval `ssh-agent -s` && ssh-add  ${keyfile} && pm2 deploy ecosystem.config.js integracion --force"
                } 
            }
          }
        } 
      }
    }

    stage('Deploy Backend - Integracion') {
      agent {
          docker {
              image 'inukisoft/sii-node-pm2:nueva'
          }
      }
      when { expression { return params.STAGE == "integracion" } }
      steps {

        script {
            
          withCredentials([sshUserPrivateKey(credentialsId: "ssh-felis-credencial", keyFileVariable: 'keyfile')]) {

            sh 'npm_config_cache=npm-cache'
            sh 'HOME=.'
            // cache sobre nexus
            sh 'npm config set registry http://apus.sii.cl:8081/repository/npm-sii-group/'
                          
            ms.each {                
                dir(path: "${it}") {
                    
                    sh "eval `ssh-agent -s` && ssh-add  ${keyfile} && pm2 deploy ecosystem.config.js integracion setup"
                    sh "eval `ssh-agent -s` && ssh-add  ${keyfile} && pm2 deploy ecosystem.config.js integracion --force"
                } 
            }
          }
        } 
      }
    }

  }

}
