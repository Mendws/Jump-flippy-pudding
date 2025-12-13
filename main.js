// ====================================================================
// === 1. VARIÁVEIS E CONSTANTES GLOBAIS ===
// ====================================================================

// --- Variáveis de Dimensão e Tela ---
var larguraBotao = 120;
var alturaBotao = 40;
var espacamento = 20;

// Variável de controle de tela: 1=Menu, 2=Jogo, 3=Instruções, 4=Créditos, 5=GameOver
var tela = 1; 
var largura = 200;
var altura = 50;
var xMenu = 50;
var yMenu1 = 85;
var yMenu2 = 145;

var xInicialBotao;
var yBotao = 410; // Posição Y dos botões no Menu

// --- Cores (Hex para p5.js) ---
var corFundoCeu = "#FFDDEE";
var corFundoPlataforma = "#FFC0CB";
var corBordaBotao = "#AA4444";
var corFundoBotao = "#FFFFFF";
var corTextoBotao = "#664444";
var corTituloPrincipal = "#AA4444";
var corContornoTitulo = "#FFFFFF";
var corDestaque = "#FF0044";
var corPudim = "#F8BBD0";
var corSombraPudim = "#D89BAF";
var corBrilhoPudim = "#FFFFFF";

var espessuraBorda = 4;

// --- Variáveis do Pudim no Menu ---
var pudimLargura = 120;
var pudimAltura = 80;
var pudimXMenu;
var pudimYMenuBase = 280;
var pulso = 0;

// --- Variáveis de Jogo e Física ---
const ALTURA_TOPO_PLATAFORMA = -80;
const OFFSET_Y_AJUSTE = 80;

var pudimX;
var pudimY;
var velocidadeY;
var gravidade = 0.6;
var forcaPulo = -10;
var alturaChao = 300;

var larguraImg = 150;
var alturaImg = 120;

// HITBOX CIRCULAR: Raio do Pudim e Cereja
var raioHitboxPudim = 40; // Raio para colisão do Pudim

// Variáveis de Velocidade e Aceleração do Jogo (Corrida Infinita)
var velocidadeHorizontal = 6; 
var taxaAumentoVelocidade = 0.005; 
var velocidadeMaxDificuldade = 18; 

// Variáveis e Array de Obstáculos
var obstaculos = [];
var obstaculoYInicial; 

// Variáveis de Geração de Obstáculos
var intervaloMinObs = 100; 
var intervaloMaxObs = 220; 
var proximoObstaculoFrame = 0; 
var pontoAumentoDificuldade = 50; 
var nivelDificuldade = 0;

// --- TIPOS DE OBSTÁCULOS (Configuração [largura, altura]) ---
const TAMANHOS_CEREJA = {
    Pequena: [40, 40],
    Media: [50, 50],
    Grande: [60, 60],
};

const TEMPLATES_OBSTACULOS = [
    [TAMANHOS_CEREJA.Pequena], 
    [TAMANHOS_CEREJA.Media],
    [TAMANHOS_CEREJA.Grande],
    [TAMANHOS_CEREJA.Pequena, TAMANHOS_CEREJA.Pequena],
    [TAMANHOS_CEREJA.Media, TAMANHOS_CEREJA.Pequena],
    [TAMANHOS_CEREJA.Grande, TAMANHOS_CEREJA.Pequena],
    [TAMANHOS_CEREJA.Pequena, TAMANHOS_CEREJA.Pequena, TAMANHOS_CEREJA.Pequena],
    [TAMANHOS_CEREJA.Media, TAMANHOS_CEREJA.Media],
    [TAMANHOS_CEREJA.Grande, TAMANHOS_CEREJA.Media],
];


// Variáveis de Score e Tempo
var scoreAtual = 0;
var highScore = 0; 
var highTime = 0; // Melhor tempo (em segundos)
var frameInicialScore = 0; 
var tempoFinalSessao = 0; // Armazena o tempo final da sessão (em segundos)


