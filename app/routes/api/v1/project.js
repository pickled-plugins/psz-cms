var express = require('express'),
	router = express.Router(),
	project = require('./../../../models/project.js'),
	fs = require('fs');

var sanitizeQuery = function(query) {
	// Convert boolean queries.
	if (query.is_live != null) {
		if (query.is_live === 'true') { query.is_live = true; }
		if (query.is_live === 'false') { query.is_live = false; }
	}
};

router.get('/', function(req, res) {

	var query = req.query;

	sanitizeQuery(query);

	var coll = new project.Collection();
	coll.fetch(query);

	coll.on('fetched', () => {
		return res.json(coll.toJSON());
	});

});

module.exports = router;