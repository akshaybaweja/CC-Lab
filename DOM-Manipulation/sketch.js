let apiKey = '1491866484168129'
let api = 'https://superheroapi.com/api/' + apiKey + '/';
let superhero;
let name;
let race;
let image;

function setup() {

  name = select('#heroName');
  race = select('#heroRace')
  image = select('#heroImage');

  superhero = round(random(1, 731));
  let url = encodeURI(api + superhero);
  console.log(url);
  loadJSON(url, processData);
}

function processData(data) {
  console.log(data);
  let superheroName = data.name;
  let superheroRace = data.appearance.race;
  name.html(superheroName);
  race.html(superheroRace);
  imgUrl = data.image.url;
  image.attribute('src', imgUrl);
}

function draw() {
  // put drawing code here
}