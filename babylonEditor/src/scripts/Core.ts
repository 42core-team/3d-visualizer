import { TransformNode, Vector3 } from "@babylonjs/core";

export default class Core extends TransformNode {

    private _currHealth: number = -1;

    public constructor(currHealth: number, pos: Vector3) {
        super("Core");

        this.position = pos;
        this._currHealth = currHealth;

    }

    public setHealth(amount: number): void {
        this._currHealth = amount;
    }

    public onInitialize(): void {
        // ...
    }


    public onInitialized(): void {
        // ...
    }

    public onStart(): void {
        // ...
    }

    public onUpdate(): void {

        if (this._currHealth > 0) return;

        // big blood particle system explosion

        this.dispose();
    }

    public onStop(): void {
        this.dispose();
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
}
