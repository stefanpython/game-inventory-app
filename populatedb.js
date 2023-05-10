console.log("This script populates with games and categories");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Product = require("./models/product");
const Category = require("./models/category");

const products = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB =
  "mongodb+srv://dementia1349:test@cluster0.zw0djkv.mongodb.net/game_inventory?retryWrites=true&w=majority";

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategory();
  await createProduct();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name} with description: ${description}`);
}

async function productCreate(
  name,
  description,
  category,
  price,
  number_of_items
) {
  productdetail = {
    name: name,
    description: description,
    price: price,
    number_of_items: number_of_items,
  };
  if (category != false) productdetail.category = category;

  const product = new Product(productdetail);
  await product.save();
  products.push(product);
  console.log(`Added product: ${name}`);
}

async function createCategory() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      "Shooter",
      "First person shooter action packed style gameplay"
    ),
    categoryCreate("RPG", "Role playing games, looting, leveling up, crafting"),
    categoryCreate(
      "Strategy",
      "Gathering resources, building structures, advancing in technology"
    ),
    categoryCreate("Action", "Jumping, fighting, story telling and completion"),
  ]);
}

async function createProduct() {
  console.log("Adding Games");

  await Promise.all([
    productCreate(
      "Counter Strike",
      "First person shooter. First team to kill the other team, wins. Competitive, 14 round game",
      categories[0],
      9.99,
      20
    ),
    productCreate(
      "Lineage II",
      "Travel, do quests, farm, loot and fight for your honor with different player classes",
      categories[1],
      19.99,
      15
    ),
    productCreate(
      "Age of Empires",
      "Build, divide and conquer all the land",
      categories[2],
      12.99,
      7
    ),
    productCreate(
      "Spider Man",
      "Jump, explore, do quests and more of the same stuff",
      [categories[3], categories[0]],
      25,
      9
    ),
  ]);
}
