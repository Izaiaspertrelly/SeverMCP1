const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const apiKey = process.env.API_KEY;

// Middleware de autenticação
function authenticateApiKey(req, res, next) {
  if (!apiKey) {
    console.log('🔓 API authentication disabled. No API key is set.');
    return next(); // Não exige chave se nenhuma estiver configurada
  }

  const providedKey = req.headers['x-api-key'];

  if (!providedKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  if (providedKey !== apiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
}

app.use(express.json());

// Exemplo de ferramenta: Somar
app.get('/tools/somar', authenticateApiKey, (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Parâmetros inválidos. Envie números em "a" e "b".' });
  }

  const resultado = a + b;
  res.json({ result: resultado });
});

app.listen(port, () => {
  console.log(`🚀 MCP Server rodando em http://localhost:${port}`);
});
