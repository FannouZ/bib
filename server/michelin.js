const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const address = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text();
  const phone = $('a.link:nth-child(3)').attr('href');
  const website = $('a.link:nth-child(2)').attr('href');
  return {name, address, phone, website};
};

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @param  {int} index - index of the restaurant on a page
 * @return {String} link corresponding to a restaurant
 */
const parse_link = (data,index) => {
  const $ = cheerio.load(data);
  var templink=$(`body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child(${index}) > div > a`).attr('href');
  
  //console.log(templink);
  var restlink='https://guide.michelin.com'+`${templink}`;
  return restlink;
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url 
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async (url) => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
  	return parse(data);
  }

  console.error(status);

  return null;
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url - url of one of the main page
 * @param {int} index - index of the restaurant on a page
 * @return {String} url - url of one of the restaurants on the page
 */
module.exports.scrapeLinks = async (url,index) => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
  		return parse_link(data,index);
  }

  console.error(status);

  return null;
};


module.exports.allLinks = async () => {

  let listOfLinks = $(`div.col-md-6:nth-child(1) > div:nth-child(1) > a:nth-child(4)`).map(function(i, el) {
      return $(this).attr('href');
  }).toArray();

  return listOfLinks;
};


/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {

	
  return [];
};