// Variáveis de Jogabilidade Avançada
var jumpBufferTimer = 0; 
const JUMP_BUFFER_FRAMES = 6; 


// --- Variáveis para as Imagens dos Botões ---
var imgBotaoJogar;
var imgBotaoInstrucoes;
var imgBotaoCreditos;
var imgBotaoVoltar; 

// --- VARIÁVEIS DE ÁUDIO ---
var musicaFundo;
var somPulo;
var somColisao;

// --- AJUSTES DE VOLUME (De 0.0 a 1.0) ---
const VOLUME_MUSICA_FUNDO = 0.10;
const VOLUME_SOM_PULO = 0.20;
const VOLUME_SOM_COLISAO = 0.5; 

// ====================================================================
// === 2. IMPORTS (Imagens, Fontes e Áudio) ===
// ====================================================================

// --- URLs das Imagens ---
const URL_IMAGEM_FUNDO =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Fundoceu.png";
const URL_IMAGEM_PUDIM =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Pudim.png";
const URL_IMAGEM_CEREJA =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Cereja.png";
const URL_IMAGEM_PLATAFORMA =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Plataforma_1.png";
const URL_BTN_JOGAR = "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Botaojogar.png";
const URL_BTN_INSTRUCOES =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Botaoinstrucao.png";
const URL_BTN_CREDITOS = 
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Botaocredito.png";
const URL_BTN_VOLTAR = 
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Botaovoltar.png";

// --- URLs das Fontes ---
const URL_FONTE_TITULO = "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Fonte star.ttf"; 
const URL_FONTE_TEXT = "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Fonte subtitulo.otf"; 

// --- URLs dos Sons ---
const URL_MUSICA_FUNDO = "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Musicadefundo.mp3"; 
const URL_SOM_PULO = "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Pulo.mp3"; 
const URL_SOM_COLISAO = "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Gameover.mp3"; 


var fundo;
var imgPudim;
var imgCereja;
var imgPlataforma;
let fonteTitulo; 
let fonteSubTitulo; 

/**
 * Carrega todos os assets (imagens e fontes) antes de iniciar o setup.
 */
function preload() {
  // Carrega Imagens
  fundo = loadImage(URL_IMAGEM_FUNDO);
  imgPudim = loadImage(URL_IMAGEM_PUDIM);
  imgCereja = loadImage(URL_IMAGEM_CEREJA);
  imgPlataforma = loadImage(URL_IMAGEM_PLATAFORMA);
  
  // Carrega Botões
  imgBotaoJogar = loadImage(URL_BTN_JOGAR);
  imgBotaoInstrucoes = loadImage(URL_BTN_INSTRUCOES);
  imgBotaoCreditos = loadImage(URL_BTN_CREDITOS);
  imgBotaoVoltar = loadImage(URL_BTN_VOLTAR);

  // Carrega Fontes
  fonteTitulo = loadFont(URL_FONTE_TITULO);
  fonteSubTitulo = loadFont(URL_FONTE_TEXT);
  
  // Carrega Arquivos de Som
  try {
      musicaFundo = loadSound(URL_MUSICA_FUNDO);
      somPulo = loadSound(URL_SOM_PULO);
      somColisao = loadSound(URL_SOM_COLISAO);
  } catch(e) {
      console.error("Erro ao carregar arquivos de som. Verifique se a biblioteca p5.sound está incluída e se as URLs estão corretas.");
      
  }
}

// ====================================================================
// === 3. FUNÇÕES DE COMPONENTES E AUXILIARES ===
// ====================================================================

/**
 * Função Construtora para os Obstáculos (Cerejas) Agrupados.
 */
