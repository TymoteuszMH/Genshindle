import { Sex, Region, Weapon, Element } from "./data";

export interface Champ{
    id: number,
    name: string,
    region: Region,
    element: Element,
    weapon: Weapon,
    gender: Sex
}