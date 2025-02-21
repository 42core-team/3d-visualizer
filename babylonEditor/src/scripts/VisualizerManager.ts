import { Node } from "@babylonjs/core/node";
import Unit from "./Unit";
import Core from "./Core";
import Resource from "./Resource";
import Team from "./Team";
import { Vector3 } from "@babylonjs/core";

export default class VisualizerManager extends Node {

    public teams: Map<number, Team> = new Map<number, Team>();
    public resources: Map<number, Resource> = new Map<number, Resource>();

    private _replay: JSON;
    private _currFrame: number = 0;
    private _totalFrames: number = 0;

    private _paused: boolean = true;

    protected constructor(replay: JSON) {
        super("VisualizerManager");

        this._replay = replay;
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
        
        this._totalFrames = this._replay["full_tick_amount"];
        this._currFrame = 0;

        // get initial state aka tick 0
        const firstTick = this._replay["ticks"]["0"];
        if (!firstTick) {
            console.log("Error: No initial state found in replay.");
            return;
        }

        const objects = firstTick["objects"];
        objects && objects.array.forEach(object => {

            const type: number = object["type"] && object["type"] as number;
            const id: number = object["id"] && object["id"] as number;
            const pos: Vector3 = new Vector3(object["x"] as number, object["y"] as number, 0);
            const teamId: number = object["teamiD"] && object["teamiD"] as number;
            const hp: number = object["hp"] && object["hp"] as number;
            const balance: number = object["balance"] && object["balance"] as number;
            // where do i get how many teams there are and so on?

            switch (type) { // this wont work because i dont have the teams yet
                case 0: // Unit
                    this.teams[teamId].units[id] = new Unit(type, hp);
                    break;
                case 1: // Resource
                    this.resources[id] = new Resource(hp, pos);
                    break;
                case 2: // Core
                    this.teams[teamId]!.core = new Core(hp, pos);
                    break;
                default:
                    console.log("Error: Unknown object type found in replay.");
                    break;
            }

            // go trough each object and spawn it + add it to the map
        });


        const actions = firstTick["actions"];
        actions && actions.array.forEach(action => {
            // go trough each action and perform it
        });

    }

    public onUpdate(): void {
        if (this._paused) return;

        // get state at current tick and display it
    }

    public onStop(): void {
        // ...
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
