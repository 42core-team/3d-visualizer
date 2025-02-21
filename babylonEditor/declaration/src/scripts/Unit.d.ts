import { TransformNode, Vector3 } from "@babylonjs/core";
declare enum UnitType {
    invalid = -1,
    Warrior = 0,
    Worker = 1,
    Archer = 2,
    Healer = 3,
    Tank = 4
}
export default class Unit extends TransformNode {
    unitType: UnitType;
    currHealth: number;
    private _particleSystem;
    constructor(unitType: UnitType, currHealth: number, pos: Vector3);
    onInitialize(): void;
    setHealth(amount: number): void;
    onInitialized(): void;
    onStart(): void;
    onUpdate(): void;
    onStop(): void;
    onMessage(name: string, data: any, sender: any): void;
}
export {};
