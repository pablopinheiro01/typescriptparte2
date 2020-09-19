import {  Imprimivel } from '../models/index';

export function imprime(...objetos: Imprimivel[]) {
    console.log("Entrou em utils");
    objetos.forEach(objeto => objeto.paraTexto());
}