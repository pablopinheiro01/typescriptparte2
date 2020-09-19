import { Imprimivel } from './Imprimivel';
import { Negociacao } from './Negociacao';
import { Igualavel } from './Igualavel';
import { MeuObjeto } from './MeuObjeto';


export class Negociacoes implements MeuObjeto<Negociacoes> {
    //private _negociacoes: Array<Negociacao> = [];
    // a sintaxe abaixo é a mesma da declaracao acima, e um syntaxsugar do typescript
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void{
       this._negociacoes.push (negociacao);
    }

    //retorna o tipo, e uma boa pratica usar isso dentro do desenvolvimento
    paraArray(): Negociacao[]{
        //tratamento para programacao defensiva nao permitindo a reescrita do objeto enviando um objeto novo
        //essa tecnica foi vista no curso de javascript avancado
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log('-- Impresao --');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        const igual = JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
        console.log(`Negociacoes e igual ${igual}`)
        return igual;
    }
}