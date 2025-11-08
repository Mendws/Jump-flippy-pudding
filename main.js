// Variáveis de dimensão e espaçamento dos botões
var larguraBotao = 120;
var alturaBotao = 40;
var espacamento = 20; // Espaço entre os botões

// Variáveis das telas
var tela = 1; // Variável de controle: 1=Menu, 2=Jogo, 3=Instruções, 4=Créditos
var largura = 200;
var altura = 50;
var xMenu = 50;
var yMenu1 = 85;
var yMenu2 = 145;

// Variáveis de Posição dos Botões (Centro do Grupo)
var xInicialBotao;
var yBotao = 370; // Movido para baixo para dar espaço à plataforma e ao novo rodapé

// Cores (Hex para p5.js)
var corFundoCeu = "#FFDDEE"; // Rosa Pastel claro (Fundo)
var corFundoPlataforma = "#FFC0CB"; // Rosa Mais Escuro (Plataforma/Chão)
var corBordaBotao = "#AA4444"; // Vermelho Tijolo (Contorno)
var corFundoBotao = "#FFFFFF";
var corTextoBotao = "#664444";
var corTituloPrincipal = "#AA4444"; // Cor do texto do título
var corContornoTitulo = "#FFFFFF"; // Branco para o contorno do título
var corDestaque = "#FF0044"; // Vermelho Vivo (Hover/Cereja/Bloquinhos)
var corPudim = "#F8BBD0"; // Rosa mais claro para o corpo do pudim

// NOVAS CORES PARA SOMBRA E BRILHO DO PUDIM
var corSombraPudim = "#D89BAF"; // Rosa escuro para a sombra
var corBrilhoPudim = "#FFFFFF"; // Branco para o reflexo
// Fim das NOVAS CORES

var espessuraBorda = 4; // Espessura da borda Pixel Art

// VARIÁVEIS PARA O PUDIM NO MENU
var pudimLargura = 120; // Tamanho base para o desenho
var pudimAltura = 80;
var pudimXMenu;
var pudimYMenuBase = 240; // Posição Y base para que ele fique acima da plataforma
var pulso = 0; // Variável para o efeito de pulsação/flutuação

function setup() {
  createCanvas(800, 500);
  var larguraTotalGrupo = 3 * larguraBotao + 2 * espacamento;
  xInicialBotao = width / 2 - larguraTotalGrupo / 2;
  pudimXMenu = width / 2;
}

// --- Funções de Desenho Auxiliares (Plataforma, Pudim, Botão) ---

function desenharPlataforma(yPos) {
  noStroke();
  fill(corBordaBotao);
  rect(0, yPos - 10, width, height - yPos + 10);
  fill(corFundoPlataforma);
  rect(0, yPos, width, height - yPos, 20, 20, 0, 0);
  let yBloco = yPos - 10;
  let blocoTam = 10;
  fill(corDestaque);
  rect(pudimXMenu - 150, yBloco, blocoTam, blocoTam);
  rect(pudimXMenu - 135, yBloco, blocoTam, blocoTam);
  rect(pudimXMenu - 120, yBloco, blocoTam, blocoTam);
  rect(pudimXMenu + 60, yBloco, blocoTam, blocoTam);
  rect(pudimXMenu + 75, yBloco, blocoTam, blocoTam);
}

function desenharPudimMenu() {
  let deslocamentoY = sin(frameCount * 0.06) * 6;
  let x = pudimXMenu;
  let y = pudimYMenuBase + deslocamentoY;

  fill(corBordaBotao);
  rect(
    x - pudimLargura / 2 - 2,
    y - pudimAltura / 2 - 2,
    pudimLargura + 4,
    pudimAltura + 4,
    10
  );

  fill(corPudim);
  rect(
    x - pudimLargura / 2,
    y - pudimAltura / 2,
    pudimLargura,
    pudimAltura,
    10
  );

  fill(corSombraPudim);
  rect(
    x - pudimLargura / 2 + 5,
    y + pudimAltura / 2 - 15,
    pudimLargura - 10,
    15,
    0,
    0,
    8,
    8
  );
  rect(
    x + pudimLargura / 2 - 5,
    y - pudimAltura / 2 + 5,
    5,
    pudimAltura - 10,
    0,
    8,
    0,
    0
  );

  fill(corContornoTitulo);
  let asaLargura = 20;
  let asaAltura = 15;
  triangle(
    x - pudimLargura / 2 - asaLargura,
    y,
    x - pudimLargura / 2,
    y - asaAltura,
    x - pudimLargura / 2,
    y + asaAltura
  );
  triangle(
    x + pudimLargura / 2 + asaLargura,
    y,
    x + pudimLargura / 2,
    y - asaAltura,
    x + pudimLargura / 2,
    y + asaAltura
  );

  fill(corPudim);
  rect(
    x - pudimLargura / 2 + 5,
    y - pudimAltura / 2 - 5,
    pudimLargura - 10,
    10,
    5
  );

  fill(corBrilhoPudim);
  rect(x - pudimLargura / 2 + 10, y - pudimAltura / 2 - 5, 20, 5, 2);

  let feicaoTam = 5;
  fill(corBordaBotao);

  rect(x - 20, y, feicaoTam, feicaoTam);
  rect(x + 15, y, feicaoTam, feicaoTam);
  fill("#FFC0CB");
  rect(x - 30, y + 5, feicaoTam, feicaoTam);
  rect(x + 25, y + 5, feicaoTam, feicaoTam);
  fill(corBordaBotao);
  rect(x - 5, y + 10, feicaoTam * 2, feicaoTam / 2);
  fill(corDestaque);
  circle(x + 5, y - pudimAltura / 2 - 10, 15);
  fill(corTextoBotao);
  rect(x + 5, y - pudimAltura / 2 - 20, 2, 10);
}

