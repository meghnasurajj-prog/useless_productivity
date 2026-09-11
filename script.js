/* =========================================================
   USELESS PRODUCTIVITY™
   Fully client-side
   No backend
   No API
   No database
========================================================= */


/* =========================================================
   STATE
========================================================= */

let seconds = 0;
let pointlessClicks = 0;
let xp = 0;
let generationNumber = 0;

let uselessness = 12;
let laziness = 8;
let productivity = 100;

let completedMissions = 0;
let unlockedAchievements = [];

let username = "Anonymous";

let chartData = [];

let panicTimer = null;


/* =========================================================
   ELEMENTS
========================================================= */

const timerEl = document.getElementById("timer");

const clickCountEl = document.getElementById("clickCount");
const xpCountEl = document.getElementById("xpCount");

const uselessnessEl = document.getElementById("uselessness");
const lazinessEl = document.getElementById("laziness");
const productivityEl = document.getElementById("productivity");

const uselessBar = document.getElementById("uselessBar");
const lazyBar = document.getElementById("lazyBar");
const productivityBar = document.getElementById("productivityBar");

const aiDiagnosis = document.getElementById("aiDiagnosis");
const aiComment = document.getElementById("aiComment");
const aiProgress = document.getElementById("aiProgress");
const aiConfidence = document.getElementById("aiConfidence");

const reviewScore = document.getElementById("reviewScore");
const reviewProductivity = document.getElementById("reviewProductivity");
const reviewLaziness = document.getElementById("reviewLaziness");
const reviewProductivityText = document.getElementById("reviewProductivityText");
const reviewLazinessText = document.getElementById("reviewLazinessText");
const managerComment = document.getElementById("managerComment");

const levelNumber = document.getElementById("levelNumber");
const bigLevel = document.getElementById("bigLevel");
const levelTitle = document.getElementById("levelTitle");

const currentXP = document.getElementById("currentXP");
const nextXP = document.getElementById("nextXP");
const xpBar = document.getElementById("xpBar");

const navUsername = document.getElementById("navUsername");
const navTitle = document.getElementById("navTitle");

const profileTitle = document.getElementById("profileTitle");

const missionsList = document.getElementById("missionsList");
const missionCount = document.getElementById("missionCount");

const achievementGrid = document.getElementById("achievementGrid");
const achievementCount = document.getElementById("achievementCount");

const generatorResult = document.getElementById("generatorResult");
const generatorIcon = document.getElementById("generatorIcon");
const generatorNumber = document.getElementById("generatorNumber");

const chartTime = document.getElementById("chartTime");
const dataPoints = document.getElementById("dataPoints");
const trend = document.getElementById("trend");

const chartCanvas = document.getElementById("uselessChart");

const uselessInput = document.getElementById("uselessInput");
const characterCount = document.getElementById("characterCount");
const responseText = document.getElementById("responseText");
const responseStatus = document.getElementById("responseStatus");

const usernameInput = document.getElementById("usernameInput");

const panicModal = document.getElementById("panicModal");
const panicCountdown = document.getElementById("panicCountdown");
const panicMessage = document.getElementById("panicMessage");

const achievementPopup = document.getElementById("achievementPopup");
const popupAchievement = document.getElementById("popupAchievement");

const notification = document.getElementById("notification");
const notificationTitle = document.getElementById("notificationTitle");
const notificationText = document.getElementById("notificationText");


/* =========================================================
   TIMER
========================================================= */

function formatTime(totalSeconds) {

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const secondsLeft = totalSeconds % 60;

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(secondsLeft).padStart(2, "0")
    );
}


function updateTimer() {

    seconds++;

    timerEl.textContent = formatTime(seconds);

    /*
        Every 5 seconds the system gets
        more useless.
    */

    if (seconds % 5 === 0) {

        uselessness = Math.min(
            100,
            uselessness + 1
        );

        laziness = Math.min(
            100,
            laziness + 1
        );

        productivity = Math.max(
            0,
            productivity - 1
        );

        xp += 2;

        updateEverything();

        addChartPoint();
    }

    if (seconds % 15 === 0) {
        updateAI();
        updateReview();
    }

    if (seconds % 30 === 0) {
        showRandomNotification();
    }

    checkAchievements();
}


setInterval(updateTimer, 1000);


/* =========================================================
   NOTHING BUTTON
========================================================= */

