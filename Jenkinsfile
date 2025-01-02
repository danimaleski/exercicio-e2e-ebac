pipeline {
   agent any


   stages {
       stage('Repositório') {
         steps {
           git branch: 'main', url: 'https://github.com/danimaleski/exercicio-e2e-ebac.git'
         }
       }
       stage('Instalar dependências') {
         steps {
           sh 'npm install'
         }
       }
       stage('Executar Testes') {
         steps {
           sh 'NO_COLOR=1 npm test'
         }
       }
   }
}