function Obstaculo(tamanhos) {
    this.x = 0; 
    this.cerejas = [];
    let larguraTotal = 0;
    
    for (const [w, h] of tamanhos) {
        const offsetHorizontal = larguraTotal + (w / 2);
        
        this.cerejas.push({
            x: offsetHorizontal, 
            y: 0, 
            w: w, 
            h: h,
        });
        
        larguraTotal += w;
    }
    
    this.larguraGrupo = larguraTotal;
    this.w = larguraTotal; 
    this.h = Math.max(...tamanhos.map(t => t[1])); 
    this.y = obstaculoYInicial;
    this.larguraGrupo += 10 * (tamanhos.length - 1);
}

/**
 * Lógica de Colisão do Pudim com Obstáculos (Cerejas)
 */
function verificarColisaoObstaculo() {
  for (let grupoObs of obstaculos) {
    for (let cereja of grupoObs.cerejas) {
        
        let cerejaXReal = grupoObs.x - (grupoObs.larguraGrupo / 2) + cereja.x; 
        let cerejaYReal = grupoObs.y; 
        let raioCerejaAtual = cereja.w / 2;
        
        let distanciaCentros = dist(pudimX, pudimY, cerejaXReal, cerejaYReal);

        // Colisão ocorre se a distância for menor que a soma dos raios
        if (distanciaCentros < raioHitboxPudim + raioCerejaAtual) {
           
           // Toca som de colisão e para a música de fundo
           if (somColisao && somColisao.isLoaded()) {
               somColisao.play();
           }
           if (musicaFundo && musicaFundo.isPlaying()) {
               musicaFundo.stop();
           }
           
           tempoFinalSessao = (frameCount - frameInicialScore) / 60; 

           tela = 5; // Mudar para tela Game Over
           return true;
        }
    }
  }
  return false;
}

/**
 * Função de desenho da Plataforma/Chão.
 */
function desenharPlataforma(yPos) {
  noStroke();
  let alturaDoTopo = ALTURA_TOPO_PLATAFORMA;
  if (imgPlataforma) {
    imageMode(CORNER);
    let yInicioImagem = yPos - alturaDoTopo;
    let alturaImagemTotal = height - yInicioImagem;
    image(imgPlataforma, 0, yInicioImagem, width, alturaImagemTotal);
  } else {
    fill("#9C6644");
    rect(0, yPos, width, height - yPos);
    fill(corDestaque);
    rect(0, yPos - 10, width, 10);
  }
}

/**
 * Desenha o Pudim na tela de Menu com efeito de flutuação.
 */
function desenharPudimMenu() {
  let deslocamentoY = sin(frameCount * 0.06) * 6;
  let x = pudimXMenu;
  let y = pudimYMenuBase + deslocamentoY;  

  if (imgPudim) {
    imageMode(CENTER);
    image(imgPudim, x, y, larguraImg, alturaImg);
    imageMode(CORNER);
  } else {
    fill(corPudim);
    ellipse(x, y, pudimLargura, pudimAltura);
    fill(corDestaque);
    textAlign(CENTER, CENTER);
    text("Carregando Imagem...", x, y);
  }
}

/**
 * Desenha um botão clicável com o texto fornecido.
 */
function desenharBotao(texto, xPos, yPos, imagemBotao) {
  var x = xPos;
  var y = yPos;
  var w = larguraBotao;
  var h = alturaBotao;
  
  var isHovering =
    mouseX >= x &&
    mouseX <= x + w &&
    mouseY >= y &&
    mouseY <= y + h;

  if (imagemBotao) {
      imageMode(CORNER);
      if (isHovering) {
          tint(242, 211, 223); 
      } else {
          noTint();
      }
      image(imagemBotao, x, y, w, h);
      noTint();
  } else {
      var bordaRaio = 8;
      if (isHovering) {
          fill(corDestaque);
      } else {
          fill(corBordaBotao);
      }
      rect(x - espessuraBorda, y - espessuraBorda, w + espessuraBorda * 2, h + espessuraBorda * 2, bordaRaio);
      fill(corFundoBotao);
      rect(x, y, w, h, bordaRaio);
  }
  
  if (fonteSubTitulo) { textFont(fonteSubTitulo); } else { textFont('sans-serif'); }
  textSize(12);
  fill(corTextoBotao);
  textAlign(CENTER, CENTER);
  text(texto, x + w / 2, y + h / 2 - 1); 
  
  return isHovering;
}

