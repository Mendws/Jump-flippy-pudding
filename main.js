// ====================================================================
// === 1. VARIÁVEIS E CONSTANTES GLOBAIS ===
// ====================================================================

// --- Variáveis de Dimensão e Tela ---
var larguraBotao = 120;
var alturaBotao = 40;
var espacamento = 20;

var tela = 1; // 1=Menu, 2=Jogo, 3=Instruções, 4=Créditos
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
const ALTURA_TOPO_PLATAFORMA = -70; // Ajuste para o alinhamento visual da plataforma
const OFFSET_Y_AJUSTE = 70; // Deslocamento da física para o visual (340 - 300)

var pudimX;
var pudimY;
var velocidadeY;
var gravidade = 0.6;
var forcaPulo = -10;
var alturaChao = 300; // Y do "piso" base para cálculo da física

var larguraImg = 150;
var alturaImg = 120;

// Hitbox do Pudim
var larguraHitboxPudim = 95;
var alturaHitboxPudim = 75;

var velocidadeHorizontal = 6;

// Variáveis e Array de Obstáculos
var obstaculos = [];
var larguraObs = 50;
var alturaObs = 50;

// Hitbox da Cereja
var larguraHitbox = 35;
var alturaHitbox = 40;

// ====================================================================
// === 2. IMPORTS (Imagens e Fontes) ===
// ====================================================================

// --- Imagens ---
var fundo;
const URL_IMAGEM_FUNDO =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Fundoceu.png";

var imgPudim;
const URL_IMAGEM_PUDIM =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Pudim.png";

var imgCereja;
const URL_IMAGEM_CEREJA =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Cereja.png";

var imgPlataforma;
const URL_IMAGEM_PLATAFORMA =
  "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Plataforma_1.png";

// --- Fontes ---
let fonteTitulo; // Fonte principal para o título
const URL_FONTE_TITULO = "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Fonte star.ttf"; // Fonte do Título

let fonteSubTitulo; // Fonte para subtítulo e botões
const URL_FONTE_TEXT = "https://raw.githubusercontent.com/Mendws/Jump-flippy-pudding/main/assets/Fonte subtitulo.otf"; // Fonte do Subtítulo/Botões

/**
 * Carrega todos os assets antes de iniciar o setup.
 */
function preload() {
  // Carrega a imagem de fundo
  fundo = loadImage(
    URL_IMAGEM_FUNDO,
    () => { console.log("Imagem de fundo carregada com sucesso!"); },
    (e) => { console.error("Falha ao carregar imagem de fundo:", e); }
  );

  // Carrega a imagem do Pudim
  imgPudim = loadImage(
    URL_IMAGEM_PUDIM,
    () => { console.log("Imagem do Pudim carregada com sucesso!"); },
    (e) => { console.error("Falha ao carregar imagem Pudim:", e); }
  );

  // Carrega a imagem da Cereja
  imgCereja = loadImage(
    URL_IMAGEM_CEREJA,
    () => { console.log("Imagem da Cereja carregada com sucesso!"); },
    (e) => { console.error("Falha ao carregar imagem Cereja:", e); }
  );

  // Carrega a imagem da Plataforma
  imgPlataforma = loadImage(
    URL_IMAGEM_PLATAFORMA,
    () => { console.log("Imagem da Plataforma carregada com sucesso!"); },
    (e) => { console.error("Falha ao carregar imagem Plataforma:", e); }
  );

  // Carrega a fonte customizada para o título
  fonteTitulo = loadFont(
      URL_FONTE_TITULO, 
      () => { console.log("Fonte do Título (Buba) carregada com sucesso!"); }, 
      (e) => { console.error("Falha ao carregar fonte do Título:", e); }
  );
  
  // Carrega a fonte customizada para o subtítulo/botões
  fonteSubTitulo = loadFont(
      URL_FONTE_TEXT, 
      () => { console.log("Fonte do Subtítulo/Botões carregada com sucesso!"); }, 
      (e) => { console.error("Falha ao carregar fonte do Subtítulo:", e); }
  );
}

// ====================================================================
// === 3. FUNÇÕES DE COMPONENTES E AUXILIARES ===
// ====================================================================

/**
 * Função Construtora para os Obstáculos (Cerejas)
 */
function Obstaculo(x, y, w, h) {
  this.x = x; // Centro X
  this.y = y; // Centro Y
  this.w = w;
  this.h = h;
}

/**
 * Função de desenho da Plataforma/Chão.
 */
