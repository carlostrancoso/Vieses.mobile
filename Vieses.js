let maxImages = 16;

let imageIndex = 1;

let yoff = 0.0;

let state = 0;

let img = [];

let out;

let val;

let t=0;


function preload() {
  for (let i = 0; i < maxImages; i ++ ) {
    img[i] = loadImage('data/bienal' + i + '.jpg' );
  }
}


function setup() {
  var cnv = createCanvas(300, 450);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  
  
  for (let i = 0; i < maxImages; i ++ ) {
    img[i].loadPixels();
    
  }
  

  imageIndex = int(random(maxImages));


}

function draw() {

  imageMode(CENTER);
  image(img[imageIndex], width/2, height/2);
  

  if (state == 0) {

colorMode(RGB);

    noStroke();
     noTint();

    fill(0, 102, 153, 80);

    beginShape();
    
    let xoff = 0; 

    for (let x = 0; x <= width; x += 10) {

      let y = map(noise(xoff, yoff), 0, 5, 200, 500);

      vertex(x, y);

      xoff += 0.05;
    }

    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
    
    endShape(CLOSE);
  }

  
  if (state == 1) {
  
  val = TWO_PI * (millis()%10000)/10000.0; // every 2000 milliseconds value increases from 0 to 2PI
  out = sin(val);
    
  colorMode(HSB, 2.0);
  tint(out+1, 2, 2);
    
  } else {
    tint(255);
  }
  
  if(state == 2){
  
colorMode(RGB);

  let x= noise(t);
  x= map(x, 0, 1, 2, 450);
  
  t+=0.015;
    
tint(255,200);

     image (img[imageIndex],width/2, height/2, x, x*1.5);

    
  }
}

function touchEnded() {

  
  imageIndex = int(random(maxImages));
  state++;

  if (state >= 3) {
    state = 0;
  }
    

  saveCanvas('Vieses','jpg');
}

