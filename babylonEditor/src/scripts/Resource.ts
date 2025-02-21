import { TransformNode, Vector3 } from "@babylonjs/core";

export default class Resource extends TransformNode {

    private _currHealth: number = -1;
    private _maxHealth: number = -1;

    protected constructor(currHealth: number, maxHealth: number, pos: Vector3) {
        super("Resource");

        this.position = pos;
        this._currHealth = currHealth;
        this._maxHealth = maxHealth;

    }

    public setHealth(amount: number): void {
        this._currHealth = amount;
        if (this._currHealth > this._maxHealth)
            this._currHealth = this._maxHealth;
        else if (this._currHealth < 0)
            this._currHealth = 0;
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
