from flask import Flask, render_template, request

app = Flask(__name__)

# Главная страница
@app.route('/')
def index():
    return render_template('index.html')

# Обработка записи (простая логика)
@app.route('/book', methods=['POST'])
def book():
    name = request.form.get('name')
    phone = request.form.get('phone')
    return f"Спасибо, {name}! Мы перезвоним вам на номер {phone}."

# --- НОВЫЙ КОД: Страница расписания ---
@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

# Запуск сервера (всегда в самом конце)
if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)