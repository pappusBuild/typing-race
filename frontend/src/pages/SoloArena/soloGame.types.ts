export type Racer = {
    id: number;
    progress: number; 
    baseSpeed: number;
    image:string;
    isPlayer: boolean;
};

export type SparkleEffect = {
    id: number;
    x: number;
    y: number;
}

export const INITIAL_RACERS: Racer[] = [
    {id: 1, progress: 6, baseSpeed: 0.05, image:"", isPlayer: false},
    {id: 2, progress: 6, baseSpeed: 0, image:"", isPlayer: true },
    {id: 3, progress: 6, baseSpeed: 0.042, image:"", isPlayer: false },
    {id: 4, progress: 6, baseSpeed: 0.046, image:"", isPlayer: false}
]