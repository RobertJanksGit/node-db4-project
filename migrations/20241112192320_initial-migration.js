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
    .createTable("steps", (step) => {
      step.increments("step_id");
      step.string("instructions", 200).notNullable();
      step.integer("step_number").notNullable();
      step
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    })
    .createTable("steps_ingredients", (steps_ingredient) => {
      steps_ingredient.increments("step_ingredient_id");
      steps_ingredient.float("quantity").notNullable();
      steps_ingredient
        .integer("step_id")
        .unsigned()
        .notNullable()
        .references("step_id")
        .inTable("steps")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      steps_ingredient
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
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
