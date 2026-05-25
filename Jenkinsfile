pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {

                    // Execute Playwright tests
                    def testStatus = bat(
                        script: 'npx playwright test',
                        returnStatus: true
                    )

                    // Continue pipeline even if tests fail
                    if (testStatus != 0) {
                        echo 'Playwright tests failed, continuing to publish report...'
                    }
                }
            }
        }
    }

    post {
        always {

            echo 'Publishing Playwright HTML Report...'

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
} 