document.getElementById("nothingBtn").addEventListener("click", () => {

    pointlessClicks++;

    xp += 5;

    uselessness = Math.min(
        100,
        uselessness + 1
    );

    laziness = Math.min(
        100,
        laziness + 0.5
    );

    productivity = Math.max(
        0,
        productivity - 0.5
    );

    clickCountEl.textContent = pointlessClicks;

    xpCountEl.textContent = xp;

    addChartPoint();

    updateEverything();

    checkAchievements();

    showNotification(
        "Excellent work",
        "You successfully accomplished nothing."
    );

    const button = document.getElementById("nothingBtn");

    button.classList.remove("pop");

    void button.offsetWidth;

    button.classList.add("pop");
});


/* =========================================================
   UPDATE EVERYTHING
========================================================= */

function updateEverything() {

    uselessnessEl.textContent =
        Math.round(uselessness) + "%";

    lazinessEl.textContent =
        Math.round(laziness) + "%";

    productivityEl.textContent =
        Math.round(productivity) + "%";


    uselessBar.style.width =
        uselessness + "%";

    lazyBar.style.width =
        laziness + "%";

    productivityBar.style.width =
        productivity + "%";


    clickCountEl.textContent =
        pointlessClicks;

    xpCountEl.textContent =
        xp;


    updateLevel();

    updateAI();

    updateReview();
}


/* =========================================================
   LEVEL SYSTEM
========================================================= */

function getLevelData() {

    if (xp < 100) {

        return {
            level: 1,
            title: "AMATEUR",
            next: 100
        };

    }

    if (xp < 250) {

        return {
            level: 2,
            title: "PROCRASTINATOR",
            next: 250
        };

    }

    if (xp < 500) {

        return {
            level: 3,
            title: "EXPERT",
            next: 500
        };

    }

    if (xp < 900) {

        return {
            level: 4,
            title: "PROFESSIONAL",
            next: 900
        };

    }

    if (xp < 1500) {

        return {
            level: 5,
            title: "LEGEND",
            next: 1500
        };

    }

    return {
        level: 6,
        title: "BEYOND SAVING",
        next: 2000
    };
}


function updateLevel() {

    const data = getLevelData();

    levelNumber.textContent =
        String(data.level).padStart(2, "0");

    bigLevel.textContent =
        String(data.level).padStart(2, "0");

    levelTitle.textContent =
        data.title;

    currentXP.textContent =
        xp + " XP";

    nextXP.textContent =
        data.next + " XP";

    let previousLevelXP = 0;

    if (data.level === 2) previousLevelXP = 100;
    if (data.level === 3) previousLevelXP = 250;
    if (data.level === 4) previousLevelXP = 500;
    if (data.level === 5) previousLevelXP = 900;
    if (data.level === 6) previousLevelXP = 1500;

    const percentage =
        Math.min(
            100,
            ((xp - previousLevelXP) /
            (data.next - previousLevelXP)) * 100
        );

    xpBar.style.width =
        Math.max(0, percentage) + "%";
}


/* =========================================================
   AI
========================================================= */

const aiJudgements = [

    [
        "Mild productivity avoidance detected.",
        "You're not doing nothing aggressively enough yet."
    ],

    [
        "Severe procrastination detected.",
        "The AI recommends continuing to avoid responsibility."
    ],

    [
        "Productivity levels are becoming concerning.",
        "Your ability to waste time is genuinely impressive."
    ],

    [
        "Critical uselessness detected.",
        "At this point, doing nothing has become a skill."
    ],

    [
        "Professional time-wasting behaviour detected.",
        "Your resume probably shouldn't mention this."
    ],

    [
        "There is no evidence of productivity.",
        "Honestly? Respect."
    ],

    [
        "You appear to be accomplishing absolutely nothing.",
        "The system has stopped expecting anything from you."
    ],

    [
        "Productivity has left the building.",
        "It did not leave a forwarding address."
    ]
];


function updateAI() {

    const index =
        Math.min(
            aiJudgements.length - 1,
            Math.floor(uselessness / 14)
        );

    const result =
        aiJudgements[index];

    aiDiagnosis.textContent =
        result[0];

    aiComment.textContent =
        result[1];

    const confidence =
        Math.min(
            99,
            70 + Math.floor(uselessness / 4)
        );

    aiConfidence.textContent =
        confidence + "%";

    aiProgress.style.width =
        confidence + "%";
}


/* =========================================================
   DAILY REVIEW
========================================================= */