/**
 * Reseta as variáveis de posição do Pudim e dos Obstáculos para um novo jogo.
 */
function reiniciarJogo() {
    const PUDIM_Y_INICIAL = alturaChao + OFFSET_Y_AJUSTE - raioHitboxPudim;
    
    pudimX = 50;
    pudimY = PUDIM_Y_INICIAL;
    velocidadeY = 0;
    velocidadeHorizontal = 6; 
    
    scoreAtual = 0; 
    frameInicialScore = frameCount; 
    tempoFinalSessao = 0;
    nivelDificuldade = 0; 
    
    obstaculos = [];
    const alturaMediaObs = 50; 
    obstaculoYInicial = alturaChao + OFFSET_Y_AJUSTE - alturaMediaObs / 2; 
    proximoObstaculoFrame = frameCount + random(intervaloMinObs, intervaloMaxObs); 
    
    jumpBufferTimer = 0;
    
    // Inicia a música de fundo em loop
    if (musicaFundo && musicaFundo.isLoaded()) {
        if (!musicaFundo.isPlaying()) {
            musicaFundo.loop(0, 1, VOLUME_MUSICA_FUNDO); 
        }
    }
}

// ====================================================================
// === 4. FUNÇÕES DE TELAS ===
// ====================================================================

/**
 * Desenha a tela de Instruções do jogo.
 */
function desenharTelaInstrucoes() {
  background(fundo);
  fill(corTituloPrincipal);
  if (fonteTitulo) { textFont(fonteTitulo); } else { textFont('sans-serif'); }
  textSize(40);
  textAlign(CENTER, TOP);
  text("INSTRUÇÕES", width / 2, 50);
  if (fonteSubTitulo) { textFont(fonteSubTitulo); } else { textFont('sans-serif'); }
  textSize(12);
  textAlign(LEFT, TOP);
  fill(corTextoBotao);
  text("1. Pressione ESPAÇO para fazer o Pudim Saltar", 100, 155);
  text(
    "2. Aperte e segure a tecla A ou D para controlar a direção do pudim, ou seja,\nesquerda ou direita",
    100,
    190
  );
  text("3. Evite os obstáculos de cereja", 100, 255);
  text("4. Tente bater seu recorde!", 100, 295);
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80, imgBotaoVoltar);
}

/**
 * Desenha a tela de Créditos.
 */
function desenharTelaCreditos() {
  background(fundo);
  fill(corTituloPrincipal);
  if (fonteTitulo) { textFont(fonteTitulo); } else { textFont('sans-serif'); }
  textSize(40);
  textAlign(CENTER, TOP);
  text("CRÉDITOS", width / 2, 50);
  if (fonteSubTitulo) { textFont(fonteSubTitulo); } else { textFont('sans-serif'); }
  textSize(12);
  textAlign(CENTER, TOP);
  fill(corTextoBotao);
  text("Design & Código: Raquel B. Mendes", width / 2, 150);
  text(
    "Orientadores: Rummenigge Rudson Dantas e Orivaldo Vieira de Santana Junior",
    width / 2,
    190
  );
  text("Feito com p5.js", width / 2, 230);
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80, imgBotaoVoltar);
}


/**
 * Desenha a tela de Game Over.
 */
