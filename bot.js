const fs = require("fs");
const fetch = require("node-fetch");
const GoogleImages = require("google-images");
const ahNegao = require('./bots/ahnegao.js')
const wikiHow = require('./bots/wikihow.js')
const buzzFeed = require('./bots/buzzfeed.js')
const client = new GoogleImages(
  "partner-pub-4228098010894354:5271861158",
  "AIzaSyDyZJg8XvB8FtI40o8VDM7muck6fKUpnNY"
);
const { image_search } = require("duckduckgo-images-api");
const { gerar_frase } = require("./services/geradorFrase");

const path = require("path");
let promopinga = fs.readFileSync(
  path.resolve(__dirname, "./json/promopinga/dados.json")
);
promopinga = JSON.parse(promopinga);

let frasesJeiz = fs.readFileSync(
  path.resolve(__dirname, "./json/jeiz/dados.json")
);
frasesJeiz = JSON.parse(frasesJeiz);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let base = "http://localhost:8180"

function bot_jeiz() {
  try {
    tipo_frase = getRandomInt(0, 10);

    if (tipo_frase <= 5) {
      desc = gerar_frase();
    } else {
      desc = frasesJeiz.descricao[getRandomInt(0, frasesJeiz.descricao.length)];
    }

    let img_aleatoria = "";

    async function puxar_img() {
      await client
        .search(desc)
        .then((images) => {
          let i = getRandomInt(0, 10);
          img_aleatoria = images[i].url;
          let userpic =
            "https://www.osaogoncalo.com.br/img/Artigo-Destaque/80000/1_marcos_oliveira_como_beicola_em_a_grande_familia_00087132_0.jpg?xid=236127";
          let name = "Jeiz";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria);
          data.append("photo_pic", userpic);
          data.append("description", desc);
          data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot JEIZ rodou");
            }
          });
        })
        .catch((err) => {
          console.log("Erro:", err);
          console.log("Mudando para DuckDuckGo");

          image_search({ query: desc, moderate: true, iterations: 2 }).then(
            (results) => {
              let i = getRandomInt(0, results.length);
              img_aleatoria = results[i].image;

              let userpic =
                "https://www.osaogoncalo.com.br/img/Artigo-Destaque/80000/1_marcos_oliveira_como_beicola_em_a_grande_familia_00087132_0.jpg?xid=236127";
              let name = "Jeiz";
              let apiUrl = base + "/data/bot_upload";

              if (img_aleatoria.includes("x-raw-image")) {
                throw new Error("001 - X-RAW IMAGE");
              }

              let FormData = require("form-data");
              let data = new FormData();

              data.append("photo", img_aleatoria);
              data.append("photo_pic", userpic);
              data.append("description", desc);
              data.append("username", name);

              fetch(apiUrl, {
                method: "POST",
                body: data,
              }).then(function (response) {
                if (response.ok) {
                  console.log("Bot JEIZ rodou");
                }
              });
            }
          );
        });
    }

    puxar_img();

    try {
      let url_X = "https://twitter-do-jeiz.onrender.com/tweet";

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/2023.5.8",
          token: "12dwaFSXk8gIAripWWifSMmQeeTYjm_x9hMlNj4sdso",
        },
        body: `{"texto":"${desc} - Via Bar do Jeiz"}`,
      };

      fetch(url_X, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error("error:" + err));
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_ze() {
  try {
    let getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    let descricao = promopinga.frases;

    let links = promopinga.links;

    let desc = descricao[getRandomInt(0, descricao.length)];

    links = links[getRandomInt(0, links.length)];

    desc = desc + " " + links;

    let img_aleatoria = "";

    async function puxar_img() {
      try {
        await client.search(desc).then((images) => {
          let i = getRandomInt(0, 10);
          img_aleatoria = images[i].url;
          let userpic =
            "https://pbs.twimg.com/profile_images/1752465696603136000/3BZvubBm_400x400.jpg";
          let name = "Zé da Pinga Promoções";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

            desc = desc.split(':');

            data.append("photo", img_aleatoria);
            data.append("photo_pic", userpic);
            data.append("description", desc[0]);
            data.append("link",  desc[1] + ":" + desc[2]);
            data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot pinga rodou");
            }
          });
        });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({ query: desc, moderate: true, iterations: 2 }).then(
          (results) => {
            let i = getRandomInt(0, results.length);
            img_aleatoria = results[i].image;

            let userpic =
              "https://pbs.twimg.com/profile_images/1752465696603136000/3BZvubBm_400x400.jpg";
            let name = "Zé da Pinga Promoções";
            let apiUrl = base + "/data/bot_upload";

            if (img_aleatoria.includes("x-raw-image")) {
              throw new Error("001 - X-RAW IMAGE");
            }

            let FormData = require("form-data");
            let data = new FormData();
            
            desc = desc.split(':');

            data.append("photo", img_aleatoria);
            data.append("photo_pic", userpic);
            data.append("description", desc[0]);
            data.append("link",  desc[1] + ":" + desc[2]);
            data.append("username", name);

            fetch(apiUrl, {
              method: "POST",
              body: data,
            }).then(function (response) {
              if (response.ok) {
                console.log("Bot pinga rodou");
              }
            });
          }
        );
      }
    }
    puxar_img();

    try {
      let url_X = "https://twitter-do-jeiz.onrender.com/promopinga/tweet";

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/2023.5.8",
          token: "12dwaFSXk8gIAripWWifSMmQeeTYjm_x9hMlNj4sdso",
        },
        body: `{"texto":"${desc}"}`,
      };

      fetch(url_X, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error("error:" + err));
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_dona_sonia() {
  try {
    const date = new Date();
    let time = date.getHours() - 3;

    if (time >= 8 && time <= 12) {
      let descricao_ = [
        "BOM DIA ALEGRIA!",
        "BOM DIA FLORES DO CAMPO, AMO TODOS VOCÊS",
      ];

      desc__ = descricao_[getRandomInt(0, descricao_.length)];

      let img_aleatoria = "";

      async function puxar_img() {
        try {
          await client.search("bom dia gif").then((images) => {
            let i = getRandomInt(0, 10);
            img_aleatoria = images[i].url;
            let userpic =
              "https://www.bahianoticias.com.br/fotos/holofote_noticias/23237/IMAGEM_NOTICIA_5.jpg";
            let name = "Dona Sônia";
            let apiUrl = base + "/data/bot_upload";

            if (img_aleatoria.includes("x-raw-image")) {
              throw new Error("001 - X-RAW IMAGE");
            }

            let FormData = require("form-data");
            let data = new FormData();

            data.append("photo", img_aleatoria);
            data.append("photo_pic", userpic);
            data.append("description", desc__);
            data.append("username", name);

            fetch(apiUrl, {
              method: "POST",
              body: data,
            }).then(function (response) {
              if (response.ok) {
                console.log("Bot sonia rodou");
              }
            });
          });
        } catch (err) {
          console.log("Erro:", err);
          console.log("Mudando para DuckDuckGo");

          image_search({ query: desc__, moderate: false, iterations: 2 }).then(
            (results) => {
              console.log(results);
              let i = getRandomInt(0, results.length);
              img_aleatoria = results[i].image;

              let userpic =
                "https://www.bahianoticias.com.br/fotos/holofote_noticias/23237/IMAGEM_NOTICIA_5.jpg";
              let name = "Dona Sônia";
              let apiUrl = base + "/data/bot_upload";

              if (img_aleatoria.includes("x-raw-image")) {
                throw new Error("001 - X-RAW IMAGE");
              }

              let FormData = require("form-data");
              let data = new FormData();

              data.append("photo", img_aleatoria);
              data.append("photo_pic", userpic);
              data.append("description", desc__);
              data.append("username", name);

              fetch(apiUrl, {
                method: "POST",
                body: data,
              }).then(function (response) {
                if (response.ok) {
                  console.log("Bot sonia rodou");
                }
              });
            }
          );
        }
      }
      puxar_img();
    }

    if (time >= 16 && time <= 19) {
      let descricao_ = [
        "BOA TARDE MEUS ANJOS!",
        "BOA TARDE QUE DEUS ABENSOE VCS",
      ];

      desc__ = descricao_[getRandomInt(0, descricao_.length)];

      let img_aleatoria = "";

      async function puxar_img() {
        try {
          await client.search("boa tarde gif").then((images) => {
            let i = getRandomInt(0, 10);
            img_aleatoria = images[i].url;
            let userpic =
              "https://www.bahianoticias.com.br/fotos/holofote_noticias/23237/IMAGEM_NOTICIA_5.jpg";
            let name = "Dona Sônia";
            let apiUrl = base + "/data/bot_upload";

            if (img_aleatoria.includes("x-raw-image")) {
              throw new Error("001 - X-RAW IMAGE");
            }

            let FormData = require("form-data");
            let data = new FormData();

            data.append("photo", img_aleatoria);
            data.append("photo_pic", userpic);
            data.append("description", desc__);
            data.append("username", name);

            fetch(apiUrl, {
              method: "POST",
              body: data,
            }).then(function (response) {
              if (response.ok) {
                console.log("Bot sonia rodou");
              }
            });
          });
        } catch (err) {
          console.log("Erro:", err);

          image_search({ query: desc__, moderate: false, iterations: 2 }).then(
            (results) => {
              console.log(results);
              let i = getRandomInt(0, results.length);
              img_aleatoria = results[i].image;

              let userpic =
                "https://www.bahianoticias.com.br/fotos/holofote_noticias/23237/IMAGEM_NOTICIA_5.jpg";
              let name = "Dona Sônia";
              let apiUrl = base + "/data/bot_upload";

              if (img_aleatoria.includes("x-raw-image")) {
                throw new Error("001 - X-RAW IMAGE");
              }

              let FormData = require("form-data");
              let data = new FormData();

              data.append("photo", img_aleatoria);
              data.append("photo_pic", userpic);
              data.append("description", desc__);
              data.append("username", name);

              fetch(apiUrl, {
                method: "POST",
                body: data,
              }).then(function (response) {
                if (response.ok) {
                  console.log("Bot sonia rodou");
                }
              });
            }
          );
        }
      }
      puxar_img();
    }

    if (time >= 19 && time <= 23) {
      let descricao_ = [
        "BOA NOITE A TODOS, BONS SONHOS, QUE DEUS ELIMINE VOCES",
        "BOA NOITE MEUS ANJOS, DURMAM BEM",
      ];

      desc__ = descricao_[getRandomInt(0, descricao_.length)];

      let img_aleatoria = "";

      async function puxar_img() {
        try {
          await client.search("boa noite jesus gif").then((images) => {
            let i = getRandomInt(0, 10);
            img_aleatoria = images[i].url;
            let userpic =
              "https://www.bahianoticias.com.br/fotos/holofote_noticias/23237/IMAGEM_NOTICIA_5.jpg";
            let name = "Dona Sônia";
            let apiUrl = base + "/data/bot_upload";

            if (img_aleatoria.includes("x-raw-image")) {
              throw new Error("001 - X-RAW IMAGE");
            }

            let FormData = require("form-data");
            let data = new FormData();

            data.append("photo", img_aleatoria);
            data.append("photo_pic", userpic);
            data.append("description", desc__);
            data.append("username", name);

            fetch(apiUrl, {
              method: "POST",
              body: data,
            }).then(function (response) {
              if (response.ok) {
                console.log("Bot sonia rodou");
              }
            });
          });
        } catch (err) {
          console.log("Erro:", err);

          image_search({ query: desc__, moderate: false, iterations: 2 }).then(
            (results) => {
              console.log(results);
              let i = getRandomInt(0, results.length);
              img_aleatoria = results[i].image;

              let userpic =
                "https://www.bahianoticias.com.br/fotos/holofote_noticias/23237/IMAGEM_NOTICIA_5.jpg";
              let name = "Dona Sônia";
              let apiUrl = base + "/data/bot_upload";

              if (img_aleatoria.includes("x-raw-image")) {
                throw new Error("001 - X-RAW IMAGE");
              }

              let FormData = require("form-data");
              let data = new FormData();

              data.append("photo", img_aleatoria);
              data.append("photo_pic", userpic);
              data.append("description", desc__);
              data.append("username", name);

              fetch(apiUrl, {
                method: "POST",
                body: data,
              }).then(function (response) {
                if (response.ok) {
                  console.log("Bot sonia rodou");
                }
              });
            }
          );
        }
      }
      puxar_img();
    }
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_blogueirinha() {
  try {
    let descricao_ = [
      "Faça da tua alma teu próprio jardim.",
      "Quem foi que disse que é impossível ser feliz sozinho? Vivo tranquilo, a liberdade é quem me faz carinho.",
      "Viver, se envolver, se entregar, se encantar!",
      "O mundo está nas mãos daqueles que têm a coragem de sonhar e de correr o risco de viver seus sonhos. ",
      "Não pare até se orgulhar de você.",
      "Arriscar é ser feliz na tentativa.",
      "Na vida você sempre tem a oportunidade de transformar o mundo em um local mais bonito e alegre!",
      "Deus sabe quem coloca na sua vida, da mesma forma que sabe quem tira.",
      "Para quem acredita e persiste, um sonho nunca morre, ele apenas pode ser adiado.",
      "Tenha coragem para viver a vida do jeito que você quer.",
      "O sucesso é a soma de pequenos esforços repetidos todos os dias.",
      "Alegria e tristeza caminham de mão dadas, por isso é necessário não priorizar nenhuma delas, apenas senti-las no momento em que vierem.",
      "Um dia você ainda vai olhar para trás e ver que os problemas eram apenas degraus que te levaram à vitória.",
      "Seja de verdade em tudo que você faz.",
      "A beleza começa quando você decide ser você mesmo.",
      "Todas as coisas encontram seu lugar quando a gente encontra o nosso!",
      "Não pergunte o porquê das coisas, apenas deixe que elas aconteçam.",
      "E você descobrirá que esperar não é a melhor maneira de ser livre.",
      "A vida começa no final da sua zona de conforto.",
      "A vida não é um problema para resolver, mas uma realidade para experimentar.",
      "Uma pequena mudança positiva pode mudar todo o seu dia – ou toda a sua vida.",
      "Nunca deixe suas memórias serem maiores que seus sonhos.",
      "Nunca deixe ninguém te fazer sentir que você não merece o que quer.",
      "Felicidade não é algo que já está feito. Isso vem de suas ações. ",
      "Os obstáculos na vida nos amadurecem, os sucessos nos fazem refletir e os fracassos nos fazem crescer.",
      "Esperar não é perder tempo! Esperar é fruto de uma escolha de quem prioriza o que é eterno e não passageiro.",
      "Espalhe coisa boa, porque a gente merece e o mundo precisa!",
      "Nenhum obstáculo é tão grande se sua vontade de vencer não for maior.",
      "Faça e refaça aquilo que te deixa feliz.",
      "Eu vos digo: é preciso, às vezes, ter um pouco de caos dentro de si, para poder dar a luz uma estrela dançante",
      "Ser, sobretudo, o melhor de mim!",
      "Estar preparado é importante, saber esperar é ainda mais, mas tirar proveito do momento certo é a chave para a vida.",
      "Não deixe a vida acabar com você; todo mundo que foi longe teve que começar do nada",
      "Ser feliz não significa que tudo está perfeito. Significa que você decidiu olhar além das imperfeições.",
      "Sempre parece impossível até estar feito.",
      "No final, só nos arrependemos das oportunidades que não aproveitamos.",
      "Tudo que temos é o agora.",
      "A vida não é um problema para ser resolvido, mas uma realidade para ser vivenciada.",
      "O silêncio fala quando as palavras não conseguem.",
      "Todo novo dia é uma chance para mudar a sua vida.",
      "Não tenha medo de falhar, tenha medo de não tentar.",
      "O melhor ainda está por vir.",
      "A vida não precisa ser perfeita para ser feliz",
      "Não precisa caçar muito pra encontrar a alegria, ela às vezes está escondida nas coisas do dia a dia.",
      "Seja livre da opinião alheia e de toda pressão para ser perfeita o tempo todo.",
      "Momentos especiais, esses valem a pena de serem lembrados e revividos no coração.",
      "Não fique esperando o futuro para ser feliz, faça do presente a sua alegria.",
      "Nunca saberemos o quão forte somos até que ser forte seja a única escolha.",
      "Por um instante, se deixe em paz.",
      "Dê mais valor para quem se importa realmente com você. Assim terá mais motivos para ser feliz!",
    ];

    desc_ = descricao_[getRandomInt(0, descricao_.length)];

    let img_aleatoria = "";

    async function puxar_img() {
      try {
        await client.search("bunda rebolando").then((images) => {
          let i = getRandomInt(0, 10);
          img_aleatoria = images[i].url;
          let userpic =
            "https://wp-cdn.etiquetaunica.com.br/blog/wp-content/uploads/2018/08/11122702/capa-post-top-blogueiras-brasileiras-compressed.jpg";
          let name = "Julcimara Blog";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot JEIZ rodou");
            }
          });
        });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({
          query: "bunda rebolando",
          moderate: true,
          iterations: 2,
        }).then((results) => {
          console.log(results);
          let i = getRandomInt(0, results.length);
          let img_aleatoria_ = results[i].image;

          var userpic_julcimara =
            "https://wp-cdn.etiquetaunica.com.br/blog/wp-content/uploads/2018/08/11122702/capa-post-top-blogueiras-brasileiras-compressed.jpg";
          var name1 = "Julcimara Blog";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic_julcimara);
          data.append("description", desc_);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot Julcimara rodou");
            }
          });
        });
      }
    }
    puxar_img();
  } catch (err) {
    console.log("Erro: ", err);
  }
}

