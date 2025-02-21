import { TransformNode, Vector3 } from "@babylonjs/core";

enum UnitType {
    invalid = -1,
    Warrior = 0,
    Worker = 1,
    Archer = 2,
    Healer = 3,
    Tank = 4
}

export default class Unit extends TransformNode {

    private _unitType: UnitType = UnitType.invalid;
    private _currHealth: number = -1;
    private _maxHealth: number = -1;

    protected constructor(unitType: UnitType, currHealth: number, maxHealth: number) {
        super("Unit");

        this._unitType = unitType;
        this._currHealth = currHealth;
        this._maxHealth = maxHealth;

    }

    public onInitialize(): void {
        this.position = new Vector3(0, -100, 0);
        this.scaling = new Vector3(1, 1, 1);
        this.rotation = new Vector3(1, 1, 1);
    }


    public setHealth(amount: number): void {
        this._currHealth = amount;
        if (this._currHealth > this._maxHealth)
            this._currHealth = this._maxHealth;
        else if (this._currHealth < 0)
            this._currHealth = 0;
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
