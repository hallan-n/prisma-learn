## Prisma ORM
Este repositório destina-se a documentar meus estudos em Node.js, com um foco específico em um guia introdutório sobre o Prisma.

### Como iniciar
1. Instale o prisma como dependencia de desenvolvimento: ``npm i prisma -D``
2. Inicie o prisma com este comando, passando o dialeto no fim: ``npx prisma init --datasource-provider SQLite``
3. Crie as tabelas, [como ensinado aqui](#criacao-tabela), então rode o comando ``npx prisma migrate dev`` para gerar as migrations do seu banco.
4. Rode o comando ``npx prisma studio`` para abrir uma inteface gráficado seu banco de dados.


### <p name="criacao-tabelas">Creiação de tabelelas</p>

1. No arquivo ``schema.prisma`` crie um objeto do tipo ``model`` seguido do nome da tabela.
2. A primeira parte de uma coluna se refere ao ``nome`` da coluna, seguido do ``tipo``, seguido da ``constraint``.

- Um '@' se refere a coluna.
- Dois '@' se refere a tabela.
- Use @map para renomear um campo
- Use @@map para renomear a tabela
- Use '?' após o tipo para informar nullable pra uma coluna
- Relação 1:1 crie uma coluna com o nome igual a da tabela, na outra tabela use '@relation'
- Relação 1:1 crie uma coluna com o nome igual a da tabela, na outra tabela use '@relation'

Exemplo de criação de tabela 1 para 1.
```
model User {
  id        Int    @id @default(autoincrement())
  publicId  String @default(uuid()) @map("public_id")
  name      String
  email     String
  password  String
  profile  Profile?

  @@map("users")
}

model Profile {
  id        Int    @id @default(autoincrement())
  publicId   String @default(uuid()) @map("public_id")
  icon       String
  photo      String
  instagram  String
  userId Int @unique
  user User  @relation(fields: [userId], references: [id])

  @@map("profiles")
}
```

Exemplo de criação de tabela muitos para muitos.
```
model User {
  id        Int    @id @default(autoincrement())
  publicId  String @default(uuid()) @map("public_id")
  name      String
  email     String
  password  String
  profiles  Profile[] @relation("UserProfile")

  @@map("users")
}

model Profile {
  id        Int    @id @default(autoincrement())
  publicId   String @default(uuid()) @map("public_id")
  icon       String
  photo      String
  instagram  String
  user User  @relation("UserProfile")

  @@map("profiles")
}
```

Exemplo de criação de tabela 1 para muitos.
```
model User {
  id        Int    @id @default(autoincrement())
  publicId  String @default(uuid()) @map("public_id")
  name      String
  email     String
  password  String
  profile  Profile[]

  @@map("users")
}

model Profile {
  id        Int    @id @default(autoincrement())
  publicId   String @default(uuid()) @map("public_id")
  icon       String
  photo      String
  instagram  String
  userId Int @unique
  user User  @relation(fields: [userId], references: [id])

  @@map("profiles")
}
```