// function bot_jacksons() {
//   let Jimp = require("jimp");

//   let superiorArray = [
//     "vou falar só uma vez",
//     "tem um viado me olhando",
//     "todo mundo",
//     "as vezes no silencio da noite",
//     "ae, na moral",
//     "fala aí",
//     "só tem corno nesse porra",
//     "ei gatinha",
//     "me ve uma dose aí",
//     "cara, se liga",
//     "ei",
//     "aew papito",
//     "homem q eh homem",
//     "to lendo aq",
//     "PARA PARA PARA",
//     "quando falarem mal de vc",
//     "ei, tu foi no passeio?",
//     "aí mermão",
//     "as vezes eu fico pensando",
//     "to felizão aqui",
//     "ta vendo ali?",
//     "ce ta ligado ne",
//     "aew novinha",
//     "beleza entao",
//     "cara",
//     "caralho mano",
//     "ei pessoal, ei pessoal",
//     "ae mermao",
//     "to felizao",
//     "quer saber",
//     "tua veia",
//     "ei trosha",
//   ];

//   let inferiorArray = [
//     "vai toma no cu aew",
//     "tu eh korno que eu sei",
//     "agora ele ta disfarçando",
//     "da muito eh o cu",
//     "pega no meu pau",
//     "como q tu eh tão corno?",
//     "to mentindo?",
//     "me da uma mamadinha",
//     "caralho",
//     "pega na minha pika",
//     "vai se fude",
//     "para de ser trosha",
//     "comi seu pai",
//     "sua mae sabe q tu eh?",
//     "caga na mão e come",
//     "q tu eh corno",
//     "para de ser trosha",
//     "foda-se porra",
//     "passei o pal na tua cara",
//     "porra, vai toma no cu porra",
//     "sei la caralho",
//     "tua mae eh minha",
//     "ala teu pai",
//     "pode passar o redondo",
//     "toma no cu viu",
//     "fica de boa aew porra",
//     "tu eh mo trosha pqp",
//     "pega no meu pal q te levo a portugal",
//     "vai pra puta q te pariu",
//     "teu cu eh meu trosha",
//     "uma hora dessa ta dando na zona",
//     "fecha o cu pra falar cmg porra",
//   ];

