const date = document.querySelector(".date");
const time = document.querySelector(".time");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

setInterval(() => {
  const sDate = new Date();
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formattedDate = sDate.toLocaleDateString("en-GB", options);
  

  date.textContent = formattedDate;
  time.textContent = sDate.toLocaleTimeString();
}, 1000);

getUserLocation();
let lat = null;
let lon = null;

const defaultLocation = {
  lat: 31.634,
  lon: 74.8723,
  city: "Amritsar",
  state: "Punjab",
  country: "India",
};

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      getWeather();
      getLocationName();
    },
    (error) => {
      console.log("Location error:", error.message);
      alert("location access denied!");
      lat = defaultLocation.lat;
      lon = defaultLocation.lon;

      getWeather();
    },
  );
}

async function getWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API failed");
    }

    const data = await response.json();

    // console.log("Weather:", data);

    document.querySelector(".temperature").textContent =
      `${data.current.temperature_2m}°`;
    document.querySelector(".Humidity").textContent =
      `${data.current.relative_humidity_2m}%`;
    document.querySelector(".wind").textContent =
      `${data.current.wind_speed_10m} km/h`;

    const condition = getWeatherCondition(data.current.weather_code);

    document.querySelector("#Weathercode").textContent = condition;
  } catch (error) {
    console.log("Weather error:", error.message);
  }
}

async function getLocationName() {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Location API failed");
    }

    const data = await response.json();

    const address = data.address;

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      "Amritsar";

    // console.log("City:", city);
    // console.log("State:", address.state);
    // console.log("Country:", address.country);

    document.querySelector(".location").textContent =
      `${city},${address.country}`;
  } catch (error) {
    console.log("Location name error:", error.message);
  }
}

function getWeatherCondition(code) {
  if (code === 0) {
    return "Clear Sky";
  }

  if (code === 1) {
    return "Mainly Clear";
  }

  if (code === 2) {
    return "Partly Cloudy";
  }

  if (code === 3) {
    return "Cloudy";
  }

  if (code === 45 || code === 48) {
    return "Foggy";
  }

  if (code >= 51 && code <= 57) {
    return "Drizzle";
  }

  if (code >= 61 && code <= 67) {
    return "Rainy";
  }

  if (code >= 71 && code <= 77) {
    return "Snowy";
  }

  if (code >= 80 && code <= 82) {
    return "Rain Showers";
  }

  if (code >= 95) {
    return "Thunderstorm";
  }

  return "Unknown";
}

const quotes = [
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    quote:
      "Great things are done by a series of small things brought together.",
    author: "Vincent van Gogh",
  },
  {
    quote: "Focus on progress, not perfection.",
    author: "Unknown",
  },
  {
    quote: "Your future is created by what you do today.",
    author: "Unknown",
  },
  {
    quote: "Small steps every day lead to big results.",
    author: "Unknown",
  },
  {
    quote:
      "Discipline is choosing between what you want now and what you want most.",
    author: "Unknown",
  },
  {
    quote: "Don't wait for motivation. Create momentum.",
    author: "Unknown",
  },
  {
    quote: "One focused hour can change the direction of your entire day.",
    author: "Unknown",
  },
  {
    quote: "Consistency turns ordinary effort into extraordinary results.",
    author: "Unknown",
  },
  {
    quote: "You don't have to be perfect. You just have to keep going.",
    author: "Unknown",
  },
  {
    quote: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  {
    quote: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    quote:
      "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
  },
  {
    quote: "Dream big, start small, act now.",
    author: "Unknown",
  },
  {
    quote: "Your only limit is the one you set for yourself.",
    author: "Unknown",
  },
  {
    quote: "Make progress your priority, and perfection your patience.",
    author: "Unknown",
  },
  {
    quote: "Every day is another opportunity to become better than yesterday.",
    author: "Unknown",
  },
  {
    quote: "Stay patient. Stay consistent. Trust the process.",
    author: "Unknown",
  },
  {
    quote: "Action is the foundation of every achievement.",
    author: "Unknown",
  },
  {
    quote: "A little progress each day adds up to big results.",
    author: "Unknown",
  },
  {
    quote: "Don't count the days. Make the days count.",
    author: "Muhammad Ali",
  },
  {
    quote: "What you do repeatedly is what you become.",
    author: "Unknown",
  },
  {
    quote: "Hard days build stronger versions of you.",
    author: "Unknown",
  },
  {
    quote: "Keep going. Your future self is counting on you.",
    author: "Unknown",
  },
  {
    quote: "Focus on what you can control and let go of the rest.",
    author: "Unknown",
  },
  {
    quote: "The best time to start was yesterday. The next best time is now.",
    author: "Unknown",
  },
  {
    quote: "Consistency beats intensity when intensity doesn't last.",
    author: "Unknown",
  },
  {
    quote: "Your goals don't need more excuses. They need more action.",
    author: "Unknown",
  },
  {
    quote: "Be stronger than your strongest excuse.",
    author: "Unknown",
  },
];

function getQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);

  const randomQuote = quotes[randomIndex];

  document.querySelector("blockquote").textContent = `"${randomQuote.quote}"`;

  document.querySelector(".quote-card span").textContent =
    `— ${randomQuote.author}`;
}

getQuote();

function setBackgroundVideo() {
  const video = document.querySelector("#background-video");
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 17) {
    video.src = "videos/sunrise.mp4";
  } else if (hour >= 17 && hour < 20) {
    video.src = "videos/sunset.mp4";
  } else {
    video.src = "videos/night.mp4";
  }

  video.load();
  video.play();
}

setBackgroundVideo();
setInterval(setBackgroundVideo, 60 * 1000);

function updateGreeting() {
  const greeting = document.querySelector(".topbar h1");

  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    greeting.textContent = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting.textContent = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting.textContent = "Good Evening";
  } else {
    greeting.textContent = "Good Night";
  }
}

updateGreeting();

const app = document.querySelector(".app");
const toggleBtn = document.querySelector("#sidebar-toggle");
const navBtns = document.querySelectorAll(".nav-item");

toggleBtn.addEventListener("click", () => {
  app.classList.toggle("sidebar-collapsed");
});

const sidebarNav = document.querySelector(".sidebar-nav");
const pages = document.querySelectorAll(".page");

sidebarNav.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-item");

  if (!btn) return;

  // Active button
  navBtns.forEach((btn) => btn.classList.remove("active"));
  btn.classList.add("active");

  // Get clicked page name
  const selectedPage = btn.children[1].textContent.toLowerCase();

  // Hide all pages
  pages.forEach((page) => page.classList.add("hide"));

  // Show selected page
  document.querySelector(`.${selectedPage}-page`)?.classList.remove("hide");
});
const themeBtn = document.querySelector(".theme-btn");
let theme = localStorage.getItem("theme") || "Dark";
document.querySelector(".theme-txt").textContent =
  theme === "Dark" ? "Light" : "Dark";

if (theme === "Dark") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

themeBtn.addEventListener("click", () => {
  if (document.body.classList.toggle("dark-mode")) {
    document.querySelector(".theme-txt").textContent = "Light";
    localStorage.setItem("theme", "Dark");
  } else {
    document.querySelector(".theme-txt").textContent = "Dark";
    localStorage.setItem("theme", "Light");
  }
});

lucide.createIcons();
let sessionTime = 25;
let duration = sessionTime * 60;
let timeLeft = duration;
let timerId = null;
const timerProgressFill = document.querySelector(".timer-progress-fill");

const startTimer = document.querySelector("#start-timer");

const handleStartTimer = () => {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    timeLeft--;

    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
    }
  }, 1000);
};
startTimer.addEventListener("click", handleStartTimer);

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = (timeLeft / duration) * 100;

  timerProgressFill.style.width = `${progress}%`;

  document.querySelector(".timer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

updateTimerDisplay();
const resetTimer = document.querySelector("#reset-timer");

resetTimer.addEventListener("click", () => {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  duration = sessionTime * 60;
  timeLeft = duration;
  updateTimerDisplay();
});
const stopTimer = document.querySelector("#stop-timer");

stopTimer.addEventListener("click", () => {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
});

const sessionOptions = document.querySelectorAll(".session-option");

sessionOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }

    sessionOptions.forEach((btn) => {
      btn.classList.remove("active");
    });

    option.classList.add("active");

    sessionTime = parseInt(option.textContent);

    duration = sessionTime * 60;
    timeLeft = duration;

    updateTimerDisplay();
  });
});

let currentFilter = "all";
let remainingTasks;

