const API_URL = "https://iit-playground.arondev.hu/api/GT43W5/car";
const carListElement = document.getElementById("car-list");
const carDetailsElement = document.getElementById("car-details");

async function fetchCars() {
  try {
    const response = await fetch(API_URL);
    const cars = await response.json();
    displayCarList(cars);
  } catch (error) {
    carListElement.innerHTML = "<li>Hiba történt az adatok betöltésekor.</li>";
  }
}

function displayCarList(cars) {
  carListElement.innerHTML = "";
  cars.forEach(car => {
    const li = document.createElement("li");
    li.textContent = `${car.brand} ${car.model}`;
    li.addEventListener("click", () => {
      document.querySelectorAll("#car-list li").forEach(item => item.classList.remove("selected"));
      li.classList.add("selected");
      fetchCarDetails(car.id);
    });
    carListElement.appendChild(li);
  });
}

async function fetchCarDetails(carId) {
  try {
    const response = await fetch(`${API_URL}/${carId}`);
    const car = await response.json();
    displayCarDetails(car);
  } catch (error) {
    carDetailsElement.innerHTML = "<p>Nem sikerült lekérni az autó adatait.</p>";
  }
}

function displayCarDetails(car) {
  carDetailsElement.innerHTML = `
    <p><span class="detail-label">Márka:</span><span class="detail-value">${car.brand}</span></p>
    <p><span class="detail-label">Modell:</span><span class="detail-value">${car.model}</span></p>
    <p><span class="detail-label">Tulajdonos:</span><span class="detail-value">${car.owner}</span></p>
    <p><span class="detail-label">Forgalomba helyezés napja:</span><span class="detail-value">${car.dayOfCommission}</span></p>
    <p><span class="detail-label">Fogyasztás:</span><span class="detail-value">${car.electric ? "Elektromos" : `${car.fuelUse} l/100km`}</span></p>
    <p><span class="detail-label">Elektromos:</span><span class="detail-value">${car.electric ? "Igen" : "Nem"}</span></p>
  `;
}

fetchCars();
