# AutoFollowBling

# AutoFollowBling Backend

## Endpoints principais

### Importação inicial de pedidos do Bling

- `POST /bling/importar`
  - Busca todos os pedidos via API Bling e salva no banco.

### Webhook de novos pedidos do Bling

- `POST /bling/webhook`
  - Recebe pedidos do Bling e salva no banco.

### Rotina manual de envio de mensagens

- `POST /mensagem/rotina`
  - Executa a rotina de verificação e envio de mensagens para clientes elegíveis.

## Rotina automática

- Executada diariamente às 8h (configurável em `app.ts`), verifica clientes que atingiram o tempo médio ou 90 dias sem comprar e dispara mensagens automáticas via WhatsApp.

## Exemplo de mensagem enviada

```
Olá {nome}, faz {dias} dias desde sua última compra! Aproveite nossas ofertas!
```

## Variáveis de ambiente necessárias

- `DATABASE_URL` (conexão PostgreSQL)
- `BLING_API_KEY` (token API Bling)
- `WHATSAPP_API_URL` (endpoint API WhatsApp Evolution)
- `WHATSAPP_API_TOKEN` (token API WhatsApp Evolution)
- `PORT` (opcional, porta do servidor)

## Organização do código

- `src/routes`: Rotas Express
- `src/controllers`: Lógica dos endpoints
- `src/services`: Integração, regras de negócio, automações
- `src/prismaClient.ts`: Instância Prisma
- `src/utils/logger.ts`: Logger
- `src/middlewares/errorHandler.ts`: Tratamento de erros

## Observações

- Adapte o mapeamento dos campos do Bling conforme o retorno real da API.
- O envio de WhatsApp depende da API não oficial informada.
