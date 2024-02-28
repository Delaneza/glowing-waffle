const sonarqubeScanner = require('sonarqube-scanner')
require('dotenv').config()
const { exec } = require('child_process')

const config = {
  serverUrl: process.env.SONARQUBE_URL,
  token: process.env.SONARQUBE_TOKEN,
  options: {
    'sonar.projectKey': process.env.SONARQUBE_PROJECT_KEY,
    'sonar.sources': './src',
    'sonar.javascript.lcov.reportPaths': './coverage/lcov.info',
    'sonar.exlusions': '**/coverage/**',
    'sonar.coverage.exclusions': '**/coverage/**,**/src/app.ts,*/coverage/**,**/src/server.ts,**/src/api/index.ts',
  },
}

/**
 * O sonarqube-scanner não aceita o arquivo sonar-project.properties na raiz do projeto
 * por isso, renomeamos o arquivo para .sonar-project.properties e depois de executar o scanner
 * renomeamos o arquivo de volta para o nome original.
 */

async function main() {
  /** Movendo o arquivo sonar-project.properties para .sonar-project.properties */
  exec('mv sonar-project.properties .sonar-project.properties')

  sonarqubeScanner(config, () => {
    /** Movendo o arquivo .sonar-project.properties para sonar-project.properties */
    exec('mv .sonar-project.properties sonar-project.properties')

    process.exit()
  })
}

main()
