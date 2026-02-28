# Roomie

## Plataforma de Gerenciamento de Moradias Estudantis

## Sobre o Projeto

A **Plataforma de Gerenciamento de Moradias Estudantis (roomie)** é um sistema desenvolvido para facilitar a busca,
oferta e organização de espaços de moradia entre estudantes.

A plataforma centraliza informações e conecta estudantes que procuram moradia com proprietários ou outros estudantes
interessados em dividir um imóvel. O sistema permite que estudantes criem perfis detalhados, informando seus gostos,
hobbies e etc.

Proprietários podem cadastrar imóveis com descrições e fotos.  
Como diferencial, o sistema prevê um mecanismo de correspondência inteligente para sugerir colegas de moradia
compatíveis com base em hábitos, estilo de vida e interesses em comum.

O objetivo principal é simplificar o processo de encontrar e organizar moradias estudantis, promovendo a formação de
comunidades e garantindo melhores condições de moradia durante a vida acadêmica.

## Integrantes

- [João Francisco Araújo de Mello](https://github.com/joaofamello)
- [José Gustavo Andrade da Silva](https://github.com/Gustavo7a)
- [Jurandir Tenório Vaz Neto](https://github.com/Jurandirtvaz)
- [Guilherme Henrique Barbosa de Souza Lima](https://github.com/Castlus)
- [Lucas Henrique de Andrade Silva](https://github.com/Lucasenrique-s)
- [Luigi Mateo e Silva](https://github.com/memelon220)
- [Pablo Roldão Pereira Santos](https://github.com/pablo-roldao)

## Objetivos

- Facilitar a busca por moradias estudantis
- Permitir o cadastro e gerenciamento de imóveis
- Conectar estudantes com interesses e perfis compatíveis
- Oferecer filtros avançados por localização, tipo de imóvel e preferências
- Promover melhor organização e planejamento da moradia durante a vida acadêmica

## Tecnologias Utilizadas

### Frontend

[![My Skills](https://skillicons.dev/icons?i=angular,typescript,html,css)](https://skillicons.dev)

### Backend

[![My Skills](https://skillicons.dev/icons?i=java,spring,postgres,docker)](https://skillicons.dev)

## Deploy

A aplicação está disponível nos seguintes ambientes de produção:

| Serviço     | URL                                                                                  |
|:------------|:-------------------------------------------------------------------------------------|
| Frontend    | [https://roomie-itvz.onrender.com](https://roomie-itvz.onrender.com)                 |
| Backend API | [https://roomie-backend-fom2.onrender.com](https://roomie-backend-fom2.onrender.com) |

---

## Como Rodar o Projeto

Este guia contém as instruções completas para configurar e rodar o ambiente de desenvolvimento localmente usando Docker.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/) & Docker Compose

> **Nota:** Não é necessário instalar Java, Node.js ou PostgreSQL na sua máquina para *rodar* o sistema. O Docker cuida
> de tudo.

---

### 1. Clonando o Repositório

Este projeto utiliza **Git Submodules** para gerenciar o esquema do banco de dados. A clonagem deve ser feita de forma
recursiva:

```bash
# Clone o repositório principal baixando também o submodule do banco
git clone --recurse-submodules https://github.com/MocoGroup/roomie

# Entre na pasta do projeto
cd roomie

```

#### Esqueceu da flag recursiva?

Se a pasta `database` estiver vazia, execute:

```bash
git submodule update --init --recursive
```

#### Atualizando o submodule do banco de dados

Para sincronizar o submodule com a versão mais recente do repositório remoto:

```bash
git submodule update --remote --merge
```

### 2. Configurando Variáveis de Ambiente (.env)

O sistema é configurável através de um arquivo `.env` na raiz.

1. Crie um arquivo chamado `.env` na **raiz** do projeto (mesmo local do `docker-compose.yml`).
2. Copie o conteúdo abaixo e ajuste conforme necessário:

| Parâmetro     |           Valor |
|:--------------|----------------:|
| DB_USER       |     `your-user` |
| DB_PASSWORD   | `your-password` |
| DB_NAME       |       `db-name` |
| DB_PORT       |       `db_port` |
| DB_HOST       |     `localhost` |
| BACKEND_PORT  |          `8080` |
| FRONTEND_PORT |          `4200` |

***É importante que o `BACKEND_PORT` e `FRONTEND_PORT` sejam os mesmos da tabela acima***

### 3. Executando a Aplicação

Com o Docker rodando e o `.env` configurado, execute:

```bash
docker-compose up --build
```

Isso irá:

1. Subir o banco de dados ***PostgreSQL***.
2. Compilar e iniciar o ***Backend*** (Spring Boot).
3. Compilar o ***Frontend*** (Angular) e serví-lo via Nginx.

| Serviço        | URL                     |                                                                    Descrição |
|:---------------|-------------------------|-----------------------------------------------------------------------------:|
| Frontend       | `http://localhost:4200` |                                                                Aplicação Web |
| Backend API    | `http://localhost:8080` |                                                             Endpoints da API |
| Banco de Dados | `localhost`             | Host para conexão via DBeaver/PgAdmin (Use a porta que você definiu no .env) |

---

## Esquema Conceitual do Banco de Dados

Abaixo o diagrama Entidade-Relacionamento do banco de dados com todas as entidades e relacionamentos atualizados:

```mermaid
erDiagram
    usuario {
        serial id_usuario PK
        varchar nome
        varchar email
        varchar cpf
        varchar senha
        tipo_genero genero
        user_role cargo
    }
    estudante {
        int id_estudante PK_FK
        varchar curso
        varchar instituicao
    }
    telefone {
        serial id_telefone PK
        int id_usuario FK
        varchar numero
    }
    habito {
        serial id_habito PK
        int id_estudante FK
        horarios horario_estudo
    }
    estilo_vida {
        serial id_estilo PK
        int id_habito FK
        varchar estilo
    }
    preferencia_limpeza {
        serial id_preferencia PK
        int id_habito FK
        varchar preferencia
    }
    hobby {
        serial id_hobby PK
        int id_habito FK
        varchar hobby
    }
    imovel {
        serial id_imovel PK
        int id_proprietario FK
        varchar titulo
        text descricao
        tipo_imovel tipo
        decimal preco
        tipo_genero genero_moradores
        boolean aceita_animais
        boolean tem_garagem
        int vagas_disponiveis
        status_anuncio status
    }
    endereco {
        serial id_endereco PK
        int id_imovel FK
        varchar rua
        varchar bairro
        varchar numero
        varchar cidade
        varchar estado
        varchar cep
    }
    imagem_imovel {
        serial id_imagem PK
        int id_imovel FK
        varchar caminho_imagem
    }
    contrato_locacao {
        serial id_contrato PK
        int id_imovel FK
        int id_estudante FK
        int id_proprietario FK
        date data_inicio
        date data_fim
        decimal valor_aluguel
        status_contrato status_contrato
    }
    avaliacao_imovel {
        serial id_avaliacao PK
        int id_imovel FK
        int id_estudante FK
        int nota
        text comentario
        timestamp data_avaliacao
    }
    chat {
        serial id_chat PK
        int id_estudante FK
        int id_proprietario FK
        int id_imovel FK
        timestamp data_criacao
    }
    mensagem {
        serial id_mensagem PK
        int id_chat FK
        int id_remetente FK
        text conteudo
        timestamp timestamp_mensagem
        boolean lida
    }

    usuario ||--o| estudante : "é especialização de"
    usuario ||--o{ telefone : "possui"
    estudante ||--o{ habito : "tem"
    habito ||--o{ estilo_vida : "inclui"
    habito ||--o{ preferencia_limpeza : "inclui"
    habito ||--o{ hobby : "inclui"
    usuario ||--o{ imovel : "cadastra"
    imovel ||--|| endereco : "possui"
    imovel ||--o{ imagem_imovel : "tem fotos"
    imovel ||--o{ contrato_locacao : "firmado em"
    estudante ||--o{ contrato_locacao : "assina"
    usuario ||--o{ contrato_locacao : "assina como proprietário"
    imovel ||--o{ avaliacao_imovel : "recebe"
    estudante ||--o{ avaliacao_imovel : "faz"
    estudante ||--o{ chat : "participa"
    usuario ||--o{ chat : "participa como proprietário"
    imovel ||--o{ chat : "tema de"
    chat ||--o{ mensagem : "contém"
    usuario ||--o{ mensagem : "envia"
```

---

## Views do Banco de Dados

O banco de dados possui **3 views** que eliminam JOINs repetidos no código, consolidando consultas complexas em uma única chamada. Abaixo estão detalhadas suas responsabilidades e onde são utilizadas na aplicação.

---

### `v_detalhes_imovel`

Une as tabelas `imovel`, `endereco` e `usuario` em uma única consulta, eliminando JOINs repetidos no código. Usada em toda a listagem de imóveis da plataforma.

| Camada | Localização | Métodos |
|:-------|:------------|:--------|
| Backend | `PropertyRepository.java` | `findAllDetails()`, `findDetailById()`, `findMyDetails()` |
| Frontend | Página **Home** (listagem geral) e página **Meus Imóveis** | — |

---

### `v_relatorio_proprietario`

Une `usuario` e `imovel` com `GROUP BY` e 5 funções de agregação (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) para gerar um relatório consolidado por proprietário, exibindo total de imóveis, vagas, preço médio, menor e maior preço.

| Camada | Localização | Métodos |
|:-------|:------------|:--------|
| Backend | `UserRepository.java` | `findOwnerReports()` |
| Frontend | Painel de estatísticas da página **Meus Imóveis** | — |

---

### `v_perfil_estudante_contato`

Une `estudante`, `usuario` e `telefone`, utilizando `STRING_AGG` para consolidar múltiplos telefones em uma única linha, retornando o perfil completo do estudante em uma só consulta.

| Camada | Localização | Métodos |
|:-------|:------------|:--------|
| Backend | `StudentRepository.java` | `findContactById()`, `findAllContacts()` |
| Frontend | Tela **Minha Instituição** (carrega dados do estudante + telefones em uma única chamada) | — |

---

## Dicionário de Dados

O dicionário de dados completo e atualizado está disponível no README do módulo de banco de dados: [`database/README.md`](database/README.md#dicionário-de-dados).

### Resumo das Tabelas

| Tabela | Descrição |
|:-------|:----------|
| `usuario` | Dados básicos de todos os usuários (estudantes e proprietários) |
| `estudante` | Especialização de usuário com informações acadêmicas |
| `telefone` | Telefones de contato dos usuários (1 usuário → N telefones) |
| `habito` | Hábitos e preferências do estudante |
| `estilo_vida` | Estilos de vida do estudante (Caseiro, Sociável, etc.) |
| `preferencia_limpeza` | Preferências de organização e limpeza do estudante |
| `hobby` | Hobbies e interesses do estudante |
| `imovel` | Imóveis cadastrados para locação |
| `endereco` | Endereço completo do imóvel (1:1 com imóvel) |
| `imagem_imovel` | Fotos do imóvel (1 imóvel → N imagens) |
| `contrato_locacao` | Contratos de locação entre estudantes e proprietários |
| `avaliacao_imovel` | Avaliações e notas de estudantes sobre imóveis |
| `chat` | Conversas entre estudantes e proprietários sobre imóveis |
| `mensagem` | Mensagens individuais trocadas em cada chat |

### ENUMs Utilizados

| Tipo | Valores | Uso |
|:-----|:--------|:----|
| `tipo_genero` | `MALE`, `FEMALE`, `OTHER`, `MIXED` | Gênero de usuários e moradores aceitos |
| `horarios` | `MORNING`, `AFTERNOON`, `EVENING`, `DAWN` | Horário de estudo do estudante |
| `status_contrato` | `ACTIVE`, `FINISHED`, `CANCELLED` | Status de contrato de locação |
| `user_role` | `ADMIN`, `USER` | Permissão do usuário no sistema |
| `tipo_imovel` | `HOUSE`, `APARTMENT`, `STUDIO`, `ROOM`, `DORMITORY` | Categoria do imóvel |
| `status_anuncio` | `DRAFT`, `ACTIVE`, `RENTED` | Estado do anúncio do imóvel |

---

## Povoamento do Banco de Dados

O banco é inicializado em **duas etapas automáticas** ao executar `docker-compose up --build`:

### Etapa 1 — Schema SQL (Docker)

O Docker executa os scripts da pasta `database/scripts/` na seguinte ordem:

| Arquivo | Descrição |
|:--------|:----------|
| `01-schema.sql` | Cria os tipos customizados (ENUMs), todas as tabelas e constraints |
| `02-views.sql` | Cria as views auxiliares para consultas da aplicação |

### Etapa 2 — Dados Fake (Backend)

O Backend (Spring Boot) executa automaticamente o `RoomieDataSeeder.java` na inicialização. A classe implementa a interface **`CommandLineRunner`** do Spring Boot, que garante que o método `run()` seja chamado logo após o contexto da aplicação ser carregado. Internamente, o seeder usa a biblioteca **DataFaker** para gerar dados realistas em português (pt-BR) e popula o banco com:

| Entidade | Quantidade | Detalhes |
|:---------|:----------:|:---------|
| Proprietários | 20 | Com telefone e senha padrão `123456` |
| Estudantes | 50 | Com telefone, hábitos, hobbies, estilos de vida e preferências de limpeza |
| Imóveis | 100 | Com endereço, 2 fotos cada, status `ACTIVE`, cidade Garanhuns/PE |
| Avaliações de imóveis | 50 | Notas de 1 a 5 com comentários aleatórios |
| Contratos | 50 | Com status aleatório (ACTIVE, FINISHED, CANCELLED) |
| Chats | 50 | Cada um com 3 mensagens alternando remetentes |
| Mensagens | 150 | 3 por chat |

> O seeder só é executado se o banco estiver **vazio** (`userRepository.count() == 0`), evitando duplicatas em reinicializações.

### Resetar o Banco (Ambiente Limpo)

Para apagar todos os dados e recriar o banco do zero:

```bash
docker-compose down -v
docker-compose up --build
```

> O parâmetro `-v` remove o volume de dados persistido, garantindo que o banco seja recriado com o schema mais recente e os dados re-gerados pelo seeder.

---

## Status do Projeto

Em desenvolvimento. Versão inicial disponível em produção.