function desenharTelaGameOver() {
    background(fundo);
    
    // 1. Verifica e Salva o High Score
    let novoRecorde = false;
    if (scoreAtual > highScore) {
        highScore = scoreAtual;
        storeItem('pudimSaltitanteHighScore', highScore); 
        novoRecorde = true;
    }

    // 2. Cálculo e Atualização do Tempo Final (High Time)
    let tempoFinal = tempoFinalSessao; 
    
    let novoRecordeTempo = false;
    if (tempoFinal > highTime) {
        highTime = tempoFinal;
        storeItem('pudimSaltitanteHighTime', highTime); 
        novoRecordeTempo = true;
    }
    
    // Formatação do Tempo Final
    let minutos = floor(tempoFinal / 60);
    let segundos = floor(tempoFinal % 60);
    let tempoFormatado = nf(minutos, 2) + ':' + nf(segundos, 2);

    // Formatação do High Time
    let hMin = floor(highTime / 60);
    let hSec = floor(highTime % 60);
    let highTimeFormatado = nf(hMin, 2) + ':' + nf(hSec, 2);
    
    if (fonteTitulo) { textFont(fonteTitulo); } else { textFont('sans-serif'); }
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(corDestaque);
    text("GAME OVER!", width / 2, height / 2 - 70); 
    
    if (fonteSubTitulo) { textFont(fonteSubTitulo); } else { textFont('sans-serif'); }
    textSize(16);
    fill(corTextoBotao);
    
    if (novoRecorde || novoRecordeTempo) {
        fill(corDestaque);
        text("NOVO RECORDE!", width / 2, height / 2 - 30);
    } else {
        text("Você colidiu com a cereja!", width / 2, height / 2 - 30);
    }
    
    textSize(14);
    textAlign(CENTER, TOP);
    fill(corTextoBotao);
    text(`SCORE FINAL: ${nf(scoreAtual, 4)}`, width / 2, height / 2 + 10);
    text(`BEST SCORE: ${nf(highScore, 4)}`, width / 2, height / 2 + 35);
    text(`TEMPO FINAL: ${tempoFormatado}`, width / 2, height / 2 + 60);
    text(`BEST TEMPO: ${highTimeFormatado}`, width / 2, height / 2 + 85); 
    
    let xBotaoReiniciar = width / 2 - larguraBotao - espacamento / 2;
    let xBotaoSair = width / 2 + espacamento / 2;
    let yBotoes = height - 80;

    desenharBotao("REINICIAR", xBotaoReiniciar, yBotoes, imgBotaoVoltar);
    desenharBotao("SAIR", xBotaoSair, yBotoes, imgBotaoVoltar);
}

/**
 * Desenha a Tela de Jogo e executa a lógica de física e colisão.
 */
