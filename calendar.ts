const calendarEl = document.getElementById("calendar") as HTMLElement;
const monthYearEl = document.getElementById("monthYear") as HTMLElement;
const prevBtn = document.getElementById("prevMonth") as HTMLButtonElement;
const nextBtn = document.getElementById("nextMonth") as HTMLButtonElement;

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function generateCalendar(year: number, month: number) {
  const date = new Date(year, month, 1);
  const today = new Date();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = date.getDay();

  monthYearEl.textContent = `${monthNames[month]} ${year}`;

  let table = "<table class='calendar'>";
  table += `
    <thead>
      <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>
    </thead>
    <tbody>
  `;

  let day = 1;
  for (let i = 0; i < 6; i++) {
    table += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        table += "<td></td>";
      } else if (day > daysInMonth) {
        table += "<td></td>";
      } else {
        const isToday =
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();

        table += `<td class="${isToday ? "today" : ""}" data-day="${day}">
                    ${day}
                  </td>`;
        day++;
      }
    }
    table += "</tr>";
  }

  table += "</tbody></table>";
  calendarEl.innerHTML = table;

  addClickEvents();
}

function addClickEvents() {
  const cells = calendarEl.querySelectorAll("td[data-day]");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!cell.classList.contains("special")) {
        // Mark as special + add input
        cell.classList.add("special");

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Add event...";
        input.classList.add("event-input");
        cell.appendChild(input);

        input.focus();
      } else {
        // Undo: remove special class + remove input
        cell.classList.remove("special");
        const input = cell.querySelector(".event-input");
        if (input) input.remove();
      }
    });
  });
}


prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
});

// Init
generateCalendar(currentYear, currentMonth);
