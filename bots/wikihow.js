const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const parser = require("node-html-parser")

let base = "https://bar-do-jeiz.onrender.com"

exports.main = async function () {	
	let pagina = await fetch("https://pt.wikihow.com/Especial:Randomizer", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "whv=gD6oId9IUkoLHTMAJWZC; vr=BR-SP; vi=SA; _gid=GA1.2.1662348449.1728869891; G_ENABLED_IDPS=google; cw-test-20240102-dynamic-floors-test=1.90; _cc_id=36791b13b0b68b3808064993a828ca64; panoramaId_expiry=1728956304539; cto_bundle=aFsgzV9BRWRLUFIlMkY5JTJCcGVHR1k3UEslMkZTaWNrdzZtM2czcmY0VWJnSEljNTl5RXR1JTJCUUc1RVlRWjBSRmUlMkJWQUpwckJieGlJTVN3SWgzd21lJTJGRHN0anQxaXp2cHRSdnBHZkoxWGJwdmVrVVFGY25YWXB1WDB0YjVwRkM2R2tuR3IxaHJwWDQ5YnNhM2xHWGc4NzhoMHd6RmdiSlElM0QlM0Q; _sharedid=a7ee1830-8571-4fcf-9cae-dc8d19ffe533; _sharedid_cst=zix7LPQsHA%3D%3D; pbjs_fabrickId=%7B%22fabrickId%22%3A%22E1%3AenyL8EZlYUuEgWMmmqSjz31dxqJbMUk53Q3PIU5cPbP4-AnosGdzcpMCxnvAICLh1giY8ryyOXXM_ItnCfA2SbS8qvw1DM4mw1zk_Wss3F2Ld54WVbbbPx2pHH2fWZUi%22%7D; pbjs_fabrickId_cst=VyxHLMwsHQ%3D%3D; FCNEC=%5B%5B%22AKsRol8JNi2NL0o_ypYVSlBqZ6eTtgu-D4-SmNQblXi0kK9Ol6yCUgmrwyMFz76wFNQViMX3w1O3usK1bQdxUW7BwvsNFwF8uX6oTcD_9OeES8DCPKnLUZgMoYp2CEzjVc-kU0dHBzuCS6GVZAmlSzDSIatDq5Bhwg%3D%3D%22%5D%5D; _gat=1; _ga_5VNCK4B0SE=GS1.1.1728869890.1.1.1728869950.0.0.0; _ga=GA1.1.931732110.1728869891; _ga_F37NSWHJFR=GS1.1.1728869890.1.1.1728869950.0.0.0",
    "Referer": "https://pt.wikihow.com/P%C3%A1gina-principal",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
})
	
	.then(resp => resp.text())
	.then(reqres => {return reqres})

	const root = parser.parse(pagina);
	
	let imgs = root.querySelectorAll('img')
	let title = root.querySelectorAll('h1');
	
	let i = 0
	let links = []
	let alts = []
	
	
	for(let unico of imgs){
		let url = imgs[i].rawAttrs;		
		url = url.split(' ');
		let alt = url
		url = url.filter((u) => u.includes("src=")
		 && !u.includes('../')
		 && u.includes('https')
		 && !u.includes('.svg')
		 && !u.includes('patreon')
		 && !u.includes('autor')
		 && !u.includes('chave')		 
		 && !u.includes('logologo')		 
		 );
		url?.[0] ? links.push(url[0].replace('data-src="','').replace('"','')) : "";
		i++
	}
	let imagem = links[0];
	let titulo = title[0].childNodes[0].childNodes[0]._rawText
	let link = title[0].childNodes[0].childNodes[0].parentNode.rawAttrs.replace('href="','').replace('"','');	

	
	      let name = "Tutorial aleatório do Wikihow";
          let apiUrl = base + "/data/bot_upload";
          let data = new FormData();

          data.append("photo", imagem);
          data.append("photo_pic", "https://downloadr2.apkmirror.com/wp-content/uploads/2023/01/38/63cf85c83f901.png");
          data.append("description", titulo);
          data.append("username", name);
          data.append("link", link);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then((response) => {
              console.log("Bot WIKIHOW rodou");            
          })
}
 
