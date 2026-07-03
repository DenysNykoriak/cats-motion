pipeline {
  agent { label 'docker' }

  environment {
    REGISTRY = 'registry.home.lan'
    IMAGE_NAME = 'cats-motion'
    IMAGE = "${REGISTRY}/${IMAGE_NAME}"
    BRANCH_TAG = "${env.BRANCH_NAME}".replaceAll('/', '-').replaceAll('[^a-zA-Z0-9._-]', '-').toLowerCase()
    IMAGE_TAG = "${BRANCH_TAG}-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Build') {
      steps {
        withCredentials([
          string(credentialsId: 'cats-base-url', variable: 'CATS_BASE_URL'),
          string(credentialsId: 'cats-api-key', variable: 'CATS_API_KEY'),
        ]) {
          sh """
            docker build \\
              --build-arg CATS_BASE_URL=\${CATS_BASE_URL} \\
              --build-arg CATS_API_KEY=\${CATS_API_KEY} \\
              -t ${env.IMAGE}:${env.IMAGE_TAG} \\
              -t ${env.IMAGE}:${env.BRANCH_TAG} \\
              .
          """
        }
      }
    }

    stage('Push') {
      steps {
        withCredentials([
          usernamePassword(
            credentialsId: 'registry-home-lan',
            usernameVariable: 'REGISTRY_USER',
            passwordVariable: 'REGISTRY_PASS',
          ),
        ]) {
          sh """
            echo "\${REGISTRY_PASS}" | docker login ${env.REGISTRY} -u "\${REGISTRY_USER}" --password-stdin
            docker push ${env.IMAGE}:${env.IMAGE_TAG}
            docker push ${env.IMAGE}:${env.BRANCH_TAG}
            docker logout ${env.REGISTRY}
          """
        }
      }
    }
  }

  post {
    always {
      script {
        sh """
          docker rmi ${env.IMAGE}:${env.IMAGE_TAG} ${env.IMAGE}:${env.BRANCH_TAG} || true
        """
      }
    }
  }
}
