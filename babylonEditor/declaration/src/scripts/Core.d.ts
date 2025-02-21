import { TransformNode, Vector3 } from "@babylonjs/core";
export default class Core extends TransformNode {
    private _currHealth;
    private _maxHealth;
    protected constructor(currHealth: number, maxHealth: number, pos: Vector3);
    setHealth(amount: number): void;
    onInitialize(): void;
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
