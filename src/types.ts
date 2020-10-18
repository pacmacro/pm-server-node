export const enum State {
    Initializing = "initializing",
    Uninitialized = "uninitialized",
    InProgress = "in_progress",
    PacmanWin = "finished_pacman_win",
    GhostsWin = "finished_ghosts_win",
    Paused = "paused",
    Active = "active",
    Powerup = "powerup",
    Captured = "captured",
    Ready = "ready"
}

export const enum Property {
    Name = "name",
    State = "state",
    Position = "position",
    Eaten = "eaten",
    Powerdot = "powerdot"
}

export const enum Name {
    Pacman = "pacman",
    Blinky = "blinky",
    Clyde = "clyde",
    Inky = "inky",
    Pinky = "pinky"
}

export interface Position {
    latitude: number
    longitude: number
}

export interface Entity {
    position: Position
}

export interface Player extends Entity {
    name: Name
    state: State
}

export interface Pacdot extends Entity {
    eaten: boolean
    powerdot: boolean
}

export interface Game {
    state: State
    players: Player[]
    pacdots: Pacdot[]
}
