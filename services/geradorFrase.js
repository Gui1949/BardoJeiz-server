const fs = require("fs");
const path = require("path");

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let frasesJeiz = fs.readFileSync(
  path.resolve(__dirname, "../json/jeiz/dados.json")
);
frasesJeiz = JSON.parse(frasesJeiz);

let gerar_frase = () => {
  let artigo = frasesJeiz.artigos[getRandomInt(0, frasesJeiz.artigos.length)];

  //Filtra sujeito pelo tipo (masc ou fem)

  let sujeito = frasesJeiz.sujeitos.filter((suj) => suj.tipo == artigo.tipo);
  sujeito = sujeito[getRandomInt(0, sujeito.length)];

  //Filtra o verbo de ligação pelo tipo

  let verbo = frasesJeiz.verb_lig.filter(
    (ver) => ver.cat == sujeito.cat || sujeito.cat == "ambos"
  );
  verbo = verbo[getRandomInt(0, verbo.length)];

  //Filta o adjetivo com o verbo de ligação e sujeito

  let adj = frasesJeiz.pron_adj.filter(
    (pro) =>
      (pro.cat == verbo.cat || verbo.cat == "ambos") &&
      (pro.tipo == sujeito.tipo || pro.tipo == "ambos")
  );
  adj = adj[getRandomInt(0, adj.length)];

  return (
    artigo.palavra +
    " " +
    sujeito.palavra +
    " " +
    verbo.palavra +
    " " +
    adj.palavra
  );
};

exports.gerar_frase = gerar_frase