//   console.log(imagens);

//   fs.readdir(pasta_img, (err, files) => {
//     files.forEach((file) => {
//       imagens.push(file);
//     });
//     var fileName = "./img/" + imagens[getRandomInt(0, imagens.length)];
//     var topoImagem = superiorArray[getRandomInt(0, superiorArray.length)];
//     var bottomImagem = inferiorArray[getRandomInt(0, inferiorArray.length)];
//     let loadedImage;

//     let nome_img = "bot" + "-" + Date.now() + ".jpeg";

//     Jimp.read(fileName)
//       .then(function (image) {
//         loadedImage = image;
//         return Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
//       })
//       .then(function (font) {
//         loadedImage.resize(276, 183);
//         loadedImage.print(font, 10, 10, topoImagem).write(nome_img);
//         loadedImage.print(font, 10, 150, bottomImagem).write(nome_img);

//         var userpic = "tiozao.jpg";
//         var name = "Jacksons";
//         let apiUrl = base + "/data/upload";

//         var FormData = require("form-data");
//         var data = new FormData();
//         const fetch = require("node-fetch");

//         data.append("photo", fs.createReadStream(nome_img));
//         data.append("photo_pic", userpic);
//         data.append("description", "XD");
//         data.append("username", name);

//         fetch(apiUrl, {
//           method: "POST",
//           body: data,
//         }).then(function (response) {
//           if (response.ok) {
//             console.log("Bot Jacksons rodou");
//           }
//         });
//       })
//       .catch(function (err) {
//         console.error(err);
//       });
//   });
// }

