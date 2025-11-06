# Testes Unitários

Este diretório contém os testes unitários da aplicação, organizados por camada da arquitetura.

## Estrutura

```
__tests__/
├── setup.ts              # Configuração global dos testes
├── mocks/
│   ├── firebase.mock.ts  # Mocks do Firebase Admin
│   └── express.mock.ts   # Mocks do Express (Request/Response)
└── README.md             # Este arquivo

repository/
└── __tests__/
    ├── manhwa.repository.test.ts
    └── history.repository.test.ts

service/
└── __tests__/
    ├── manhwa.service.test.ts
    └── history.service.test.ts

controller/
└── __tests__/
    ├── manhwa.controller.test.ts
    └── history.controller.test.ts
```

## Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar em modo watch (re-executa quando arquivos mudam)
npm run test:watch

# Executar com cobertura de código
npm run test:coverage
```

## Cobertura de Código

Os testes cobrem:
- **Repositories**: Testes de acesso ao Firestore
- **Services**: Testes de lógica de negócio
- **Controllers**: Testes de handlers HTTP

## Mocks

Os mocks estão disponíveis em `__tests__/mocks/`:
- `firebase.mock.ts`: Mocks do Firebase Admin e Firestore
- `express.mock.ts`: Helpers para criar Request e Response mocks

## Padrões de Teste

Cada teste segue o padrão AAA (Arrange, Act, Assert):
1. **Arrange**: Configurar mocks e dados de teste
2. **Act**: Executar a função sendo testada
3. **Assert**: Verificar os resultados esperados
