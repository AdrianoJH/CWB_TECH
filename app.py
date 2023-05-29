from flask import Flask, render_template, redirect, request, flash
from flask_mail import Mail, Message
from config import email, senha

app = Flask(__name__)
app.secret_key = 'amor'

mail_settings = {
    "MAIL_SERVER": 'smtp-mail.outlook.com',
    "MAIL_PORT":"587",
    "MAIL_USE_TLS":True,
    "MAIL_USE_SSL": False,
    "MAIL_USERNAME": email,
    "MAIL_PASSWORD": senha
}

app.config.update(mail_settings)

mail = Mail(app)

class Contato:
    def __init__(self,nome, email, mensagem):
        self.nome = nome
        self.email = email
        self.mensagem = mensagem


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['GET', 'POST'])
def send():
    if request.method == 'POST':
        formContato = Contato(
            request.form["nome"],
            request.form["email"],
            request.form["mensagem"]
        )

        msg = Message(
            subject = f'{formContato.nome} te enviou uma mensagem no Portfólio',
            sender = app.config.get("MAIL_USERNAME"),
            recipients = ['adrianorsouza.h6@gmail.com', app.config.get("MAIL_USERNAME")],
            body = f'''

            {formContato.nome} com o email {formContato.email} te enviou a seguinte mensagem:

            {formContato.mensagem} 
            
            '''
        )
        mail.send(msg)
        flash(' Mensagem enviada com sucesso! ')

    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)