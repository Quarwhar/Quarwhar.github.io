const monthYear = document.getElementById("month-year");
const calendarDates = document.getElementById("calendar-dates");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date(); // Get today's date
  const isSameMonth = month === today.getMonth() && year === today.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Set month-year label
  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  // Clear previous dates
  calendarDates.innerHTML = "";

  // Fill in blank spaces before first day
  for (let i = 0; i < firstDay; i++) {
    calendarDates.innerHTML += "<div></div>";
  }

  // Render each day
  for (let day = 1; day <= daysInMonth; day++) {
    let className = "";
    if (isSameMonth && day === today.getDate()) {
      className = "today"; // Apply "today" class only if it's today
    }

    calendarDates.innerHTML += `<div class="${className}">${day}</div>`;
  }
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();