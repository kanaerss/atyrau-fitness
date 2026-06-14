// Эта строчка говорит браузеру: "Сначала полностью загрузи HTML-сайт, 
// и только потом запускай этот код". Чтобы скрипт не пытался найти кнопки, которых еще нет.
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ ---
    // Находим кнопку с id="theme-toggle" (наша кнопка смены темы)
    const themeToggle = document.getElementById('theme-toggle');
    
    // Даем кнопке "ухо" (слушатель событий), которое ждет 'click' (нажатия мышки)
    themeToggle.addEventListener('click', () => {
        // Проверяем, какая тема включена сейчас. Если у сайта есть атрибут data-theme="dark", значит тема темная.
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Если тема темная -> делаем светлой
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerText = 'Тёмная тема'; // Меняем текст на кнопке
        } else {
        // Иначе (если тема светлая) -> делаем темной
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerText = 'Светлая тема'; // Меняем текст на кнопке
        }
    });


    // --- 2. ПЛАВНЫЙ СКРОЛЛ ---
    // Находим все ссылки (тег <a>), которые лежат внутри меню навигации (тег <nav>)
    const navLinks = document.querySelectorAll('nav a');
    
    // Перебираем каждую найденную ссылку по очереди
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Узнаем, куда ведет ссылка (например, "#schedule")
            const targetId = link.getAttribute('href');
            
            // Если ссылка начинается с решетки "#", значит это внутренний блок на этой же странице
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Отменяем стандартный резкий прыжок браузера
                
                const targetSection = document.querySelector(targetId); // Находим этот блок на странице
                
                if (targetSection) {
                    // Плавно крутим страницу до этого блока
                    targetSection.scrollIntoView({
                        behavior: 'smooth' 
                    });
                }
            }
        });
    });


    // --- 3. ПРОВЕРКА ФОРМЫ ЗАПИСИ ---
    // Находим форму по её ID
    const form = document.getElementById('orderForm');
    
    // Если форма есть на странице, начинаем за ней следить
    if (form) {
        // Слушаем событие 'submit' (когда человек нажал кнопку "Отправить")
        form.addEventListener('submit', (e) => {
            // Находим поле ввода телефона и берем оттуда текст, который ввел клиент
            const phoneInput = document.querySelector('input[name="phone"]');
            const phoneValue = phoneInput.value;

            // Если длина номера меньше 10 цифр — это ошибка
            if (phoneValue.length < 10) {
                alert('Пожалуйста, введите полный номер телефона.'); // Выводим окно с ошибкой
                e.preventDefault();  // Останавливаем отправку формы!
            } else {
                // Если всё хорошо, показываем сообщение об успехе
                alert('Заявка отправлена! Мы свяжемся с вами в Атырау.');
            }
        });
    }
});

// --- 4. КАЛЬКУЛЯТОР ИМТ ---
// Эта функция лежит отдельно, потому что в HTML на кнопке написано onclick="calculateBMI()"
function calculateBMI() {
    // Берем вес и рост из полей ввода. Рост сразу делим на 100, чтобы перевести сантиметры в метры.
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value / 100;
    
    // Находим место, куда будем выводить результат
    const resultElement = document.getElementById('bmiResult');

    // Проверяем, что человек ввел числа больше нуля (чтобы не было ошибок в математике)
    if (weight > 0 && height > 0) {
        // Считаем ИМТ по формуле: Вес / (Рост * Рост). toFixed(1) оставляет одну цифру после запятой.
        const bmi = (weight / (height * height)).toFixed(1);
        let message = `Ваш ИМТ: ${bmi}. `; // Готовим начало сообщения
        
        // В зависимости от цифры ИМТ, добавляем к сообщению нужный статус
        if (bmi < 18.5) message += "Статус: Дефицит веса.";
        else if (bmi < 25) message += "Статус: Норма. Так держать!";
        else if (bmi < 30) message += "Статус: Избыточный вес. Ждем на тренировку!";
        else message += "Статус: Ожирение. Пора менять жизнь!";
        
        // Выводим готовое сообщение на экран
        resultElement.innerText = message;
    } else {
        // Если человек ввел минус или оставил поля пустыми
        resultElement.innerText = "Введите корректные данные.";
    }
}