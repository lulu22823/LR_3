function isNotEmpty(text) {
    return text !== null && text.trim() !== "";
}
function isValidName(text) {
    if (!isNotEmpty(text)) return false;
    return /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'’\s-]+$/.test(text.trim());
}
function isValidNumber(text, min = -Infinity, max = Infinity) {
    if (!isNotEmpty(text)) return false;
    const num = parseNumber(text);
    return Number.isFinite(num) && num >= min && num <= max;
}
function parseNumber(text) {
    return Number(text.trim().replace(',', '.'));
}
function formatMoney(num) {
    return Number.isInteger(num) ? num : Number(num.toFixed(2));
}

// Повертає число або null, якщо ввід скасовано чи некоректний.
function readNumber(message, min, max, integer, defaultValue, error) {
    const input = prompt(message, defaultValue);
    if (input === null) return null;

    if (!isValidNumber(input, min, max)) {
        alert(error);
        return null;
    }
    const number = parseNumber(input);
    if (integer && !Number.isInteger(number)) {
        alert(error);
        return null;
    }
    return number;
}

// Завдання 1
function getFullName(firstName, lastName) {
    return `${firstName.trim()} ${lastName.trim()}`;
}

function showGreeting(fullName, age) {
    return `Hello, ${fullName}! You are ${age} years old.`;
}

document.getElementById("task1_btn").addEventListener("click", function() {
    const out = document.getElementById("task1_out");
    out.innerText = "";

    const firstName = prompt("Введіть ваше ім'я:");
    if (firstName === null) return;
    if (!isValidName(firstName)) {
        alert("Помилка! Введіть коректне ім'я (літери).");
        return;
    }

    const lastName = prompt("Введіть ваше прізвище:");
    if (lastName === null) return;
    if (!isValidName(lastName)) {
        alert("Помилка! Введіть коректне прізвище (літери).");
        return;
    }

    const age = readNumber("Введіть ваш вік:", 1, 120, true, "", "Помилка! Вік має бути цілим числом від 1 до 120.");
    if (age === null) return;

    const fullName = getFullName(firstName, lastName);
    const greeting = showGreeting(fullName, age);

    alert(greeting);
    out.innerText = greeting;
});

// Завдання 2
function getStudentInfo() {
    const name = prompt("Введіть ім'я студента:");
    if (name === null) return null;
    if (!isValidName(name)) {
        alert("Помилка! Ім'я має містити лише літери.");
        return null;
    }

    const score = readNumber("Введіть бал студента (від 0 до 12):", 0, 12, false, "", "Помилка! Бал має бути числом від 0 до 12.");
    if (score === null) return null;

    return {
        name: name.trim(),
        score: score
    };
}

function checkGrade(score) {
    if (score >= 10) {
        return "Excellent";
    } else if (score >= 7) {
        return "Good";
    } else if (score >= 4) {
        return "Satisfactory";
    } else {
        return "Fail";
    }
}

function showResult(name, grade) {
    const text = `Student: ${name}\nGrade: ${grade}`;
    alert(text);
    return text;
}

document.getElementById("task2_btn").addEventListener("click", function() {
    const out = document.getElementById("task2_out");
    out.innerText = "";

    const student = getStudentInfo();
    if (!student) return;

    const grade = checkGrade(student.score);
    out.innerText = showResult(student.name, grade);
});

// Завдання 3
function calculateTip(amount, percent = 10) {
    return (amount * percent) / 100;
}
function showResultTip(amount, tip, percent = 10) {
    const total = amount + tip;
    const text = `Bill: ${formatMoney(amount)} грн\nTip (${percent}%): ${formatMoney(tip)} грн\nTotal: ${formatMoney(total)} грн`;
    alert(text);
    return text;
}

document.getElementById("task3_btn").addEventListener("click", function() {
    const out = document.getElementById("task3_out");
    out.innerText = "";

    const amount = readNumber("Введіть суму рахунку (наприклад, 450):", 0.01, Infinity, false, "", "Помилка! Сума має бути більшою за 0.");
    if (amount === null) return;

    const percentInput = prompt("Введіть відсоток чайових (Enter для 10%):", "10");
    let percent = 10;
    if (percentInput !== null && isNotEmpty(percentInput)) {
        if (!isValidNumber(percentInput, 0, 100)) {
            alert("Помилка! Відсоток має бути від 0 до 100.");
            return;
        }
        percent = parseNumber(percentInput);
    }

    const tip = calculateTip(amount, percent);
    out.innerText = showResultTip(amount, tip, percent);
});

// Завдання 4
let timerInterval = null;
let timerTimeout = null;

function startGreetingTimer(message, seconds, callback) {
    const out = document.getElementById("task4_out");
    const btn = document.getElementById("task4_btn");
    btn.disabled = true;

    if (timerInterval) clearInterval(timerInterval);
    if (timerTimeout) clearTimeout(timerTimeout);

    let timeLeft = seconds;
    out.innerText = `Таймер запущено на ${seconds} сек...`;

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            out.innerText = `Залишилось: ${timeLeft} сек.`;
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);

    timerTimeout = setTimeout(() => {
        out.innerText = `Повідомлення: "${message}"`;
        btn.disabled = false;
        if (typeof callback === "function") {
            callback();
        }
    }, seconds * 1000);
}

document.getElementById("task4_btn").addEventListener("click", function() {
    const message = prompt("Введіть повідомлення:", "Hello, world!");
    if (message === null) return;
    if (!isNotEmpty(message)) {
        alert("Помилка! Повідомлення не може бути порожнім.");
        return;
    }

    const seconds = readNumber("Введіть кількість секунд:", 1, 30, false, "3", "Помилка! Введіть число від 1 до 30.");
    if (seconds === null) return;

    startGreetingTimer(message, seconds, () => {
        alert("Time is up!");
    });
});

