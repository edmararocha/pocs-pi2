# PoC - Keycloak + Upload Local + NestJS

## Requisitos
- Keycloak rodando localmente
- Realm configurado com um client "nest-client" (public)
- Usuário criado

## Como rodar

1. `npm install`
2. `npm run start:dev`

## Endpoints
- `GET /progresso` → protegido por JWT
- `POST /upload` (multipart/form-data com campo `file`) → faz upload para `./uploads`

## Observação
- Altere o issuer/audience conforme seu Realm e client do Keycloak.