const managerComments = [

    "Strong commitment to doing absolutely nothing. Keep it up.",

    "Productivity remains suspiciously low.",

    "Employee has demonstrated exceptional talent in avoiding tasks.",

    "No measurable achievements were found. Excellent consistency.",

    "The department is concerned. The department is also impressed.",

    "Performance review complete. Please continue not improving."
];


function updateReview() {

    const score =
        Math.max(
            0,
            10 - uselessness / 10
        );

    reviewScore.textContent =
        score.toFixed(1) + "/10";

    reviewProductivity.style.width =
        productivity + "%";

    reviewLaziness.style.width =
        laziness + "%";

    reviewProductivityText.textContent =
        Math.round(productivity) + "%";

    reviewLazinessText.textContent =
        Math.round(laziness) + "%";

    const index =
        Math.min(
            managerComments.length - 1,
            Math.floor(uselessness / 18)
        );

    managerComment.textContent =
        "“" + managerComments[index] + "”";
}


/* =========================================================
   MISSIONS
========================================================= */

const missions = [

    "Stare at your screen for 30 seconds",

    "Move your mouse in three unnecessary circles",

    "Open and close a random app",

    "Do absolutely nothing for 2 minutes",

    "Click the uselessness button 5 times"
];


function renderMissions() {

    missionsList.innerHTML = "";

    missions.forEach((mission, index) => {

        const div =
            document.createElement("div");

        div.className = "mission";

        div.dataset.index = index;

        div.innerHTML = `
            <div class="mission-checkbox"></div>
            <div class="mission-text">${mission}</div>
        `;

        div.addEventListener("click", () => {

            if (div.classList.contains("completed")) {
                return;
            }

            div.classList.add("completed");

            div.querySelector(".mission-checkbox")
                .textContent = "✓";

            completedMissions++;

            xp += 15;

            missionCount.textContent =
                completedMissions + " / " + missions.length;

            updateEverything();

            checkAchievements();

            showNotification(
                "Mission completed",
                "You have wasted your time successfully."
            );
        });

        missionsList.appendChild(div);
    });
}


renderMissions();


/* =========================================================
   ACHIEVEMENTS
========================================================= */

const achievements = [

    {
        id: "firstClick",
        icon: "👆",
        name: "First Mistake",
        requirement: "Click the useless button once",
        check: () => pointlessClicks >= 1
    },

    {
        id: "tenClicks",
        icon: "🖱️",
        name: "Serial Clicker",
        requirement: "10 pointless clicks",
        check: () => pointlessClicks >= 10
    },

    {
        id: "fiftyClicks",
        icon: "🔥",
        name: "Click Addict",
        requirement: "50 pointless clicks",
        check: () => pointlessClicks >= 50
    },

    {
        id: "minute",
        icon: "⏰",
        name: "Time Destroyer",
        requirement: "Waste 1 minute",
        check: () => seconds >= 60
    },

    {
        id: "fiveMinutes",
        icon: "💀",
        name: "Beyond Saving",
        requirement: "Waste 5 minutes",
        check: () => seconds >= 300
    },

    {
        id: "missions",
        icon: "🎯",
        name: "Mission Failure",
        requirement: "Complete 3 useless missions",
        check: () => completedMissions >= 3
    },

    {
        id: "allMissions",
        icon: "🏆",
        name: "Professional Procrastinator",
        requirement: "Complete all missions",
        check: () => completedMissions >= missions.length
    },

    {
        id: "xp",
        icon: "⭐",
        name: "Master of Nothing",
        requirement: "Reach 250 XP",
        check: () => xp >= 250
    },

    {
        id: "useless",
        icon: "🫠",
        name: "Absolute Failure",
        requirement: "Reach 75% uselessness",
        check: () => uselessness >= 75
    }
];


function renderAchievements() {

    achievementGrid.innerHTML = "";

    achievements.forEach(achievement => {

        const unlocked =
            unlockedAchievements.includes(achievement.id);

        const div =
            document.createElement("div");

        div.className =
            "achievement" +
            (unlocked ? " unlocked" : "");

        div.innerHTML = `
            <div class="achievement-icon">
                ${unlocked ? achievement.icon : "🔒"}
            </div>

            <div class="achievement-name">
                ${achievement.name}
            </div>

            <div class="achievement-requirement">
                ${achievement.requirement}
            </div>
        `;

        achievementGrid.appendChild(div);
    });

    achievementCount.textContent =
        unlockedAchievements.length +
        " UNLOCKED";
}


function checkAchievements() {

    achievements.forEach(achievement => {

        if (
            !unlockedAchievements.includes(achievement.id) &&
            achievement.check()
        ) {

            unlockedAchievements.push(
                achievement.id
            );

            renderAchievements();

            showAchievement(
                achievement.name
            );

            xp += 20;
        }
    });
}


