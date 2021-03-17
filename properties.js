const propertiesReader = require('properties-reader');

const properties = propertiesReader('./config/config.properties');

module.exports = {
	getDbLink(){
		return properties.get("database.url");
	},
	getServerPort(){
		return properties.get("server.port");
	}
};