function desenharBotao(texto, xPos, yPos) {
  var x = xPos;
  var y = yPos;
  var isHovering =
    mouseX >= x &&
    mouseX <= x + larguraBotao &&
    mouseY >= y &&
    mouseY <= y + alturaBotao;

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
  fill(corFundoBotao);
  rect(x, y, larguraBotao, alturaBotao, 8);
  fill(corTextoBotao);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(texto, x + larguraBotao / 2, y + alturaBotao / 2);
  return isHovering;
}

// --- TELAS SECUNDÁRIAS ---

function desenharTelaInstrucoes() {
  background(corFundoCeu);
  fill(corTituloPrincipal);
  textSize(40);
  textAlign(CENTER, TOP);
  text("INSTRUÇÕES", width / 2, 50);

  textSize(20);
  textAlign(LEFT, TOP);
  fill(corTextoBotao);
  text("1. Pressione espaço para fazer o Pudim Saltar", 100, 150);
  text("2. Aperte a tecla A ou D para controlar a direção do pudim,ou seja,\nesquerda ou direita", 100, 200);
  text("3. Evite os obstáculos de cereja e cair das plataformas ", 100, 260);
  text("4. Tente bater seu recorde!", 100, 300);

  // Botão Voltar
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80);
}

function desenharTelaCreditos() {
  background(corFundoCeu);
  fill(corTituloPrincipal);
  textSize(40);
  textAlign(CENTER, TOP);
  text("CRÉDITOS", width / 2, 50);

  textSize(20);
  textAlign(CENTER, TOP);
  fill(corTextoBotao);
  text("Design & Código: Raquel B. Mendes", width / 2, 150);
  text("Orientadores: Rummenigge Rudson Dantas e Orivaldo Vieira de Santana Junior", width / 2, 190);
  text("Feito com p5.js", width / 2, 230);

  // Botão Voltar
  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80);
}

function desenharTelaJogo() {
  background(corFundoCeu);
  fill(corTextoBotao);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("JOGO EM ANDAMENTO!", width / 2, height / 2);
  // Aqui você adicionará a física e os obstáculos reais do jogo.

  desenharBotao("VOLTAR", width / 2 - larguraBotao / 2, height - 80);

}


// --- FUNÇÃO PRINCIPAL: DRAW (Game Loop) ---

function draw() {
  noStroke();

  if (tela === 1) {
    // 🛑 Correção: Usar '===' para comparação.
    // TELA 1: MENU PRINCIPAL
    background(corFundoCeu);
    fill(corContornoTitulo);
    ellipse(width * 0.2, 180, 100, 60);
    ellipse(width * 0.8, 150, 120, 70);
    desenharPlataforma(270);
    desenharPudimMenu();
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

    textSize(25);
    fill(corTextoBotao);
    text("Jump flippy pudding", width / 2, 110);

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
    // TELA 2: JOGO (Game Loop real)
    desenharTelaJogo();
  } else if (tela === 3) {
    // TELA 3: INSTRUÇÕES
    desenharTelaInstrucoes();
  } else if (tela === 4) {
    // TELA 4: CRÉDITOS
    desenharTelaCreditos();
  }
}

// --- Ação de Clique (Mouse Pressed) ---

function mousePressed() {
  // Lógica para voltar do menu secundário para o principal (Telas 3 e 4)
  if (tela === 2|| tela === 3 || tela === 4) {
    // Posição do botão VOLTAR (que é centralizado)
    let xVoltar = width / 2 - larguraBotao / 2;
    let yVoltar = height - 80;

    if (
      mouseX >= xVoltar &&
      mouseX <= xVoltar + larguraBotao &&
      mouseY >= yVoltar &&
      mouseY <= yVoltar + alturaBotao
    ) {
      tela = 1; // Volta para o Menu Principal
      return; // Sai da função após o clique de voltar
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
