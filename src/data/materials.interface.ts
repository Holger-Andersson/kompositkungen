export interface MaterialData {
    name: string;
    ratio: {
        a: number;
        b: number;
        c?: number;
    };
    potlife: {
        10: number;
        16: number;
        25: number;
        32: number;
    }
}