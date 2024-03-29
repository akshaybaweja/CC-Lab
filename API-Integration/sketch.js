var temp;
var description;
var img;

//variables
var n = 0;
var m = 0;
var p = 0;
var v;
var y;
var z;
var rainY = 600;
var cloudColor = 250;
var xSun = 680;

function preload() {
  getWeatherData("new york")
  img = loadImage("./nyc.png");
}

function getWeatherData(city){
  let api = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "&units=imperial";
  let key = "&appid=abef3a83c03af1038e36ef62743c20a6";

  let url = encodeURI(api + city + units + key);
  loadJSON(url, processData);
}

function processData(data){
  console.log(data);
  temp = data.main.temp;
  description = data.weather[0].description;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(110, 120);
  background(135, 206, 250);
  noStroke();
  
  if (description == "few clouds" || description == "light rain" || description == "moderate rain") {
    background(172, 177, 183);
  }

  if (description == "overcast clouds" || description == "moderate rain") {
    background(220);
    cloudColor = 180;

    v = noise(n) * 23;
    z = noise(p) * 44;

    ellipse(v + 360, 40, 100, 100);
    ellipse(v + 300, 60, 100, 100);
    ellipse(v + 420, 70, 100, 100);
    ellipse(v + 360, 90, 100, 100);

    ellipse(z + 960, 50, 100, 100);
    ellipse(z + 900, 60, 100, 100);
    ellipse(z + 1020, 70, 100, 100);

    n = n + 0.02;
    p = p + 0.03;
  }

  fill(255);
  textSize(95);
  textAlign(CENTER, CENTER);
  text(round(temp) + "°F", 695, 330);
  textSize(20);
  text(description, 680, 240);
  textSize(30);
  text("New York City", 680, 270);


  if (description == "clear sky") {
    xSun = 500;
  }

  if (description == "clear sky" || description == "broken clouds") {
    fill(255, 212, 0);
    ellipse(xSun, 100, 150, 150);
  }

  if (description == "moderate rain") {
    cloudColor = 180;
    fill(20, 160, 255, 100);
    ellipse(700, rainY, 8, 20);
    ellipse(550, rainY - 200, 8, 20);
    ellipse(650, rainY - 350, 8, 20);
    ellipse(750, rainY - 500, 8, 20);
    ellipse(800, rainY - 150, 8, 20);
    ellipse(300, rainY + 200, 8, 20);
    ellipse(380, rainY + 250, 8, 20);
    ellipse(1000, rainY + 200, 8, 20);
    ellipse(930, rainY + 250, 8, 20);

    rainY = rainY + 10;

    if (rainY > 600) {
      rainY = -50;
    }
  }

  if (description == "light rain") {
    fill(20, 160, 255, 100);
    ellipse(850, rainY, 8, 20);
    ellipse(550, rainY - 200, 8, 20);
    ellipse(650, rainY - 400, 8, 20);
    ellipse(750, rainY - 500, 8, 20);

    rainY = rainY + 10;

    if (rainY > 790) {
      rainY = -50;
    }
  }

  if (description == "broken clouds") {
    xSun = 850;
  }

  if (description == "few clouds" || description == "light rain" || description == "moderate rain" || description == "overcast clouds") {
    translate(20, 0);
  }

  if (description == "few clouds" || description == "light rain" || description == "broken clouds" || description == "moderate rain" || description == "overcast clouds") {
    fill(cloudColor, 240);

    y = noise(m) * 90;

    ellipse(y + 480, 100, 100, 100);
    ellipse(y + 500, 60, 100, 100);
    ellipse(y + 620, 70, 100, 100);
    ellipse(y + 760, 100, 100, 100);
    ellipse(y + 560, 130, 100, 100);
    ellipse(y + 620, 150, 100, 100);
    ellipse(y + 690, 135, 100, 100);
    ellipse(y + 550, 50, 100, 100);
    ellipse(y + 690, 60, 100, 100);
    ellipse(y + 730, 50, 100, 100);
    ellipse(y + 620, 50, 100, 100);

    m = m + 0.01;
  }
  image(img, 290, 240);
}