function desenharTelaJogo() {
  background(fundo);
  fill(corTextoBotao);
  
  // --- 1. FÍSICA E COLISÃO COM O CHÃO ---
  velocidadeY += gravidade;
  pudimY += velocidadeY;

  const CHAO_FISICA_Y = alturaChao + OFFSET_Y_AJUSTE;
  const PUDIM_CHAO_Y = CHAO_FISICA_Y - raioHitboxPudim; 

  // Colisão com o chão
  if (pudimY >= PUDIM_CHAO_Y) {
    pudimY = PUDIM_CHAO_Y;
    velocidadeY = 0;
  }

  // --- 2. ACELERAÇÃO E MOVIMENTAÇÃO HORIZONTAL DO PUDIM ---
  velocidadeHorizontal += taxaAumentoVelocidade; 
  
  if (keyIsDown(65)) { 
    pudimX -= velocidadeHorizontal * 1.0; 
  }
  if (keyIsDown(68)) { 
    pudimX += velocidadeHorizontal * 1.0; 
  }
  pudimX = constrain(pudimX, raioHitboxPudim, width - raioHitboxPudim);

  // --- 2.5. LÓGICA DO JUMP BUFFER ---
  if (jumpBufferTimer > 0) {
      jumpBufferTimer--; 
      
      if (velocidadeY === 0) {
          // Toca som de pulo
          if (somPulo && somPulo.isLoaded()) {
              somPulo.play(); 
          }
          
          velocidadeY = forcaPulo;
          jumpBufferTimer = 0; 
      }
  }


  // --- 3. LÓGICA DE OBSTÁCULOS (MOVIMENTAÇÃO E GERAÇÃO) ---
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obs = obstaculos[i];
    obs.x -= velocidadeHorizontal; 

    if (obs.x + obs.w / 2 < 0) {
      obstaculos.splice(i, 1);
    }
  }

  // Atualização do Nível de Dificuldade
  if (scoreAtual >= pontoAumentoDificuldade * (nivelDificuldade + 1)) {
      nivelDificuldade++;
  }

  // Geração de Novo Obstáculo
  if (frameCount >= proximoObstaculoFrame) {
      
      let limiteTemplate = map(nivelDificuldade, 0, 4, 3, TEMPLATES_OBSTACULOS.length);
      limiteTemplate = constrain(limiteTemplate, 1, TEMPLATES_OBSTACULOS.length);
      
      let indiceTemplate = floor(random(limiteTemplate));
      let template = TEMPLATES_OBSTACULOS[indiceTemplate];

      let novoGrupo = new Obstaculo(template); 
      novoGrupo.x = width + novoGrupo.larguraGrupo / 2;
      
      obstaculos.push(novoGrupo); 

      let larguraMinima = novoGrupo.larguraGrupo;
      
      let fatorDistancia = map(velocidadeHorizontal, 
                               velocidadeHorizontal, 
                               velocidadeMaxDificuldade, 
                               1.8, 0.9); 
      fatorDistancia = constrain(fatorDistancia, 0.9, 1.8);
      
      let distanciaMinima = 100 * fatorDistancia; 
      let distanciaMaxima = 250 * fatorDistancia; 
      
      let framesNecessarios = (larguraMinima + random(distanciaMinima, distanciaMaxima)) / velocidadeHorizontal;
      
      proximoObstaculoFrame = frameCount + framesNecessarios;
  }

  // --- 4. LÓGICA DE COLISÃO DO PUDIM COM OBSTÁCULOS ---
  verificarColisaoObstaculo();

  // Se a tela mudou para 5 (Game Over), não continua desenhando o jogo
  if (tela === 5) {
      return; 
  }

  // --- 5. DESENHO DOS ELEMENTOS ---
  imageMode(CENTER);
  
  // Desenho dos Obstáculos (Cerejas)
  for (let grupoObs of obstaculos) {
    for (let cereja of grupoObs.cerejas) {
        let cerejaXReal = grupoObs.x - (grupoObs.larguraGrupo / 2) + cereja.x;
        let cerejaYReal = grupoObs.y;
        
        if (imgCereja) {
          image(imgCereja, cerejaXReal, cerejaYReal, cereja.w, cereja.h);
        } else {
          fill(corDestaque);
          rect(cerejaXReal, cerejaYReal, cereja.w, cereja.h);
        }
    }
  }

  // Desenho do Pudim
  if (imgPudim) {
    image(imgPudim, pudimX, pudimY, larguraImg, alturaImg);
  }

  imageMode(CORNER);
  rectMode(CORNER);
  
  // --- 6. LÓGICA DE SCORE E TEMPO ---
  if ((frameCount - frameInicialScore) % 6 === 0) { 
      scoreAtual++;
  }
  
  let tempoDecorrido = (frameCount - frameInicialScore) / 60; 
  let minutos = floor(tempoDecorrido / 60);
  let segundos = floor(tempoDecorrido % 60);
  let tempoFormatado = nf(minutos, 2) + ':' + nf(segundos, 2);
  

  // Desenho da Plataforma Base
  desenharPlataforma(alturaChao);
  
  if (fonteSubTitulo) { textFont(fonteSubTitulo); } else { textFont('sans-serif'); }
  textSize(18);
  fill(corTextoBotao);

  // Desenho do Score (Direita)
  textAlign(RIGHT, TOP);
  let highScoreTexto = nf(highScore, 4); 
  let scoreAtualTexto = nf(scoreAtual, 4);
  text(`HI ${highScoreTexto} ${scoreAtualTexto}`, width - 20, 20);

  // Desenho do Tempo (Centro)
  textAlign(CENTER, TOP);
  text(`TEMPO: ${tempoFormatado}`, width / 2, 20); 

  // Botão Voltar
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80, imgBotaoVoltar);
}


