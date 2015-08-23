import * as Backbone from 'backbone';
import * as fs from 'fs';

class Model extends Backbone.Model {

	isOnClient() {
    	return (fs == null || fs.readFile == null);
	}

}

class Collection extends Backbone.Collection {

    get model() { return Model; }

	isOnClient() {
    	return (fs == null || fs.readFile == null);
	}

	setUrl(query) {
        var queryString = '?', key, value;
        for (key in query) {
            value = query[key];
            queryString += `${key}=${value}&`;
        }
        this.url = this.baseUrl + queryString;
    }

    /*
     * Reset collection to a include only one of its current models, picked at random.
     */
    resetToRandom() {
        var randomIndex, randomModel;
        randomIndex = Math.floor(Math.random() * this.models.length);
        randomModel = this.models[randomIndex];
        this.reset([randomModel]);
    }

}

module.exports = {
	Model: Model,
	Collection: Collection
}