import pandas as pd
from bs4 import BeautifulSoup

# Sample HTML content (replace this with the actual HTML you want to parse)
html_content = """class="menu_category_name">Breakfast Entrees</h2><li class="lightbox-nutrition"><a data-healthfulness="40" data-carbon-list="B" data-ingredient-list="Jasmine Rice (ASN PRIDE: White Jasmine Rice), Jasmine Rice (ASN PRIDE: White Jasmine Rice), Halal Antibiotic Free Boneless Skinless Chicken Breast   (Boneless, Skinless Chicken Breast; HARVESTLAND: Halal Boneless Skinless Chicken Breasts with Rib Meat), Ginger Root, Chicken Base     (MINORS: Chicken Meat, Salt, Chicken Broth, Chicken Fat, Sugar, Canola Oil, Corn Starch, 2% or less of Natural Flavors, Potato Starch, Turmeric), Granulated Sugar, Kosher Salt" data-allergens="Corn  " data-recipe-webcode="AF H4 CR2" data-clean-diet-str="Antibiotic Free" data-serving-size="3 oz" data-calories="280" data-calories-from-fat="2" data-total-fat="0.2g" data-total-fat-dv="0" data-sat-fat="0g" data-sat-fat-dv="" data-trans-fat="0g" data-cholesterol="4.4mg" data-cholesterol_dv="" data-sodium="98.5mg" data-sodium-dv="4" data-total-carb="61.4g" data-total-carb-dv="47" data-dietary-fiber="1.7g" data-dietary-fiber-dv="5" data-sugars="0.2g" data-sugars-dv="" data-protein="6.5g" data-protein-dv="12" data-dish-name="Chicken Congee" href="#inline">Chicken Congee</a><img src="https://umassdining.com/sites/default/files/legends/icon-antibfr.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-cr-b.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"></li><li class="lightbox-nutrition"><a data-healthfulness="20" data-carbon-list="A" data-ingredient-list="Chinese Twist Cruller   (Wheat Flour, Water, Soybean Oil, Salt, Ammonium Carbonate, Ammonium Aluminum Sulfate, Sodium Carbonate)" data-allergens="Gluten, Soy, Wheat" data-recipe-webcode="H VGN H2 CR1" data-clean-diet-str="Halal, Plant Based" data-serving-size="2 piece" data-calories="26" data-calories-from-fat="11" data-total-fat="1.2g" data-total-fat-dv="1" data-sat-fat="0.2g" data-sat-fat-dv="" data-trans-fat="0g" data-cholesterol="0mg" data-cholesterol_dv="" data-sodium="20.8mg" data-sodium-dv="1" data-total-carb="3.4g" data-total-carb-dv="3" data-dietary-fiber="0.1g" data-dietary-fiber-dv="0" data-sugars="0g" data-sugars-dv="" data-protein="0.5g" data-protein-dv="1" data-dish-name="Chinese Twist Cruller" href="#inline">Chinese Twist Cruller</a><img src="https://umassdining.com/sites/default/files/legends/icon-hal.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-vegan.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-cr-a.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"></li><li class="lightbox-nutrition"><a data-healthfulness="10" data-carbon-list="B" data-ingredient-list="Apple Turnover  (Apple Filling (Water, Sugar, Glucose, Evaporated Apples, Modified Corn Starch, Spice, Citric Acid, Sodium Benzoate and Potassium Sorbate [preservatives]), Enriched Flour (Wheat Flour, Niacin, Iron, Thiamin Mononitrate, Riboflavin, Folic Acid), Water, Palm Oil, Soybean Oil, Salt, Monocalcium Phosphate)" data-allergens="Gluten, Soy, Corn  , Wheat" data-recipe-webcode="H VGT H1 CR2" data-clean-diet-str="Halal, Vegetarian" data-serving-size="1 EACH" data-calories="350" data-calories-from-fat="198" data-total-fat="22g" data-total-fat-dv="28" data-sat-fat="11g" data-sat-fat-dv="" data-trans-fat="0g" data-cholesterol="0mg" data-cholesterol_dv="" data-sodium="220mg" data-sodium-dv="10" data-total-carb="33g" data-total-carb-dv="25" data-dietary-fiber="1g" data-dietary-fiber-dv="3" data-sugars="8g" data-sugars-dv="" data-protein="4g" data-protein-dv="7" data-dish-name="GENERAL MILLS Apple Turnover" href="#inline">GENERAL MILLS Apple Turnover</a><img src="https://umassdining.com/sites/default/files/legends/icon-hal.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-veg.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-cr-b.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"></li><li class="lightbox-nutrition"><a data-healthfulness="40" data-carbon-list="B" data-ingredient-list="Cage Free Eggs" data-allergens="Eggs" data-recipe-webcode="H LPR SUS VGT H4 CR2" data-clean-diet-str="Halal, Local, Sustainable, Vegetarian" data-serving-size="2 EACH" data-calories="111" data-calories-from-fat="69" data-total-fat="7.7g" data-total-fat-dv="10" data-sat-fat="2.1g" data-sat-fat-dv="" data-trans-fat="0g" data-cholesterol="297.7mg" data-cholesterol_dv="" data-sodium="131mg" data-sodium-dv="6" data-total-carb="0g" data-total-carb-dv="0" data-dietary-fiber="0g" data-dietary-fiber-dv="0" data-sugars="0g" data-sugars-dv="" data-protein="10.7g" data-protein-dv="19" data-dish-name="Hard Boiled Egg" href="#inline">Hard Boiled Egg</a><img src="https://umassdining.com/sites/default/files/legends/icon-hal.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-loc.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-sus.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-veg.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-cr-b.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"></li><li class="lightbox-nutrition"><a data-healthfulness="60" data-carbon-list="A" data-ingredient-list="Quick Oats Cereal (100% Whole Grain Rolled Oats)" data-allergens="Gluten, Wheat" data-recipe-webcode="H VGN WG H6 CR1" data-clean-diet-str="Halal, Plant Based, Whole Grain" data-serving-size="4 OZL" data-calories="91" data-calories-from-fat="14" data-total-fat="1.6g" data-total-fat-dv="2" data-sat-fat="0.3g" data-sat-fat-dv="" data-trans-fat="0g" data-cholesterol="0mg" data-cholesterol_dv="" data-sodium="1.4mg" data-sodium-dv="0" data-total-carb="16.2g" data-total-carb-dv="12" data-dietary-fiber="2.4g" data-dietary-fiber-dv="7" data-sugars="0.2g" data-sugars-dv="" data-protein="3.2g" data-protein-dv="6" data-dish-name="Hot Oatmeal" href="#inline">Hot Oatmeal</a><img src="https://umassdining.com/sites/default/files/legends/icon-hal.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-vegan.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-whlgrn.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"><img src="https://umassdining.com/sites/default/files/legends/icon-cr-a.png" alt="" style="width: 16px; height: 16px; margin-left: 5px;"></li><li class="lightbox-nutrition"><a data-healthfulness="0" data-carbon-list="C" data-ingredient-list="Cage Free Eggs, Shredded Cheddar Cheese (Pasteurized Milk, Cheese Culture, Salt, Microbial Enzymes and Annatto Potato Starch and Powdered Cellulose ), Sliced American Cheese (Milk, Cream, Water, Sodium Citrate, Salt, Cheese Culture, Sorbic Acid, Enzymes, Citric Acid, Soy Lecithin), Smoked Ham     (FARMLAND BRAND: Pork, Cured with Water, Dextrose [Corn], Salt, Potassium Lactate, Sodium Phosphates, Sodium Diacetate, Sodium Erythrobate, Sodium Nitrite, Caramel Color;  HORMEL: Cured with Water, Salt, Dextrose [Corn], Sodium Phosphates, Sodium Erythrobate, Sodium Nitrate), Local Yellow Onions, Hormel Bacon Topping (Pork, Water, Salt, Sugar, Cultured Celery Powder, Sea Salt, Natural Flavoring), Local Fresh Mushrooms   , Fresh Green Peppers, Fresh Tomatoes, Pan Spray (Canola Oil, Caprylic/Capric Triglycerides, Phosphated Mono and Diglycerides [Corn], Silicon Dioxide, Calcium Stearate, Propellant)" data-allergens="Milk, Eggs, Soy, Corn  " data-recipe-webcode="LPR SUS H0 CR3" data-clean-diet-str="Local, Sustainable" data-serving-size="5 oz" data-calories="298" data-calories-from-fat="200" data-total-fat="22.2g" data-total-fat-dv="28" data-sat-fat="10.8g" data-sat-fat-dv="" data-trans-fat="0.3g" data-cholesterol="290.9mg" data-cholesterol_dv="" data-sodium="671.2mg" data-sodium-dv="29" data-total-carb="2.9g" data-total-carb-dv="2" data-dietary-fiber="0.2g" data-dietary-fiber-dv="1" data-sugars="0.9g" data-sugars-dv="" data-protein="21g" data-protein-dv="38" data-dish-name="Omelet Bar" href="#inline"""

