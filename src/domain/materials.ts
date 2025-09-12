interface MaterialData {
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

export const Mats: MaterialData[] = [
    {name: "Välj Material..", ratio: {a: 0, b:0}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "855", ratio: {a: 6.8, b:1}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "858", ratio: {a: 4, b: 1}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "MX1", ratio: {a: 3.3, b: 1, c: 22.6 }, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "BX1", ratio:{a: 2.3, b: 1}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "BX2", ratio:{a: 4, b: 1}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "S1HB", ratio: {a: 2.6, b: 1}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "S2/KIWA", ratio:{a:2.3 , b: 1}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "S5", ratio:{a: 16.8, b: 1}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
    {name: "S7", ratio:{a: 100, b: 1}, potlife: { 10: 90, 16: 60, 25: 35, 32: 17 }},
]