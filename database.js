const enums = require("./enums.js");
const playerStateEnums = enums.playerStates;
const playerNameEnums = enums.playerNames;

module.exports = {
	/*
	Params:
		playerName: valid string using enums.playerNames from enums.js
	Returns:
		{lon: x.xxx, lat: x.xxx}
	asserts playerName is valid
	*/
	getPlayerLocation: (playerName) => {
		return raw.players[playerName].location;
	},

	/*
	Returns:
		object: {enums.PlayerNames.BLINKY: {lon: x.xx, lat: x.xx}, 
				...CLYDE,
				...INKY,
				...PINKY,
				...PACMAN}
	*/
	getPlayerLocations: () => {
		return {
			[playerNameEnums.BLINKY]: raw.players[playerNameEnums.BLINKY].location,
			[playerNameEnums.CLYDE]: raw.players[playerNameEnums.CLYDE].location,
			[playerNameEnums.INKY]: raw.players[playerNameEnums.INKY].location,
			[playerNameEnums.PINKY]: raw.players[playerNameEnums.PINKY].location,
			[playerNameEnums.PACMAN]: raw.players[playerNameEnums.PACMAN].location
		};
	},

	/*
	Params:
		playerName: valid string using enums.playerNames from enums.js
	Returns:
		state using enums.playerStates from enums.js
	asserts playerName is valid
	*/
	getPlayerState: (playerName) => {
		return raw.players[playerName].state;
	},


	/*
	Returns:
		object: {enums.PlayerNames.BLINKY: "state", 
				...CLYDE,
				...INKY,
				...PINKY,
				...PACMAN}
	*/
	getPlayerStates: () => {
		return {
			[playerNameEnums.BLINKY]: raw.players[playerNameEnums.BLINKY].state,
			[playerNameEnums.CLYDE]: raw.players[playerNameEnums.CLYDE].state,
			[playerNameEnums.INKY]: raw.players[playerNameEnums.INKY].state,
			[playerNameEnums.PINKY]: raw.players[playerNameEnums.PINKY].state,
			[playerNameEnums.PACMAN]: raw.players[playerNameEnums.PACMAN].state
		};
	},

	/*
	Params:
		playerName: valid string using enums.playerNames from enums.js
	Returns:
		object: {
			location: {lon: x.xx, lat: x.xx},
			state: "state"
		}
	asserts playerName is valid
	*/
	getPlayer: (playerName) => {
		return raw.players[playerName];
	},

	/*
	Returns:
		object: {enums.PlayerNames.BLINKY:{
					location: {lon: x.xx, lat: x.xx},
					state: "state"
				}, 
				...CLYDE,
				...INKY,
				...PINKY,
				...PACMAN}
	*/
	getPlayers: () => {
		return raw.players;
	},

	/*
	Params:
		playerName: valid string using enums.playerNames from enums.js
		playerLocation: {lon: float, lat: float}
	Returns:
		void
	asserts playerName is valid and playerLocation is properly formated
	*/
	setPlayerLocation: (playerName, newLocation) => {
		raw.players[playerName].location = newLocation;
	},

	/*
	Params:
		playerName: valid string using enums.playerNames from enums.js
		newState: valid string using enums.playerStates from enums.js
	Returns:
		void
	asserts playerName and newState are valid
	*/
	setPlayerState: (playerName, newState) => {
		raw.players[playerName].state = newState;
	}

}



var raw = {
	players: {
		[playerNameEnums.BLINKY]: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: playerStateEnums.UNINITIALIZED
		},
		[playerNameEnums.CLYDE]: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: playerStateEnums.UNINITIALIZED
		},
		[playerNameEnums.INKY]: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: playerStateEnums.UNINITIALIZED
		},
		[playerNameEnums.PINKY]: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: playerStateEnums.UNINITIALIZED
		},
		[playerNameEnums.PACMAN]: {
			location: {
				lon: 0.0,
				lat: 0.0
			},
			state: playerStateEnums.UNINITIALIZED
		}
	},
	pacdots: {
		locations: [
			{
				lon : -123.118839,
				lat : 49.280738
			},
			{
				lon : -123.116168,
				lat : 49.281223
			},
			{
				lon : -123.119825,
				lat : 49.281370
			},
			{
				lon : -123.117134,
				lat : 49.281856
			},
			{
				lon : -123.120824,
				lat : 49.282009
			},
			{
				lon : -123.114479,
				lat : 49.282365
			},
			{
				lon : -123.118105,
				lat : 49.282498
			},
			{
				lon : -123.115417,
				lat : 49.282998
			},
			{
				lon : -123.119148,
				lat : 49.283157
			},
			{
				lon : -123.112884,
				lat : 49.283387
			},
			{
				lon : -123.120101,
				lat : 49.283773
			},
			{
				lon : -123.113871,
				lat : 49.284027
			},
			{
				lon : -123.117438,
				lat : 49.284273
			},
			{
				lon : -123.112873,
				lat : 49.284671
			},
			{
				lon : -123.114868,
				lat : 49.284673
			},
			{
				lon : -123.118388,
				lat : 49.284896
			},
			{
				lon : -123.115855,
				lat : 49.285297
			},
			{
				lon : -123.113863,
				lat : 49.285308
			},
			{
				lon : -123.116808,
				lat : 49.285931
			},
			{
				lon : -123.114857,
				lat : 49.285948
			}
		],

	},
	gamestate: {

	}
}