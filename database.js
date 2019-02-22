const enums = require("./enums.js");
playerNameEnum = enums.playerNames;

module.exports = {
	// all inputs are ENUMs!
	getPlayerLocation: (playerName) => {
		
		if(playerName == playerNameEnum.PACMAN)
			return raw.players.pacman.location;
		else
			return null
	},
	getPlayerState: (playerName) => {
		return raw.players[playerName].state;
	},
	setPlayerLocation: (playerName, newLocation) => {
		raw.players[playerName].location = newLocation;
	},
	setPlayerState: (playerName, newState) => {
		raw.players[playerName].state = newState;
	},
}



var raw = {
	players: {
		blinky: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: "available"
		},
		clyde: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: "available"
		},
		inky: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: "available"
		},
		pinky: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: "available"
		},
		pacman: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: "available"
		}
	},
	pacdots: {
		locations: [
			{
				"latitude" : 49.280738,
				"longitude" : -123.118839
			},
			{
				"latitude" : 49.281223,
				"longitude" : -123.116168
			},
			{
				"latitude" : 49.281370,
				"longitude" : -123.119825
			},
			{
				"latitude" : 49.281856,
				"longitude" : -123.117134
			},
			{
				"latitude" : 49.282009,
				"longitude" : -123.120824
			},
			{
				"latitude" : 49.282365,
				"longitude" : -123.114479
			},
			{
				"latitude" : 49.282498,
				"longitude" : -123.118105
			},
			{
				"latitude" : 49.282998,
				"longitude" : -123.115417
			},
			{
				"latitude" : 49.283157,
				"longitude" : -123.119148
			},
			{
				"latitude" : 49.283387,
				"longitude" : -123.112884
			},
			{
				"latitude" : 49.283773,
				"longitude" : -123.120101
			},
			{
				"latitude" : 49.284027,
				"longitude" : -123.113871
			},
			{
				"latitude" : 49.284273,
				"longitude" : -123.117438
			},
			{
				"latitude" : 49.284671,
				"longitude" : -123.112873
			},
			{
				"latitude" : 49.284673,
				"longitude" : -123.114868
			},
			{
				"latitude" : 49.284896,
				"longitude" : -123.118388
			},
			{
				"latitude" : 49.285297,
				"longitude" : -123.115855
			},
			{
				"latitude" : 49.285308,
				"longitude" : -123.113863
			},
			{
				"latitude" : 49.285931,
				"longitude" : -123.116808
			},
			{
				"latitude" : 49.285948,
				"longitude" : -123.114857
			}
		],

	},
	gamestate: {

	}
}