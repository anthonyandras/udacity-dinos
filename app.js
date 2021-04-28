function getRandomElement(array) {
  return array[Math.floor((Math.random() * array.length))];
}

// Create Dino Constructor
function Organism(species, weight, height, diet, where, when, facts) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.facts = facts;
  this.imageUrl = `images/${this.species.toLowerCase()}.png`;
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Organism.prototype.compareWeight = function(weight) {
  if (this.weight >= weight) {
    return `Wow! You weigh more or the same than a ${this.species}!`;
  }
  return `Okay, we don't need to worry about your health, for now at least!`;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Organism.prototype.compareHeight = function(height) {
  if (this.height >= height) {
    return `Wow! You are taller than a ${this.species}!`;
  }
  return `Okay, so you're not as tall as a ${this.species}! Maybe it's time for some magical growth seeds?`;
};


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Organism.prototype.compareDiet = function(diet) {
  if (this.diet === diet) {
    return `You eat like a ${this.species}. Impressive!`;
  }
  return `${this.species}'s and humans typically have different diets, so that is okay!`;
};

// Create Dino Objects
function buildOrganismFacts(organism) {
  // we need to build an array of facts for a given organism
  // this will include the already seeded fact on the organism object if it exists
  const facts = [
    `${organism.species} are ${organism.height} inches tall!`,
    `${organism.species} come from ${organism.where}.`,
    `${organism.species} come from the ${organism.when} times.`,
    `${organism.species} are ${organism.diet}s and weigh ${organism.weight} pounds!`,
  ];

  if (organism.fact) {
    facts.push(organism.fact);
  }

  return facts;
}

function generateOrganism(dino) {
  return new Organism(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, buildOrganismFacts(dino));
}

function generateOrganisms(dinos) {
  return dinos.map((dino) => generateOrganism(dino));
}

// so, I ran into this cool little API called Fetch that is apparently
// 'built in'. I figure I would try to use it here instead of setting up these
// objects 'manually'
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// const organisms = (function () {
//     let dinos = []
//     fetch('dino.json')
//         .then(res => res.json())
//         .then(json => dinos = generateDinos(json.Dinos));
//     return dinos;
// }());

const organisms = generateOrganisms([
  {
    species: 'Triceratops',
    weight: 13000,
    height: 114,
    diet: 'herbavor',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: 'First discovered in 1889 by Othniel Charles Marsh',
  },
  {
    species: 'Tyrannosaurus Rex',
    weight: 11905,
    height: 144,
    diet: 'carnivor',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: 'The largest known skull measures in at 5 feet long.',
  },
  {
    species: 'Anklyosaurus',
    weight: 10500,
    height: 55,
    diet: 'herbavor',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: 'Anklyosaurus survived for approximately 135 million years.',
  },
  {
    species: 'Brachiosaurus',
    weight: 70000,
    height: '372',
    diet: 'herbavor',
    where: 'North America',
    when: 'Late Jurasic',
    fact: 'An asteroid was named 9954 Brachiosaurus in 1991.',
  },
  {
    species: 'Stegosaurus',
    weight: 11600,
    height: 79,
    diet: 'herbavor',
    where: 'North America, Europe, Asia',
    when: 'Late Jurasic to Early Cretaceous',
    fact: 'The Stegosaurus had between 17 and 22 seperate places and flat spines.',
  },
  {
    species: 'Elasmosaurus',
    weight: 16000,
    height: 59,
    diet: 'carnivor',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: 'Elasmosaurus was a marine reptile first discovered in Kansas.',
  },
  {
    species: 'Pteranodon',
    weight: 44,
    height: 20,
    diet: 'carnivor',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: 'Actually a flying reptile, the Pteranodon is not a dinosaur.',
  },
  {
    species: 'Pigeon',
    weight: 0.5,
    height: 9,
    diet: 'herbavor',
    where: 'World Wide',
    when: 'Holocene',
    fact: 'All birds are living dinosaurs.',
  },
]);

// Create Human Object
// really a human is really just an organism with the exception of the name, imageUrl behavior, and facts
function Human(name, weight, height, diet, where, when) {
  Organism.call(this, 'Human', weight, height, diet, where, when, []);
  this.name = name;
  this.imageUrl = 'images/human.png';
  this.facts = buildOrganismFacts(this);
}

// wire up humans into existence
Human.prototype = Object.create(Organism.prototype);
Human.prototype.constructor = Human;

function calculateHeightInInches(feet, inches) {
  return (feet * 12) + inches;
}

function buildOrganismTile(organism) {
  const organismDiv = document.createElement('div');
  organismDiv.className = 'grid-item';

  const speciesHeader = document.createElement('h3');
  if(organism.species.toLowerCase() === 'human') {
    speciesHeader.innerText = organism.name;  
  } else {
    speciesHeader.innerText = organism.species;
  }

  const organismImage = document.createElement('img');
  organismImage.src = organism.imageUrl;

  const fact = document.createElement('p');
  if(organism.species.toLowerCase() !== 'human') {
    fact.innerText = getRandomElement(organism.facts);
  }
  
  organismDiv.appendChild(speciesHeader);
  organismDiv.appendChild(organismImage);
  organismDiv.appendChild(fact);

  return organismDiv;
}

// we need to add an event listener to the button
// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', function() {
  // Use IIFE to get human data from form
  const human = (function() {
    const name = document.getElementById('name').value;
    const feetHeight = parseInt(document.getElementById('feet').value);
    const inchesHeight = parseInt(document.getElementById('inches').value);
    const height = calculateHeightInInches(feetHeight, inchesHeight);
    const weightLbs = parseInt(document.getElementById('weight').value);
    const diet = document.getElementById('diet').value;
    return new Human(name, weightLbs, height, diet, '', '', buildOrganismFacts('')); // we could capture where and when in a future iteration
  }());

  const organismGrid = document.getElementById('grid');
  organisms.forEach((organism, index) => {
    organism.facts.push(organism.compareDiet(human.diet));
    organism.facts.push(organism.compareHeight(human.height));
    organism.facts.push(organism.compareWeight(human.weight));

    // Remove form from screen
    document.getElementById('dino-compare').style.display = 'none';

    // Generate Tiles for each Dino in Array
    // Add tiles to DOM
    if (index == 4) {
      organismGrid.appendChild(buildOrganismTile(human));
    }
    organismGrid.appendChild(buildOrganismTile(organism));
  });
});
