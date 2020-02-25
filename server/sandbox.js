/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');


/*faire une fonction qui appelle sandbox et qui modifie le lien a chaque fois
liens d'un restaurant pour une page : div.col-md-6:nth-child(1) > div:nth-child(1) > a:nth-child(4).attr('href');*/
async function listrestaurant (link ='https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/1#'){
	try{
		for(var i=0;i<2;i++)
		{
			if (i!=9)
			{
				const rest_link= await michelin.scrapeLinks(link,i);
				sandbox(rest_link);
			}
		}
		/*
		for(i=0; i<20;i++){
			const restlink=michelin.scrapeRestaurant2(link);
			//console.log(restlink);
			sandbox(restlink);
		}*/
	}
	catch(e){
	    console.error(e);
	    process.exit(1);
	}
	
}

/*modifier le parametre*/
async function sandbox (searchLink) {
  try {
    console.log(`browsing ${searchLink} source`);

    const restaurant = await michelin.scrapeRestaurant(searchLink,false);

    console.log(restaurant);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;

listrestaurant(searchLink);
