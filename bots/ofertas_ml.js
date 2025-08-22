const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const parser = require("node-html-parser")

let base = "https://bar-do-jeiz.onrender.com"

exports.main = async function () {
	
	let pagina = await fetch("https://www.mercadolivre.com.br/ofertas", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "device-memory": "4",
    "downlink": "10",
    "dpr": "3",
    "ect": "4g",
    "rtt": "50",
    "sec-ch-ua": "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "viewport-width": "980",
    "cookie": "_csrf=ZC4KeJy7Fd5g5rXN1A9GJ0QP; _d2id=70f32f53-a170-4649-95e5-205511e41d9f; _mldataSessionId=dedc49e8-f142-48db-3c27-7f7e94b19070"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
})
	.then(resp => resp.text())
	.then(reqres => {return reqres})

	const root = parser.parse(pagina);
	
	let a = root.querySelectorAll('a');
	
	let i = 0
	let prods = []
	
	for(let unico of a){
		let url = a[i].rawAttrs;
		
		if(url.includes('poly-component__title')){
			let nome = unico.childNodes[0]._rawText
			let link = unico.rawAttrs.split(' ');
			link = link[1].replace('href="','').replace('"','');
			let imagem = unico.parentNode.parentNode.childNodes[0].childNodes[0].rawAttrs.split(' ');
			imagem = imagem.filter((u) => u.includes('data-src'));
			imagem = imagem[0].replace('data-src="','').replace('"','')
			preco = unico.parentNode.childNodes[2].childNodes[1]?.childNodes[0]?.childNodes[1]?.childNodes[0]?._rawText
			
			if(preco){					
				prods.push({
					nome,
					imagem,
					preco,
					link
				});	
			}
		}
		
		
		i++
	}

	
	      let name = "Ofertas do dia - MercadoLivre";
          let apiUrl = base + "/data/bot_upload";
          let data = new FormData();

		  let prod = prods[Math.floor(Math.random() * prods.length)]

          data.append("photo", prod?.imagem );
          data.append("photo_pic", "data:image/png;base64,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");
          data.append("description", prod.nome + " - R$ " + prod.preco );
          data.append("username", name);
          data.append("link", prod.link);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then((response) => {
              console.log("Bot OFERTAS ML rodou");            
          })
}
