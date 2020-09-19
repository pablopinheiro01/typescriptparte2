
import { MeuObjeto } from './MeuObjeto';

export class  Negociacao implements MeuObjeto<Negociacao> {

    //propriedade readonly permite a leitura e nao a alteração da propriedade
    constructor(readonly data: Date,readonly quantidade: number, readonly valor: number ){
    }

    get volume(){
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`
        )
    }

    ehIgual(negociacao: Negociacao): boolean {
        const igual = 
        this.data.getDate() == negociacao.data.getDate() 
        && this.data.getMonth() == negociacao.data.getMonth()
        && this.data.getFullYear() == negociacao.data.getFullYear();

        console.log(`Negociacao ehIgual ${igual}`);
        return igual;
    }

}