renderAchievements();


/* =========================================================
   GENERATOR
========================================================= */

const uselessActivities = [

    ["🪑", "Rearrange your chair by approximately 2 centimetres."],

    ["🧦", "Find the most suspicious sock in your room."],

    ["🪟", "Look out of the window and pretend something interesting happened."],

    ["🧮", "Calculate how many times you've checked your phone today."],

    ["🐌", "Walk across the room at snail speed."],

    ["📱", "Unlock your phone, forget why, lock it again."],

    ["🖱️", "Move your mouse in a perfect circle for no reason."],

    ["🧠", "Think about something you were supposed to do yesterday."],

    ["🥤", "Get water. Forget why you went there."],

    ["🎵", "Play one song and dramatically stare at the ceiling."],

    ["📚", "Open a textbook. Read one word. Close it."],

    ["🔍", "Search for something you already know the answer to."]
];


document
    .getElementById("generatorBtn")
    .addEventListener("click", () => {

        generationNumber++;

        const random =
            uselessActivities[
                Math.floor(
                    Math.random() *
                    uselessActivities.length
                )
            ];

        generatorIcon.textContent =
            random[0];

        generatorResult.textContent =
            random[1];

        generatorNumber.textContent =
            "GENERATION #" +
            String(generationNumber)
                .padStart(3, "0");

        xp += 8;

        updateEverything();

        checkAchievements();
    });


/* =========================================================
   REAL LIVE GRAPH
========================================================= */

function addChartPoint() {

    chartData.push({

        time: seconds,

        uselessness: uselessness,

        productivity: productivity

    });

    /*
        Keep enough data to display
        the session without making
        the browser work too hard.
    */

    if (chartData.length > 80) {
        chartData.shift();
    }

    drawChart();

    updateChartStats();
}


function updateChartStats() {

    const minutes =
        Math.floor(seconds / 60);

    chartTime.textContent =
        minutes + "m";

    dataPoints.textContent =
        chartData.length;

    if (productivity < 50) {
        trend.textContent = "COLLAPSING ↓";
    }
    else if (productivity < 80) {
        trend.textContent = "DECLINING ↓";
    }
    else {
        trend.textContent = "STILL ALIVE →";
    }
}


/*
    This is a real canvas graph.

    Pink line = uselessness
    Purple/blue line = productivity

    It redraws whenever the values change.
*/

