const express = require("express");
const app = express();
const convert = require("./lib/conversions")

app.use(express.static(__dirname + '/client'))

const port = process.env.PORT || 1337

// Health check, verify that the server is running
app.get('/api/health', function(request, response) {
	response.type('application/json');
	if (typeof port === 'string' || port instanceof String){
		var res = '{"msg": "Node.js and Express running", "port": "' + port.replace(/\\/g, "\\\\") + '"}';
	} else {
		var res = '{"msg": "Node.js and Express running", "port": "' + port + '"}';
	}
	response.send(res);
});

app.get('/api/bmi', function(request, response) {
	response.type('application/json');
	// TODO: Accept JSON post request and then return calculated BMI
	var res = '{"bmi": 20}'
	response.send(res);
});

app.get('/api/risk', function(request, response) {
	response.type('application/json');
	// TODO: Accept the following inputs in JSON post
	//		- age (int), BMI (calculated from /api/bmi), 
	//		  blood pressure (string), family disease (list)
	// Then use the point values assigned in the requirements to return
	// a json object of {"risk": low|moderate|high|uninsurable, "score": SCORE}
	var res = '{"risk": "low", "score": 69}'
	response.send(res);
});

app.listen(port, function() {
	console.log("Server is running at http://localhost:"+port)
})
