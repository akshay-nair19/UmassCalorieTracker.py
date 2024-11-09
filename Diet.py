# List of available diet types
diet_lst = ["Halal", "Local", "Sustainable", "Vegetarian", 
            "Antibiotic_Free", "Plant_Based", "Whole_Grain"]

# Sample dictionary for food recommendations based on diet type
# This will be replaced later with actual dining hall data import
food_recommendations = {
    "Halal": ["Grilled Chicken", "Rice Pilaf", "Salad"],
    "Local": ["Seasonal Vegetables", "Locally-sourced Beef"],
    "Sustainable": ["Sustainable Salmon", "Organic Spinach"],
    "Vegetarian": ["Pasta Primavera", "Vegetable Stir Fry"],
    "Antibiotic_Free": ["Organic Chicken", "Quinoa Bowl"],
    "Plant_Based": ["Tofu Stir Fry", "Vegan Burrito"],
    "Whole_Grain": ["Whole Wheat Bread", "Brown Rice", "Oatmeal"]
}

def get_user_diets():
    # Prompt user for diet preferences
    print("Available diets:", ", ".join(diet_lst))
    user_diets = input("Enter the diets you follow, separated by commas: ").split(",")
    
    # Clean up and validate user input
    user_diets = [diet.strip() for diet in user_diets]
    
    # Check for any invalid diets
    invalid_diets = [diet for diet in user_diets if diet not in diet_lst]
    if invalid_diets:
        print("The following diets are not recognized:", ", ".join(invalid_diets))
        user_diets = [diet for diet in user_diets if diet in diet_lst]
    
    return user_diets

def recommend_foods(user_diets):
    # Recommend foods based on the selected diets
    recommended_foods = set()  # Use a set to avoid duplicate food items
    for diet in user_diets:
        if diet in food_recommendations:
            recommended_foods.update(food_recommendations[diet])
    
    # Print recommended foods or indicate if none match
    if recommended_foods:
        print("\nBased on your dietary choices, we recommend these foods:")
        for food in recommended_foods:
            print(f"  - {food}")
    else:
        print("No food recommendations match your dietary preferences.")

# Example usage of the program
user_diets = get_user_diets()
recommend_foods(user_diets)
