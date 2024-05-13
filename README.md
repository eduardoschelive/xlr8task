
# xlr8task

Esta é uma SPA de calendário de tarefas do dia a dia, visando ajudar a organizaçcão pessoal de tarefas


### Atenção
Neste repositório, se encontram duas pastas, a pasta `app/` é a aplicação SPA frontend, onde temos todas as partes de interface, já na pasta `server/` é onde fica concentrada toda a regra de negócio

## Tecnologias utilizadas
Segue a lista de tecnologias utilizadas durante o desenvolvimento dessa aplicação
- **frontend**: React, AntDesign, Vite, Typescript, Dayjs, React Big Calendar, Zod, React Hook Form, Axios
- **backend**: Express, Typescript, Zod, aws-sdk
- **database**: Amazon DynamoDB
## Variáveis de ambiente

Para rodar esse projeto, você irá precisar das seguintes variáveis de ambiente

- Frontend:
```
    VITE_BASE_URL=http://localhost:3069
    VITE_HOLIDAY_BASE_URL=https://date.nager.at/api/v3/PublicHolidays
```

Aponte ` VITE_BASE_URL` para o url em que o servidor estará hospedado

- Backend
```
SERVER_PORT=3069

AWS_REGION=REGIAO DA AWS
AWS_DYNAMODB_ACCESS_KEY=CHAVE DE ACESSO
AWS_DYNAMODB_SECRET_KEY=CHAVE DE ACESSO SECRETA
AWS_DYNAMODB_ENDPOINT=ENDPOINT DA AMAZON DYNAMO DB
```

## Rodando o projeto

Depois de clonar o repositório e fazer setup das variáveis de ambiente

Rodar o frontend
```
cd app/
pnpm dev
```

Rodar o backend
```
cd server/
pnpm dev
```