const taskInput = document.querySelector("#task-input");
const addTask = document.querySelector("#add-task");
const todoList = document.querySelector("#todo-list");
const taskCount = document.querySelector("#task-count");

function renderTasks() {
  todoList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filteredTasks.length === 0) {
    todoList.innerHTML = `
                <div class="empty-tasks">

            <div class="empty-icon">✓</div>

            <h3>No tasks yet</h3>

            <p>
                Add a task above and start getting things done.
            </p>

        </div>
        `;
  }

  filteredTasks.forEach((task) => {
    const todoItem = document.createElement("div");

    todoItem.classList.add("todo-item");
    todoItem.dataset.id = task.id;

    if (task.completed) {
      todoItem.classList.add("completed");
    }

    todoItem.innerHTML = `
            <button class="todo-check">
                ${task.completed ? "✓" : ""}
            </button>

            <span class="todo-text">
                ${task.text}
            </span>

            <button class="edit-task">
                ✎
            </button>

            <button class="delete-task">
                ×
            </button>
        `;

    todoList.appendChild(todoItem);
  });

  taskCount.textContent = tasks.length;

  remainingTasks = tasks.filter((task) => !task.completed).length;
  document.querySelector("#remain-tasks").textContent = remainingTasks;
  document.querySelector(".progress-fill").style.width =
    `${(remainingTasks / tasks.length) * 100}%`;
}

addTask.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (!text) return;

  // EDIT MODE
  if (editingTaskId !== null) {
    const task = tasks.find((task) => task.id === editingTaskId);

    if (task) {
      task.text = text;
      task.completed = false;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    editingTaskId = null;

    addTask.textContent = "Add Task";

    taskInput.value = "";

    renderTasks();

    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";

  renderTasks();
});

renderTasks();

todoList.addEventListener("click", (e) => {
  const checkBtn = e.target.closest(".todo-check");

  if (!checkBtn) return;

  const todoItem = checkBtn.closest(".todo-item");

  const id = Number(todoItem.dataset.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) return;

  task.completed = !task.completed;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
});

let editingTaskId = null;

todoList.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-task");

  if (!editBtn) return;

  const todoItem = editBtn.closest(".todo-item");

  const id = Number(todoItem.dataset.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) return;

  editingTaskId = id;

  taskInput.value = task.text;

  addTask.textContent = "Update Task";

  taskInput.focus();
});

const filterBtns = document.querySelectorAll(".task-filter");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    btn.classList.add("active");

    currentFilter = btn.dataset.filter;

    renderTasks();
  });
});

const clearCompleted = document.querySelector("#clear-completed");

clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
});

todoList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-task");

  if (!deleteBtn) return;

  const todoItem = deleteBtn.closest(".todo-item");

  const id = Number(todoItem.dataset.id);

  tasks = tasks.filter((task) => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
});

const plannerDay = document.querySelector(".planner-day");
const plannerFullDate = document.querySelector(".planner-full-date");

const addPlanBtn = document.querySelector("#add-plan");

const planModal = document.querySelector("#plan-modal");
const closeModal = document.querySelector("#close-modal");
const cancelPlan = document.querySelector("#cancel-plan");
const savePlan = document.querySelector("#save-plan");

const planTime = document.querySelector("#plan-time");
const planTitle = document.querySelector("#plan-title");

const planList = document.querySelector(".plan-list");

