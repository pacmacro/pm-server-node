import { Game, State, Name } from "./types"

const game: Game = {
    state: State.Uninitialized,
    players: [
        {
            name: Name.Pacman,
            state: State.Uninitialized,
            position: {
                latitude: 0,
                longitude: 0
            }
        },
        {
            name: Name.Blinky,
            state: State.Uninitialized,
            position: {
                latitude: 0,
                longitude: 0
            }
        },
        {
            name: Name.Clyde,
            state: State.Uninitialized,
            position: {
                latitude: 0,
                longitude: 0
            }
        },
        {
            name: Name.Inky,
            state: State.Uninitialized,
            position: {
                latitude: 0,
                longitude: 0
            }
        },
        {
            name: Name.Pinky,
            state: State.Uninitialized,
            position: {
                latitude: 0,
                longitude: 0
            }
        }
    ],
    pacdots: [
        {
            position: { latitude: 49.280098, longitude: -123.117852 },
            eaten: false,
            powerdot: true
        },
        {
            position: { latitude: 49.280738, longitude: -123.118839 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.281223, longitude: -123.116168 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.28137, longitude: -123.119825 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.281856, longitude: -123.117134 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.282009, longitude: -123.120824 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.282365, longitude: -123.114479 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.282498, longitude: -123.118105 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.282639, longitude: -123.121772 },
            eaten: false,
            powerdot: true
        },
        {
            position: { latitude: 49.282998, longitude: -123.115417 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.283157, longitude: -123.119148 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.283387, longitude: -123.112884 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.283609, longitude: -123.116464 },
            eaten: false,
            powerdot: true
        },
        {
            position: { latitude: 49.283773, longitude: -123.120101 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.284027, longitude: -123.113871 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.284038, longitude: -123.111918 },
            eaten: false,
            powerdot: true
        },
        {
            position: { latitude: 49.284273, longitude: -123.117438 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.284671, longitude: -123.112873 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.284673, longitude: -123.114868 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.284896, longitude: -123.118388 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.285297, longitude: -123.115855 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.285308, longitude: -123.113863 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.285931, longitude: -123.116808 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.285948, longitude: -123.114857 },
            eaten: false,
            powerdot: false
        },
        {
            position: { latitude: 49.286575, longitude: -123.115834 },
            eaten: false,
            powerdot: true
        }
    ]
}

export default game
