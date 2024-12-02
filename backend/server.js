const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;  // Permite o uso de uma variável de ambiente para o PORT

// Middleware para interpretar o corpo das requisições JSON
app.use(express.json());

// Habilita CORS
app.use(cors());

// Rota principal
app.get("/", (req, res) => {
  res.send("Olá, Mundo com Express!");
});

const musicaRoutes = require("./Routes/musicaRoutes.js");
app.use("/musica", musicaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
