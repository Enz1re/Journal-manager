import { Discipline } from "./Discipline";
import { Cathedra } from "./Cathedra";


export class Faculty {
	id: number;
    name: string;
    disciplines: Discipline[];
    cathedras: Cathedra[];
}