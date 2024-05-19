import {Update, Vector, Vector2} from 'games/tombraid/types/game';

type Rect = {x: number; y: number; w: number; h: number};
type FillRect = Rect & {fill: string};
type StrokeRect = Rect & {stroke: string; lw: number};
type FillStrokeRect = FillRect & {stroke: string; lw: number};
type RoundFillStrokeRect = FillStrokeRect & {r: number};
type Line = Vector2 & {stroke: string; lw: number};
type Text = {x: number; y: number; txt: string; font: string; fill: string}; // auto-centered for now

type Zoom = 'in' | 'out';

export interface TransformedView extends PaintMethods {
    worldClamp: Vector2;
    offset: Vector;
    createTVUpdateSetWorldClamp: (context: CanvasRenderingContext2D) => Update;
}

interface PaintMethods {
    fillRect: (obj: FillRect) => void;
    strokeRect: (obj: StrokeRect) => void;
    line: (obj: Line) => void;
    text: (obj: Text) => void;
    fillStrokeRect: (obj: FillStrokeRect) => void;
    roundFillStrokeRect: (obj: RoundFillStrokeRect) => void;
}

export type TVOptions = {
    context: CanvasRenderingContext2D;
    screenSize: Vector;
    worldBorders?: Vector2;
    offset?: Vector;
    scale?: Vector;
    showWorldBorders?: boolean;
    showGrid?: number;
};

type Methods = {
    screen2World: (x: number, y: number) => void;
    world2Screen: (x: number, y: number) => void;
    world2Screen2: (x: number, y: number, x2: number, y2: number) => void;
    getMiddleScreen: () => Vector;
    setWorldClamp: (x: number, y: number, x2: number, y2: number) => void;
    zoomMechanic: {
        in: () => void;
        out: () => void;
    };
    zoom: (scalePos: Vector, type: Zoom) => void;
};

type Properties = {
    offset: Vector;
    scale: Vector;
    screen: Vector2;
    world: Vector;
    screenSize: Vector;
    worldTL: Vector;
    worldBR: Vector;
    startPan: Vector;
    worldBeforeZoom: Vector;
    worldAfterZoom: Vector;
    scaleFactor: number;
    worldClamp: Vector2;
};

export type TVProperties = Properties & Methods;