function drawChart() {

    const canvas =
        chartCanvas;

    const ctx =
        canvas.getContext("2d");

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;

    ctx.scale(dpr, dpr);

    const width =
        rect.width;

    const height =
        rect.height;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* GRID */

    ctx.strokeStyle =
        "rgba(87,58,78,0.15)";

    ctx.lineWidth = 1;

    for (
        let y = 20;
        y < height;
        y += height / 4
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(width, y);

        ctx.stroke();
    }


    if (chartData.length < 2) {

        ctx.fillStyle =
            "#573A4E";

        ctx.font =
            "600 13px DM Sans";

        ctx.textAlign =
            "center";

        ctx.fillText(
            "Start doing nothing to generate data...",
            width / 2,
            height / 2
        );

        return;
    }


    const padding = 25;

    const graphWidth =
        width - padding * 2;

    const graphHeight =
        height - padding * 2;


    function xPosition(index) {

        return (
            padding +
            (index /
            (chartData.length - 1)) *
            graphWidth
        );
    }


    function yPosition(value) {

        return (
            height -
            padding -
            (value / 100) *
            graphHeight
        );
    }


    /* USELESSNESS LINE */

    ctx.beginPath();

    chartData.forEach((point, index) => {

        const x =
            xPosition(index);

        const y =
            yPosition(point.uselessness);

        if (index === 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    });

    ctx.strokeStyle =
        "#FF5C8A";

    ctx.lineWidth = 4;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";

    ctx.stroke();


    /* PRODUCTIVITY LINE */

    ctx.beginPath();

    chartData.forEach((point, index) => {

        const x =
            xPosition(index);

        const y =
            yPosition(point.productivity);

        if (index === 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    });

    ctx.strokeStyle =
        "#8FA7FF";

    ctx.lineWidth = 4;

    ctx.stroke();


    /* CURRENT DOTS */

    const last =
        chartData[
            chartData.length - 1
        ];

    const lastX =
        xPosition(
            chartData.length - 1
        );


    ctx.beginPath();

    ctx.arc(
        lastX,
        yPosition(last.uselessness),
        5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#FF5C8A";

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        lastX,
        yPosition(last.productivity),
        5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#8FA7FF";

    ctx.fill();
}


window.addEventListener(
    "resize",
    drawChart
);


/* =========================================================
   TEXT LAB
========================================================= */

const excuseResponses = [

    "I was going to do it, but then I remembered that tomorrow exists.",

    "Unfortunately, my productivity subscription expired.",

    "I was mentally preparing to start. The preparation took longer than expected.",

    "I couldn't do it because I was busy thinking about doing it.",

    "My brain has officially placed this task on the 'later' list.",

    "I had every intention of doing it. Intentions count, right?"
];


const thoughtResponses = [

    "Interesting. Your thought contains approximately 3% logic and 97% unnecessary overthinking.",

    "The AI has analysed this thought and recommends thinking about something else.",

    "This thought appears to have no immediate practical purpose. Excellent.",

    "Your brain is currently buffering.",

    "This is a fascinating thought. Unfortunately, it will accomplish nothing.",

    "The thought has been approved by the Department of Useless Ideas."
];


const aiResponses = [

    "I hear you. My professional recommendation is to continue doing nothing.",

    "Fascinating. I have considered your message deeply and learned absolutely nothing.",

    "Based on my advanced analysis, you should probably get a snack.",

    "Your message has been received, analysed, misunderstood, and archived.",

    "This sounds important. Therefore I recommend ignoring it for another 20 minutes.",

    "I would help, but that would make this application useful."
];


function getInput() {

    return uselessInput.value.trim();
}


function showTextResponse(text) {

    responseText.textContent =
        text;

    responseStatus.textContent =
        "ANALYSIS COMPLETE";

    responseStatus.style.color =
        "#ff5c8a";

    xp += 5;

    updateEverything();
}


document
    .getElementById("excuseBtn")
    .addEventListener("click", () => {

        if (!getInput()) {

            showTextResponse(
                "You need to type something first. Even uselessness requires a minimum amount of effort."
            );

            return;
        }

        const response =
            excuseResponses[
                Math.floor(
                    Math.random() *
                    excuseResponses.length
                )
            ];

        showTextResponse(response);
    });


document
    .getElementById("thoughtBtn")
    .addEventListener("click", () => {

        if (!getInput()) {

            showTextResponse(
                "There is nothing to analyse. Your mind appears to be empty. Congratulations."
            );

            return;
        }

        const response =
            thoughtResponses[
                Math.floor(
                    Math.random() *
                    thoughtResponses.length
                )
            ];

        showTextResponse(response);
    });


document
    .getElementById("aiBtn")
    .addEventListener("click", () => {

        if (!getInput()) {

            showTextResponse(
                "Please provide text. The Useless AI cannot analyse absolutely nothing. That's my job."
            );

            return;
        }

        const response =
            aiResponses[
                Math.floor(
                    Math.random() *
                    aiResponses.length
                )
            ];

        showTextResponse(response);
    });


uselessInput.addEventListener(
    "input",
    () => {

        characterCount.textContent =
            uselessInput.value.length +
            " / 500";
    }
);


uselessInput.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            document
                .getElementById("aiBtn")
                .click();
        }
    }
);


/* =========================================================
   PROFILE
========================================================= */

function getProfileTitle() {

    if (uselessness >= 90) {
        return "Beyond Saving";
    }

    if (uselessness >= 75) {
        return "Absolute Failure";
    }

    if (uselessness >= 50) {
        return "Professional Procrastinator";
    }

    if (uselessness >= 30) {
        return "Certified Time Waster";
    }

    return "Professional Time Waster";
}


document
    .getElementById("saveProfile")
    .addEventListener("click", () => {

        const value =
            usernameInput.value.trim();

        if (value) {
            username = value;
        }

        navUsername.textContent =
            username;

        const title =
            getProfileTitle();

        profileTitle.textContent =
            title;

        navTitle.textContent =
            title;

        showNotification(
            "Identity saved",
            "Your useless identity has been registered."
        );
    });


/* =========================================================
   LEADERBOARD
========================================================= */

