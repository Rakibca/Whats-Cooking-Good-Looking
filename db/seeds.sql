insert into user
    (userID, username, userPass)
values
    (1, "testuser", "pass1234");

insert into recipes
    (recipeID, recipeName, ingredients, instructions, userID)
values
    (1, "Grilled Cheese", "2 slices of bread, gouda, cheddar, swiss", "cook it", 1),
    (2, "Spaghetti and Meatballs", "ground beef, spaghetti, other stuff", "cook it", 2),
    (3, "Nachos", "cheese, tortilla chips, toppings", "cook it", 3);