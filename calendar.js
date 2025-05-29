const monthYear = document.getElementById("month-year");
const calendarDates = document.getElementById("calendar-dates");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentDate = new Date();
const activities = {}; // Store events by date

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();
  const isSameMonth = month === today.getMonth() && year === today.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
  calendarDates.innerHTML = "";

  // Add blank days before the first of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDates.innerHTML += "<div></div>";
  }

  // Render each calendar day
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = isSameMonth && day === today.getDate();
    const className = isToday ? "today" : "";

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const activityMarkup = activities[dateStr]
  ? `<div class="activity-list">
      ${activities[dateStr].map((a, i) => `
        <div class="activity-item">
          <span>${a}</span>
          <button class="delete-btn" onclick="deleteEvent('${dateStr}', ${i})">×</button>
        </div>
      `).join('')}
     </div>`
  : "";

    calendarDates.innerHTML += `
      <div class="${className}" data-date="${dateStr}" onclick="openEventModal('${dateStr}')">
        <span class="day-number">${day}</span>
        ${activityMarkup}
      </div>
    `;
  }
}

function deleteEvent(date, index) {
  if (activities[date]) {
    activities[date].splice(index, 1); // Remove the event at the given index
    if (activities[date].length === 0) {
      delete activities[date]; // Remove the date if no events left
    }
    renderCalendar(); // Re-render to reflect changes
  }
}

function openEventModal(date) {
  document.getElementById("modalOverlay").style.display = "block";
  document.getElementById("eventDate").value = date;
}

function closeModal(event) {
  // If called by clicking outside (overlay), or from cancel button
  if (!event || event.target.id === "modalOverlay") {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("eventTitle").value = "";
  }
}

function saveEvent() {
  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value;

  if (!title) {
    alert("Please enter an event title.");
    return;
  }

  if (!activities[date]) activities[date] = [];
  activities[date].push(title);

  closeModal();
  renderCalendar();
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