const calenderTable = document.querySelector(".calenderDates");
const dateContainer = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const currentMonthContainer = document.querySelector(".current-month");
const todayContainer = document.querySelector(".todays-date");
const prevMonthBtn = document.querySelector(".prev-month");
const nextMonthBtn = document.querySelector(".next-month");
const taskManagerMonth = document.querySelector(".task-manager-month");
const taskManagerTable = document.querySelector(".task-manager>table");
const taskManagerTableBody = document.querySelector(".task-mamager-table-body");
const taskManagerTableDate = document.querySelector(".task-manager-table-date");

//setting up the width of task manager table parent (right section)
let rightContainerWidth =
  document.querySelector("main").clientWidth -
  document.querySelector(".left").clientWidth;
document.querySelector(".right").style.width = `${rightContainerWidth}px`;

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fir", "Sat"];

const today = new Date();
todayContainer.innerHTML = `Today ${
  dayName[today.getDay()]
} ${today.getDate()} ${today.getFullYear()}`;

function createCalender(firstDayOfMonth) {
  currentMonthContainer.innerHTML = `${
    monthName[firstDayOfMonth.getMonth()]
  } ${firstDayOfMonth.getFullYear()}`;

  let tr = document.createElement("tr");

  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    tr.innerHTML += `<td></td>`;
  }

  const lastDateOfMonth = new Date(
    firstDayOfMonth.getFullYear(),
    firstDayOfMonth.getMonth() + 1,
    0
  );
  for (let i = 1; i <= lastDateOfMonth.getDate(); i++) {
    if (i == 1) {
      calenderTable.innerHTML = "";
    }
    if (tr.childElementCount == 7) {
      calenderTable.appendChild(tr);
    }

    if (tr.childElementCount < 7) {
      if (
        today.getDate() == i &&
        today.getMonth() == firstDayOfMonth.getMonth() &&
        today.getFullYear() == firstDayOfMonth.getFullYear()
      ) {
        tr.innerHTML += `<td class="today" data-date=${i} data-month="${firstDayOfMonth.getMonth()}" data-year=${firstDayOfMonth.getFullYear()}>${i}</td>`;
      } else {
        tr.innerHTML += `<td data-date=${i} data-month="${firstDayOfMonth.getMonth()}" data-year=${firstDayOfMonth.getFullYear()}>${i}</td>`;
      }
    } else {
      tr = document.createElement("tr");
      if (
        today.getDate() == i &&
        today.getMonth() == firstDayOfMonth.getMonth() &&
        today.getFullYear() == firstDayOfMonth.getFullYear()
      ) {
        tr.innerHTML += `<td class="today" data-date=${i} data-month="${firstDayOfMonth.getMonth()}" data-year=${firstDayOfMonth.getFullYear()}>${i}</td>`;
      } else {
        tr.innerHTML += `<td data-date=${i} data-month="${firstDayOfMonth.getMonth()}" data-year=${firstDayOfMonth.getFullYear()}>${i}</td>`;
      }
    }
    if (i == lastDateOfMonth.getDate()) {
      calenderTable.appendChild(tr);
    }
  }
  addEventListnerToDates();
  return firstDayOfMonth;
}

let currentCalenderView = createCalender(
  new Date(today.getFullYear(), today.getMonth(), 1)
);

prevMonthBtn.addEventListener("click", () => {
  currentCalenderView = createCalender(
    new Date(
      currentCalenderView.getFullYear(),
      currentCalenderView.getMonth() - 1,
      1
    )
  );
});
nextMonthBtn.addEventListener("click", () => {
  currentCalenderView = createCalender(
    new Date(
      currentCalenderView.getFullYear(),
      currentCalenderView.getMonth() + 1,
      1
    )
  );
});
todayContainer.addEventListener("click", () => {
  currentCalenderView = createCalender(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
});

//adding click event listner to calender to view task manager of that month
function addEventListnerToDates() {
  const calanderAllDate = [
    ...document.querySelectorAll(".calenderDates [data-date]"),
  ];
  calanderAllDate.forEach((item) => {
    item.addEventListener("click", (e) => {
      const month = Number(e.target.dataset.month);
      const year = Number(e.target.dataset.year);
      const date = Number(e.target.dataset.date);
      console.log(`Month:${month} Year:${year}`);
      createTaskManagerTable(year, month, date);
    });
  });
}
createTaskManagerTable(today.getFullYear(), today.getMonth(), today.getDate()); // initial call to create table

//taskmanager table code

function createTaskManagerTable(year, month, date) {
  const lastDateOfThisMonth = new Date(year, month + 1, 0).getDate();
  taskManagerMonth.textContent = `${monthName[month]} ${year}`;
  taskManagerTableDate.innerHTML = ``;
  for (let i = 0; i <= lastDateOfThisMonth; i++) {
    if (i === 0) {
      taskManagerTableDate.innerHTML += `<th></th>`;
      continue;
    }
    if (i < 10) {
      if (i == today.getDate() && month == today.getMonth()) {
        taskManagerTableDate.innerHTML += `<th><span class="today" id="today">0${i}</span></th>`;
      } else taskManagerTableDate.innerHTML += `<th><span>0${i}</span></th>`;
    } else {
      if (i == today.getDate() && month == today.getMonth()) {
        taskManagerTableDate.innerHTML += `<th><span class="today" id="today">${i}</span></th>`;
      } else taskManagerTableDate.innerHTML += `<th><span>${i}</span></th>`;
    }
  }
  const getAllTableRow = [
    ...document.querySelectorAll(".task-mamager-table-body>tr"),
  ];
  getAllTableRow.forEach((item) => {
    if (!item.classList.contains("task-manager-table-date")) {
      item.remove();
    }
  });
  //   taskManagerTableBody.innerHTML = ``;
  for (let i = 0; i < 24; i++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    if (i < 12) {
      th.innerHTML = `${i} AM`;
    } else if (i == 12) {
      th.innerHTML = `${i} PM`;
    } else {
      th.innerHTML = `${i - 12} PM`;
    }
    th.setAttribute("class", "task-manager-time");
    tr.appendChild(th);
    for (let j = 1; j <= lastDateOfThisMonth; j++) {
      const td = document.createElement("td");
      td.setAttribute("data-fetch-task", `${year}/${month}/${j}/${i}`);
      tr.appendChild(td);
    }
    //   td.setAttribute("data-task", `${i}`); //link-format:  year/month/date/time    eg: 2022/03/19/15       time in 24-hr format

    taskManagerTableBody.appendChild(tr);
  }
}
