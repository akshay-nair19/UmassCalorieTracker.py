let foodData = [];
let selectedFoods = [];

document.getElementById('csvFileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        foodData = parseCSV(text);
        populateFoodDropdown();
    };

    reader.readAsText(file);
});

function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
    }
    return result;
}

function populateFoodDropdown() {
    const dropdown = document.getElementById('foodDropdown');
    dropdown.innerHTML = '';
    foodData.forEach((food, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = food['Dish Name'];
        dropdown.appendChild(option);
    });
    document.getElementById('addFoodButton').disabled = false;
}

function addFoodToSelection() {
    const dropdown = document.getElementById('foodDropdown');
    const servingsInput = document.getElementById('servingsInput');
    const selectedIndex = dropdown.value;
    const servings = servingsInput.value;
    const selectedFood = foodData[selectedIndex];
    selectedFood.servings = servings;
    selectedFoods.push(selectedFood);
    displaySelectedFoods();
    calculateTotalMacros();
}

function displaySelectedFoods() {
    const container = document.getElementById('selectedFoods');
    container.innerHTML = '<h3>Selected Foods</h3>';
    selectedFoods.forEach((food, index) => {
        container.innerHTML += `<p>${food['Dish Name']} (x${food.servings}) - Calories: ${food['Calories']}, Protein: ${food['Protein']}, Carbs: ${food['Total Carbohydrate']}, Fat: ${food['Total Fat']}</p>`;
    });
}

function calculateTotalMacros() {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    selectedFoods.forEach(food => {
        const servings = parseInt(food.servings);
        totalCalories += parseFloat(food['Calories']) * servings;
        totalProtein += parseFloat(food['Protein']) * servings;
        totalCarbs += parseFloat(food['Total Carbohydrate']) * servings;
        totalFat += parseFloat(food['Total Fat']) * servings;
    });

    const results = document.getElementById('results');
    results.innerHTML = `
        <h3>Total Macros</h3>
        <p>Calories: ${totalCalories.toFixed(2)}</p>
        <p>Protein: ${totalProtein.toFixed(2)}g</p>
        <p>Carbs: ${totalCarbs.toFixed(2)}g</p>
        <p>Fat: ${totalFat.toFixed(2)}g</p>
    `;
}
