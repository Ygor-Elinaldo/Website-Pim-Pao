// Importando o módulo express
const express = require('express');
const app = express();
const path = require('path');

// Configuração da porta
const port = 3000;


app.use('/resources', express.static(path.join(__dirname, 'resources')));

// Rota padrão
app.get('/', (req, res) => {
  console.log("someone is seeing this")
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciando o servidor Express
app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
});

app.use((req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  console.log(`Recebida uma solicitação de ${ip}`);
  res.sendFile(path.join(__dirname, 'index.html'));  
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

