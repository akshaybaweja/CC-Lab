
let canvas, bgColor;
let fft, soundFile, soundSpectrum;

function setup() {
  colorMode(HSB,360,100,100);
  frameRate(60);
	bgColor = color(330,0,5);
	background(bgColor);
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.drop(gotFile);
  textAlign(CENTER);
  fill(0,0,90);
  text('Drop MP3 File', width / 2, height / 2);
}

function gotFile(file) {
  if((!soundFile) && (file.type == "audio")) { 
		background(bgColor);
    soundFile = new p5.SoundFile(file.data);
    initSound();
    canvas.mouseClicked(togglePlay);
  }
}

function draw() {
  if(soundFile) {
		
    background(bgColor);
    soundSpectrum = fft.analyze(); 
		
		var myDataVal = getNewSoundDataValue("bass"); 
		var myDataColor = getDataHSBColor(myDataVal);

		noStroke();
		fill(myDataColor);
		var myEllipseSize = 200 * myDataVal;
		ellipse(mouseX,mouseY,myEllipseSize,myEllipseSize);
  }	
}

function getDataHSBColor(d) {
	this.dataHue = map(d,0,1,0,360);
	this.dataSaturation = map(d,0,1,0,100);
	this.dataBrightness = map(d,0,1,0,100);
	return color(this.dataHue,this.dataSaturation,this.dataBrightness);
}

function getNewSoundDataValue(freqType) { 
  return map(fft.getEnergy(freqType),0,255,0,1);
}

function initSound() { 
  fft = new p5.FFT(0.4,1024);
  soundFile.amp(0.7); 
}

function togglePlay() {
  if (soundFile.isPlaying()) {
    soundFile.pause();
  } else {
    soundFile.loop();
  }
}