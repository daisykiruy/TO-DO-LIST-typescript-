var calendarEl = document.getElementById("calendar");
var monthYearEl = document.getElementById("monthYear");
var prevBtn = document.getElementById("prevMonth");
var nextBtn = document.getElementById("nextMonth");
var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();
var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
function generateCalendar(year, month) {
    var date = new Date(year, month, 1);
    var today = new Date();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var startDay = date.getDay();
    monthYearEl.textContent = "".concat(monthNames[month], " ").concat(year);
    var table = "<table class='calendar'>";
    table += "\n    <thead>\n      <tr>\n        <th>Sun</th>\n        <th>Mon</th>\n        <th>Tue</th>\n        <th>Wed</th>\n        <th>Thu</th>\n        <th>Fri</th>\n        <th>Sat</th>\n      </tr>\n    </thead>\n    <tbody>\n  ";
    var day = 1;
    for (var i = 0; i < 6; i++) {
        table += "<tr>";
        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < startDay) {
                table += "<td></td>";
            }
            else if (day > daysInMonth) {
                table += "<td></td>";
            }
            else {
                var isToday = day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();
                table += "<td class=\"".concat(isToday ? "today" : "", "\" data-day=\"").concat(day, "\">\n                    ").concat(day, "\n                  </td>");
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
    var cells = calendarEl.querySelectorAll("td[data-day]");
    cells.forEach(function (cell) {
        cell.addEventListener("click", function () {
            if (!cell.classList.contains("special")) {
                // Mark as special + add input
                cell.classList.add("special");
                var input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Add event...";
                input.classList.add("event-input");
                cell.appendChild(input);
                input.focus();
            }
            else {
                // Undo: remove special class + remove input
                cell.classList.remove("special");
                var input = cell.querySelector(".event-input");
                if (input)
                    input.remove();
            }
        });
    });
}
prevBtn.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
});
nextBtn.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
});
// Init
generateCalendar(currentYear, currentMonth);
