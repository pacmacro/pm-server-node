const enums = require("./enums.js");
const playerStateEnums = enums.playerStates;
const playerNameEnums = enums.playerNames;
const Pacdot = require("./Pacdot.js")
const Player = require("./Player.js")
const playerNamesArray = Object.values(enums.playerNames);

const pacdotLocations = enums.pacdotLocations.map(location => new Pacdot(location))
const players = playerNamesArray.map(name => new Player(name))

module.exports = {
	/**
	 * @returns {Player[]}
	 */
	getPlayers: () => players,

	/**
	 * @param {string} name
	 * @return {Player}
	 */
	getPlayer: name => players.filter(player => player.name === name)[0],

	/**
	 * @returns {Pacdots[]}
	 */
	getPacdots: () => pacdots,

	/**
	 * @param {Pacdot} pacdot
	 * @returns {number} length of pacdots array
	 */
	addPacdot: pacdot => pacdots.push(pacdot),

	/**
	 * @param {number} index
	 * @returns {Pacdot} Returns deleted element
	 */
	deletePacdot: index => pacdots.splice(index, 1)

}

