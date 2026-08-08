const faqs = [
    {
        keywords: ["python"],
        answer: "Python is a popular programming language used for web development, Artificial Intelligence, data science, automation, and more."
    },

    {
        keywords: ["html"],
        answer: "HTML stands for HyperText Markup Language. It is used to create the structure of web pages."
    },

    {
        keywords: ["css"],
        answer: "CSS stands for Cascading Style Sheets. It is used to style and design websites."
    },

    {
        keywords: ["javascript", "js"],
        answer: "JavaScript is a programming language used to make websites interactive and dynamic."
    },

    {
        keywords: ["ai", "artificial intelligence"],
        answer: "Artificial Intelligence is technology that enables computers to perform tasks that normally require human intelligence."
    },

    {
        keywords: ["machine learning", "ml"],
        answer: "Machine Learning is a branch of AI where computers learn patterns from data and use them to make predictions or decisions."
    },

    {
        keywords: ["deep learning"],
        answer: "Deep Learning is a type of machine learning that uses multi-layered neural networks to learn from large amounts of data."
    },

    {
        keywords: ["chatbot"],
        answer: "A chatbot is a software application that communicates with users through text or voice."
    },

    {
        keywords: ["github"],
        answer: "GitHub is a platform used to store, manage, and collaborate on software projects using Git."
    },

    {
        keywords: ["git"],
        answer: "Git is a version control system used to track changes in code and collaborate with other developers."
    },

    {
        keywords: ["vscode", "visual studio code"],
        answer: "Visual Studio Code is a free source-code editor developed by Microsoft."
    },

    {
        keywords: ["api"],
        answer: "An API allows different software applications to communicate and exchange data with each other."
    },

    {
        keywords: ["database"],
        answer: "A database is an organized collection of data that can be stored, managed, and retrieved efficiently."
    },

    {
        keywords: ["sql"],
        answer: "SQL stands for Structured Query Language. It is used to manage and retrieve data from relational databases."
    },

    {
        keywords: ["web development"],
        answer: "Web development is the process of creating and maintaining websites and web applications."
    },

    {
        keywords: ["frontend", "front end"],
        answer: "Frontend development focuses on the visible part of a website that users interact with."
    },

    {
        keywords: ["backend", "back end"],
        answer: "Backend development handles server-side logic, databases, authentication, and application functionality."
    },

    {
        keywords: ["programming"],
        answer: "Programming is the process of writing instructions that tell a computer how to perform tasks."
    },

    {
        keywords: ["algorithm"],
        answer: "An algorithm is a step-by-step procedure used to solve a problem or complete a task."
    },

    {
        keywords: ["data structure"],
        answer: "A data structure is a way of organizing and storing data so it can be accessed and modified efficiently."
    },

    {
        keywords: ["json"],
        answer: "JSON stands for JavaScript Object Notation. It is a lightweight format commonly used for exchanging data between applications."
    },

    {
        keywords: ["internet"],
        answer: "The Internet is a global network that connects computers and devices so they can communicate and share information."
    },

    {
        keywords: ["browser", "web browser"],
        answer: "A web browser is software used to access and view websites, such as Chrome, Edge, or Firefox."
    },

    {
        keywords: ["computer"],
        answer: "A computer is an electronic device that processes data according to instructions provided by software."
    },

    {
        keywords: ["software"],
        answer: "Software is a collection of programs and instructions that tell a computer what to do."
    },

    {
        keywords: ["hardware"],
        answer: "Hardware refers to the physical components of a computer, such as the CPU, RAM, keyboard, and storage."
    },

    {
        keywords: ["cpu", "processor"],
        answer: "The CPU, or Central Processing Unit, executes instructions and performs calculations for a computer."
    },

    {
        keywords: ["ram", "memory"],
        answer: "RAM is temporary computer memory used to store data and programs that are currently being used."
    },

    {
        keywords: ["cloud computing"],
        answer: "Cloud computing provides computing resources such as storage, servers, and software over the Internet."
    },

    {
        keywords: ["cybersecurity"],
        answer: "Cybersecurity is the practice of protecting computers, networks, applications, and data from unauthorized access and attacks."
    },

    {
        keywords: ["python developer"],
        answer: "A Python developer uses Python to build applications, automation scripts, APIs, data solutions, and other software."
    },

    {
        keywords: ["machine learning model", "ml model"],
        answer: "A machine learning model is a system trained on data to recognize patterns and make predictions or decisions."
    }

];