/**
 * Função principal do p5.js: Inicializa o Canvas e variáveis.
 */
function setup() {
  // Configuração inicial para permitir áudio (necessário em alguns navegadores)
  if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
  }

  createCanvas(800, 500);
  var larguraTotalGrupo = 3 * larguraBotao + 2 * espacamento;
  xInicialBotao = width / 2 - larguraTotalGrupo / 2;
  pudimXMenu = width / 2;

  let hS = getItem('pudimSaltitanteHighScore');
  if (hS) {
    highScore = int(hS);
  }
  let hT = getItem('pudimSaltitanteHighTime');
  if (hT) {
      highTime = float(hT); 
  }
  
  // Define o volume dos efeitos sonoros
  if (somPulo && somPulo.isLoaded()) {
      somPulo.setVolume(VOLUME_SOM_PULO); 
  }
  if (somColisao && somColisao.isLoaded()) {
      somColisao.setVolume(VOLUME_SOM_COLISAO);
  }

  reiniciarJogo();
  
  if (musicaFundo && musicaFundo.isLoaded()) {
      musicaFundo.stop();
  }
}

// ====================================================================
// === 5. FUNÇÕES DE JOGABILIDADE/INTERAÇÃO ===
// ====================================================================

/**
 * Loop principal do jogo. Chamado continuamente pelo p5.js.
 */
function draw() {
  noStroke();

  if (tela === 1) {
    // TELA 1: MENU PRINCIPAL
    if (musicaFundo && musicaFundo.isPlaying()) {
        musicaFundo.stop();
    }
    
    background(fundo);
    fill(corContornoTitulo);
    desenharPlataforma(alturaChao);
    desenharPudimMenu();

    // --- TÍTULO PRINCIPAL ---
    if (fonteTitulo) { textFont(fonteTitulo); } else { textFont('sans-serif'); }
    textSize(50);
    textAlign(CENTER, TOP);
    var deslocamentoContorno = 2;
    fill(corContornoTitulo);
    text("Pudim Saltitante", width / 2 + deslocamentoContorno, 50);
    text("Pudim Saltitante", width / 2 - deslocamentoContorno, 50);
    text("Pudim Saltitante", width / 2, 50 + deslocamentoContorno);
    text("Pudim Saltitante", width / 2, 50 - deslocamentoContorno);
    fill(corTituloPrincipal);
    text("Pudim Saltitante", width / 2, 50);

    if (fonteSubTitulo) { textFont(fonteSubTitulo); } else { textFont('sans-serif'); }
    textSize(16);
    fill(corTextoBotao);
    text("Jump flippy pudding", width / 2, 110);
    
    // Botões
    var xBotaoJogar = xInicialBotao;
    var xBotaoInstrucoes = xInicialBotao + larguraBotao + espacamento;
    var xBotaoCreditos = xInicialBotao + 2 * larguraBotao + 2 * espacamento;

    desenharBotao("JOGAR", xBotaoJogar, yBotao, imgBotaoJogar); 
    desenharBotao("INSTRUÇÕES", xBotaoInstrucoes, yBotao, imgBotaoInstrucoes);
    desenharBotao("CRÉDITOS", xBotaoCreditos, yBotao, imgBotaoCreditos);
    
    textSize(14);
    fill(corTextoBotao);
    textAlign(CENTER, BOTTOM);
    
  } else if (tela === 2) {
    // TELA 2: JOGO 
    desenharTelaJogo();
  } else if (tela === 3) {
    // TELA 3: INSTRUÇÕES
    desenharTelaInstrucoes();
  } else if (tela === 4) {
    // TELA 4: CRÉDITOS
    desenharTelaCreditos();
  } else if (tela === 5) {
    // TELA 5: GAME OVER
    desenharTelaGameOver();
  }
}