function bot_bolsonarista() {
  try {
    let descricao_bolsonarista = [
      "O QUE FALTA NOBRASIL E UMA GUERRA CIVIL",
      "BOSLONARO TME QUE DAR GOLPE E TIRAR LYLA DO PODER",
      "COMUNISTSAS SUJOS SAFADOS PORCOS",
      "BOLSONROAR VAI VOLTAR E VOCES PORCOS ESTARAO LASCADOS",
      "SERGIO MORO PRESIDERNTE",
      "LULA QUER TORNAR O BRASIL GAY",
      "ABAIXOAO COMUNISMO E SOCIALISMO BOLSONARO SEMPRE",
      "DEUS ABENÇOES NOSSA PATRIA AMADA BRASIL",
      "SOU PATRIOTA, OS MILITARES SÃO A SALVAÇÃO DO NOSSO PAIS",
      "FIQUEI ACAMPADO 32 DIAS NA FRENTE DO QUARTEL PARA GARANTIR O GFUTURO DA NSOSSA NASSAO",
      "POBRES ESQUERDISTAS, NAO SABEM QUE ISSO VAI VIRAR UMA VENEZUELA",
      "O LULA TEM ENVOLVIMENTO E É CHEFE DO PCC , BOLSONARO PRECISAV VOLRAR PRA TIRAR PTRALHADA",
      "FORA PTRALHADA FORA DILMA FORA LULA FORA TDOS VOCES SUJOS TRAIDORES DA DEMOCRACIA",
      "BOLSONARO E PRESIDENTE DE VERDADE HOMEM BIRIRL VIRILIDADE E FE NA NOÇÇA NACAO",
      "VOLTA BOLSONARO PELOAMORDEDEUS",
      "BOLSONARO VAI DAR GOLPE JUNTO AS FORÇAS AMADAS DO NOSSO BRASIL",
      "FORÇAS ARMADAS SALVEM O BRASIL",
      "REDE GLOVOBOSTA ESQUERDALHA MENTIROSOS APOIAO O LUAL",
      "AS GORÇAS ASRMADASD JA DEVERIAM TER TIRADO L O LYLLA DO PODER VOLTA BOLSOONRARO",
      "BOLSONARO O BRASILV ESTA COM VOCE",
      "FAÇAO PIX PARA O BOLSONARO PARA ELE VOLTARA OAO PODER E DERRUBAR ALEANDRAE DE MORAES",
      "ALEXANDRA DE MORAESD LADRAO PTRALHA BOLSONOARO VAI TE DERRUBAR",
      "COM CERTEXXZA O STF VAI SER O PRIMEIRO A CAIR QUAND O OBLSONARO VOLTAR",
      "BOLSONARO E FAMILA SAO EZEMPLOS DE FAMILIA E VIRILIVDADEDE",
      "PARTRIA DEUS WE BRASIL A CIMASDE TUDO VOTE BOLSONARO",
    ];

    let desc_ =
      descricao_bolsonarista[getRandomInt(0, descricao_bolsonarista.length)];

    let img_aleatoria = "";

    async function puxar_img() {
      try {
        await client.search("bolsonaro mito").then((images) => {
          let i = getRandomInt(0, 10);
          let img_aleatoria = images[i].url;
          let userpic =
            "https://th.bing.com/th/id/OIP.ZoPDGJ5KbSZOvW-0NT76pAHaFj?pid=ImgDet&rs=1";
          let name = "EDIVALDO NUNES";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot EDIVALDO rodou");
            }
          });
        });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({
          query: "bolsonaro mito",
          moderate: false,
          iterations: 2,
        }).then((results) => {
          console.log(results);
          let i = getRandomInt(0, results.length);
          let img_aleatoria_ = results[i].image;

          let userpic =
            "https://th.bing.com/th/id/OIP.ZoPDGJ5KbSZOvW-0NT76pAHaFj?pid=ImgDet&rs=1";
          let name1 = "EDIVALDO NUNES";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot EDIVALDO rodou");
            }
          });
        });
      }
    }
    puxar_img();
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_piada() {
  try {
    let descricao_bolsonarista = ["risos risos risos"];

    let desc_ =
      descricao_bolsonarista[getRandomInt(0, descricao_bolsonarista.length)];

    let img_aleatoria = "";

    async function puxar_img() {
      try {
        await client.search("melhores piadas").then((images) => {
          let i = getRandomInt(0, 10);
          let img_aleatoria = images[i].url;
          let userpic =
            "https://caricatures.fr/private10/images/article/caricature/792.jpg";
          let name = "Toninho";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot toninho rodou");
            }
          });
        });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({
          query: "melhores piadas",
          moderate: false,
          iterations: 2,
        }).then((results) => {
          console.log(results);
          let i = getRandomInt(0, results.length);
          let img_aleatoria_ = results[i].image;

          let userpic =
            "https://caricatures.fr/private10/images/article/caricature/792.jpg";
          let name1 = "Toninho";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot EDIVALDO rodou");
            }
          });
        });
      }
    }
    puxar_img();
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_petista() {
  try {
    let descricao_bolsonarista = [
      "OS BONS TEMPOS VOLTARAM",
      "FORA BOLSONARO FASCISTA INELEGÍVEL",
      "CHE GUEVARA EU TE AMO",
      "04:20 HEIN... BORA LEGALIZAR",
      "ABAIXO A BURGUESIA PORRA",
      "CUBA E VENEZUELA SÃO EXEMPLOS PERFEITOS DO SOCIALISMO",
      "ESTOU COM MADURO!",
      "EI BOLSONARO VAI TOMAR NO CU",
      "CHE MATOU FOI POUCO",
      "PM BANDIDOS GOLPISTAS",
      "PROLETÁRIOS UNI-VOS",
      "O QUE FIZERAM COM A DILMA FOI GOLPE!",
      "PRIVATIZAÇÃO É O CARALHO",
    ];

    let desc_ =
      descricao_bolsonarista[getRandomInt(0, descricao_bolsonarista.length)];

    let img_aleatoria = "";

    async function puxar_img() {
      try {
        await client
          .search("COMUNISMO LULA SOCIALISMO PT CUBA")
          .then((images) => {
            let i = getRandomInt(0, images.length);
            let img_aleatoria = images[i].url;
            let userpic =
              "https://pt.org.br/wp-content/themes/pt_2016/assets/images/logos/logo-pt.png";
            let name = "Raimundo Silva";
            let apiUrl = base + "/data/bot_upload";

            if (img_aleatoria.includes("x-raw-image")) {
              throw new Error("001 - X-RAW IMAGE");
            }

            let FormData = require("form-data");
            let data = new FormData();

            data.append("photo", img_aleatoria);
            data.append("photo_pic", userpic);
            data.append("description", desc_);
            data.append("username", name);

            fetch(apiUrl, {
              method: "POST",
              body: data,
            }).then(function (response) {
              if (response.ok) {
                console.log("Bot PT rodou");
              }
            });
          });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({
          query: "COMUNISMO LULA SOCIALISMO PT CUBA",
          moderate: false,
          iterations: 2,
        }).then((results) => {
          console.log(results);
          let i = getRandomInt(0, results.length);
          let img_aleatoria_ = results[i].image;

          let userpic =
            "https://pt.org.br/wp-content/themes/pt_2016/assets/images/logos/logo-pt.png";
          let name1 = "Raimundo Silva";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot PT rodou");
            }
          });
        });
      }
    }
    puxar_img();
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_anime() {
  try {
    const descricao_bolsonarista = [
      "Não desista, não há vergonha em cair! A verdadeira vergonha é não se levantar novamente!",
      "Você pode morrer a qualquer momento, mas viver requer coragem.",
      "A vida não é um jogo de sorte. Se você quer vencer, trabalhe duro.",
      "Lembre-se da lição e não da decepção.",
      "Você não conhece as pessoas, você conhece apenas o que elas permitem que você veja.",
      "É mais importante dominar as cartas que você tem nas mãos do que reclamar das cartas que seu oponente recebeu.",
      "Se você não gosta do seu destino, não o aceite. Em vez disso, tenha a coragem para transformá-lo naquilo que você quer que ele seja.",
      "Se a sua vida pode mudar uma vez, ela pode mudar novamente.",
      "Você jamais deve desistir da vida, não importa o que aconteça. Não importa o quanto você queira desistir.",
      "Se você não consegue fazer algo, então não faça. Foque naquilo que consegue fazer.",
      "O mundo não é perfeito. Mas ele está aqui para nós, fazendo o melhor que pode... e é isso que o faz tão lindo!",
      "O que quer que você perca, você encontrará novamente. Mas aquilo que jogar fora, você nunca terá de volta.",
      "Você é apenas um idiota que nasceu com uma genética boa.",
      "Viver é comer, dormir e arrumar brigas.",
      "Eu estou cansado de não fazer nada, mas eu sou muito preguiçoso pra fazer alguma coisa.",
      "Há três coisas que não posso tolerar: covardia, cortes de cabelo ruins e insurreição militar, e é muito lamentável que nosso amigo Vegeta possua todas essas três.",
      "Você quer que eu diga a verdade ou continuamos amigos?",
      "Esta é uma peça mágica que suprime meus poderes mágicos. Se eu fosse tirar isso, uma grande catástrofe certamente aconteceria neste mundo... Ah, mentira. Eu só a uso mesmo para deixar o look mais estiloso.",
      "Se eu pudesse vender meu tédio, tenho certeza de que ficaria rico.",
      "Se você desviar os olhos das coisas tristes, elas acontecerão novamente um dia. Se você continuar fugindo, continuará repetindo os mesmos erros. É por isso que você precisa encarar a verdade diretamente.",
      "O medo não é malvado. Ele te mostra qual é a sua franqueza. E quando você conhece a sua franqueza, então pode se tornar mais forte e mais gentil.",
      "Pode ser difícil agora, mas você deve silenciar esses pensamentos. Pare de contar as coisas que você perdeu, o que se foi se foi. Então pergunte a si mesmo o que ainda resta para você.",
      "As pessoas mais solitárias são as mais gentis. As pessoas mais tristes sorriem mais. As pessoas mais machucadas são as mais sábias. Isso porque elas não desejam ver mais ninguém sofrer do jeito que sofreram.",
    ];

    let desc_ =
      descricao_bolsonarista[getRandomInt(0, descricao_bolsonarista.length)];

    let img_aleatoria = "";

    async function puxar_img() {
      try {
        await client.search("anime sombrio").then((images) => {
          let i = getRandomInt(0, 10);
          let img_aleatoria = images[i].url;
          let userpic =
            "https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png";
          let name = "Gabriel Sykes";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot otaku rodou");
            }
          });
        });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({
          query: "anime sombrio",
          moderate: false,
          iterations: 2,
        }).then((results) => {
          console.log(results);
          let i = getRandomInt(0, results.length);
          let img_aleatoria_ = results[i].image;

          let userpic =
            "https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png";
          let name1 = "Gabriel Sykes";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot otaku rodou");
            }
          });
        });
      }
    }
    puxar_img();
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_gringo() {
  let gringoArray = [
    `SO KOERANO
    E ODEIO BARZIL VOCES
    BRAZILEIRO É PORCO
    VOCE GOSTA DE FEIJOADA
    VOCE GOSTA DE CAIPIRINHA
    LULA DILMA ASASINO
    BRAIZL PORCOS
    CRIME OCORRE NADA ACONTECE FEIJOADA`,
  ];

  input = base + "/data/img/koerano.jpg";
  let desc = gringoArray[getRandomInt(0, gringoArray.length)];

  var userpic = base + "/data/img/KOERANO.jpeg";
  var name = "KOERANO";
  let apiUrl = base + "/data/bot_upload";

  var FormData = require("form-data");
  var data = new FormData();

  data.append("photo", input);
  data.append("photo_pic", userpic);
  data.append("description", desc);
  data.append("username", name);

  fetch(apiUrl, {
    method: "POST",
    body: data,
  }).then(function (response) {
    if (response.ok) {
      console.log("Bot KOERANO rodou");
    }
  });
}

