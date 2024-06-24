# ChicoLiro - Backend Services

<div align="center">
  <img src="https://i.imgur.com/YSkXF6U.png" alt="logo">
</div>

<center>

<!-- Adiciona distintivos (shields) do GitHub -->
![GitHub repo size](https://img.shields.io/github/repo-size/mdsreq-fga-unb/2024.1-RISO-?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/pi1-2024-ChicoLiro/ChicoLiro-Software-Back?style=for-the-badge)


</center>

## Sobre o Projeto

O projeto ChicoLiro, desenvolvido durante a disciplina de Projeto Integrador 1, consiste em um carro seguidor de linha. Equipado com sensores para medir a velocidade e detectar a linha por meio de infravermelhos, o veículo é capaz de percorrer o trajeto de forma autônoma. Esse desempenho é possibilitado pela integração com o software ChicoLiro-Software, cujo recebe os dados da rota em tempo real e transmite ao utilizado tais dados em tempo real por meio de gráficos.

Este repositório contém o código-fonte do serviço de Back-End do projeto ChicoLiro, que adota uma arquitetura monolítica e uma estrutura multi-repo. Os repositórios que compõem o projeto são: [Front-End](https://github.com/pi1-2024-ChicoLiro/chicoliro-software-front), [Back-End](https://github.com/pi1-2024-ChicoLiro/ChicoLiro-Software-Back) e [Código aos Componentes](https://github.com/pi1-2024-ChicoLiro/ChicoLiro.s-Comand).

<br>

## Tecnologias
<br>
<div style="display: flex; justify-content: center; align-items: center;">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50px" style="margin: 0 10px"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" width="50px" style="margin: 0 10px;"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="50px" style="margin: 0 10px;"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="50px" style="margin: 0 10px;"/>
</div>
<br>

## Estrutura do repositório

EM CONSTRUÇÃO

<br>

## Instalação

### Configurando banco de dados e configurações iniciais

Para rodar localmente o banco de dados e então conseguir executar esse serviço é necessário seguir os seguintes passos:

```bash
# Clone o repositório de configuração do projeto em uma pasta dedicada ao projeto
$ git clone https://github.com/pi1-2024-ChicoLiro/ChicoLiro-Software-Back.git

# Acesse a pasta do projeto
$ cd ChicoLiro-Software-Back

# Dentro da raiz da pasta de configuração ChicoLiro-Software-Back execute o comando para baixar as dependências:
$ npm install
# OU COM YARN:
$ yarn
```


### Configurando .env do serviço
O repositório contém um arquivo chamado .env.template, que já inclui todas as variáveis necessárias para o uso no projeto. Para configurá-lo, basta copiá-lo, renomeá-lo para .env e preencher as informações do seu banco de dados. A estrutura do .env.template é a seguinte:

```
DATABASE_URL=
```
<br>

## NodeJs

Esse projeto conta com a versão 18 no [NodeJs](https://nodejs.org/en).

O [Node Version Manager](https://github.com/nvm-sh/nvm), mais comumente chamado de NVM, é a maneira mais popular de instalar várias versões do Nodejs. Essa tecnologia é recomendada para o desenvolvedor poder gerenciar diferentes versões do NodeJs conforme a necessidade do projeto.

<br>

## Execute o projeto localmente

Por conter uma arquitetura de microserviços, é necessário rodar cada serviço separadamente conforme a necessidade de uso.

```bash
# Para rodar o projeto pela primeira vez basta executar os seguintes comandos:
## Esse comando irá definir a versão de desenvolvimento do NodeJs como 18
nvm use 18

## Esse comando irá instalar as bibliotecas
npm install
```
<br>

## Instalando Novas Dependencias

Pode ser utilizado o seguinte comando para inserir novas dependencias na aplicação:

```bash
npm install nome-da-dependencia
```

<br>

## Criando a estrutura do banco de dados

O Prisma, ORM utilizado no projeto, organiza os comandos necessários para gerenciar e manipular o banco de dados de forma eficiente. Ele permite a definição do esquema do banco de dados, a realização de migrações e a execução de consultas de maneira simples e intuitiva. A seguir, estão os comandos principais utilizados com o Prisma para manipulação do banco de dados:

Obs: Para rodar os comandos listados abaixo, é necessário a criação prévia da base de dados que terá o mesmo nome da variável DATABASE_URL encontrada no .env.

```bash
npx prisma migrate dev --name initial-migration

# Esse comando irá rodar as migrations criando as tabelas no seu banco de dados.
```

Para manipular as alterações nas models, poderá usar os comandos abaixo:

```bash
npx prisma db pull

# E logo após:

npx prisma db push

# No mesmo princípio do git, o primeiro comando irá atualizar suas models de acordo com o banco online, enquanto a segunda irá empurrar as suas mudanças nas models para o banco online.
```
<br>

## Formatação do código

A biblioteca [Prettier](https://prettier.io/) é a ferramente utilizada para adicionar a formatação padrão de código, e pode ser aplicada com o seguinte comando:

```bash
## Esse comando irá padronizar o estilo de código para o padrão estabelecido no projeto.
npm run prettify

## Esse comando irá verificar erros de sintaxe e possíveis melhorias.
npm run check-format
```

<br>

## Testes

```bash
## Esse comando irá rodar os testes do Back-End.
npm run test
```
<br>

### Deployment

[GitHub Actions](https://github.com/pi1-2024-ChicoLiro/ChicoLiro-Software-Back/actions).

<br>

## Contribuição

EM CONSTRUÇÃO

<br>

## Licença

O ChicoLiro-Software está sob as regras aplicadas na licença [MIT](https://github.com/pi1-2024-ChicoLiro/ChicoLiro-Software-Back/blob/main/LICENSE)

<br>

## Contribuidores
<div align="center"> 
 <img src="https://avatars.githubusercontent.com/u/85856457?v=4" width="100"/>
 <img src="https://avatars.githubusercontent.com/u/90018065?v=4" width="100" />
 <img src="https://avatars.githubusercontent.com/u/101184511?v=4" width="100"/>
 <img src="https://avatars.githubusercontent.com/u/95441810?v=4" width="100"/>
 <img src="https://avatars.githubusercontent.com/u/63979948?v=4" width="100"/>
 <img src="https://avatars.githubusercontent.com/u/111506459?v=4" width="100"/>
</div>
<div align="center">
