  // 18 imagens rolam no vazio.
let maxImages = 16;

  // Pausam e percebem-se nas suas unidades
let imageIndex = 1;

  //nas suas diversas matrizes.

const matrix = [ [ -1, -1, -1 ],
                 [ -1, 9, -1 ],
                 [ -1, -1, -1 ] ];
  
  //Com dimensões
let yoff = 0.0;
let yi = 0;

  //que eram duas mas com uma escala das centenas.
let w = 100;

  // Em todas elas havia movimento. Quais são as personagens?
let state = 0;

  // É um jogo.
let img = [];

function preload() {
  for (let i = 0; i < maxImages; i ++ ) {
    img[i] = loadImage('bienal' + i + '.jpg' );
    //e varia às mãos de quem o joga.
  }
}

  //feito num rectangulo de 9 por 6, onde as peças não encaixam.
function setup() {
  createCanvas(300, 450);
  for (let i = 0; i < maxImages; i ++ ) {
    img[i].loadPixels();
    
  //e varia às mãos de quem o joga.
      noCursor();
  }
  
  //na caixa do tempo e do espaço.

  imageIndex = int(random(maxImages));

  pixelDensity(1);
  frameRate(24);

}

function draw() {

  image(img[imageIndex], 0, 0);
  
  //Nunca um rio se banha em ti duas vezes
  if (state == 0) {

  //não se destingue do seu interior
    noStroke();

    yi++;
    if (yi > height) {
      yi = 0;
    }
    
  //mas dele parte se vê
    fill(00, 102, 153, 80);

  // pois te mergulha
    beginShape();
    
 // ressoando a tua forma
    let xoff = 0; 

    for (let x = 0; x <= width; x += 10) {

 // de ruído vertical.
      let y = map(noise(xoff, yoff), 0, 5, 200, mouseY);

      vertex(x, y);

 // Suas ondas de branda superfície
      xoff += 0.05;
    }

 // e corrente variável,
    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
    
 // e corrente variável,
    endShape(CLOSE);
  }

  //Agora terminado o rio encontramos o primeiro vestígio do povo Vieso.
  if (state == 2) {

  //Buscando não olhando o resto. 
    const xstart = constrain(mouseX - w/2, 0, img[imageIndex].width);
    const ystart = constrain(mouseY - w/2, 0, img[imageIndex].height);
    const xend = constrain(mouseX + w/2, 0, img[imageIndex].width);
    const yend = constrain(mouseY + w/2, 0, img[imageIndex].height);
    const matrixsize = 3;

  //Imagens voltam a ser elas próprias.
    loadPixels();
    
  // Insistimos.
    for (let x = xstart; x < xend; x++) {
      for (let y = ystart; y < yend; y++ ) {
        
  // É possível descascar estas imagens?
        let c = convolution(x, y, matrix, matrixsize, img);
        let loc = (x + y*img[imageIndex].width) * 4;
        pixels[loc] = red(c);
        pixels[loc + 1] = green(c);
        pixels[loc + 2] = blue(c);
        pixels[loc + 3] = alpha(c);
      }
    }
    
  // Vê-las de dentro para fora?
    updatePixels();
    noStroke();
    noFill();
    
  // Talvez, mas os nossos olhos são um só
    rect(xstart, ystart, w, w);
  }
  
  // O vestígio vísivel passou a encontrado.  
  if (state == 1) {

  //O seu fogo tem quantos vermelhos?
    let r = map(mouseX, 0, width, 0, 255);
 
 //A sua folha quantas imagens caduca?
    let g = map(mouseY, 0, height, 0, 255);

  //Porque janela as observas?
    let d = dist(mouseX, mouseY, width/2, height/2);

  //Nós não sabemos com que tinta elas te vêm
    let b = map(d, 0, width/2, 0, 255);

  //porque a Natureza nos inspirou nas cores.
    tint(r, g, b);
  } else {
    tint(255);
  }
  
  //Parabéns. Contribuiste para o devir e mais uma página foi virada na História. Ela atualiza-se.
   if(state == 3){
    
    //As dimensões e matriz do jogo sempre seguem
    
    for (let x = 0; x < img[imageIndex].width; x++) {
        for (let y = 0; y < img[imageIndex].height; y++ ) {

   // o acordo entre ti e a de um povo matriarca.
        let loc = (x + y*img[imageIndex].width) * 4;

   // As suas possibilidades são variadas,
        let r,g,b;
        r = img[imageIndex].pixels[loc];
        g = img[imageIndex].pixels[loc];
        b = img[imageIndex].pixels[loc];

  // a busca cada vez mais imperceptível
        let maxdist = 50;
        
  //que deixa um rasto okupado
        let d = dist(x, y, mouseX, mouseY);
        
  //gerado e mágico
        let adjustbrightness = 255*(maxdist-d)/maxdist;
        
  //Agora já sabes jogar, por isso já vês melhor.
        r += adjustbrightness;
        g += adjustbrightness;
        b += adjustbrightness;
        
  // És humana? Confirma por favor.
        r = constrain(r, 0, 255);
        g = constrain(g, 0, 255);
        b = constrain(b, 0, 255);

  //Aqui viveu um povo que habitava a Maia contemporânea
  //As suas cores são vistas por nós assim
        c = constrain(r,g,b);
        
  //Dentro de um rectangulo que te subtrai.      
        let pixloc = (y*width + x) * 4;
        pixels[pixloc] = c;
        pixels[pixloc+1] = c;
        pixels[pixloc+2] = c;
        pixels[pixloc+3] = 250;
        }
    }
    
   //Lavemos as nossas caras.
    updatePixels();
  }
}

  //Escreveste um episódio de uma história viesa.
function touchEnded() {

  //A forma sempre é a mesma, mas a sua aparência revela-se única.
  imageIndex = int(random(maxImages));
  state++;

  //Ela repeta-se e nós também. Também.
  if (state >= 2) {
    state = 0;
  }

  //Deixaste o teu rasto. Guarda-o.
  // saveCanvas('Vieses','png');
}

  //Fora deste rectângulo há outras histórias.
function convolution(x, y, matrix, matrixsize, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  
  // Aqui muitas são possíveis.
  for (let i = 0; i < matrixsize; i++) {
    for (let j = 0; j < matrixsize; j++) {

 // Baralha as peças.
      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + img[imageIndex].width * yloc) *4;

 // Joga outra vez. Os Viesos deixaram-nos isto.
      loc = constrain(loc, 0, img[imageIndex].pixels.length - 1);

 // A história é um reflexo do que não regista.
      rtotal += (img[imageIndex].pixels[loc]) * matrix[i][j];
      gtotal += (img[imageIndex].pixels[loc]) * matrix[i][j];
      btotal += (img[imageIndex].pixels[loc]) * matrix[i][j];
 //a sua dobra traça ligações
    }
  }

  // que a definição excluí.
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);

 // Joga outra vez.
  return color(rtotal, gtotal, btotal);
}
