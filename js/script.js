const carrossel = document.querySelector(".carrossel");
const trilho = document.querySelector(".carrossel-trilho");

const botaoAnterior = document.querySelector(".anterior");
const botaoProximo = document.querySelector(".proximo");

let estaMovendo = false;
let intervaloAutomatico;


/* =========================
   TAMANHO DO MOVIMENTO
========================= */

function obterDeslocamento() {

    const primeiroCard =
        trilho.querySelector(".card-trabalho");

    const larguraCard =
        primeiroCard.getBoundingClientRect().width;

    const estilosTrilho =
        getComputedStyle(trilho);

    const gap =
        parseFloat(estilosTrilho.gap) || 0;

    return larguraCard + gap;
}


/* =========================
   PRÓXIMO PRODUTO
========================= */

function proximoProduto() {

    if (estaMovendo) return;

    estaMovendo = true;

    const deslocamento = obterDeslocamento();

    trilho.style.transition =
        "transform 0.6s ease";

    trilho.style.transform =
        `translateX(-${deslocamento}px)`;


    trilho.addEventListener(
        "transitionend",
        function finalizarMovimento() {

            trilho.appendChild(
                trilho.firstElementChild
            );

            trilho.style.transition = "none";
            trilho.style.transform = "translateX(0)";

            estaMovendo = false;

            trilho.removeEventListener(
                "transitionend",
                finalizarMovimento
            );
        }
    );
}


/* =========================
   PRODUTO ANTERIOR
========================= */

function produtoAnterior() {

    if (estaMovendo) return;

    estaMovendo = true;

    const deslocamento = obterDeslocamento();

    const ultimoCard =
        trilho.lastElementChild;

    trilho.insertBefore(
        ultimoCard,
        trilho.firstElementChild
    );

    trilho.style.transition = "none";

    trilho.style.transform =
        `translateX(-${deslocamento}px)`;


    /*
       Força o navegador a reconhecer
       a posição inicial antes da animação.
    */

    trilho.offsetHeight;


    trilho.style.transition =
        "transform 0.6s ease";

    trilho.style.transform =
        "translateX(0)";


    trilho.addEventListener(
        "transitionend",
        function finalizarMovimento() {

            estaMovendo = false;

            trilho.removeEventListener(
                "transitionend",
                finalizarMovimento
            );
        }
    );
}


/* =========================
   BOTÕES
========================= */

botaoProximo.addEventListener(
    "click",
    proximoProduto
);

botaoAnterior.addEventListener(
    "click",
    produtoAnterior
);


/* =========================
   CARROSSEL AUTOMÁTICO
========================= */

function iniciarAutomatico() {

    clearInterval(intervaloAutomatico);

    intervaloAutomatico = setInterval(
        proximoProduto,
        5000
    );
}

iniciarAutomatico();


/* =========================
   PAUSA AO PASSAR O MOUSE
========================= */

carrossel.addEventListener(
    "mouseenter",
    () => {

        clearInterval(intervaloAutomatico);

    }
);


carrossel.addEventListener(
    "mouseleave",
    () => {

        iniciarAutomatico();

    }
);