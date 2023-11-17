export interface BaseShipping {
    success: boolean;
    message: string;
    fee: Fee;
}

export interface Fee {
    name: string;
    fee: number;
    insurance_fee: number;
    include_vat: number;
    cost_id: number;
    delivery_type: string;
    a: string;
    dt: string;
    extFees: any[];
    ship_fee_only: number;
    promotion_key: string;
    distance: number;
    delivery: boolean;
}