function renderLeaderboard() {

    const people = [

        {
            name: "Professional Procrastinator",
            title: "CEO of Later",
            score: 987
        },

        {
            name: "Nothing Specialist",
            title: "Doing Less Since 2019",
            score: 821
        },

        {
            name: "Chair Enthusiast",
            title: "Senior Sitting Officer",
            score: 744
        },

        {
            name: "Anonymous",
            title: "Unknown Potential",
            score: 612
        },

        {
            name: "You",
            title: "Current Participant",
            score: uselessness
        }
    ];


    people.sort(
        (a, b) => b.score - a.score
    );


    const list =
        document.getElementById(
            "leaderboardList"
        );

    list.innerHTML = "";


    people.forEach((person, index) => {

        const row =
            document.createElement("div");

        row.className =
            "leader-row";

        if (
            person.name === username ||
            person.name === "You"
        ) {

            row.classList.add("current");
        }

        row.innerHTML = `

            <div class="leader-rank">
                #${index + 1}
            </div>

            <div>
                <div class="leader-name">
                    ${person.name}
                </div>

                <span class="leader-title">
                    ${person.title}
                </span>
            </div>

            <div class="leader-score">
                ${Math.round(person.score)}
            </div>
        `;

        list.appendChild(row);
    });
}


renderLeaderboard();


/* =========================================================
   PANIC BUTTON
========================================================= */

document
    .getElementById("panicBtn")
    .addEventListener("click", () => {

        panicModal.classList.add(
            "active"
        );

        let count = 5;

        panicCountdown.textContent =
            count;

        panicMessage.textContent =
            "You are about to become productive.";

        clearInterval(panicTimer);

        panicTimer =
            setInterval(() => {

                count--;

                panicCountdown.textContent =
                    count;

                if (count <= 0) {

                    clearInterval(
                        panicTimer
                    );

                    panicMessage.textContent =
                        "PRODUCTIVITY HAS BEEN DETECTED. RUN.";

                }

            }, 1000);
    });


document
    .getElementById("cancelPanic")
    .addEventListener("click", () => {

        clearInterval(
            panicTimer
        );

        panicModal.classList.remove(
            "active"
        );

        xp += 10;

        showNotification(
            "Crisis avoided",
            "You chose to continue wasting time."
        );

        updateEverything();
    });


document
    .getElementById("continuePanic")
    .addEventListener("click", () => {

        clearInterval(
            panicTimer
        );

        panicMessage.textContent =
            "JUST KIDDING. YOU'RE BACK IN NOTHING MODE.";

        xp += 5;

        setTimeout(() => {

            panicModal.classList.remove(
                "active"
            );

        }, 1200);

        showNotification(
            "Productivity cancelled",
            "Normal uselessness has been restored."
        );
    });


/* =========================================================
   ACHIEVEMENT POPUP
========================================================= */

function showAchievement(name) {

    popupAchievement.textContent =
        name;

    achievementPopup.classList.add(
        "show"
    );

    setTimeout(() => {

        achievementPopup.classList.remove(
            "show"
        );

    }, 3500);
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

const randomNotifications = [

    [
        "Productivity Alert",
        "You have been doing nothing for an impressive amount of time."
    ],

    [
        "Uselessness Update",
        "Your performance is getting worse. Congratulations."
    ],

    [
        "Management",
        "Nobody has asked you to do anything. Keep it that way."
    ],

    [
        "AI Warning",
        "The AI has started questioning your life choices."
    ],

    [
        "Achievement",
        "You are currently achieving absolutely nothing."
    ],

    [
        "Important",
        "This notification is completely unnecessary."
    ]
];


function showNotification(
    title,
    message
) {

    notificationTitle.textContent =
        title;

    notificationText.textContent =
        message;

    notification.classList.add(
        "show"
    );

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 3500);
}


function showRandomNotification() {

    const random =
        randomNotifications[
            Math.floor(
                Math.random() *
                randomNotifications.length
            )
        ];

    showNotification(
        random[0],
        random[1]
    );
}


/* =========================================================
   INITIAL CHART DATA
========================================================= */

function initializeChart() {

    /*
        Start with ONE real point.
        Everything after this is generated
        from actual session values.
    */

    chartData = [

        {
            time: 0,
            uselessness: uselessness,
            productivity: productivity
        }

    ];

    drawChart();

    updateChartStats();
}


initializeChart();


/* =========================================================
   INITIAL UI
========================================================= */

updateEverything();

renderAchievements();

renderLeaderboard();


/* =========================================================
   RANDOM EASTER EGG
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.toLowerCase() === "u" &&
            event.shiftKey
        ) {

            showNotification(
                "SECRET DISCOVERED",
                "You found the Useless Productivity secret shortcut."
            );

            xp += 25;

            updateEverything();
        }
    }
);