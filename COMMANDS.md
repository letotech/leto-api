### Comandos Úteis

#### Inicialização
- Para rodar o projeto, primeiro rode o comando *npm install* para instalar todas as dependências
- Configure o arquivo .env do projeto com as variáveis de ambiente necessárias
- Rode o comando *npm run start* para rodar o projeto

#### Migrations
- Para gerar migration:
    npm run typeorm:main migration:generate .\src\providers\database\migrations\NomeDaMigration
    
- Para executar a migration:
    npm run typeorm:main migration:run

- Para reverter migration:
    npm run typeorm:main migration:revert

- Para listar as migrations:
    npm run typeorm:main migration:show