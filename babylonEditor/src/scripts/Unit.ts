import { Color4, ParticleSystem, Texture, TransformNode, Vector3 } from "@babylonjs/core";

enum UnitType {
    invalid = -1,
    Warrior = 0,
    Worker = 1,
    Archer = 2,
    Healer = 3,
    Tank = 4
}

export default class Unit extends TransformNode {

    public unitType: UnitType = UnitType.invalid;
    public currHealth: number = -1;

    private _particleSystem: ParticleSystem;


    public constructor(unitType: UnitType, currHealth: number, pos: Vector3) {
        super("Unit");

        this.unitType = unitType;
        this.currHealth = currHealth;
        this.position = pos;
    }

    public onInitialize(): void {
        this.scaling = new Vector3(1, 1, 1);
        this.rotation = new Vector3(1, 1, 1);
    }


    public setHealth(amount: number): void {
        this.currHealth = amount;
    }

    public onInitialized(): void {
        // ...
    }

    public onStart(): void { }

    public onUpdate(): void {

        if (this.currHealth > 0) return;

        // big blood particle system explosion

        this._particleSystem = new ParticleSystem("particles", 2000, this.getScene());
        this._particleSystem.particleTexture = new Texture("textures/blood.png", this.getScene());
        this._particleSystem.emitter = this.position;
        this._particleSystem.minEmitBox = new Vector3(-1, 0, 0);
        this._particleSystem.maxEmitBox = new Vector3(1, 0, 0);
        this._particleSystem.color1 = new Color4(1, 0, 0, 1.0);
        this._particleSystem.color2 = new Color4(1, 0, 0, 1.0);
        this._particleSystem.colorDead = new Color4(0, 0, 0, 0.0);
        this._particleSystem.minSize = 0.1;
        this._particleSystem.maxSize = 0.5;

        this.dispose();
    }

    public onStop(): void {
        this.dispose();
    }

    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
}