function desenharPlataforma(yPos) {
  noStroke();

  let alturaDoTopo = ALTURA_TOPO_PLATAFORMA;

  // Desenha a Plataforma usando a imagem esticada para baixo
  if (imgPlataforma) {
    imageMode(CORNER);
    let yInicioImagem = yPos - alturaDoTopo;
    let alturaImagemTotal = height - yInicioImagem;
    image(imgPlataforma, 0, yInicioImagem, width, alturaImagemTotal);
  } else {
    // Fallback: Desenha o fundo sólido
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
  // Efeito Flutuação
  let deslocamentoY = sin(frameCount * 0.06) * 6;
  let x = pudimXMenu;
  let y = pudimYMenuBase + deslocamentoY; 

  // Desenha a imagem do Pudim
  if (imgPudim) {
    imageMode(CENTER);
    image(imgPudim, x, y, larguraImg, alturaImg);
    imageMode(CORNER);
  } else {
    // Desenho de fallback
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
function desenharBotao(texto, xPos, yPos) {
  var x = xPos;
  var y = yPos;
  var isHovering =
    mouseX >= x &&
    mouseX <= x + larguraBotao &&
    mouseY >= y &&
    mouseY <= y + alturaBotao;

  // Contorno
  if (isHovering) {
    fill(corDestaque);
  } else {
    fill(corBordaBotao);
  }
  rect(
    x - espessuraBorda,
    y - espessuraBorda,
    larguraBotao + espessuraBorda * 2,
    alturaBotao + espessuraBorda * 2,
    8
  );
  // Fundo
  fill(corFundoBotao);
  rect(x, y, larguraBotao, alturaBotao, 8);
  
  // Texto (usa fonteSubTitulo)
  if (fonteSubTitulo) {
    textFont(fonteSubTitulo); 
  } else {
    textFont('sans-serif');
  }
  textSize(10); // Tamanho reduzido para pixel art
  fill(corTextoBotao);
  textAlign(CENTER, CENTER);
  text(texto, x + larguraBotao / 2, y + alturaBotao / 2 + 2); // Ajuste vertical
  
  return isHovering;
}

// ====================================================================
// === 4. FUNÇÕES DE TELAS ===
// ====================================================================

/**
 * Desenha a Tela de Instruções.
 */
function desenharTelaInstrucoes() {
  background(fundo); // ALTERADO: Usa a imagem de fundo 'fundo'
  fill(corTituloPrincipal);
  
  // Título: Usa fonteTitulo
  if (fonteTitulo) {
    textFont(fonteTitulo);
  } else {
    textFont('sans-serif');
  }
  textSize(40);
  textAlign(CENTER, TOP);
  text("INSTRUÇÕES", width / 2, 50);

  // Corpo do Texto: Usa fonteSubTitulo
  if (fonteSubTitulo) {
    textFont(fonteSubTitulo); 
  } else {
    textFont('sans-serif');
  }
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

  // Botão Voltar
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80);
}

/**
 * Desenha a Tela de Créditos.
 */
function desenharTelaCreditos() {
  background(fundo); // ALTERADO: Usa a imagem de fundo 'fundo'
  fill(corTituloPrincipal);
  
  // Título: Usa fonteTitulo
  if (fonteTitulo) {
    textFont(fonteTitulo);
  } else {
    textFont('sans-serif');
  }
  textSize(40);
  textAlign(CENTER, TOP);
  text("CRÉDITOS", width / 2, 50);

  // Corpo do Texto: Usa fonteSubTitulo
  if (fonteSubTitulo) {
    textFont(fonteSubTitulo); 
  } else {
    textFont('sans-serif');
  }
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

  // Botão Voltar
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80);
}

/**
 * Desenha a Tela de Jogo e executa a lógica de física e colisão.
 */
function desenharTelaJogo() {
  background(fundo); // ALTERADO: Usa a imagem de fundo 'fundo'
  fill(corTextoBotao);
  
  // --- 1. FÍSICA E COLISÃO COM O CHÃO ---
  velocidadeY += gravidade;
  pudimY += velocidadeY;

  // Novo Y do Chão (Topo Visual da Grama, onde a física deve parar)
  const CHAO_FISICA_Y = alturaChao + OFFSET_Y_AJUSTE;
  const PUDIM_CHAO_Y = CHAO_FISICA_Y - alturaHitboxPudim / 2;

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
  pudimX = constrain(pudimX, larguraHitboxPudim / 2, width - larguraHitboxPudim / 2);

  // --- 3. LÓGICA DE COLISÃO DO PUDIM COM OBSTÁCULOS ---
  let pudimEsquerda = pudimX - larguraHitboxPudim / 2;
  let pudimDireita = pudimX + larguraHitboxPudim / 2;
  let pudimTopo = pudimY - alturaHitboxPudim / 2;
  let pudimBase = pudimY + alturaHitboxPudim / 2;

  let w_hit_cereja = larguraHitbox;
  let h_hit_cereja = alturaHitbox;

  for (let i = 0; i < obstaculos.length; i++) {
    let obs = obstaculos[i];

    let obsEsquerda = obs.x - w_hit_cereja / 2;
    let obsDireita = obs.x + w_hit_cereja / 2;
    let obsTopo = obs.y - h_hit_cereja / 2;
    let obsBase = obs.y + h_hit_cereja / 2;

    // Colisão AABB (Axis-Aligned Bounding Box)
    let colisaoX = pudimDireita > obsEsquerda && pudimEsquerda < obsDireita;
    let colisaoY = pudimBase > obsTopo && pudimTopo < obsBase;

    if (colisaoX && colisaoY) {
      // Pouso no Topo do Obstáculo (só se estiver caindo)
      if (pudimBase > obsTopo && pudimBase < obsBase && velocidadeY > 0) {
        pudimY = obsTopo - alturaHitboxPudim / 2 + 5;
        velocidadeY = 0;
      } else {
        // Colisão Lateral (Bloqueio)
        let distanciaX = pudimX - obs.x;
        let sobreposicao = (larguraHitboxPudim / 2) + (w_hit_cereja / 2) - abs(distanciaX);

        if (sobreposicao > 0) {
          if (distanciaX > 0) { 
            pudimX += sobreposicao; // Empurra para a direita
          } else { 
            pudimX -= sobreposicao; // Empurra para a esquerda
          }
        }
      }
    }
  }

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
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80);
}


