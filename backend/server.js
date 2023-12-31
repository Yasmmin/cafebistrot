// Importação de dependências do projeto
import express from "express";
import mysql from "mysql";
import cors from 'cors';
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

// Configuração do valor de "salt" para o bcrypt
const salt = 10;

// Inicialização da aplicação Express
const app = express();

// Configuração de middleware para processar dados JSON e cookies
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

// Conexão com o banco de dados "bistrot"
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bistrot"
});

// Endpoint para lidar com o cadastro de usuários
app.post('/cadastro', (req, res) => {
    const sql = "INSERT INTO clientes (`nome`,`email`,`senha`) VALUES (?)";
    bcrypt.hash(req.body.senha.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Erro ao criptografar a senha" })
        const values = [
            req.body.nome,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Erro ao inserir dados no servidor" })
            return res.json({ Status: "Sucesso!" });
        })
    })
});

// Middleware para verificar a autenticação do usuário
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "Você não está autenticado" })
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token está com falhas" })
            } else {
                req.nome = decoded.nome;
                next();
            }
        })
    }
};

// Endpoint protegido por autenticação para retornar informações do usuário autenticado
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Sucesso!", nome: req.nome });
});

// Endpoint para lidar com o login de usuários
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM clientes WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Erro no servidor ao fazer login" })
        if (data.length > 0) {
            bcrypt.compare(req.body.senha.toString(), data[0].senha, (err, response) => {
                if (err) return res.json({ Error: "Erro ao comparar senhas" })
                if (response) {
                    const nome = data[0].nome;
                    const token = jwt.sign({ nome }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);

                    return res.json({ Status: "Sucesso!" });
                } else {
                    return res.json({ Error: "As senhas não batem" })
                }
            })
        } else {
            return res.json({ Error: "Email não existe" })
        }
    })
});

// Endpoint para realizar o logout do usuário
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Sucesso!" })
});

// Inicialização do servidor na porta 8081
app.listen(8081, () => {
    console.log("Rodando na porta 8081")
});
