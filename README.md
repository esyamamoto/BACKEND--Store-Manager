# projeto Store Manager

<details>
<summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />
- desenvolvi uma API RESTful utilizando a arquitetura em camadas!

- A API construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados.

 </details>

<details>
  <summary><strong>:memo: Habilidades</strong></summary><br />

  Neste projeto:
- Interagir com um banco de dados relacional MySQL;
- Implementei uma API utilizando arquitetura em camadas;
- Criei validações para os dados recebidos pela API;
- Crie endpoints para listar produtos
- Criei endpoints para listar vendas
- Criei endpoint para cadastrar produtos
- Criei validações para o cadastro de produtos
- Criei endpoint para cadastrar vendas
- Criei validações para o cadastro de vendas
- Criei endpoint para atualizar um produto
- Criei endpoint para deletar um produto

</details>


## Orientações
<details>
<summary>🐳 Iniciando a aplicação no Docker Compose</summary>

```bash
# Instale as dependências
npm install

# Inicie os containers do compose `backend` e `db`
# A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
docker-compose up -d

# É possível ver os logs da aplicação com `docker logs -n 10 -f <nome-do-container>`
docker logs -n 10 -f store_manager
```

</details>
<details>
<summary>🛠testes</summary>
Segue um resumo dos comandos relacionados aos testes:

```bash
#### Comandos dos testes do avaliador
npm run lint     # roda a verificação do linter
npm test         # roda todos os testes no terminal ou
REQ=01 npm test  # rodando apenas o teste do requisito 01 pelo terminal ou
npm run cy:open  # abre a interface gráfica do Cypress para rodar os testes

#### Comandos dos testes com mocha
npm run test:mocha     # roda os testes do mocha
npm run test:coverage  # roda os testes e mostra a cobertura geral
npm run test:mutation  # roda os testes e mostra a cobertura de mutações
```
</details>

<details>
<summary>🎲 Tabelas do banco de dados</summary>

|Diagrama de Entidade-Relacionamento|
|:--:|
|![DER](./public/erStoreManager.png)|

|Tabela|Formato|Notas|
|---|---|---|
|`products`|![Tabela Produtos](./public/tableproducts.png)|O `id` é gerado automaticamente|
|`sales`|![Tabela Vendas](./public/tablesales.png)|O `id` e `date` são gerados automaticamente|
|`sales_products`|![Tabela Vendas-Produtos](./public/tablesalesproducts.png)|Os registros nessa tabela são removidos automaticamente em caso de remoção do produto ou da venda relacionados (`ON DELETE CASCADE`)|

- Os scripts para criar e popular o banco de dados podem ser vistos no diretório [`sql`](./sql);

</details>


