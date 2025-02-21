import { Node } from "@babylonjs/core/node";
import Unit from "./Unit";
import Core from "./Core";
import Resource from "./Resource";


export default class VisualizerManager extends Node {

    private _units: Map<number, Unit> = new Map<number, Unit>();
    private _cores: Map<number, Core> = new Map<number, Core>();
    private _resources: Map<number, Resource> = new Map<number, Resource>();

    private _replay: JSON;
    private _currFrame: number = 0;
    private _totalFrames: number = 0;

    protected constructor(replay: JSON) {
        super("VisualizerManager");

        this._replay = replay;
        super("VisualizerManager");
    }

    public goToFrame(frame: number): void {
        this._currFrame = frame;
        if (this._currFrame < 0) {
            this._currFrame = 0;
        }
        else if (this._currFrame >= this._totalFrames) {
            this._currFrame = this._totalFrames - 1;
        }
    }

    public nextFrame(): void {
        this._currFrame++;
        if (this._currFrame >= this._totalFrames) {
            this._currFrame = this._totalFrames - 1;
        }
    }

    public previousFrame(): void {
        this._currFrame--;
        if (this._currFrame < 0) {
            this._currFrame = 0;
        }
    }

    public onInitialize(): void {
        // ...
    }

    public onInitialized(): void {
        // ...
    }

    public onStart(): void {
        // spawn all cores and units
    }

    public onUpdate(): void {
        // ...
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
            case "statusUpdate":
                // Do something...
                break;
        }
    }
}
