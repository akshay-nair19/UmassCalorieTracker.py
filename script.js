// Variables to store food data and selected foods
let foods = {};
let selectedFoods = [];

// Elements for user interaction and results display
const csvFileInput = document.getElementById('csvFileInput');
const foodDropdown = document.getElementById('foodDropdown');
const addFoodButton = document.getElementById('addFoodButton');
const resultsEl = document.getElementById('results');

// Load CSV and populate foods data
csvFileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        parseCSVData(text);
        populateFoodDropdown();
    };
    reader.readAsText(file);
});

// Parse CSV data
function parseCSVData(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');

    lines.slice(1).forEach(line => {
        const values = line.split(',');
        if (values.length === headers.length) {
            const foodName = values[0];
            foods[foodName] = {
                Calories: parseFloat(values[1]),
                TotalFat: parseFloat(values[2]),
                SaturatedFat: parseFloat(values[3]),
                TransFat: parseFloat(values[4]),
                Cholesterol: parseFloat(values[5]),
                Sodium: parseFloat(values[6]),
                TotalCarbohydrate: parseFloat(values[7]),
                DietaryFiber: parseFloat(values[8]),
                Sugars: parseFloat(values[9]),
                Protein: parseFloat(values[10])
            };
        }
    });
}

// Populate dropdown with food items from CSV
function populateFoodDropdown() {
    foodDropdown.innerHTML = ''; // Clear previous items
    for (let food in foods) {
        const option = document.createElement('option');
        option.value = food;
        option.textContent = food;
        foodDropdown.appendChild(option);
    }
    foodDropdown.disabled = false;
    addFoodButton.disabled = false;
}

// Add selected food to the list and calculate nutrients
function addFoodToSelection() {
    const selectedFood = foodDropdown.value;
    selectedFoods.push(selectedFood);
    calculateNutrients();
}

// Calculate and display nutrient summary
function calculateNutrients() {
    let totals = {
        Calories: 0, TotalFat: 0, SaturatedFat: 0, TransFat: 0,
        Cholesterol: 0, Sodium: 0, TotalCarbohydrate: 0,
        DietaryFiber: 0, Sugars: 0, Protein: 0
    };

    selectedFoods.forEach(food => {
        const foodData = foods[food];
        for (let nutrient in totals) {
            totals[nutrient] += foodData[nutrient] || 0;
        }
    });

    resultsEl.innerHTML = `
        <h3>Nutrient Summary</h3>
        <p>Calories: ${totals.Calories}</p>
        <p>Total Fat: ${totals.TotalFat}g</p>
        <p>Saturated Fat: ${totals.SaturatedFat}g</p>
        <p>Trans Fat: ${totals.TransFat}g</p>
        <p>Cholesterol: ${totals.Cholesterol}mg</p>
        <p>Sodium: ${totals.Sodium}mg</p>
        <p>Total Carbohydrate: ${totals.TotalCarbohydrate}g</p>
        <p>Dietary Fiber: ${totals.DietaryFiber}g</p>
        <p>Sugars: ${totals.Sugars}g</p>
        <p>Protein: ${totals.Protein}g</p>
    `;
}