# Parse the HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Prepare an empty list to store each food item's data
data_list = []

# Extract each food item
for item in soup.find_all('li', class_='lightbox-nutrition'):
    a_tag = item.find('a')
    if a_tag:  # Check if a_tag is not None
        # Safely get each attribute using a default value if the attribute is missing
        dish_name = a_tag.get('data-dish-name', 'N/A')
        calories = a_tag.get('data-calories', 'N/A')
        total_fat = a_tag.get('data-total-fat', 'N/A')
        sat_fat = a_tag.get('data-sat-fat', 'N/A')
        trans_fat = a_tag.get('data-trans-fat', 'N/A')
        cholesterol = a_tag.get('data-cholesterol', 'N/A')
        sodium = a_tag.get('data-sodium', 'N/A')
        total_carb = a_tag.get('data-total-carb', 'N/A')
        dietary_fiber = a_tag.get('data-dietary-fiber', 'N/A')
        sugars = a_tag.get('data-sugars', 'N/A')
        protein = a_tag.get('data-protein', 'N/A')
        
        # Append the data to the list as a dictionary
        data_list.append({
            'Dish Name': dish_name,
            'Calories': calories,
            'Total Fat': total_fat,
            'Saturated Fat': sat_fat,
            'Trans Fat': trans_fat,
            'Cholesterol': cholesterol,
            'Sodium': sodium,
            'Total Carbohydrate': total_carb,
            'Dietary Fiber': dietary_fiber,
            'Sugars': sugars,
            'Protein': protein
        })

# Convert the list into a pandas DataFrame
df = pd.DataFrame(data_list)

# Remove duplicate entries based on all columns
df_unique = df.drop_duplicates()
print(df_unique)
# Save the filtered DataFrame to a new CSV file
df_unique.to_csv('unique_nutrition_facts.csv', index=False)

print("Filtered data has been saved to 'unique_nutrition_facts.csv'")