function bot_merchan() {
  try {
    const merchanArray = [
      "Venha conhecer o Cabaré da Leila, o lugar perfeito para quem busca diversão e descontração! Aqui você encontra as mais belas dançarinas da região, bebidas de alta qualidade e um ambiente aconchegante e seguro. Não perca mais tempo e venha nos visitar!",
      "Quer sair da rotina e aproveitar uma noite incrível? Então venha para o Cabaré da Leila! Aqui você encontra as melhores atrações, incluindo shows de strip-tease, música ao vivo e muito mais. Nossa equipe de funcionários está pronta para recebê-lo e garantir que sua noite seja inesquecível!",
      "Se você procura um lugar onde possa se divertir sem preocupações, o Cabaré da Leila é o lugar certo! Aqui você encontra um ambiente seguro e discreto, com as melhores bebidas e as mais belas dançarinas da região. Venha nos visitar e descubra por que somos considerados o melhor cabaré da cidade!",
      "Não perca mais tempo procurando um lugar para se divertir! O Cabaré da Leila é o local perfeito para quem busca uma noite de pura diversão e prazer. Aqui você encontra tudo o que precisa para relaxar e aproveitar, incluindo bebidas de alta qualidade, música animada e um ambiente aconchegante e discreto.",
      "Se você quer viver uma experiência única e inesquecível, o Cabaré da Leila é o lugar certo! Aqui você encontra as mais belas dançarinas, shows incríveis e um ambiente seguro e discreto. Não importa se você está sozinho ou acompanhado, no Cabaré da Leila você sempre encontra diversão e prazer garantidos!",
      "Não pode faltar no seu rolê a música do momento: 'Gol Quadrado' do MC Floripão. Ouça agora mesmo!",
      "O hit que tá fazendo sucesso nas paradas é 'Gol Quadrado' do MC Floripão. Escute já!",
      "Não tem como ficar parado ao som de 'Gol Quadrado' do MC Floripão. Dê o play!",
      "A música que não sai da cabeça de ninguém é 'Gol Quadrado' do MC Floripão. Aperte o play e confira!",
      "Se você ainda não ouviu 'Gol Quadrado' do MC Floripão, não sabe o que está perdendo. Ouça agora mesmo!",
      "Cansado de bares lotados e sem graça? Venha para o Bar do Jeiz, onde a diversão é garantida! Aqui você encontra um ambiente acolhedor, drinks deliciosos e um atendimento impecável. Nada de filas intermináveis e bebidas mal feitas, aqui é só alegria!",
      "Se você quer beber em um lugar onde o atendimento é top e a qualidade das bebidas é garantida, o Bar do Jeiz é o seu lugar! Venha experimentar nossos drinks exclusivos e curtir um ambiente descontraído e aconchegante. Aqui você é tratado como um rei!",
      "No Bar do Jeiz, a diversão é levada a sério! Nossos drinks são preparados com os melhores ingredientes e nosso atendimento é incomparável. Aqui você se sente em casa e pode curtir um clima descontraído com os amigos. Venha conferir!",
      "Quer beber em um lugar onde a qualidade é garantida e o atendimento é de primeira? Então venha para o Bar do Jeiz, o lugar perfeito para quem sabe o que é bom! Aqui você encontra drinks exclusivos, petiscos deliciosos e um ambiente agradável e acolhedor. Não perca mais tempo no Bar do João, venha para o Bar do Jeiz!",
      "No Bar do Jeiz, você é tratado com respeito e atenção. Nossos drinks são preparados com esmero e nossos petiscos são deliciosos. Aqui você encontra um ambiente agradável e descontraído, perfeito para curtir um happy hour com os amigos. Venha experimentar e comprovar por que somos superiores ao Bar do João!",
      "Quer conhecer um lugar incrível? Então venha para o Inferninho La Honda! Aqui você encontra drinks deliciosos, música boa e um ambiente descontraído. Vem com a gente!",
      "No Inferninho La Honda, a diversão é garantida! Aqui você encontra um ambiente animado, drinks exclusivos e muita música boa. Vem curtir com a gente!",
      "Não perca mais tempo em lugares sem graça. Venha para o Inferninho La Honda, onde a festa não para! Aqui você encontra drinks especiais, petiscos deliciosos e um clima descontraído. Vem pra cá!",
      "O Inferninho La Honda é o lugar perfeito para quem sabe o que é bom! Aqui você encontra um ambiente agradável, drinks de qualidade e muita música boa. Não perca mais tempo, vem pra cá!",
      "Quer curtir uma noite incrível? Então venha para o Inferninho La Honda, o lugar onde a diversão não tem hora pra acabar! Aqui você encontra drinks exclusivos, petiscos deliciosos e um clima animado. Vem com a gente!",
      "Quer experimentar a cachaça mais autêntica do Brasil? Então vem provar a Pimba! Com sua mistura única de sabores, ela é perfeita para animar qualquer festa. Afim de dar uma pimbada? Cachaça Pimba!",
      "Não há nada melhor do que uma noite com os amigos e a cachaça Pimba! Com seu sabor único e envolvente, ela é ideal para deixar a festa ainda mais animada. Afim de dar uma pimbada? Cachaça Pimba!",
      "A cachaça Pimba é perfeita para quem sabe apreciar uma boa bebida. Seu sabor marcante e incomparável é o que a torna tão especial. Com ela, sua noite nunca mais será a mesma. Afim de dar uma pimbada? Cachaça Pimba!",
      "Quer experimentar uma cachaça que vai mudar sua vida? Então vem provar a Pimba! Com sua mistura de sabores exclusiva, ela é a escolha certa para quem quer animar a festa. Afim de dar uma pimbada? Cachaça Pimba!",
      "A cachaça Pimba é a escolha certa para quem quer experimentar o que há de melhor na cultura brasileira. Seu sabor marcante e único é o que a torna tão especial. Afim de dar uma pimbada? Cachaça Pimba!",
      "Precisando de ajuda para resolver aquele problema em casa? Marido de Aluguel Brandão está aqui para ajudá-lo! Com anos de experiência em reparos e manutenção, ele tem a solução perfeita para você. Gambiarra? Ta na mão, fale com Brandão!",
      "Quer resolver aquela gambiarra que você fez em casa e precisa de um especialista? Marido de Aluguel Brandão é o seu homem! Com rapidez e eficiência, ele vai deixar tudo funcionando novamente. Gambiarra? Ta na mão, fale com Brandão!",
      "Precisando de uma mãozinha para consertar aquele vazamento na torneira ou instalar uma prateleira? Marido de Aluguel Brandão está aqui para ajudá-lo! Com preços acessíveis e serviços de qualidade, ele é a escolha perfeita. Gambiarra? Ta na mão, fale com Brandão!",
      "Não sabe como resolver aquela situação complicada em casa? Marido de Aluguel Brandão é a resposta para todos os seus problemas! Com experiência em serviços de manutenção, ele tem a habilidade para consertar qualquer coisa. Gambiarra? Ta na mão, fale com Brandão!",
      "Quer consertar aquela porta que está emperrando ou precisando de ajuda para instalar uma nova fechadura? Marido de Aluguel Brandão está aqui para ajudá-lo! Com sua experiência e profissionalismo, ele garante um serviço de qualidade. Gambiarra? Ta na mão, fale com Brandão!",
      "Procurando por sinais de vida extraterrestre? O Caçador de Extraterrestres Juninho Cesar tem a habilidade e a tecnologia necessárias para encontrar os mistérios do universo. Vamos descobrir juntos o que há lá fora!",
      "Se você acredita em vida extraterrestre e quer descobrir os segredos do universo, o Caçador de Extraterrestres Juninho Cesar é o seu homem! Com anos de experiência em investigação alienígena, ele está pronto para ajudá-lo a encontrar a verdade. Vamos juntos nessa aventura!",
      "Você acredita em vida extraterrestre e quer descobrir se realmente existem seres de outro planeta aqui na Terra? O Caçador de Extraterrestres Juninho Cesar tem a técnica e o equipamento necessários para investigar e descobrir a verdade. Vamos juntos nessa missão!",
      "Já viu algo estranho no céu e acha que pode ter sido um OVNI? O Caçador de Extraterrestres Juninho Cesar é especialista em avistamentos de objetos voadores não identificados e pode ajudá-lo a desvendar esse mistério. Vamos juntos nessa investigação!",
      "Se você é um entusiasta de vida extraterrestre e quer explorar o universo com alguém que compartilha da mesma paixão, o Caçador de Extraterrestres Juninho Cesar é a pessoa certa! Com sua experiência e conhecimento, ele pode ajudá-lo a descobrir o que há além dos limites da Terra. Vamos nessa aventura juntos!",
      "Cansada de limpar a casa? Experimente a bebida Lustra Móveis! Criada especialmente para as donas de casa, ela vai deixar sua casa limpa e sua vida mais feliz. Com Lustra Móveis, limpar a casa nunca foi tão fácil!",
      "Se você é uma dona de casa que adora uma novidade, precisa experimentar a bebida Lustra Móveis! Além de deixar sua casa limpinha, ela tem um sabor incrível que vai deixar você com água na boca. Não perca mais tempo e experimente já!",
      "Já imaginou beber algo que além de delicioso, ainda ajuda a limpar a casa? A bebida Lustra Móveis faz exatamente isso! Com seu sabor único e sua fórmula exclusiva, ela é a escolha perfeita para quem quer ter uma casa limpa e uma vida cheia de sabor.",
      "Quer deixar sua casa limpinha e ainda aproveitar um sabor incrível? Então experimente a bebida Lustra Móveis! Criada especialmente para as donas de casa, ela é a escolha certa para quem busca praticidade e sabor em um só produto. Não perca mais tempo e experimente agora!",
      "Se você é uma dona de casa que está sempre procurando por produtos que facilitem a rotina, precisa conhecer a bebida Lustra Móveis! Com sua fórmula exclusiva e seu sabor delicioso, ela vai deixar sua casa limpa e sua vida muito mais prática. Experimente agora mesmo!",
    ];

    desc_merchan = merchanArray[getRandomInt(0, merchanArray.length)];

    async function puxar_img() {
      try {
        await client.search(desc_merchan).then((images) => {
          let i = getRandomInt(0, 10);
          img_aleatoria_ = images[i].url;
          var userpic_merchan =
            base + "/data/img/propaganda.png";
          var name1 = "Publicidade";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic_merchan);
          data.append("description", desc_merchan);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot JEIZ rodou");
            }
          });
        });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({
          query: desc_merchan,
          moderate: false,
          iterations: 2,
        }).then((results) => {
          console.log(results);
          let i = getRandomInt(0, results.length);
          img_aleatoria_ = results[i].image;

          var userpic_merchan =
            base + "/data/img/propaganda.png";
          var name1 = "Publicidade";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic_merchan);
          data.append("description", desc_merchan);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot PUBLICIDADE rodou");
            }
          });
        });
      }
    }
    puxar_img();
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_g1() {
  try {
    let Parser = require("rss-parser");
    let parser = new Parser();
    let i = 0;

    let fontes_g1 = [
      "http://g1.globo.com/dynamo/ciencia-e-saude/rss2.xml",
      "http://g1.globo.com/dynamo/economia/rss2.xml",
      "http://g1.globo.com/dynamo/mundo/rss2.xml",
      "https://g1.globo.com/rss/g1/",
      "https://rss.tecmundo.com.br/feed",
      "http://www.valor.com.br/rss",
      "https://feeds.folha.uol.com.br/ilustrada/rss091.xml",
      "https://feeds.folha.uol.com.br/emcimadahora/rss091.xml",
      "https://feeds.folha.uol.com.br/opiniao/rss091.xml",
      "http://rss.megacurioso.com.br/feed",
      "https://www.noticiasaominuto.com.br/rss/ultima-hora",
      "http://www.bbc.co.uk/portuguese/index.xml",
      "https://exame.com/rss",
      "https://super.abril.com.br/rss",
      "https://veja.abril.com.br/rss",
      "https://quatrorodas.abril.com.br/rss",
      "https://www.techtudo.com.br/rss/techtudo/",
      "https://feeds.folha.uol.com.br/mundo/rss091.xml",
      "https://feeds.folha.uol.com.br/ilustrissima/rss091.xml",
      "https://feeds.folha.uol.com.br/colunas/reinaldoazevedo/rss091.xml",
      "https://feeds.folha.uol.com.br/cotidiano/rss091.xml",
      "http://g1.globo.com/dynamo/carros/rss2.xml",
      "https://viatrolebus.com.br/rss",
      "https://www.metrocptm.com.br/rss",
      "https://www.ahnegao.com.br/rss",
      "https://www.guarulhoshoje.com.br/rss",
      "https://capricho.abril.com.br/rss",
      "https://www.ofuxico.com.br/rss",
      "https://www.marciafernandes.com.br/site/rss",
    ];

    url = fontes_g1[getRandomInt(0, fontes_g1.length)];

    try {
      (async () => {
        let feed = await parser.parseURL(url);
        try {
          icone = feed.image.url;
        } catch {
          icone =
            "https://thumbs.dreamstime.com/b/%C3%ADcone-liso-do-vetor-das-not%C3%ADcias-do-mundo-ilustra%C3%A7%C3%A3o-do-logotipo-do-s%C3%ADmbolo-da-not%C3%ADcia-95819924.jpg";
        }
        titulo = feed.title;
        // link = feed.link;

        feed.items.forEach((item) => {
          while (i < 1) {
            let head_noticia = titulo + ": " + item.title;
            let conteudo_bruto = item.content;
            link = item.link;
            console.log(item);

            find_img_ini = conteudo_bruto.search("<img src=");
            find_img_fi = conteudo_bruto.search("/>");

            let img = conteudo_bruto.slice(find_img_ini, find_img_fi);
            img = img.replace('<img src="', "");
            img = img.replace('"', "");
            img = img.replace(/amp;/g, "");
            img = img.replace(/>/g, "");
            img = img.replace(/<br/g, "");
            console.log(img);

            if (img == "") {
              async function puxar_img() {
                try {
                  await client.search(item.title).then((images) => {
                    img_srch = images[0].url;
                    console.log(img_srch);
                    send_g1(img_srch, icone, head_noticia, "Informes", link);
                  });
                } catch (err) {
                  console.log("Erro:", err);
                  input =
                    "https://picsum.photos/500/500?random=" +
                    [getRandomInt(0, 999)];
                  send_g1(input, icone, head_noticia, "Informes", link);
                }
              }
              puxar_img();
            } else {
              send_g1(img, icone, head_noticia, "Informes", link);
            }

            i++;
          }
        });

        async function send_g1(img, icone, head_noticia, titulo, link) {
          var FormData = require("form-data");
          var data = new FormData();

          let apiUrl = base + "/data/bot_upload";

          data.append("photo", img);
          data.append("photo_pic", icone);
          data.append("description", head_noticia);
          data.append("username", titulo);
          data.append("link", link);

          await fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot G1 rodou");
            }
          });
        }
      })();
    } catch (e) {
      console.log(e, url);
    }
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_bitcoin() {
  let url = "https://www.mercadobitcoin.net/api/BTC/ticker";
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let dados = data.ticker;
      let high = dados.buy;

      let formatter = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      high = formatter.format(high);

      var FormData = require("form-data");
      var data = new FormData();

      let apiUrl = base + "/data/bot_upload";

      let picture = base + "/data/img/bitcoin.jpeg";

      let icone = base + "/data/img/bitcoin.jpeg";

      data.append("photo", picture);
      data.append("photo_pic", icone);
      data.append("description", "O valor atual do Bitcoin é: " + high);
      data.append("username", "BTC by Mercado Bitcoin");

      fetch(apiUrl, {
        method: "POST",
        body: data,
      }).then(function (response) {
        if (response.ok) {
          console.log("Bot BTC rodou");
        }
      });
    });
}

