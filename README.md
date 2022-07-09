# Projeto Blogs Api
Projeto desenvolvido no bloco 24 da Trybe.

# Habilidades
- Mapeamento do banco para execução de querys com Sequelize.
- Criar associaçãos entre tabelas utilizando models e migrations no Sequelize.
- Utilizar JWT para criação de token de autenticação.
- Criar os endpoints necessários para consumir as models.
- Desenvolver CRUD com ORM.

## O que foi desenvolvido
  Foi desenvolvida uma aplicação com Node.js e express utilizando os principios de RESTful, para consulta com o banco de dados foi utilizado uma das várias ORM's disponiveis no mercado(Sequelize), onde criei as models e migrations.
  Para realizar um post, o usuário precisa estar logado e ter seu token validado.
  Cada usuário só pode deletar/editar posts que pertencem a ele.
  Cada post possui uma categoria, trabalhando assim a relação entre tabelas útilizando a ORM.
