def remote = [:]
remote.name = 'tencent_cloud'
remote.host = '118.89.52.145'
remote.user = 'root'
remote.password = 'Ai798998203'
remote.allowAnyHosts = true

pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '''
'''
    }
  }
  stages {
    stage('git pull') {
      steps {
        dir(path: './render') {
          git branch: 'master',
          url: 'https://github.com/xkelvinx666/mda-backend-render'
        }
        dir(path: './template') {
          git branch: 'master'
          url: 'https://github.com/xkelvinx666/mda-template-backend'
        }
      }
    }
    stage('build') {
      steps {
        sh 'cd ./render && npm install && npm run build'
      }
    }
    stage('compile') {
      steps {
        sh 'cd ./render && npm run template art ../template 1'
      }
    }
    stage('after-compile') {
      steps {
        sh 'cd ./template && npm install && npm run build'
      }
    }
    stage('before-publish') {
       steps {
        sh 'tar -czvf backend.tar ./template/*'
        archiveArtifacts 'backend.tar'
      }
    }
    stage('publish') {
      steps {
        sshPublisher(
        publishers:
          [sshPublisherDesc(
            configName: 'tencent_cloud',
            transfers: [
              sshTransfer(
                cleanRemote: false,
                excludes: '',
                execCommand: '',
                execTimeout: 120000,
                flatten: false,
                makeEmptyDirs: false,
                noDefaultExcludes: false,
                patternSeparator: '[, ]+',
                remoteDirectory: 'template',
                remoteDirectorySDF: false,
                removePrefix: '',
                sourceFiles: 'backend.tar'
              )],
              usePromotionTimestamp: false,
              useWorkspaceInPromotion: false,
              verbose: false
           )])
      }
    }
    stage('after-publish') {
       steps {
        sshCommand remote: remote, command: "cd ~/template && tar -xzvf backend.tar && mv template backend && rm backend.tar"
        sshCommand remote: remote, command: "cd ~/template/backend && pm2 start npm -- run start"
      }
    }
  }
}
