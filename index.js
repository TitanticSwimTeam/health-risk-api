const express = require("express");
const convert = require("./lib/conversions")
var bodyParser = require('body-parser');
var http = require('http')

const app = express();
app.use(bodyParser.json());
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

app.route('/api/bmi')
	.get((request, response) => {
		// Formula: weight / height^2
		//response.type('application/json');
		
		try {
			var height = request.query.height;
			var heightUnits = request.query.heightUnits;
			var weight = request.query.weight;
			var weightUnits = request.query.weightUnits;

			if (heightUnits === "in") {
				height = convert.inToMeters(height);
			}

			if (weightUnits === "lbs") {
				weight = convert.lbsToKg(weight);
			}

			var res = { bmi: parseFloat((weight / Math.pow(height, 2)).toFixed(2)) }
			response.status(200).json(res);

		} catch(err) {
			response.status(500).json({error: "Error calculating BMI"});
		}


	}).post((request, response) => {
		response.type('application/json');
		var res = "";

		if (request.get('Content-Type') != "application/json") {
			res = '{"msg":"Please make POST request as JSON"}';
		} else {
			var data = request.body;
			res = request.body;
		}
	});

app.get('/api/risk', function(request, response) {
	response.type('application/json');

	try {
		var bmi = parseFloat(request.query.bmi).toFixed(2);
		var age = parseInt(request.query.age);
		var bloodPressure = request.query.bloodpressure;
		var familyHistory = [(request.query.diabetes === 'true'), (request.query.alzheimers === 'true'), (request.query.cancer === 'true')]
		var score = convert.fullRiskCalc(bmi, bloodPressure, age, familyHistory);

		var risk = "";
		if (score <= 20) {
			risk = "low";
		} else if (score <= 50) {
			risk = "moderate";
		} else if (score <= 75) {
			risk = "high";
		} else {
			risk = "uninsurable"
		}

		response.status(200).json({risk: risk, score: score})

	} catch(err) {
		response.status(500).json({error: "Error calculating risk"});
	}

});

app.listen(port, function() {
	console.log("Server is running at http://localhost:"+port);
})
