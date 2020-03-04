/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');


/*fonction qui appelle sandbox et qui modifie le lien a chaque fois*/
async function listrestaurant (){
	try{
		//Exemple pour le 3eme restaurant affiché sur la page :
		//const rest_link= await michelin.scrapeLinks(link,3);
		//console.log(rest_link); //lien du 3eme restau
		//sandbox(rest_link);


		//A DECOMMENTER 
		/*
		var link=``;
		var list_r=[]; //liste de tous les restaurants d'une page
		for(var page=1;page<2;page++) //parcours de toutes les pages
		{			
			link =`https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/${page}`;
			for(var i=1;i<40;i++) //parcours de tous les restaurants d'une page
			{			
				rest_link= await michelin.scrapeLinks(link,i); //récupération du lien vers la page d'un restaurant
				sandbox(rest_link,list_r);
				
			}
		}
		console.log(list_r);
		*/

		//FICHIER JSON
		/*
		const fs = require('fs')
 
		let personne = {
		   "prenom" = "Marie",
		   "age" = 45,
		   "passion" : "loisirs créatifs, histoire",
		   "taille" : 172
		}
		 
		let donnees = JSON.stringify(personne)
		fs.writeFileSync('personnage2.json', donnees)
		*/

		//const links_array = await allLinks();
		
		//var list = allLinks();
		//console.log(list);

	}
	catch(e){
	    console.error(e);
	    process.exit(1);
	}
	
}


async function sandbox (searchLink,list) {
  	try {
	    console.log(`browsing ${searchLink} source`);

	    const restaurant = await michelin.scrapeRestaurant(searchLink,false);

	    list.push(restaurant)
	    
	    //process.exit(0);
	} 
	catch (e) {
	    console.error(e);
	    process.exit(1);
	}
}

const [,, searchLink] = process.argv;

listrestaurant(searchLink);
