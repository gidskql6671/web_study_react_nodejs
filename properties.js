const propertiesReader = require('properties-reader');

const properties = propertiesReader('./config.properties');

module.exports = {
	getDbLink(){
		return properties.get("database.url");
	},
	getServerPort(){
		return properties.get("server.port");
	}
};