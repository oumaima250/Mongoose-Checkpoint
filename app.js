const mongoose = require('mongoose');
require('dotenv').config(); 

// Connectez-vous à MongoDB en utilisant Mongoose
mongoose.connect('mongodb+srv://abbcccdddd663:a123456@cluster0.xocjebr.mongodb.net/persona', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Create a person with this prototype
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  favoriteFoods: [{ type: String }]
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: 'John',
  age: 30,
  favoriteFoods: ['pizza', 'pasta']
});

person.save()
  .then(data => {
    console.log('Person saved:', data);
  })
  .catch(err => {
    console.error(err);
  });

//Create Many Records with model.create()

const arrayOfPeople = [
  { name: 'Mary', age: 25, favoriteFoods: ['burritos', 'Grilled Cheese'] },
  { name: 'Bob', age: 40, favoriteFoods: ['steak', 'salad'] },
  { name: 'Max', age: 38, favoriteFoods: ['Hash browns', 'burgers'] }
];

Person.create(arrayOfPeople)
  .then(data => {
    console.log('People created:', data);
  })
  .catch(err => {
    console.error(err);
  });

//Use model.find() to Search , Search by name

Person.find({ name: 'Mary' })
  .then(data => {
    console.log('People found by name:', data);
  })
  .catch(err => {
    console.error(err);
  });

//Use Model.findOne() to search , Search  by food
const food = 'burgers';
Person.findOne({ favoriteFoods: food })
  .then(data => {
    console.log(`Person found by favorite food "${food}":`, data);
  })
  .catch(err => {
    console.error(err);
  });

//Use model.findById() to Search , Search by id

const personId = '6436d4da41fa8d70c2bbcd20'; 
Person.findById(personId)
  .then(data => {
    console.log(`Person found by _id "${personId}":`, data);
  })
  .catch(err => {
    console.error(err);
  });

//Updates by Running Find, Edit, then Save
Person.findByIdAndUpdate(personId, { $push: { favoriteFoods: 'hamburger' } }, { new: true })
  .then(data => {
    console.log('Person updated:', data);
  })
  .catch(err => {
    console.error(err);
  });

//Updates on a Document Using model.findOneAndUpdate()
const personName = 'Mary';
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
  .then(data => {console.log(`Person "${personName}" updated:`, data);
})
.catch(err => {
console.error(err);
});

//Delete One Document Using model.findByIdAndRemove
const personIdToDelete = '6436d4da41fa8d70c2bbcd1f'; // Replace with valid _id
Person.findByIdAndRemove(personIdToDelete)
.then(data => {
console.log(`Person with id ${personIdToDelete} deleted:`, data);
})
.catch(err => {
console.error(err);
});

// Delete all documents that match a condition using Model.remove()

Person.deleteOne({ name: 'Mary' })
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });

// Chain multiple operations together using Model.findOne() and chaining methods
Person.findOne({ name: 'Bob' })
.select('-_id name age favoriteFoods')
.exec()
.then(data => {
console.log('Person found and selected fields:', data);
})
.catch(err => {
console.error(err);
});

// Use Model.find() to search for people with a given food in their favoriteFoods
const foodToSearch = 'burgers';
Person.find({ favoriteFoods: foodToSearch })
.sort('name')
.limit(2)
.select('name favoriteFoods')
.exec()
.then(data => {
console.log(`People found by favorite food ${foodToSearch}`, data);
})
.catch(err => {
console.error(err);
});

// Chain multiple query helpers together using Model.find()
Person.find()
.where('age').gte(40)
.where('favoriteFoods').in(['burgers', 'burritos'])
.select('-_id name age favoriteFoods')
.exec()
.then(data => {
console.log('People found by age and favorite foods:', data);
})
.catch(err => {
console.error(err);
});