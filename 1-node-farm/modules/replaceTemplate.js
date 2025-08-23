//const replaceTemplateFunction = (passTemplate, passProductObj) => {
module.exports = (passTemplate, passProductObj) => {
	let output = passTemplate.replace(/{%PRODUCTNAME%}/g,passProductObj.productName);
	output = output.replace(/{%IMAGE%}/g,passProductObj.image);
	output = output.replace(/{%PRICE%}/g,passProductObj.price);
	output = output.replace(/{%FROM%}/g,passProductObj.from);
	output = output.replace(/{%NUTRIENTS%}/g,passProductObj.nutrients);
	output = output.replace(/{%QUANTITY%}/g,passProductObj.quantity);
	output = output.replace(/{%DESCRIPTION%}/g,passProductObj.description);
	output = output.replace(/{%ID%}/g,passProductObj.id);

	if(!passProductObj.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
	return output;
}