/**
 * Lógica de ação ao clicar com o mouse, controlando a navegação entre telas.
 */
function mousePressed() {
  // Posição do botão VOLTAR/REINICIAR (Para telas 2, 3, 4)
  let xVoltar = width / 2 - larguraBotao / 2;
  let yVoltar = height - 80;

  // Lógica para voltar do menu secundário para o principal (Telas 2, 3, 4)
  if (tela === 2 || tela === 3 || tela === 4) {
    if (
      mouseX >= xVoltar &&
      mouseX <= xVoltar + larguraBotao &&
      mouseY >= yVoltar &&
      mouseY <= yVoltar + alturaBotao
    ) {
      // Se estava no jogo, reinicia e para a música antes de voltar para o menu
      if (tela === 2) {
          reiniciarJogo();
          if (musicaFundo && musicaFundo.isPlaying()) {
              musicaFundo.stop();
          }
      }
      tela = 1; // Volta para o Menu Principal
      return;
    }
  }
  
  // Lógica para a tela de Game Over (Tela 5)
  if (tela === 5) {
      let xBotaoReiniciar = width / 2 - larguraBotao - espacamento / 2;
      let xBotaoSair = width / 2 + espacamento / 2;
      let yBotoes = height - 80;
      
      // Botão REINICIAR (Volta para o Jogo)
      if (
        mouseX >= xBotaoReiniciar &&
        mouseX <= xBotaoReiniciar + larguraBotao &&
        mouseY >= yBotoes &&
        mouseY <= yBotoes + alturaBotao
      ) {
          reiniciarJogo(); // Reinicia o jogo (e toca a música)
          tela = 2;        // Vai para a Tela de Jogo
          return;
      }
      
      // Botão SAIR (Volta para o Menu)
      if (
        mouseX >= xBotaoSair &&
        mouseX <= xBotaoSair + larguraBotao &&
        mouseY >= yBotoes &&
        mouseY <= yBotoes + alturaBotao
      ) {
          tela = 1;        // Volta para o Menu Principal
          return;
      }
  }

  // Lógica para os botões do Menu Principal (Tela 1)
  if (tela === 1) {
    var larguraTotalGrupo = 3 * larguraBotao + 2 * espacamento;
    var xInicial = width / 2 - larguraTotalGrupo / 2;
    var xBotaoJogar = xInicial;
    var xBotaoInstrucoes = xInicial + larguraBotao + espacamento;
    var xBotaoCreditos = xInicial + 2 * larguraBotao + 2 * espacamento;
    function isClicked(x) {
      return (
        mouseX >= x &&
        mouseX <= x + larguraBotao &&
        mouseY >= yBotao &&
        mouseY <= yBotao + alturaBotao
      );
    }

    if (isClicked(xBotaoJogar)) {
      reiniciarJogo(); // Garante que o jogo esteja resetado ao começar
      tela = 2; // Inicia o Jogo
    } else if (isClicked(xBotaoInstrucoes)) {
      tela = 3; // Abre a tela de Instruções
    } else if (isClicked(xBotaoCreditos)) {
      tela = 4; // Abre a tela de Créditos
    }
  }
}

/**
 * Lógica de ação ao pressionar uma tecla (pulo).
 */
function keyPressed() {
  // Apenas aplica pulo se estiver na tela de jogo
  if (tela !== 2) return;

  // Pulo: Tecla ESPAÇO (32).
  if (keyCode === 32) {
    // 1. Armazena o input do pulo no buffer 
    jumpBufferTimer = JUMP_BUFFER_FRAMES;

    // 2. Tenta pular imediatamente se já estiver no chão
    if (velocidadeY === 0) {
        // Toca som de pulo
        if (somPulo && somPulo.isLoaded()) {
            somPulo.play(); 
        }
        velocidadeY = forcaPulo;
        jumpBufferTimer = 0; 
    }
  }
}