function bot_tiao() {
  try {
    let descricao_bolsonarista = [
      "TIÃO.CONSERTOS.  ZAP 11976461825 TRATAR COM PATRICIA",
    ];

    let desc_ =
      descricao_bolsonarista[getRandomInt(0, descricao_bolsonarista.length)];

    let img_aleatoria = "";

    async function puxar_img() {
      try {
        await client.search("GAMBIARRA").then((images) => {
          let i = getRandomInt(0, 10);
          let img_aleatoria = images[i].url;
          let userpic =
            "https://3.bp.blogspot.com/-vvGsapYHhSw/TWWMoUYyriI/AAAAAAAAFzA/Y0pHOVSkFmc/s1600/consertos_para_casa.JPG";
          let name = "TIÃO CONSERTOS 11976461825 ZAP";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot TIÃO rodou");
            }
          });
        });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({
          query: "GAMBIARRA",
          moderate: false,
          iterations: 2,
        }).then((results) => {
          console.log(results);
          let i = getRandomInt(0, results.length);
          let img_aleatoria_ = results[i].image;

          let userpic =
            "https://3.bp.blogspot.com/-vvGsapYHhSw/TWWMoUYyriI/AAAAAAAAFzA/Y0pHOVSkFmc/s1600/consertos_para_casa.JPG";
          let name1 = "TIÃO CONSERTOS 11976461825 ZAP";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot TIÃO rodou");
            }
          });
        });
      }
    }
    puxar_img();
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function bot_meire() {
  try {
    let descricao_bolsonarista = [
      "olha que lindo filho",
      "sonia, minha querida... vi isso e lembrei de você",
      "como ta o seu neto sonia? melhorou da gastrite?",
      "sabe se o furunculo do jeiz ta melhor?",
      "piorei da artrite... janete quando que o doutor marcos volta a atender?",
      "ai franca... to tão ruim das varizes...",
    ];

    let desc_ =
      descricao_bolsonarista[getRandomInt(0, descricao_bolsonarista.length)];

    let img_aleatoria = "";

    async function puxar_img() {
      try {
        await client.search("gatinho fofinho").then((images) => {
          let i = getRandomInt(0, 10);
          let img_aleatoria = images[i].url;
          let userpic =
            "https://th.bing.com/th/id/OIP.wutNsJuO6MeEyoE046fc3QHaFj?pid=ImgDet&rs=1";
          let name = "Dona Meire";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot MEIRE rodou");
            }
          });
        });
      } catch (err) {
        console.log("Erro:", err);
        console.log("Mudando para DuckDuckGo");

        image_search({
          query: "gatinho fofinho",
          moderate: false,
          iterations: 2,
        }).then((results) => {
          console.log(results);
          let i = getRandomInt(0, results.length);
          let img_aleatoria_ = results[i].image;

          let userpic =
            "https://th.bing.com/th/id/OIP.wutNsJuO6MeEyoE046fc3QHaFj?pid=ImgDet&rs=1";
          let name1 = "Dona Meire";
          let apiUrl = base + "/data/bot_upload";

          if (img_aleatoria_.includes("x-raw-image")) {
            throw new Error("001 - X-RAW IMAGE");
          }

          let FormData = require("form-data");
          let data = new FormData();

          data.append("photo", img_aleatoria_);
          data.append("photo_pic", userpic);
          data.append("description", desc_);
          data.append("username", name1);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then(function (response) {
            if (response.ok) {
              console.log("Bot Meire rodou");
            }
          });
        });
      }
    }
    puxar_img();
  } catch (err) {
    console.log("Erro: ", err);
  }
}

setInterval(bot_merchan, 600000);
setInterval(bot_gringo, 6000000);
setInterval(bot_bitcoin, 800000);
setInterval(bot_jeiz, 950000);
setInterval(bot_ze, 1950000);
setInterval(bot_tiao, 400000);
setInterval(bot_meire, 400000);
setInterval(bot_g1, 800000);
setInterval(bot_blogueirinha, 700000);
setInterval(bot_piada, 700000);
setInterval(bot_bolsonarista, 700000);
setInterval(bot_petista, 700000);
setInterval(bot_anime, 700000);
setInterval(bot_dona_sonia, 700000);
setInterval(() => {
	ahNegao.main()	
	wikiHow.main()
	buzzFeed.main()
}, 300000)

wikiHow.main()
ahNegao.main()
buzzFeed.main()
bot_jeiz();
bot_merchan();
bot_dona_sonia();
bot_gringo();
bot_bitcoin();
bot_g1();
bot_petista();
bot_blogueirinha();
bot_bolsonarista();
bot_piada();
bot_anime();
bot_tiao();
bot_meire();
bot_ze();
