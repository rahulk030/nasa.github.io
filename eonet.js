document.getElementById('fetch-events').addEventListener('click', fetchEvents);

async function fetchEvents() {
  const loadingSpinner = document.getElementById('loading');
  const eventContainer = document.getElementById('event-data');

  // Show the loading spinner
  loadingSpinner.style.display = 'block';
  // Clear previous events
  eventContainer.innerHTML = '';

  try {
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events');
    if (response.ok) {
      const data = await response.json();
      displayEvents(data.events);
    } else {
      eventContainer.innerHTML = `<p>Failed to fetch data</p>`;
    }
  } catch (error) {
    eventContainer.innerHTML = `<p>Failed to fetch data</p>`;
  } finally {
    // Hide the loading spinner
    loadingSpinner.style.display = 'none';
  }
}

function displayEvents(events) {
  const eventContainer = document.getElementById('event-data');
  eventContainer.innerHTML = '';

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'event';
    eventElement.innerHTML = `
      <h2>${event.title}</h2>
      <p><strong>Date:</strong> ${event.geometry[0].date}</p>
      <p><strong>Category:</strong> ${event.categories.map(cat => cat.title).join(', ')}</p>
      <p><strong>Coordinates:</strong> ${event.geometry[0].coordinates.join(', ')}</p>
      <a href="${event.link}" target="_blank">More Info</a>
    `;
    eventContainer.appendChild(eventElement);
  });
}

function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const greetingMessage = document.getElementById('greeting-message');
  const greetingTime = document.getElementById('greeting-time');

  if (hours >= 5 && hours < 12) {
    greetingMessage.textContent = 'Good Morning!';
  } else if (hours >= 12 && hours < 18) {
    greetingMessage.textContent = 'Good Afternoon!';
  } else {
    greetingMessage.textContent = 'Good Evening!';
  }

  greetingTime.textContent = `Current Time: ${timeString}`;
}

// Update greeting and time every minute
updateGreeting();
setInterval(updateGreeting, 60000);

// Documentation followed: https://eonet.sci.gsfc.nasa.gov/docs/v3
