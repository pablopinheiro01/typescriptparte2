import { Negociacao, NegociacaoParcial } from '../models/index';

export class NegociacaoService{
    //parametro de entrada é forcado a receber um Response e devolver um Response conforme o HandlerFunction
    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {

        //controlo a quantidade de click's nao honerando o servidor
        //fetch api trata dados para receber via ajax ela e nativa do es6
        return fetch('http://localhost:8080/dados')
        .then(res => handler(res))
        .then(res => res.json())
        .then( (dados: NegociacaoParcial[])  =>dados
            .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
        )
        .catch(error => {
            console.log(error);
            throw new Error("Não foi possivel importar as negociações");
        });
    }
}

export interface HandlerFunction {
    //uma funcao que recebe um Response e devolve um Response
    (res: Response): Response
}