const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const clearBtn = document.getElementById("clearBtn");
const typing = document.getElementById("typing");


// Find the best FAQ answer
function findAnswer(question) {

    const text = question.toLowerCase().trim();

    // Common words remove karo
    const words = text
        .replace(/[?.,!]/g, "")
        .split(/\s+/)
        .filter(word => ![
            "what", "is", "are", "the", "a", "an",
            "tell", "me", "about", "please", "can",
            "you", "explain", "give", "some", "information",
            "on", "how", "does", "do"
        ].includes(word));

    let bestMatch = null;
    let highestScore = 0;

    for (let faq of faqs) {

        let score = 0;

        for (let keyword of faq.keywords) {

            const keywordWords = keyword.toLowerCase().split(" ");

            for (let word of words) {

                if (keywordWords.includes(word)) {
                    score++;
                }

                if (word.length > 2 && keyword.includes(word)) {
                    score++;
                }
            }
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = faq.answer;
        }
    }

    if (bestMatch) {
        return bestMatch;
    }

    return "Sorry, I couldn't find an answer to that question. Please try asking about Python, HTML, CSS, JavaScript, AI, Machine Learning, GitHub, or VS Code.";
}

// Add user message
function addUserMessage(message) {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message user-message";

    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
}


// Add bot message
function addBotMessage(answer) {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message bot-message";

    messageDiv.innerHTML = `
        <div class="avatar">🤖</div>

        <div class="message-content">

            <p>${answer}</p>

            <button class="copy-btn" onclick="copyAnswer(this)">
                📋 Copy Answer
            </button>

        </div>
    `;

    chatMessages.appendChild(messageDiv);
}


// Send message
function sendMessage() {

    const question = userInput.value.trim();

    // Prevent empty questions
    if (question === "") {
        return;
    }

    // Show user message
    addUserMessage(question);

    // Clear input
    userInput.value = "";

    // Show typing indicator
    typing.style.display = "block";

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Generate bot answer
    setTimeout(function () {

        const answer = findAnswer(question);

        // Hide typing indicator
        typing.style.display = "none";

        // Show bot answer
        addBotMessage(answer);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }, 700);


    // Clear input
    userInput.value = "";

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// Send button
sendBtn.addEventListener("click", sendMessage);


// Press Enter to send
userInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// Copy answer
function copyAnswer(button) {

    const answerText = button.parentElement.querySelector("p").innerText;

    navigator.clipboard.writeText(answerText);

    button.innerText = "✅ Copied!";

    setTimeout(function () {
        button.innerText = "📋 Copy Answer";
    }, 1500);
}


// Dark mode
darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        darkModeBtn.innerText = "☀️";

        localStorage.setItem("darkMode", "enabled");

    } else {

        darkModeBtn.innerText = "🌙";

        localStorage.setItem("darkMode", "disabled");

    }

});
if (localStorage.getItem("darkMode") === "enabled") {

    document.body.classList.add("dark");

    darkModeBtn.innerText = "☀️";

}
clearBtn.addEventListener("click", function () {

    chatMessages.innerHTML = `
        <div class="message bot-message">

            <div class="avatar">🤖</div>

            <div class="message-content">
                <p>
                    Hi there! 👋<br>
                    I'm your FAQ assistant. Ask me anything!
                </p>
            </div>

        </div>
    `;

});