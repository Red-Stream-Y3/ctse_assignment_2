pipeline {
    agent: any
    stages {
        stage('Build Docker Image') {
            steps {
                echo 'Building..'
                sh 'docker-compose up --build'
            }
        }
    }
}