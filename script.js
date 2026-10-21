let activities = [
    { id: 1, name: "Житлово-комунальне господарство", department: "Управління житлово-комунального господарства", connectionText: "Координація з Київською міською державною адміністрацією (КМДА)", viewsDay1: 450, viewsDay2: 520, term: 3 },
    { id: 2, name: "Освіта та навчальні заклади", department: "Управління освіти", connectionText: "Взаємодія з Міністерством освіти і науки України", viewsDay1: 610, viewsDay2: 580, term: 1 },
    { id: 3, name: "Охорона здоров'я", department: "Сектор з питань охорони здоров'я", connectionText: "Співпраця з Міністерством охорони здоров'я та eHealth", viewsDay1: 390, viewsDay2: 430, term: 2 },
    { id: 4, name: "Адміністративні послуги ЦНАП", department: "Управління (Центр) надання адміністративних послуг", connectionText: "Інтеграція з державними реєстрами та порталом Дія", viewsDay1: 890, viewsDay2: 950, term: 1 },
    { id: 5, name: "Соціальна та ветеранська політика", department: "Управління соціальної та ветеранської політики", connectionText: "Звітність перед Міністерством соціальної політики України", viewsDay1: 340, viewsDay2: 310, term: 2 },
    { id: 6, name: "Архітектура та землекористування", department: "Управління містобудування, архітектури та землекористування", connectionText: "Узгодження через Державну інспекцію архітектури та містобудування", viewsDay1: 210, viewsDay2: 250, term: 4 },
    { id: 7, name: "Культура та молодіжна політика", department: "Управління культури", connectionText: "Співпраця з Міністерством культури та стратегічних комунікацій", viewsDay1: 180, viewsDay2: 200, term: 3 },
    { id: 8, name: "Благоустрій та екологія", department: "Відділ з питань благоустрою та екології", connectionText: "Екологічний контроль спільно з Держекоінспекцією", viewsDay1: 290, viewsDay2: 310, term: 2 },
    { id: 9, name: "Підприємництво та торгівля", department: "Відділ торгівлі та споживчого ринку", connectionText: "Взаємодія з державними податковими органами", viewsDay1: 260, viewsDay2: 240, term: 1 },
    { id: 10, name: "Фінансова діяльність та бюджет", department: "Фінансове управління", connectionText: "Підготовка звітності до Міністерства фінансів України", viewsDay1: 150, viewsDay2: 170, term: 5 }
];

console.log("--- Початковий список напрямів діяльності Шевченківської районної державної адміністрації ---");
console.table(activities);

function analyzeByTerm(arr) {
    let sorted = [...arr].sort((a, b) => a.term - b.term);
    console.log("--- Впорядковано за терміном реалізації ---");
    console.table(sorted);

    let groups = {};
    arr.forEach(item => {
        if (!groups[item.term]) groups[item.term] = { totalReaders: 0, count: 0 };
        groups[item.term].totalReaders += (item.viewsDay1 + item.viewsDay2);
        groups[item.term].count += 1;
    });

    console.log("--- Середня кількість користувачів для однакових термінів ---");
    for (let term in groups) {
        let avg = groups[term].totalReaders / groups[term].count;
        console.log(`Термін ${term} міс.: ${avg.toFixed(1)} користувачів`);
    }
}
analyzeByTerm(activities);

function getMaxDay1Department(arr) {
    let maxItem = arr.reduce((max, cur) => cur.viewsDay1 > max.viewsDay1 ? cur : max, arr[0]);
    console.log(`--- Напрям з макс. переглядами за добу_1 (${maxItem.viewsDay1}) ---`);
    console.log(`Напрям: ${maxItem.name} | Відділ: ${maxItem.department}`);
}
getMaxDay1Department(activities);

function addNewActivity(arr, newItem) {
    let isComplete = newItem.id && newItem.name && newItem.department && 
                     newItem.connectionText && newItem.viewsDay1 !== undefined && 
                     newItem.viewsDay2 !== undefined && newItem.term !== undefined;
    
    if (isComplete) {
        arr.unshift(newItem);
        console.log(`Інформація повна. Напрям "${newItem.name}" додано на ПОЧАТОК.`);
    } else {
        arr.push(newItem);
        console.log(`Інформація неповна. Напрям "${newItem.name}" додано в КІНЕЦЬ.`);
    }
}
let newActivity = { id: 111, name: "Цифрова трансформація району", department: "Відділ інформаційних технологій", connectionText: "Державна програма Е-Київ", viewsDay1: 500, viewsDay2: 600, term: 1 };
addNewActivity(activities, newActivity);
console.table(activities);

function calculateDurations(arr) {
    console.log("--- Розрахунок тривалості реалізації проєктів ---");
    let results = arr.map((item, index) => {
        let duration = index === 0 ? item.term : item.term * 1.1;
        return {
            name: item.name,
            baseTerm: item.term,
            calculatedDuration: duration.toFixed(2)
        };
    });
    console.table(results);
}
calculateDurations(activities);


// завдача 2

class UserAccount {
    constructor(lastName, firstName, age, education, feedbackGoal, dateStr, timeStr) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.education = education;
        this.feedbackGoal = feedbackGoal;
        this.dateStr = dateStr;
        this.timeStr = timeStr;
        this.date = new Date(dateStr.split('.').reverse().join('-') + 'T' + timeStr);
    }

    isMonthAndTime(month, minHour) {
        return (this.date.getMonth() + 1) === month && this.date.getHours() >= minHour;
    }

    getHour() {
        return this.date.getHours();
    }
}

