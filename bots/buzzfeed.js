
const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const parser = require("node-html-parser")
const translatte = require('translatte');

let base = "https://bar-do-jeiz.onrender.com"

exports.main = async function () {	
	let pagina = await fetch("https://www.buzzfeed.com/quizzes", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "country=br; bf-browser-language=pt-BR,pt; bf-geo-country=BR; _xsrf=6l3ye8fk1ck; bf_visit=u%3D.cxw2x3O29%26uuid%3D0bdc0143-498d-4d40-a555-7b7786b58600%26v%3D2; permutive-id=e9ee12a4-6f2a-47eb-9c13-9b36c0147788; TimeSpentRO_4=on; TimeSpentRO_4_version=1; SITE-7528-TPAU_with_images=image; SITE-7528-TPAU_with_images_version=3; PAR-436-etsy-tpau-ranking=control; PAR-436-etsy-tpau-ranking_version=1; RT-1042-Admiral-script-on-BFDC=on; RT-1042-Admiral-script-on-BFDC_version=1; ads_toolbar_feeds=on; ads_toolbar_feeds_version=1; ads_prebid=on; ads_prebid_version=1; ads_amazon_tam=on; ads_amazon_tam_version=1; ads_ad_lightning=on; ads_ad_lightning_version=1; ads_doubleverify=on; ads_doubleverify_version=1; ads_blockthrough=on; ads_blockthrough_version=1; advertise_international=on; advertise_international_version=1; non_us_ad_lookahead_adjustments=on; non_us_ad_lookahead_adjustments_version=1; ADSGROUP-442-permutive=on; ADSGROUP-442-permutive_version=1; ads_tam_hem=on; ads_tam_hem_version=2; RT-994-swap-refresh=swap-refresh; RT-994-swap-refresh_version=5; SITE-7528-TPAU_with_images_metadata=%7B%22id%22%3A974%2C%22version%22%3A3%2C%22resolved%22%3Afalse%2C%22is_feature_flag%22%3Afalse%2C%22value%22%3A%22image%22%2C%22variant_id%22%3A3%2C%22payload%22%3Anull%7D; _ga=GA1.2.349243437.1728905917; _gid=GA1.2.288054956.1728905917; _cc_id=36791b13b0b68b3808064993a828ca64; panoramaId_expiry=1728992317342; panoramaId=7a01674fb258960221e527946e04a9fb927a61032e7488d3c00c76e6841be020; panoramaIdType=panoDevice; bf-rev-geo=BR; cto_bundle=n5xEv19HbDNLYXZrQk53aE5reUd6ZTRGMXhERlhnSkwlMkIyMEZ2NGpacHhxM3cyZk9mcHZxVXNaWHhzYnR3TnYyWDE2emV1Y2FrTTNjNGprelZyaFoya2ljeGtsZ2tpdkt2UmVkVkRNTHVBbW9pUHFMaGw4dFBZRkpSbkpYeEY5T0wlMkJhRVlnMkRhVGdreWNROEh4VHhEMWpsRmNRJTNEJTNE; __gads=ID=671147159824bbb3:T=1728905918:RT=1728906640:S=ALNI_MbrUJPZ32-_Gg4Ibqx67WbhU3u7CQ; __gpi=UID=00000a5bc5a5b46c:T=1728905918:RT=1728906640:S=ALNI_MawcE4hVsaHq0HvAOp0SOXrGmY_3g; __eoi=ID=e523439ed785116d:T=1728905918:RT=1728906640:S=AA-AfjYqV90kHfBaWFdvGVQ261ch; _fbp=fb.1.1728906651146.929752483767742411; TimeSpentRO_3=on; TimeSpentRO_3_version=1; _ga_LHKZPVTNWC=GS1.2.1728905917.1.1.1728906746.29.0.0; next-i18next=pt; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Oct+14+2024+08%3A53%3A06+GMT-0300+(Hor%C3%A1rio+Padr%C3%A3o+de+Bras%C3%ADlia)&version=202407.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=2de9f2d5-7629-4119-9225-1a0ad94eaf53&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0004%3A1%2CC0002%3A1%2CC0003%3A1%2CC0001%3A1%2CC0005%3A1&AwaitingReconsent=false&geolocation=BR%3BSP; OptanonAlertBoxClosed=2024-10-14T11:53:06.273Z; _awl=2.1728906787.5-a9873618ad2545f8ec94211605752581-6763652d75732d6561737431-0",
    "Referer": "https://www.buzzfeed.com/",
    "Referrer-Policy": "unsafe-url"
  },
  "body": null,
  "method": "GET"
})
	
	.then(resp => resp.text())
	.then(reqres => {return reqres})


	const root = parser.parse(pagina);
	
	let div = root.querySelectorAll('script');
	
	let title = root.querySelectorAll('a');
	
	let i = 0
	let links	
	
	for(let unico of div){
		let url = unico;
		
		if(url){
			if(url.id == '__NEXT_DATA__'){
				links = JSON.parse(div[i].childNodes[0]._rawText);
			}
		}
		
		i++
	}
	
	let feed = links.props.pageProps.feed
	
	let item = 	feed.items[Math.floor(Math.random() * feed.items.length)]		
		
	let titulo = item.title
	let imagem = item.images.big.url;

	titulo = await translatte(titulo, {to: 'pt'}).then(res => {
		return res.text
	}).catch(err => {
		console.error(err);
	});

	
	      let name = "Teste aleatório do Buzzfeed";
          let apiUrl = base + "/data/bot_upload";
          let data = new FormData();

          data.append("photo", imagem);
          data.append("photo_pic", "data:image/png;base64,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");
          data.append("description", titulo);
          data.append("username", name);
          data.append("link", "https://buzzfeed.com" + item.url);

          fetch(apiUrl, {
            method: "POST",
            body: data,
          }).then((response) => {
              console.log("Bot BUZZFEED rodou");            
          })
}