/**
 * Função principal do p5.js: Inicializa o Canvas e variáveis.
 */
function setup() {
  createCanvas(800, 500);
  var larguraTotalGrupo = 3 * larguraBotao + 2 * espacamento;
  xInicialBotao = width / 2 - larguraTotalGrupo / 2;
  pudimXMenu = width / 2;

  // Inicialização do Pudim e Posição inicial no topo da grama (Y=340)
  pudimX = 50;
  pudimY = alturaChao + OFFSET_Y_AJUSTE - alturaHitboxPudim / 2;
  velocidadeY = 0;

  // Inicializa obstáculos (Cerejas)
  let yObsCentro = alturaChao + OFFSET_Y_AJUSTE - alturaObs / 2;
  let centroX = width / 2;
  obstaculos.push(new Obstaculo(centroX - 160, yObsCentro, larguraObs, alturaObs));
  obstaculos.push(new Obstaculo(centroX + 160, yObsCentro, larguraObs, alturaObs));
}

// ====================================================================
// === 5. FUNÇÕES DE JOGABILIDADE/INTERAÇÃO ===
// ====================================================================

/**
 * Loop principal do jogo.
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
    if (fonteTitulo) { 
        textFont(fonteTitulo);
    } else {
        textFont('sans-serif'); 
    }

    textSize(50);
    textAlign(CENTER, TOP);
    var deslocamentoContorno = 2;

    // Contorno do Título
    fill(corContornoTitulo);
    text("Pudim Saltitante", width / 2 + deslocamentoContorno, 50);
    text("Pudim Saltitante", width / 2 - deslocamentoContorno, 50);
    text("Pudim Saltitante", width / 2, 50 + deslocamentoContorno);
    text("Pudim Saltitante", width / 2, 50 - deslocamentoContorno);

    // Título Principal
    fill(corTituloPrincipal);
    text("Pudim Saltitante", width / 2, 50);

    // --- SUBTÍTULO ---
    if (fonteSubTitulo) {
        textFont(fonteSubTitulo); 
    } else {
        textFont('sans-serif');
    }
    textSize(16);
    fill(corTextoBotao);
    text("Jump flippy pudding", width / 2, 110);
    
    // Botões
    var xBotaoJogar = xInicialBotao;
    var xBotaoInstrucoes = xInicialBotao + larguraBotao + espacamento;
    var xBotaoCreditos = xInicialBotao + 2 * larguraBotao + 2 * espacamento;

    desenharBotao("JOGAR", xBotaoJogar, yBotao);
    desenharBotao("INSTRUÇÕES", xBotaoInstrucoes, yBotao);
    desenharBotao("CRÉDITOS", xBotaoCreditos, yBotao);
    
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
  }
}

/**
 * Lógica de ação ao clicar com o mouse.
 */
function mousePressed() {
  // Lógica para voltar do menu secundário para o principal
  if (tela === 2 || tela === 3 || tela === 4) {
    let xVoltar = width / 2 - larguraBotao / 2;
    let yVoltar = height - 80;

    if (
      mouseX >= xVoltar &&
      mouseX <= xVoltar + larguraBotao &&
      mouseY >= yVoltar &&
      mouseY <= yVoltar + alturaBotao
    ) {
      tela = 1; // Volta para o Menu Principal
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

  // Pulo: Tecla ESPAÇO (32). Só permite pulo se estiver no chão (velocidadeY === 0)
  if (keyCode === 32 && velocidadeY === 0) {
    velocidadeY = forcaPulo; 
  }
}