import { TransformNode } from "@babylonjs/core";
declare enum UnitType {
    invalid = -1,
    Warrior = 0,
    Worker = 1,
    Archer = 2,
    Healer = 3,
    Tank = 4
}
export default class Unit extends TransformNode {
    private _unitType;
    private _currHealth;
    private _maxHealth;
    protected constructor(unitType: UnitType, currHealth: number, maxHealth: number);
    onInitialize(): void;
    setHealth(amount: number): void;
    onInitialized(): void;
    onStart(): void;
    onUpdate(): void;
    onStop(): void;
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    onMessage(name: string, data: any, sender: any): void;
}
export {};
