// Importando o módulo express
const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs")
// Configuração da porta
const port = 3000;


app.use('/resources', express.static(path.join(__dirname, 'resources')));

// Rota padrão
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para fornecer dados JSON
app.get('/api/items', (req, res) => {
  console.log('Recebida solicitação para /api/items');
  
  const filePath = path.join(__dirname, 'menuItems.json');

  // Lê o arquivo JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      res.status(500).json({ error: 'Erro ao obter dados do servidor' });
      return;
    }

  const items = JSON.parse(data);

  console.log('Enviando resposta JSON:', items);
  res.json(items);
  })
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  
});

// Iniciando o servidor Express
app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
});


//Debug via LAN
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}


console.warn(`http://`+getIPAddress()+`:${port}`)