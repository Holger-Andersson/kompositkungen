interface MaterialData {
    name: string;
    ratio: {
        a: number;
        b: number;
        c?: number;
    };
}

export const Mats: MaterialData[] = [
    {name: "Välj Material..", ratio: {a: 0, b:0}},
    {name: "855", ratio: {a: 6.8, b:1}},
    {name: "858", ratio: {a: 4, b: 1}},
    {name: "MX1", ratio: {a: 3.3, b: 1, c: 22.6 }}
]