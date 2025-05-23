# PoC - 01 Backend Java Spring Boot com Firebase Auth

Este projeto é uma prova de conceito (PoC) de um backend Java Spring Boot que valida tokens do Firebase Authentication e expõe uma API protegida.

---

## Pré-requisitos

- Java 17 instalado e configurado no PATH do sistema.
- Maven (opcional, pois o projeto já inclui o Maven Wrapper para rodar sem instalar o Maven globalmente).
- Projeto Firebase criado no [Firebase Console](https://console.firebase.google.com/).
- Ativação do método de autenticação **Email/Password** no Firebase Authentication > Sign-in method.
- Arquivo `serviceAccountKey.json` (chave privada do Admin SDK) baixado do Firebase Console > Configurações do projeto > Contas de serviço.

---

## Estrutura do projeto

firebase-backend/

├─ src/

│ ├─ main/

│ │ ├─ java/

│ │ │ └─ com/example/firebasebackend/

│ │ │ └─ FirebaseBackendApplication.java

│ │ └─ resources/

│ │ └─ application.properties

├─ pom.xml

├─ mvnw

├─ mvnw.cmd

└─ serviceAccountKey.json <-- Coloque seu arquivo aqui

## Como rodar localmente

    Coloque o arquivo serviceAccountKey.json na raiz do projeto (firebase-backend/).

    No terminal, execute o backend com o Maven Wrapper:

## Linux / Mac
./mvnw spring-boot:run

## Windows (PowerShell ou CMD)
mvnw.cmd spring-boot:run

    O backend estará rodando no endereço:
    http://localhost:8080

    API protegida:
    GET http://localhost:8080/api/protected