function updatePlannerDate() {
  const today = new Date();

  plannerDay.textContent = today.toLocaleDateString("en-GB", {
    weekday: "long",
  });

  plannerFullDate.textContent = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

updatePlannerDate();

let plans = JSON.parse(localStorage.getItem("plans")) || [];

addPlanBtn.addEventListener("click", () => {
  planModal.classList.add("show");

  planTime.focus();
});

function closePlanModal() {

    planModal.classList.remove("show");

    planTime.value = "";
    planTitle.value = "";

    editingPlanId = null;

    document.querySelector(".modal-header h3").textContent = "Add Plan";

    document.querySelector(".modal-header .small-label").textContent = "NEW PLAN";

    savePlan.textContent = "Add Plan";
}

closeModal.addEventListener("click", closePlanModal);

cancelPlan.addEventListener("click", closePlanModal);

planModal.addEventListener("click", (e) => {
  if (e.target === planModal) {
    closePlanModal();
  }
});

savePlan.addEventListener("click", () => {
  const time = planTime.value;
  const title = planTitle.value.trim();

  if (!time || !title) return;

  if (editingPlanId !== null) {
    const plan = plans.find((plan) => plan.id === editingPlanId);

    if (!plan) return;

    plan.time = time;
    plan.title = title;
    

    localStorage.setItem("plans", JSON.stringify(plans));

    editingPlanId = null;

    renderPlans();

    closePlanModal();

    return;
  }

  const newPlan = {
    id: Date.now(),

    time: time,

    title: title,

    completed: false,
  };

  plans.push(newPlan);

  localStorage.setItem("plans", JSON.stringify(plans));

  renderPlans();

  closePlanModal();
});

function renderPlans() {
  planList.innerHTML = "";

  if (plans.length === 0) {
    planList.innerHTML = `
            <div class="empty-plan">
                No plans for today.
            </div>
        `;

    return;
  }

  plans.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  plans.forEach((plan) => {
    const planItem = document.createElement("div");

    planItem.classList.add("plan-item");

    if (plan.completed) {
      planItem.classList.add("completed");
    }

    planItem.dataset.id = plan.id;

    planItem.innerHTML = `
            <span class="plan-time">
                ${plan.time}
            </span>

            <span class="plan-title">
                ${plan.title}
            </span>

            <button class="plan-status">
                ${plan.completed ? "✓" : "○"}
            </button>

            <button class="edit-plan">
                ✎
            </button>

            <button class="delete-plan">
                ×
            </button>
        `;

    planList.appendChild(planItem);
  });
}

planList.addEventListener("click", (e) => {
  const planItem = e.target.closest(".plan-item");

  if (!planItem) return;

  const id = Number(planItem.dataset.id);

  if (e.target.closest(".plan-status")) {
    const plan = plans.find((plan) => plan.id === id);

    if (!plan) return;

    plan.completed = !plan.completed;

    localStorage.setItem("plans", JSON.stringify(plans));

    renderPlans();
  }

  if (e.target.closest(".delete-plan")) {
    plans = plans.filter((plan) => plan.id !== id);

    localStorage.setItem("plans", JSON.stringify(plans));

    renderPlans();
  }
});

let editingPlanId = null;

planList.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-plan");

  if (!editBtn) return;

  const planItem = editBtn.closest(".plan-item");

  const id = Number(planItem.dataset.id);

  const plan = plans.find((plan) => plan.id === id);

  if (!plan) return;

  editingPlanId = id;

  planTime.value = plan.time;
  planTitle.value = plan.title;

  document.querySelector(".modal-header h3").textContent = "Edit Plan";

  document.querySelector(".modal-header .small-label").textContent =
    "UPDATE PLAN";

  savePlan.textContent = "Save Changes";

  // Open modal
  planModal.classList.add("show");

  planTitle.focus();
});

renderPlans();






const addGoalBtn = document.querySelector("#add-goal");

const goalModal = document.querySelector("#goal-modal");
const closeGoalModalBtn = document.querySelector("#close-goal-modal");
const cancelGoalBtn = document.querySelector("#cancel-goal");
const saveGoalBtn = document.querySelector("#save-goal");

const goalNameInput = document.querySelector("#goal-name");
const goalTargetInput = document.querySelector("#goal-target");

const goalsList = document.querySelector("#goals-list");

const goalModalTitle = document.querySelector("#goal-modal-title");
const goalModalLabel = document.querySelector("#goal-modal-label");




let goals = JSON.parse(localStorage.getItem("goals")) || [];




let editingGoalId = null;




addGoalBtn.addEventListener("click", () => {

    editingGoalId = null;

    goalModalLabel.textContent = "NEW GOAL";
    goalModalTitle.textContent = "Add Goal";
    saveGoalBtn.textContent = "Add Goal";

    goalNameInput.value = "";
    goalTargetInput.value = "";

    goalModal.classList.add("show");

    goalNameInput.focus();

});




function closeGoalModal() {

    goalModal.classList.remove("show");

    goalNameInput.value = "";
    goalTargetInput.value = "";

    editingGoalId = null;

    goalModalLabel.textContent = "NEW GOAL";
    goalModalTitle.textContent = "Add Goal";
    saveGoalBtn.textContent = "Add Goal";
}


closeGoalModalBtn.addEventListener("click", closeGoalModal);

