import { Node } from "@babylonjs/core/node";
import Unit from "./Unit";
import Core from "./Core";

export default class Team extends Node {

    public units: Map<number, Unit> = new Map<number, Unit>();
    public core: Core;
    public balance: number;
    public teamName: string;

    public constructor(balance: number, teamName: string) {
        super("Team");

        this.balance = balance;
        this.teamName = teamName;
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
        // ...
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
            case "myMessage":
                // Do something...
                break;
        }
    }
}
