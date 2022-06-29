insert into user
    (userID, username/*, password*/)
values
    (1, "testuser", "pass1234");

insert into recipes
    (recipeID, recipeName, ingredients, instructions, userID)
values
    (1, "Grilled Cheese", "2 slices of bread, gouda, cheddar, swiss" )