let users = [
    new UserAccount("Петренко", "Олександр", 38, "Вища", "Консультація щодо житлових субсидій", "15.09.2024", "14:30:00"),
    new UserAccount("Сидоренко", "Марина", 24, "Бакалавр", "Запит на отримання довідки з ЦНАП", "01.06.2024", "09:15:00"),
    new UserAccount("Коваль", "Андрій", 49, "Магістр", "Скарга на роботу комунальних служб", "10.12.2024", "18:00:00"),
    new UserAccount("Бондар", "Світлана", 32, "Вища", "Питання щодо роботи дитячих садочків", "20.03.2024", "10:00:00"),
    new UserAccount("Ткаченко", "Сергій", 41, "Середня", "Оформлення підприємницької діяльності", "05.10.2024", "14:45:00"),
    new UserAccount("Шевченко", "Юлія", 23, "Незакінчена вища", "Електронне звернення до управління освіти", "12.07.2024", "11:20:00"),
    new UserAccount("Мельник", "Дмитро", 55, "Доктор наук", "Пропозиція щодо благоустрою парків", "25.08.2024", "16:30:00"),
    new UserAccount("Бойко", "Наталія", 36, "Вища", "Запит на допомогу ВПО", "15.01.2025", "09:00:00"),
    new UserAccount("Гаврилюк", "Олег", 29, "Бакалавр", "Консультація з земельних питань", "02.11.2024", "20:15:00"),
    new UserAccount("Лисенко", "Вікторія", 50, "Професор", "Запит на отримання архівних довідок", "18.04.2024", "13:10:00")
];

console.log("--- Облік користувачів (звернення до Шевченківської районної державної адміністрації) ---");
console.table(users);

function printUsersByMonthAndTime(arr, month, hour) {
    console.log(`--- Звернулися у місяці ${month} після ${hour}:00 ---`);
    arr.forEach(u => {
        if (u.isMonthAndTime(month, hour)) {
            console.log(`${u.lastName} ${u.firstName} — Дата: ${u.dateStr}, ${u.timeStr}`);
        }
    });
}
printUsersByMonthAndTime(users, 9, 12);

function printMinAgeAndEducation(arr) {
    let minUser = arr.reduce((min, cur) => cur.age < min.age ? cur : min, arr[0]);
    console.log("--- Користувач з мінімальним віком ---");
    console.log(`Прізвище: ${minUser.lastName} ${minUser.firstName}, Вік: ${minUser.age}, Освіта: ${minUser.education}`);
}
printMinAgeAndEducation(users);

function classifyUsers(arr) {
    let businessActive = 0;   // «з вищою освітою у робочий час (09:00 до 17:00)»
    let businessPassive = 0;  // «без освіти у неробочий час»
    let others = 0;           // «інші»

    arr.forEach(u => {
        let hour = u.getHour();
        let isWorkTime = hour >= 9 && hour < 17;
        let hasHigher = u.education.toLowerCase().includes("вища") || u.education.toLowerCase().includes("магістр") || u.education.toLowerCase().includes("бакалавр") || u.education.toLowerCase().includes("доктор") || u.education.toLowerCase().includes("професор");
        let hasNoEdu = u.education.toLowerCase().includes("середня") || u.education.toLowerCase().includes("незакінчена");

        if (hasHigher && isWorkTime) {
            businessActive++;
        } else if (hasNoEdu && !isWorkTime) {
            businessPassive++;
        } else {
            others++;
        }
    });
    console.log("--- Класифікація користувачів ---");
    console.table({
        businessActive: businessActive,
        businessPassive: businessPassive,
        others: others
    });
}

function sortAndPrintGoals(arr) {
    let sorted = [...arr].sort((a, b) => a.lastName.localeCompare(b.lastName));
    console.log("--- Відсортовані користувачі та мета зворотного зв'язку ---");
    let result = sorted.map(u => ({
        ПІБ: `${u.lastName} ${u.firstName}`,
        "Мета зворотного зв'язку": u.feedbackGoal
    }));
    console.table(result);
}
sortAndPrintGoals(users);

// lab4
document.addEventListener("DOMContentLoaded", () => {
    
    // Випадаюче підменю
    const btn = document.getElementById("activities-btn");
    const menu = document.getElementById("dropdown-menu");

    if (btn && menu) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });

        window.addEventListener("click", (e) => {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.style.display = "none";
            }
        });
    }

    //  Карусель зображень
    const carouselImages = document.querySelectorAll(".carousel-img");
    if (carouselImages.length > 0) {
        let currentImg = 0;
        setInterval(() => {
            carouselImages[currentImg].style.display = "none";
            currentImg = (currentImg + 1) % carouselImages.length;
            carouselImages[currentImg].style.display = "block";
        }, 3000);
    }

    //  Пошук напряму діяльності за назвою
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            let filter = searchInput.value.toLowerCase();
            let items = document.querySelectorAll(".activity-item");
            items.forEach(item => {
                let text = item.textContent.toLowerCase();
                item.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }

    //  Підказка  для поля "Детально"
    const detailsField = document.getElementById("details");
    const tooltip = document.getElementById("tooltip");

    if (detailsField && tooltip) {
        detailsField.addEventListener("mouseover", () => {
            detailsField.style.backgroundColor = "#eef6ff";
            detailsField.style.border = "2px solid #054585";
            detailsField.style.boxShadow = "0 0 8px rgba(5, 69, 133, 0.4)";
            tooltip.style.display = "block";
        });

        detailsField.addEventListener("mouseout", () => {
            detailsField.style.backgroundColor = "";
            detailsField.style.border = "";
            detailsField.style.boxShadow = "";
            tooltip.style.display = "none";
        });
    }
});