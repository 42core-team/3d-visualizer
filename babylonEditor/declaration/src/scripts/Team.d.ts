import { Node } from "@babylonjs/core/node";
import Unit from "./Unit";
import Core from "./Core";
export default class Team extends Node {
    units: Map<number, Unit>;
    core: Core;
    balance: number;
    teamName: string;
    constructor(balance: number, teamName: string);
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
