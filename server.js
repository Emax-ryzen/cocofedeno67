const express = require("express");
const app = express();

const PORT = 3000;

// COLE SEU WEBHOOK DO DISCORD AQUI
const DISCORD_WEBHOOK =
  "https://discord.com/api/webhooks/1552868105112391741/5nMuSsLpnbjvrxsf4i1ra8uA-w39Zn_cAYdYm3Z7dtsKdmcietg9WB94zuvoH8jXqLqb";

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cadastro</title>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    background: #0f1117;
    color: white;
}

.card {
    width: 400px;
    max-width: 90%;
    padding: 35px;
    background: #181b24;
    border-radius: 18px;
    box-shadow: 0 20px 50px rgba(0,0,0,.5);
}

h1 {
    text-align: center;
}

p {
    text-align: center;
    color: #aaa;
}

label {
    display: block;
    margin-top: 18px;
    margin-bottom: 7px;
}

input {
    width: 100%;
    padding: 13px;
    border-radius: 8px;
    border: 1px solid #333;
    background: #101218;
    color: white;
    outline: none;
}

input:focus {
    border-color: #5865f2;
}

button {
    width: 100%;
    margin-top: 25px;
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: #5865f2;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

button:hover {
    background: #4752c4;
}

.mensagem {
    text-align: center;
    margin-top: 20px;
}
</style>
</head>

<body>

<div class="card">

<h1>Crie sua conta</h1>

<p>Preencha os dados abaixo.</p>

<form method="POST" action="/cadastro">

<label>Nome</label>
<input
    type="text"
    name="nome"
    placeholder="Digite seu nome"
    required
>

<label>E-mail</label>
<input
    type="email"
    name="email"
    placeholder="Digite seu e-mail"
    required
>

<label>Idade</label>
<input
    type="number"
    name="idade"
    min="1"
    max="120"
    placeholder="Digite sua idade"
    required
>

<button type="submit">
Cadastrar
</button>

</form>

</div>

</body>
</html>
  `);
});

app.post("/cadastro", async (req, res) => {

    const { nome, email, idade } = req.body;

    if (!nome || !email || !idade) {
        return res.send("Preencha todos os campos.");
    }

    if (DISCORD_WEBHOOK === "COLE_SEU_WEBHOOK_AQUI") {
        return res.send("Você ainda não colocou o Webhook do Discord no server.js.");
    }

    try {

        const mensagem = {
            username: "Bot de Cadastro",

            embeds: [{
                title: "📝 Novo cadastro",
                color: 5793266,

                fields: [
                    {
                        name: "👤 Nome",
                        value: nome,
                        inline: true
                    },
                    {
                        name: "📧 E-mail",
                        value: email,
                        inline: true
                    },
                    {
                        name: "🎂 Idade",
                        value: String(idade),
                        inline: true
                    }
                ],

                timestamp: new Date().toISOString()
            }]
        };

        const resposta = await fetch(DISCORD_WEBHOOK, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(mensagem)
        });

        if (!resposta.ok) {
            return res.send("Erro ao enviar os dados para o Discord.");
        }

        res.send(`
            <h1>✅ Cadastro realizado!</h1>
            <p>Seus dados foram enviados.</p>
            <a href="/">Voltar</a>
        `);

    } catch (erro) {

        console.error(erro);

        res.send("Erro ao conectar ao Discord.");
    }
});

app.listen(PORT, () => {
    console.log("");
    console.log("================================");
    console.log(" SITE FUNCIONANDO!");
    console.log("================================");
    console.log("");
    console.log("Abra no navegador:");
    console.log("http://localhost:" + PORT);
    console.log("");
});