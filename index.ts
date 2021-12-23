const express = require('express')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

const port = 3000

const user = process.env.FROM
const pass = process.env.PASS

app.get('/', (req,res) => res.send('Aprendendo a enviar e-mail via nodemailer'))

app.get('/enviar', (req,res) => {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {user, pass},
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    })

    transporter.sendMail({
        from: user,
        to: user,
        replyTo: process.env.REPLYTO,
        subject: 'Aprendendo a enviar e-mails via nodemailer',
        text: 'Olá mundo, quinto envio de e-mail utilizando o nodemailer. Tipo texto',
        html: '<h1>Olá Mundo</h1><br><p>Quinto envio de e-mail utilizando o nodemailer. Tipo <a href="https://www.w3.org">HTML</a></p>'
    }).then(info=>{
        res.status(200).send(info)
    }).catch(error => {
        res.status(500).send(error)
    })
})

app.listen(port, () => console.log(`Rodando na porta http://localhost:${port}/`))