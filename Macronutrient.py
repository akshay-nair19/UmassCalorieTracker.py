class NutrientTracker:
    def __init__(self):
        # Initialize dictionaries to store macro and micronutrients
        self.macronutrients = {
            "Protein": 0,
            "Carbohydrates": 0,
            "Fats": 0,
            "Cholesterol": 0  # Add cholesterol to macronutrients
        }
        self.micronutrients = {
            "Vitamin C": 0,
            "Vitamin D": 0,
            "Calcium": 0,
            "Iron": 0,
            "Sodium": 0  # Add sodium to micronutrients
        }
        self.total_calories = 0  # Initialize total calories

    def add_macronutrient(self, nutrient, amount):
        # Add macronutrient amount and calculate calories if applicable
        if nutrient in self.macronutrients:
            self.macronutrients[nutrient] += amount
            print(f"Added {amount}g of {nutrient}.")
            
            # Calculate calories based on macronutrient type
            if nutrient == "Protein" or nutrient == "Carbohydrates":
                self.total_calories += amount * 4  # 4 calories per gram
            elif nutrient == "Fats":
                self.total_calories += amount * 9  # 9 calories per gram
        else:
            print(f"{nutrient} is not a valid macronutrient.")

    def add_micronutrient(self, nutrient, amount):
        if nutrient in self.micronutrients:
            self.micronutrients[nutrient] += amount
            print(f"Added {amount}mg of {nutrient}.")
        else:
            print(f"{nutrient} is not a valid micronutrient.")

    def show_summary(self):
        # Print summary of macronutrients, micronutrients, and calories
        print("\nNutrient Summary:")
        
        print("\nMacronutrients:")
        for nutrient, amount in self.macronutrients.items():
            print(f"  {nutrient}: {amount}g")
        
        print("\nMicronutrients:")
        for nutrient, amount in self.micronutrients.items():
            print(f"  {nutrient}: {amount}mg")
        
        print(f"\nTotal Calories: {self.total_calories} kcal")  # Display total calories

# Example usage
tracker = NutrientTracker()

# Adding macronutrients
tracker.add_macronutrient("Protein", 25)
tracker.add_macronutrient("Carbohydrates", 50)
tracker.add_macronutrient("Fats", 10)
tracker.add_macronutrient("Cholesterol", 30)  # Cholesterol does not add calories

# Adding micronutrients
tracker.add_micronutrient("Vitamin C", 75)
tracker.add_micronutrient("Calcium", 200)
tracker.add_micronutrient("Sodium", 1500)

# Display summary
tracker.show_summary()
