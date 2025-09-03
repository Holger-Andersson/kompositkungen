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
    {name: "855", ratio: {a: 1, b:6.8}},
    {name: "858", ratio: {a: 1, b: 4}}
]