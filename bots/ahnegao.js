const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const parser = require("node-html-parser")

let base = "https://bar-do-jeiz.onrender.com"

exports.main = async function () {
	
	let pagina = await fetch('https://www.ahnegao.com.br/t/coletanea-de-imagens-aleatorias/pag/' + Math.floor(Math.random() * 80))
	.then(resp => resp.text())
	.then(reqres => {return reqres})

	const root = parser.parse(pagina);
	
	let imgs = root.querySelectorAll('img')
	
	let i = 0
	let links = []
	
	for(let unico of imgs){
		let url = imgs[i].rawAttrs;
		url = url.split(' ');
		url = url.filter((u) => u.includes("src=")
		 && !u.includes('zap')
		 && !u.includes('apoiase')
		 && !u.includes('picpay')
		 && !u.includes('patreon')
		 && !u.includes('autor')
		 && !u.includes('chave')		 
		 && !u.includes('logologo')		 
		 );
		url?.[0] ? links.push(url[0].replace('src="','').replace('"','')) : "";
		i++
	}
	
	      let name = "Pafuncio Figueiredo";
          let apiUrl = base + "/data/bot_upload";
          let data = new FormData();

          data.append("photo", links[Math.floor(Math.random() * links.length)]);
          data.append("photo_pic", "https://i.ibb.co/zGN17tt/IMG-20241013-WA0002.jpg");
          data.append("description", "");
          data.append("username", name);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then((response) => {
              console.log("Bot PAFUNCIO rodou");            
          })
}
