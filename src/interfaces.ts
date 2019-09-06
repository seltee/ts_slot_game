import { ReelSlots } from "enums";

export interface IReel{
    slots: Array<ReelSlots>;
    spin?: number;
    speed?: number;
    acceleration?: number;
    counter?: number;
    inSpin: boolean;
    targetSlot: ReelSlots;
    targetRow: number;
}
