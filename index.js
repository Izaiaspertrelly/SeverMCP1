
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
});

app.get('/tools/somar', (req, res) => {
  const { a, b } = req.query;
  const result = Number(a) + Number(b);
  res.json({ result });
});

app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.json({
    schema_version: "v1",
    name: "MCP Server Example",
    description: "Exemplo simples de servidor MCP com autenticação",
    tools: [{
      name: "somar",
      endpoint: "/tools/somar",
      method: "GET",
      description: "Soma dois números. Ex: /tools/somar?a=1&b=2"
    }]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor MCP rodando na porta ${PORT}`);
});
