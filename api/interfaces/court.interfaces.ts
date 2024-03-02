export interface ICourt {
    readonly _id: string;
    readonly available_from: string;
    readonly available_until: string;
    readonly court_number: number;
    readonly surface_type: string;
    readonly is_enabled: boolean;
}

export type TCourts = ICourt[];
