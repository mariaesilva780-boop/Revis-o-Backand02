//const express = require("express")
import express from "express" //igual o python e java
import { conexao } from "./db.js";

const app = express()
const PORTA = 5000
app.use(express.json())

app.get("/db", async (req, res) => {
    const resultado = await conexao.query("SELECT 1 AS OK");
    res.json(resultado[0]);
})

let listarAlunos = [
    {
        id: 1, nome: "Agatha"
    },
    {
        id: 2, nome: "Mirella"
    },
    {
        id: 3, nome: "Thomas"
    },
    {
        id: 4, nome: "Matteo"
    }
]

app.get("/", (req, res) => { //end point, primeira rota "/"
    res.status(200).json({
        msg: "Bom dia"
    })
})

app.get("/alunos", async (req, res) => {
    const [resultado] = await conexao.query(
        `SELECT ID, NOME FROM ALUNOS ORDER BY ID;`
    );
    res.status(200).json(resultado);
});





app.get("/alunos/:codigo", async (req, res) => {
    const parametro = req.params.codigo
    const id = Number(parametro)

    if (!Number.isNaN(id)) {
        const [resultado] = await conexao.query(
            `SELECT ID, NOME FROM ALUNOS WHERE ID = ?`,
            [id]
        )

        if (resultado.length === 0) {
            return res.status(404).json({
                msg: "Aluno não encontrado"
            })
        }

        return res.status(200).json(resultado[0])
    }

    const [resultado] = await conexao.query(
        `SELECT ID, NOME FROM ALUNOS WHERE NOME = ?`,
        [parametro]
    )

    if (resultado.length === 0) {
        return res.status(404).json({
            msg: "Aluno não encontrado"
        })
    }

    return res.status(200).json(resultado[0]);
})

app.get("/cursos", async (req, res) => {
    const [resultado] = await conexao.query(
        `SELECT ID, NOME_CURSO FROM CURSOS ORDER BY ID`
    )
    res.status(200).json(resultado)
})

app.get("/cursos/:id", async (req, res) => {
    const id = Number(req.params.id)

    const [resultado] = await conexao.query(
        `SELECT ID, NOME_CURSO FROM CURSOS WHERE ID = ?`,
        [id]
    )

    res.status(200).json(resultado)
})

app.get("/matriculas", async (req, res) => {
    const [resultado] = await conexao.query(
        `SELECT ID, ALUNO_ID, CURSO_ID FROM MATRICULAS`
    )

    res.status(200).json(resultado)
})

app.get("/matriculas/:id", async (req, res) => {
    const id = Number(req.params.id)

    const [resultado] = await conexao.query(
        `SELECT ID, ALUNO_ID, CURSO_ID FROM MATRICULAS WHERE ID = ?`,
        [id]
    )

    res.status(200).json(resultado)
})



app.put("/alunos/:codigo", async (req, res) => {
    const id = Number(req.params.codigo)
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msg: "Por favor preencher o Nome" })
    }

    const [resultado] = await conexao.query(
        `UPDATE ALUNOS SET NOME = ? WHERE ID = ?`,
        [nome, id]
    )

    if (resultado.affectedRows === 0) {
        return res.status(404).json({ msg: "Aluno não encontrado" })
    }

    res.status(200).json({ msg: "Alteração feita com sucesso!" })
})


app.put("/alunos/", async (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ msg: "Gentileza Digitar o nome!" })

    }

    const [resultado] = await conexao.query(`INSERT INTO ALUNOS (NOME) VALUES (?)`, [nome])
    res.status(201).json({ msg: "Aluno cadastrado com sucesso!", id: resultado.insertId })
})

app.put("/cursos/:id", async (req, res) => {
    const id = Number(req.params.id)
    const { nome } = req.body

    const [resultado] = await conexao.query(
        `UPDATE CURSOS SET NOME_CURSO = ? WHERE ID = ?`,
        [nome, id]
    )

    res.status(200).json({ msg: "Curso atualizado com sucesso!" })
})

app.put("/matriculas/:id", async (req, res) => {
    const id = Number(req.params.id)
    const { aluno_id, curso_id } = req.body

    const [resultado] = await conexao.query(
        `UPDATE MATRICULAS SET ALUNO_ID = ?, CURSO_ID = ? WHERE ID = ?`,
        [aluno_id, curso_id, id]
    )

    res.status(200).json({ msg: "Matrícula atualizada com sucesso!" })
})




app.delete("/alunos/:codigo", async (req, res) => {
    const id = Number(req.params.codigo)

    const [resultado] = await conexao.query(
        `DELETE FROM ALUNOS WHERE ID = ?`,
        [id]
    )

    if (resultado.affectedRows === 0)
        return res.status(404).json({ msg: "Aluno não encontrado" })

    res.status(200).json({ msg: "Aluno removido com sucesso!" })
})

app.delete("/cursos/:id", async (req, res) => {
    const id = Number(req.params.id)

    const [resultado] = await conexao.query(
        `DELETE FROM CURSOS WHERE ID = ?`,
        [id]
    )

    res.status(200).json({ msg: "Curso removido com sucesso!" })
})

app.delete("/matriculas/:id", async (req, res) => {
    const id = Number(req.params.id)

    const [resultado] = await conexao.query(
        `DELETE FROM MATRICULAS WHERE ID = ?`,
        [id]
    )

    res.status(200).json({ msg: "Matrícula removida com sucesso!" })
})




app.post("/alunos", async (req, res) => {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msg: "Por gentileza digite o nome" })
    }

    const [resultado] = await conexao.query(
        `INSERT INTO ALUNOS (NOME) VALUES (?)`,
        [nome]
    )

    res.status(200).json({
        msg: "Aluno cadastrado com sucesso!",
        id: resultado.insertId
    })
})

app.post("/cursos", async (req, res) => {
    const { nome } = req.body

    const [resultado] = await conexao.query(
        `INSERT INTO CURSOS (NOME_CURSO) VALUES (?)`,
        [nome]
    )

    res.status(201).json({
        msg: "Curso adiconado com sucesso!",
        id: resultado.insertId
    })
})

app.post("/matriculas", async (req, res) => {
    const { aluno_id, curso_id } = req.body

    const [resultado] = await conexao.query(
        `INSERT INTO MATRICULAS (ALUNO_ID, CURSO_ID) VALUES (?, ?)`,
        [aluno_id, curso_id]
    )

    res.status(201).json({
        msg: "Matrícula criada com sucesso!",
        id: resultado.insertId
    })
})




app.listen(PORTA, () => { //http://localhost:5000 
    console.log(`Servidor rodando`)
})  //retorno void