cancelGoalBtn.addEventListener("click", closeGoalModal);



goalModal.addEventListener("click", (e) => {

    if (e.target === goalModal) {
        closeGoalModal();
    }

});




saveGoalBtn.addEventListener("click", () => {

    const name = goalNameInput.value.trim();

    const target = Number(goalTargetInput.value);


    // Validation

    if (!name || !target || target < 1) {
        return;
    }


  

    if (editingGoalId !== null) {

        const goal = goals.find(
            goal => goal.id === editingGoalId
        );

        if (!goal) return;


        goal.title = name;

        goal.target = target;




        if (goal.progress > target) {
            goal.progress = target;
        }


        localStorage.setItem(
            "goals",
            JSON.stringify(goals)
        );


        renderGoals();

        closeGoalModal();

        return;
    }


   

    const newGoal = {

        id: Date.now(),

        title: name,

        target: target,

        progress: 0

    };


    goals.push(newGoal);


    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );


    renderGoals();

    closeGoalModal();

});




function renderGoals() {

    goalsList.innerHTML = "";


    if (goals.length === 0) {

        goalsList.innerHTML = `
            <div class="empty-goals">
                No goals yet. Add your first goal.
            </div>
        `;

        return;
    }


    goals.forEach((goal) => {

        const percentage = Math.round(
            (goal.progress / goal.target) * 100
        );


        const goalCard = document.createElement("div");

        goalCard.classList.add("goal-card");

        goalCard.dataset.id = goal.id;


        goalCard.innerHTML = `

            <div class="goal-top">

                <div>

                    <h3 class="goal-title">
                        ${goal.title}
                    </h3>

                    <p class="goal-target">
                        Target: ${goal.target}
                    </p>

                </div>


                <div class="goal-actions">

                    <button class="edit-goal">
                        ✎
                    </button>

                    <button class="delete-goal">
                        ×
                    </button>

                </div>

            </div>


            <div class="goal-progress-area">

                <div class="goal-progress-info">

                    <span>
                        ${goal.progress} / ${goal.target}
                    </span>

                    <span class="goal-percentage">
                        ${percentage}%
                    </span>

                </div>


                <div class="goal-progress-bar">

                    <div
                        class="goal-progress-fill"
                        style="width: ${percentage}%"
                    ></div>

                </div>

            </div>


            <div class="goal-bottom">

                <span class="goal-status">
                    ${
                        goal.progress >= goal.target
                            ? "Completed"
                            : "In Progress"
                    }
                </span>


                <div class="goal-counter">

                    <button class="decrease-goal">
                        −
                    </button>

                    <button class="increase-goal">
                        +
                    </button>

                </div>

            </div>

        `;


        goalsList.appendChild(goalCard);

    });

}




goalsList.addEventListener("click", (e) => {

    const goalCard = e.target.closest(".goal-card");

    if (!goalCard) return;


    const id = Number(goalCard.dataset.id);


  

    if (e.target.closest(".increase-goal")) {

        const goal = goals.find(
            goal => goal.id === id
        );

        if (!goal) return;


        if (goal.progress < goal.target) {
            goal.progress++;
        }


        localStorage.setItem(
            "goals",
            JSON.stringify(goals)
        );


        renderGoals();

        return;
    }


    

    if (e.target.closest(".decrease-goal")) {

        const goal = goals.find(
            goal => goal.id === id
        );

        if (!goal) return;


        if (goal.progress > 0) {
            goal.progress--;
        }


        localStorage.setItem(
            "goals",
            JSON.stringify(goals)
        );


        renderGoals();

        return;
    }



    if (e.target.closest(".delete-goal")) {

        goals = goals.filter(
            goal => goal.id !== id
        );


        localStorage.setItem(
            "goals",
            JSON.stringify(goals)
        );


        renderGoals();

        return;
    }



    if (e.target.closest(".edit-goal")) {

        const goal = goals.find(
            goal => goal.id === id
        );

        if (!goal) return;


        editingGoalId = id;


        goalModalLabel.textContent = "UPDATE GOAL";

        goalModalTitle.textContent = "Edit Goal";

        saveGoalBtn.textContent = "Save Changes";


        goalNameInput.value = goal.title;

        goalTargetInput.value = goal.target;


        goalModal.classList.add("show");

        goalNameInput.focus();

    }

});




renderGoals();