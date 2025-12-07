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
var raioHitboxCereja = 18; // Raio para colisão da Cereja

var velocidadeHorizontal = 6;

// Variáveis e Array de Obstáculos
var obstaculos = [];
var larguraObs = 50;
var alturaObs = 50;

// --- Variáveis para as Imagens dos Botões ---
var imgBotaoJogar;
var imgBotaoInstrucoes;
var imgBotaoCreditos;
var imgBotaoVoltar; 

// ====================================================================
// === 2. IMPORTS (Imagens e Fontes) ===
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
}

// ====================================================================
// === 3. FUNÇÕES DE COMPONENTES E AUXILIARES ===
// ====================================================================

/**
 * Função Construtora para os Obstáculos (Cerejas).
 * @param {number} x - Posição X (Centro).
 * @param {number} y - Posição Y (Centro).
 */
function Obstaculo(x, y, w, h) {
  this.x = x; 
  this.y = y; 
  this.w = w;
  this.h = h;
}

/**
 * Lógica de Colisão do Pudim com Obstáculos (Cerejas)
 * Usa a Colisão Circular: verifica se a distância entre os centros é menor que a soma dos raios.
 */
function verificarColisaoObstaculo() {
  for (let obs of obstaculos) {
    // Calcula a distância entre os centros dos objetos
    let distanciaCentros = dist(pudimX, pudimY, obs.x, obs.y);

    // Colisão ocorre se a distância for menor que a soma dos raios
    if (distanciaCentros < raioHitboxPudim + raioHitboxCereja) {
       tela = 5; // Mudar para tela Game Over
       return true;
    }
  }
  return false;
}

/**
 * Função de desenho da Plataforma/Chão.
 * @param {number} yPos - Posição Y onde o chão começa.
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
 * Desenha um botão clicável com o texto fornecido, usando uma imagem de fundo (se fornecida).
 * @param {string} texto - Texto exibido no botão.
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

  // Desenho do Corpo do botão
  if (imagemBotao) {
      imageMode(CORNER);
      if (isHovering) {
          tint(242, 211, 223); // Efeito de brilho/destaque no hover
      } else {
          noTint();
      }
      image(imagemBotao, x, y, w, h);
      noTint();
  } else {
      // Fallback: Desenho geométrico
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
  
  // Desenho do Texto
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
    // Posição Y inicial ajustada pelo raio (centro do pudim na altura do chão)
    const PUDIM_Y_INICIAL = alturaChao + OFFSET_Y_AJUSTE - raioHitboxPudim;
    
    pudimX = 50;
    pudimY = PUDIM_Y_INICIAL;
    velocidadeY = 0;
    
    // Resetar obstáculos
    obstaculos = [];
    let yObsCentro = alturaChao + OFFSET_Y_AJUSTE - alturaObs / 2;
    let centroX = width / 2;
    obstaculos.push(new Obstaculo(centroX - 160, yObsCentro, larguraObs, alturaObs));
    obstaculos.push(new Obstaculo(centroX + 160, yObsCentro, larguraObs, alturaObs));
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
  text("3. Evite os obstáculos de cereja e cair das plataformas ", 100, 255);
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
    
    // Título/Mensagem de Game Over
    if (fonteTitulo) { textFont(fonteTitulo); } else { textFont('sans-serif'); }
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(corDestaque);
    text("GAME OVER!", width / 2, height / 2 - 50);
    
    // Mensagem
    if (fonteSubTitulo) { textFont(fonteSubTitulo); } else { textFont('sans-serif'); }
    textSize(16);
    fill(corTextoBotao);
    text("Você colidiu com a cereja!", width / 2, height / 2 + 10);
    
    // Botão Reiniciar
    desenharBotao("REINICIAR", width / 2 - larguraBotao / 2, height - 80, imgBotaoVoltar);
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
  // A colisão com o chão é ajustada pelo raio para que o centro do pudim pare na altura correta
  const PUDIM_CHAO_Y = CHAO_FISICA_Y - raioHitboxPudim; 

  // Colisão com o chão
  if (pudimY >= PUDIM_CHAO_Y) {
    pudimY = PUDIM_CHAO_Y;
    velocidadeY = 0;
  }

  // --- 2. MOVIMENTAÇÃO HORIZONTAL CONTÍNUA (A e D) ---
  if (keyIsDown(65)) { // Tecla 'A' (Esquerda)
    pudimX -= velocidadeHorizontal;
  }
  if (keyIsDown(68)) { // Tecla 'D' (Direita)
    pudimX += velocidadeHorizontal;
  }
  // Limita a posição X usando o RAIO do Pudim
  pudimX = constrain(pudimX, raioHitboxPudim, width - raioHitboxPudim);

  // --- 3. LÓGICA DE COLISÃO DO PUDIM COM OBSTÁCULOS ---
  verificarColisaoObstaculo();

  // --- 4. DESENHO DOS ELEMENTOS ---
  imageMode(CENTER);
  rectMode(CENTER);

  // Desenho dos Obstáculos (Cerejas)
  for (let i = 0; i < obstaculos.length; i++) {
    let obs = obstaculos[i];
    if (imgCereja) {
      image(imgCereja, obs.x, obs.y, obs.w, obs.h);
    } else {
      fill(corDestaque);
      rect(obs.x, obs.y, obs.w, obs.h);
    }
  }

  // Desenho do Pudim
  if (imgPudim) {
    image(imgPudim, pudimX, pudimY, larguraImg, alturaImg);
  }

  // Reseta os modos de volta para CORNER
  imageMode(CORNER);
  rectMode(CORNER);

  // Desenho da Plataforma Base
  desenharPlataforma(alturaChao);

  // Botão Voltar 
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80, imgBotaoVoltar);
}


/**
 * Função principal do p5.js: Inicializa o Canvas e variáveis.
 */
function setup() {
  createCanvas(800, 500);
  var larguraTotalGrupo = 3 * larguraBotao + 2 * espacamento;
  xInicialBotao = width / 2 - larguraTotalGrupo / 2;
  pudimXMenu = width / 2;

  // Inicialização do Pudim e Obstáculos
  reiniciarJogo();
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
  // Posição do botão VOLTAR/REINICIAR
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
      // Se estava no jogo, reinicia antes de voltar para o menu
      if (tela === 2) {
          reiniciarJogo();
      }
      tela = 1; // Volta para o Menu Principal
      return;
    }
  }
  
  // Lógica para a tela de Game Over (Tela 5)
  if (tela === 5) {
      if (
        mouseX >= xVoltar &&
        mouseX <= xVoltar + larguraBotao &&
        mouseY >= yVoltar &&
        mouseY <= yVoltar + alturaBotao
      ) {
          reiniciarJogo(); // Reinicia o jogo
          tela = 2;        // Vai para a Tela de Jogo
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

  // Pulo: Tecla ESPAÇO (32). Só permite pulo se estiver no chão
  if (keyCode === 32 && velocidadeY === 0) {
    velocidadeY = forcaPulo; 
  }
}