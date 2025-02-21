import { Node } from "@babylonjs/core/node";
export default class VisualizerManager extends Node {
    private _units;
    private _cores;
    private _resources;
    private _replay;
    private _currFrame;
    private _totalFrames;
    protected constructor(replay: JSON);
    goToFrame(frame: number): void;
    nextFrame(): void;
    previousFrame(): void;
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
