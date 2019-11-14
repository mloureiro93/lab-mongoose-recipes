const mongoose = require("mongoose");

// Import Recipe model
const Recipe = require("./models/Recipe");

// Import data
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipeApp";

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "Bolo de Bolacha",
  level: "Easy Peasy",
  ingredients: ["butter", "cookies", "coffee", "sugar"],
  cuisine: "Portuguese",
  dishType: "Dessert",
  image: "https://www.teleculinaria.pt/wp-content/uploads/2016/08/Bolo-de-bolacha-tradicional-CHLM-29.jpg",
  duration: 30,
  creator: "Maria"
})

  .then(document => {
    console.log("We successfully created a recipe.");
  })
  .catch(error => {
    console.log("There was an error in the chain of operations.");
    console.log(error);
  });

  Recipe.insertMany(data)
  .then(document => {
    console.log("We successfully created many recipes.");
  })
  . then(document => {
    for(i=0; i < data.length; i++) {
    console.log(data[i].title)};
  })
  .then(updatedDocument => {
    console.log('We successfully updated a single document');
    console.log(updatedDocument);
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, {duration:100});
  })
  .then(deleteDocument => {
    console.log('We successfully deleted a single document');
    console.log(deleteDocument);
    return Recipe.deleteOne({ title: 'Rigatoni alla Genovese' }, {duration:220});
  })
  .then(deleteDocument => {
    console.log('We successfully deleted a carrot cake');
    console.log(deleteDocument);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .catch(error => {
    console.log("There was an error in the chain of operations.");
    console.log(error);
  })
  mongoose.connection.close();
