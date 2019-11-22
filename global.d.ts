declare const enum STATE {
    INITIALIZING = "initializing",
    UNINITIALIZED = "uninitialized",
    IN_PROGRESS = "in_progress",
    FINISHED_PACMAN_WIN = "finished_pacman_win",
    FINISHED_GHOSTS_WIN = "finished_ghosts_win",
    PAUSED = "paused",
    ACTIVE = "active",
    POWERUP = "powerup",
    CAPTURED = "captured",
    READY = "ready"
}

declare const enum KEY {
    NAME = "name",
    STATE = "state",
    LOCATION = "location",
    EATEN = "eaten",
    POWERDOT = "powerdot"
}

declare const enum NAME {
    PACMAN = "pacman",
    BLINKY = "blinky",
    CLYDE = "clyde",
    INKY = "inky",
    PINKY = "pinky"
}

declare interface location {
    latitude: number
    longitude: number
}

declare interface entity {
    location: location
}

declare interface player extends entity {
    name: NAME
    state: STATE
}

declare interface pacdot extends entity {
    eaten: boolean
    powerdot: boolean
}

declare interface game {
    state: STATE
    players: player[]
    pacdots: pacdot[]
}
