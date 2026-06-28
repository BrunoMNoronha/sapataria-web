# Sistema Web da Sapataria

[![Status](https://img.shields.io/badge/status-bootstrap-blue)](#status-do-projeto)
[![Stack](https://img.shields.io/badge/stack-Next.js%20%2B%20NestJS%20%2B%20PostgreSQL%20%2B%20Prisma-0f172a)](#stack)
[![Package Manager](https://img.shields.io/badge/package%20manager-pnpm-orange)](#gerenciador-de-pacotes)

Monorepo do **Sistema Web da Sapataria**, uma aplicação web para apoiar a gestão operacional de uma sapataria de consertos, restauração e renovação de itens como sapatos, tênis, bolsas, malas, mochilas, sandálias, jaquetas e outros produtos.

O sistema será construído em torno da **Ordem de Serviço (OS)**, conectando cliente, itens, serviços, autorização, pagamentos, produção, garantia, entrega e histórico.

---

## Sumário

- [Status do projeto](#status-do-projeto)
- [Objetivo](#objetivo)
- [Stack](#stack)
- [Arquitetura geral](#arquitetura-geral)
- [Estrutura do monorepo](#estrutura-do-monorepo)
- [Pré-requisitos](#pré-requisitos)
- [Primeira configuração](#primeira-configuração)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Banco de dados local com Docker](#banco-de-dados-local-com-docker)
- [Prisma](#prisma)
- [Executando o projeto](#executando-o-projeto)
- [Health check da API](#health-check-da-api)
- [Scripts disponíveis](#scripts-disponíveis)
- [Padrões de desenvolvimento](#padrões-de-desenvolvimento)
- [Boas práticas de Git](#boas-práticas-de-git)
- [Segurança](#segurança)
- [Escopo do bootstrap](#escopo-do-bootstrap)
- [O que não está implementado no bootstrap](#o-que-não-está-implementado-no-bootstrap)
- [Checklist de validação do bootstrap](#checklist-de-validação-do-bootstrap)
- [Troubleshooting](#troubleshooting)
- [Roadmap técnico inicial](#roadmap-técnico-inicial)

---

## Status do projeto

**Fase atual:** bootstrap técnico do repositório.

Este repositório ainda não contém os módulos de negócio completos. O objetivo inicial é criar uma fundação técnica limpa, consistente e evolutiva para desenvolvimento posterior do MVP.

O bootstrap deve entregar apenas:

- monorepo com `pnpm workspaces`;
- aplicação web com Next.js;
- aplicação API com NestJS;
- PostgreSQL local opcional via Docker Compose;
- Prisma inicial;
- variáveis de ambiente parametrizadas;
- health check da API;
- scripts básicos de desenvolvimento;
- lint e format inicial;
- documentação base.

---

## Objetivo

O Sistema Web da Sapataria tem como objetivo controlar o fluxo operacional essencial da loja, desde a entrada do item até a entrega final ao cliente.

O MVP deverá permitir, em etapas futuras:

- cadastro de clientes;
- criação de Ordens de Serviço;
- OS com múltiplos itens;
- serviços por item;
- registro de aprovação ou autorização;
- registro de sinal e pagamentos;
- cálculo de saldo pendente pelo backend;
- controle de status da OS e dos serviços;
- produção simples;
- entrega da OS inteira;
- retirada por terceiro com via do cliente;
- registro simples de garantia;
- via do cliente imprimível;
- histórico e auditoria básica;
- consultas e relatórios simples.

---

## Stack

| Camada | Tecnologia | Finalidade |
|---|---|---|
| Frontend | Next.js | Interface web, telas operacionais e via imprimível |
| Backend | NestJS | API REST, regras de negócio e segurança |
| Banco de dados | PostgreSQL | Persistência relacional |
| ORM | Prisma | Acesso ao banco, schema e migrations |
| Monorepo | pnpm workspaces | Organização de apps e pacotes compartilhados |
| Container local | Docker Compose | PostgreSQL local opcional |
| Linguagem | TypeScript | Tipagem no frontend, backend e pacotes compartilhados |

---

## Gerenciador de pacotes

Este projeto usa **pnpm** com workspaces.

Não usar:

- `npm install`;
- `yarn`;
- `package-lock.json`;
- `yarn.lock`.

Usar sempre:

```bash
pnpm install
```

---

## Arquitetura geral

```txt
Frontend Next.js
        |
        | REST API / JSON
        v
Backend NestJS
        |
        | Prisma ORM
        v
PostgreSQL
```

Para upload de fotos, a arquitetura ficará preparada para evolução futura:

```txt
Frontend Next.js
        |
        v
Backend NestJS
        |
        +--> PostgreSQL: metadados do arquivo
        |
        +--> Storage: arquivo físico/imagem
```

O upload real de fotos **não é bloqueante** para o bootstrap.

---

## Estrutura do monorepo

```txt
sapataria-web/
  apps/
    web/
      src/
      public/
      package.json
      next.config.ts
      tsconfig.json

    api/
      src/
        app.controller.ts
        app.module.ts
        app.service.ts
        main.ts
      prisma/
        schema.prisma
      generated/
        prisma/
      test/
      package.json
      tsconfig.json
      nest-cli.json
      prisma.config.ts
      .env.example

  packages/
    shared/
      src/
        index.ts
      package.json
      tsconfig.json

  docs/
    bootstrap.md

  .editorconfig
  .env.example
  .gitignore
  .prettierrc
  docker-compose.yml
  package.json
  pnpm-lock.yaml
  pnpm-workspace.yaml
  README.md
```

### Apps

| App | Caminho | Responsabilidade |
|---|---|---|
| Web | `apps/web` | Frontend em Next.js |
| API | `apps/api` | Backend em NestJS |

### Packages

| Pacote | Caminho | Responsabilidade |
|---|---|---|
| Shared | `packages/shared` | Tipos, enums, helpers e constantes compartilhadas |

> O pacote `shared` deve ser usado com moderação. Ele não deve virar uma camada de negócio paralela.

---

## Pré-requisitos

Instalar antes de rodar o projeto:

- Node.js LTS;
- pnpm;
- Git;
- Docker e Docker Compose, caso use PostgreSQL local via container.

Verificar versões:

```bash
node --version
pnpm --version
git --version
docker --version
docker compose version
```

---

## Primeira configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/BrunoMNoronha/sapataria-web.git
cd sapataria-web
```

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Criar arquivos de ambiente locais

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
```

### 4. Subir PostgreSQL local, se necessário

```bash
docker compose --env-file .env up -d postgres
```

### 5. Validar Prisma

```bash
pnpm prisma:validate
pnpm prisma:generate
```

### 6. Rodar o projeto

```bash
pnpm dev
```

---

## Variáveis de ambiente

### Raiz: `.env.example`

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=sapataria
DATABASE_PASSWORD=sapataria
DATABASE_NAME=sapataria_db
DATABASE_URL=postgresql://sapataria:sapataria@localhost:5432/sapataria_db?schema=public
```

### API: `apps/api/.env.example`

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=sapataria
DATABASE_PASSWORD=sapataria
DATABASE_NAME=sapataria_db
DATABASE_URL=postgresql://sapataria:sapataria@localhost:5432/sapataria_db?schema=public

API_PORT=3001
NODE_ENV=development
```

### Regras para arquivos `.env`

- Nunca commitar `.env` real.
- Sempre commitar apenas `.env.example`.
- Não colocar senhas reais em documentação, issues ou commits.
- Em produção, usar variáveis configuradas no provedor de deploy.

---

## Banco de dados local com Docker

O Docker Compose inicial deve subir **apenas o PostgreSQL local**.

Arquivo esperado: `docker-compose.yml`.

```yaml
services:
  postgres:
    image: postgres:16
    container_name: sapataria_postgres
    environment:
      POSTGRES_USER: ${DATABASE_USER:-sapataria}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD:-sapataria}
      POSTGRES_DB: ${DATABASE_NAME:-sapataria_db}
    ports:
      - "${DATABASE_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Subir banco:

```bash
docker compose --env-file .env up -d postgres
```

Verificar status:

```bash
docker compose ps
```

Parar banco:

```bash
docker compose down
```

Parar e remover volume local:

```bash
docker compose down -v
```

---

## Prisma

O Prisma fica no backend:

```txt
apps/api/prisma/schema.prisma
apps/api/prisma.config.ts
```

### Comandos úteis

Validar schema:

```bash
pnpm prisma:validate
```

Gerar client:

```bash
pnpm prisma:generate
```

Rodar comandos diretamente no app da API:

```bash
pnpm --filter api prisma:validate
pnpm --filter api prisma:generate
```

### Regra do bootstrap

No bootstrap inicial, **não criar models de negócio ainda**.

Não criar ainda:

- `User`;
- `Customer`;
- `ServiceOrder`;
- `ServiceOrderItem`;
- `ItemService`;
- `Payment`;
- `AuditLog`;
- qualquer migration de domínio.

A modelagem de banco será feita em etapa própria.

---

## Executando o projeto

### Subir web e API juntos

```bash
pnpm dev
```

### Subir apenas o frontend

```bash
pnpm dev:web
```

Frontend esperado:

```txt
http://localhost:3000
```

### Subir apenas a API

```bash
pnpm dev:api
```

API esperada:

```txt
http://localhost:3001
```

---

## Health check da API

Endpoint:

```txt
GET /health
```

URL local:

```txt
http://localhost:3001/health
```

Teste via curl:

```bash
curl http://localhost:3001/health
```

Resposta esperada:

```json
{
  "service": "sapataria-api",
  "status": "ok",
  "timestamp": "2026-06-28T00:00:00.000Z"
}
```

O campo `timestamp` será dinâmico.

---

## Scripts disponíveis

Scripts executados na raiz do monorepo:

| Script | Descrição |
|---|---|
| `pnpm dev` | Sobe web e API em paralelo |
| `pnpm dev:web` | Sobe apenas o Next.js |
| `pnpm dev:api` | Sobe apenas o NestJS |
| `pnpm build` | Executa build dos apps |
| `pnpm lint` | Executa lint nos apps |
| `pnpm format` | Formata arquivos com Prettier |
| `pnpm format:check` | Verifica formatação sem alterar arquivos |
| `pnpm prisma:validate` | Valida o schema Prisma da API |
| `pnpm prisma:generate` | Gera o client Prisma da API |

---

## Padrões de desenvolvimento

### TypeScript

- Usar TypeScript em todos os apps e pacotes.
- Evitar `any` sem justificativa.
- Preferir tipos explícitos em contratos públicos.
- Manter DTOs, schemas e tipos bem nomeados.

### Nomes de arquivos

Preferência geral:

```txt
kebab-case.ts
```

Exemplos:

```txt
service-order.service.ts
create-customer.dto.ts
payment-method.enum.ts
```

### Nomes de branches

Sugestão:

```txt
feat/auth-base
feat/customers
feat/service-orders
fix/api-health-check
chore/bootstrap-monorepo
```

### Organização de código

- O frontend não deve conter regras críticas de negócio.
- O backend deve ser o dono das regras de saldo, entrega, permissões e auditoria.
- O banco deve ser acessado via Prisma.
- Evitar duplicação de lógica financeira no frontend.

### Commits

Usar mensagens claras e pequenas.

Formato recomendado:

```txt
tipo: descrição curta
```

Tipos sugeridos:

| Tipo | Uso |
|---|---|
| `chore` | Configuração, build, dependências, bootstrap |
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `refactor` | Refatoração sem mudar comportamento |
| `test` | Testes |
| `style` | Formatação ou ajustes visuais sem regra |

Exemplos:

```bash
git commit -m "chore: bootstrap monorepo"
git commit -m "feat: add health check endpoint"
git commit -m "docs: update setup instructions"
```

---

## Boas práticas de Git

Antes de commitar:

```bash
pnpm format:check
pnpm lint
pnpm prisma:validate
```

Verificar arquivos staged:

```bash
git status
git diff --staged
```

Não commitar:

- `.env`;
- `node_modules`;
- arquivos de build;
- logs;
- secrets;
- dumps de banco;
- arquivos gerados sem necessidade.

Primeiro commit recomendado:

```bash
git add .
git commit -m "chore: bootstrap monorepo"
```

---

## Segurança

### Autenticação futura

A autenticação será implementada após o bootstrap.

Decisão técnica aprovada para a etapa futura:

- usuários internos terão login;
- cliente não terá login;
- JWT será armazenado em cookie HTTP-only;
- usar `SameSite`;
- usar `Secure` em produção;
- avaliar proteção contra CSRF antes de produção.

### Dados sensíveis

Cuidados obrigatórios:

- não commitar `.env`;
- não expor dados sensíveis em logs;
- CPF do cliente será opcional;
- senhas nunca devem ser salvas em texto puro;
- proteger endpoints administrativos;
- validar entradas no backend.

### Regra de ouro

```txt
Toda regra crítica deve ficar no backend.
```

Inclui:

- cálculo de saldo;
- status financeiro;
- cortesia;
- entrega com saldo pendente;
- retirada por terceiro;
- cancelamento ou estorno de pagamento;
- soft delete ou status cancelado de dados rastreáveis;
- auditoria.

---

## Escopo do bootstrap

Este bootstrap cria apenas a fundação técnica do projeto.

Inclui:

- monorepo com `pnpm workspaces`;
- `apps/web` com Next.js;
- `apps/api` com NestJS;
- `packages/shared` preparado;
- Docker Compose opcional para PostgreSQL local;
- variáveis de ambiente do banco;
- Prisma inicial;
- health check da API;
- scripts básicos de desenvolvimento;
- lint e format inicial;
- README detalhado.

---

## O que não está implementado no bootstrap

Este bootstrap **não implementa módulos de negócio completos**.

Não implementar ainda:

### Autenticação real

- login;
- logout;
- JWT;
- cookie HTTP-only;
- CSRF;
- guards;
- perfis;
- seed de administrador.

### Clientes

- CRUD de clientes;
- busca por nome;
- busca por telefone;
- CPF opcional;
- histórico de OS.

### Ordens de Serviço

- criação de OS;
- número único;
- status da OS;
- vínculo com cliente;
- múltiplos itens;
- via do cliente.

### Itens e serviços

- cadastro de item;
- cadastro de serviços por item;
- valor;
- prazo;
- status de serviço;
- cancelamento de serviço;
- soft delete de item.

### Pagamentos

- sinal;
- pagamento parcial;
- pagamento final;
- cancelamento;
- estorno;
- cálculo de saldo;
- status financeiro;
- cortesia.

### Entrega

- entrega da OS;
- bloqueio por saldo pendente;
- exceção administrativa;
- retirada por terceiro;
- confirmação de apresentação da via.

### Garantia

- nova OS vinculada à original;
- relato do cliente;
- avaliação da loja;
- solução aplicada.

### Relatórios

- relatórios operacionais;
- relatórios financeiros;
- OS com saldo pendente;
- faturamento;
- OS em cortesia.

### Upload real de fotos

- storage;
- upload;
- visualização;
- autenticação de imagens;
- soft delete de fotos.

### Funcionalidades fora do MVP

Não implementar:

- portal do cliente;
- login do cliente;
- consulta pública de OS;
- WhatsApp automático;
- integração com API oficial do WhatsApp;
- assinatura digital;
- emissão fiscal;
- estoque;
- compras;
- fornecedores;
- comissão;
- produtividade individual;
- app mobile;
- múltiplas lojas;
- entrega parcial;
- gestão avançada de garantia;
- cobrança por item não retirado;
- taxa de armazenagem;
- QR Code;
- código de barras;
- BI;
- dashboard gerencial avançado;
- filas;
- mensageria;
- microsserviços.

---

## Checklist de validação do bootstrap

### Instalação

```bash
pnpm install
```

Critérios:

- instala sem erro;
- cria `pnpm-lock.yaml` na raiz;
- não cria `package-lock.json`;
- não cria `yarn.lock`.

### Workspace

```bash
pnpm -r list --depth 0
```

Critérios:

- lista `web`;
- lista `api`;
- lista `@sapataria/shared`, caso já tenha sido criado.

### PostgreSQL

```bash
docker compose --env-file .env up -d postgres
docker compose ps
```

Critérios:

- container `sapataria_postgres` está rodando;
- porta `5432` está disponível;
- credenciais vêm do `.env`.

### Prisma

```bash
pnpm prisma:validate
pnpm prisma:generate
```

Critérios:

- Prisma valida o schema;
- Prisma gera client sem erro;
- nenhuma tabela de negócio é criada ainda.

### API

```bash
pnpm dev:api
```

Em outro terminal:

```bash
curl http://localhost:3001/health
```

Critérios:

- API sobe na porta `3001`;
- endpoint `/health` responde;
- resposta contém `status: "ok"`.

### Web

```bash
pnpm dev:web
```

Critérios:

- Next.js sobe na porta `3000`;
- página inicial abre em `http://localhost:3000`;
- não há erro de dependência.

### Web e API juntos

```bash
pnpm dev
```

Critérios:

- web e api sobem simultaneamente;
- web responde em `http://localhost:3000`;
- API responde em `http://localhost:3001/health`.

### Lint

```bash
pnpm lint
```

Critérios:

- comando executa nos apps;
- erros iniciais são corrigidos antes do commit.

### Format

```bash
pnpm format:check
```

Se houver arquivos fora do padrão:

```bash
pnpm format
```

Critério:

- formatação aplicada antes do commit.

### Git

```bash
git status
```

Critérios:

- `.env` não aparece para commit;
- `node_modules` não aparece para commit;
- arquivos de build não aparecem para commit;
- arquivos gerados desnecessários não aparecem para commit.

---

## Troubleshooting

### Porta 5432 já está em uso

Verificar processos usando a porta:

```bash
lsof -i :5432
```

Soluções possíveis:

- parar outro PostgreSQL local;
- alterar `DATABASE_PORT` no `.env`;
- subir o Docker Compose novamente.

### Porta 3000 já está em uso

Rodar o Next.js em outra porta:

```bash
pnpm --filter web dev -- -p 3002
```

### Porta 3001 já está em uso

Alterar `API_PORT` em `apps/api/.env`:

```env
API_PORT=3002
```

### Prisma não encontra `DATABASE_URL`

Conferir se existe:

```txt
apps/api/.env
```

Conferir se contém:

```env
DATABASE_URL=postgresql://sapataria:sapataria@localhost:5432/sapataria_db?schema=public
```

### Docker não carrega variáveis

Usar explicitamente:

```bash
docker compose --env-file .env up -d postgres
```

### Dependências inconsistentes

Remover instalações e reinstalar:

```bash
rm -rf node_modules apps/web/node_modules apps/api/node_modules packages/shared/node_modules
rm -f pnpm-lock.yaml
pnpm install
```

---

## Roadmap técnico inicial

### Etapa 1 — Bootstrap técnico

- monorepo;
- apps web e api;
- PostgreSQL local;
- Prisma inicial;
- health check;
- lint/format;
- README.

### Etapa 2 — Base de autenticação

- `User`;
- `UserRole`;
- seed de administrador;
- login;
- JWT em cookie HTTP-only;
- `SameSite`;
- `Secure` em produção;
- avaliação de CSRF;
- `/auth/me`.

### Etapa 3 — Clientes

- CRUD de clientes;
- busca por nome e telefone;
- CPF opcional;
- histórico de OS.

### Etapa 4 — OS, itens e serviços

- criação de OS;
- número único;
- itens;
- serviços;
- status;
- valores e prazos.

### Etapa 5 — Pagamentos

- sinal;
- pagamento parcial;
- pagamento final;
- saldo calculado pelo backend;
- cancelamento;
- estorno;
- cortesia como condição comercial/status financeiro.

### Etapa 6 — Produção e entrega

- status de produção;
- pronta para retirada;
- entrega;
- retirada por terceiro;
- bloqueio por saldo pendente;
- exceção somente para administrador com justificativa.

### Etapa 7 — Garantia e relatórios simples

- nova OS vinculada à original;
- relato do cliente;
- solução aplicada;
- consultas/listagens operacionais;
- consultas/listagens financeiras.

---

## Licença

Definir licença antes de abrir o repositório publicamente.

Enquanto o projeto estiver privado, considerar como:

```txt
Todos os direitos reservados.
```
