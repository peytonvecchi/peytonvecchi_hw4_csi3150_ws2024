document.addEventListener('DOMContentLoaded', function () {
    // Initialize the filter options
    populateOptions('make', getUniqueValues(usedCars, 'make'));
    populateOptions('color', getUniqueValues(usedCars, 'color'));
  
    // Display all cars initially
    displayCars(usedCars);
});
  
function populateOptions(selectId, options) {
  const selectElement = document.getElementById(selectId);
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });
}

function getUniqueValues(array, key) {
  return Array.from(new Set(array.map(item => item[key])));
}

function filterCars() {
  const minYear = document.getElementById('minYear').value;
  const maxYear = document.getElementById('maxYear').value;
  const make = Array.from(document.getElementById('make').selectedOptions, option => option.value);
  const maxMileage = document.getElementById('maxMileage').value;
  const minPrice = document.getElementById('minPrice').value;
  const maxPrice = document.getElementById('maxPrice').value;
  const color = Array.from(document.getElementById('color').selectedOptions, option => option.value);

  let filteredCars = usedCars.filter(car =>
    (minYear === '' || car.year >= minYear) &&
    (maxYear === '' || car.year <= maxYear) &&
    (make.length === 0 || make.includes(car.make)) &&
    (maxMileage === '' || car.mileage <= maxMileage) &&
    (minPrice === '' || car.price >= minPrice) &&
    (maxPrice === '' || car.price <= maxPrice) &&
    (color.length === 0 || color.includes(car.color))
  );

  displayCars(filteredCars);
}

function clearFilters() {

  document.getElementById('minYear').value = '';
  document.getElementById('maxYear').value = '';
  document.getElementById('make').selectedIndex = -1; // resets the selected options
  document.getElementById('maxMileage').value = '';
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('color').selectedIndex = -1;


}

function displayCars(cars) {
  const carListContainer = document.getElementById('carList');
  carListContainer.innerHTML = '';

  if (cars.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No cars match the filter criteria. Please try again...';
    carListContainer.appendChild(noResultsMessage);
  } else {
    cars.forEach(car => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="./assets/${car.make}-${car.model}.avif" alt="${car.make} ${car.model}">
        <p>${car.make} ${car.model}</p>
        <p>Year: ${car.year}</p>
        <p>Mileage: ${car.mileage} miles</p>
        <p>Price: $${car.price}</p>
      `;
      carListContainer.appendChild(card);
    });
  }
}
  