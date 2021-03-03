const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://pat2:pat123@cluster0.iy3zp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async() => {
    // Run your code here, after you have insured that the connection was made

    await Recipe.create({
      title: "morisojando",
      level: "Easy Peasy",
      ingredients: ["Lemon","Milk","Ice","Brown Sugar"],
      cusine: "Dominican",
      dishType: "drink",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 5,
      creator: "ish"
    }).then(console.log)

    await Recipe.insertMany(data).then(console.log)

    await Recipe.findOneAndUpdate({title: 'Carrot Cake'}, {duration: 55}).then(console.log)

    await Recipe.deleteOne({title:"Orange and Milk-Braised Pork Carnitas"}).then((res) => console.log('Deleted fool'))


})

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
