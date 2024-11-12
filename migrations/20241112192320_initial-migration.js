/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable("recipes", (recipe) => {
      recipe.increments("recipe_id");
      recipe.string("recipe_name", 200).notNullable().unique();
    })
    .createTable("ingredients", (ingredient) => {
      ingredient.increments("ingredient_id");
      ingredient.string("ingredient_name", 200).notNullable().unique();
      ingredient.string("ingredient_unit", 50);
    })
    .createTable("steps", (table) => {
      table.increments();
    })
    .createTable("steps_ingredients", (table) => {
      table.increments();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("steps_ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes");
};
