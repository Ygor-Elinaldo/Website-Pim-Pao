// Importando o módulo express
const express = require('express');
const app = express();
const path = require('path');

// Configuração da porta
const port = 3000;


app.use('/resources', express.static(path.join(__dirname, 'resources')));

// Rota padrão
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciando o servidor Express
app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
});