// Завдання 5
function calculate(a, b, operation) {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return "Помилка: ділення на нуль";
            }
            return a / b;
        default:
            return 'Invalid operation';
    }
}

function showResultCalculation() {
    const out = document.getElementById("task5_out");
    out.innerText = "";

    const a = readNumber("Введіть перше число (a):", -Infinity, Infinity, false, "", "Помилка! Перше значення має бути числом.");
    if (a === null) return;

    const b = readNumber("Введіть друге число (b):", -Infinity, Infinity, false, "", "Помилка! Друге значення має бути числом.");
    if (b === null) return;

    const op = prompt("Введіть операцію (+, -, *, /):");
    if (op === null) return;

    const cleanOp = op.trim();

    const result = calculate(a, b, cleanOp);

    if (typeof result === 'string') {
        alert(result);
        out.innerText = result;
    } else {
        const text = `${a} ${cleanOp} ${b} = ${result}`;
        alert(text);
        out.innerText = text;
    }
}

document.getElementById("task5_btn").addEventListener("click", showResultCalculation);

// Завдання 6 (Замикання)
function createClickCounter() {
    let count = 0;
    return function() {
        count++;
        console.log(`Поточний count = ${count}`);
        return count;
    };
}

let myCounter = createClickCounter();

document.getElementById("task6_btn").addEventListener("click", function() {
    const val = myCounter();
    document.getElementById("task6_out").innerText = `Кількість кліків: ${val} (перевірте також консоль F12)`;
});

document.getElementById("task6_reset").addEventListener("click", function() {
    myCounter = createClickCounter();
    document.getElementById("task6_out").innerText = "Лічильник скинуто (створено нове замикання)";
});

// Завдання 7 (Генератор випадкових чисел)
function* randomGenerator(min, max) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

let genInstance = null;

document.getElementById("task7_init").addEventListener("click", function() {
    const min = readNumber("Введіть min:", -Infinity, Infinity, true, "1", "Помилка! min має бути цілим числом.");
    if (min === null) return;

    const max = readNumber("Введіть max:", -Infinity, Infinity, true, "100", "Помилка! max має бути цілим числом.");
    if (max === null) return;


    if (min > max) {
        alert("Помилка! min не може бути більшим за max.");
        return;
    }

    genInstance = randomGenerator(min, max);
    document.getElementById("next").disabled = false;
    document.getElementById("out").innerText = `Генератор готовий для діапазону [${min} ... ${max}]. Натискайте Next number.`;
});

document.getElementById("next").addEventListener("click", function() {
    if (!genInstance) return;
    const num = genInstance.next().value;
    document.getElementById("out").innerText = `Випадкове число: ${num}`;
    console.log("Число з генератора:", num);
});

// Завдання 8 (Генератор паролів з next(value))
function* passwordGenerator() {
    let password = "";
    while (true) {
        const char = yield password;
        if (char === 'done') {
            return password;
        }
        if (char != null) {
            password += char;
        }
    }
}

document.getElementById("task8_btn").addEventListener("click", function() {
    const out = document.getElementById("task8_out");
    out.innerText = "";

    const gen = passwordGenerator();
    gen.next(); // запуск до першого yield

    alert("Вводьте символи по черзі. Для завершення введіть 'done'.");

    while (true) {
        const input = prompt("Введіть символ або 'done':");
        if (input === null) {
            out.innerText = "Скасовано.";
            return;
        }

        if (input.trim() === 'done') {
            const pass = gen.next('done').value;
            alert(`Зібраний пароль: ${pass}`);
            out.innerText = `Зібраний пароль: ${pass}`;
            break;
        } else {
            gen.next(input);
        }
    }
});

// Завдання 9 (Чат-бот на генераторі)
function* chatBot() {
    const name = yield "Hi! What is your name?";
    yield `Nice to meet you, ${name}! How are you?`;
    yield "Goodbye!";
}

document.getElementById("task9_btn").addEventListener("click", function() {
    const out = document.getElementById("task9_out");
    out.innerText = "";

    const bot = chatBot();

    const q1 = bot.next().value;
    const name = prompt(q1, "Дмитро");
    if (name === null) return;

    const q2 = bot.next(name).value;
    const mood = prompt(q2, "Good");
    if (mood === null) return;

    const q3 = bot.next(mood).value;
    alert(q3);

    out.innerText = `Бот: ${q1}\nВи: ${name}\nБот: ${q2}\nВи: ${mood}\nБот: ${q3}`;
});

// Завдання 10 (Втрата контексту this та .bind)
const user = {
    name: "Alex",
    say() {
        const greeting = `Hello, ${this.name}`;
        alert(greeting);
        const out = document.getElementById("task10_out");
        if (this === user) {
            out.innerText = `Контекст зафіксовано через .bind(user): ${greeting}`;
        } else {
            out.innerText = "Контекст втрачено (this вказує на кнопку, а не на user)";
        }
        return greeting;
    }
};

document.getElementById("task10_setName").addEventListener("click", function() {
    const name = prompt("Введіть нове ім'я для user:", user.name);
    if (name !== null && isValidName(name)) {
        user.name = name.trim();
        document.getElementById("task10_out").innerText = `Поточний user.name = "${user.name}"`;
    }
});
// Без bind браузер викликає обробник із this, що вказує на кнопку.
document.getElementById("hello_lost").addEventListener("click", user.say);
const boundSay = user.say.bind(user);
document.getElementById("hello").addEventListener("click", boundSay);
