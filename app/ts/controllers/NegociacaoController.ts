import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { domInject, throttle} from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction} from '../service/index';
import { imprime } from '../helpers/Utils';


export class NegociacaoController {

    /* Essa implementação não levamos em consideração o uso do jQuery no projeto, no codigo logo abaixo utilizaremos essa famosa bibliteca
    private _inputData: HTMLInputElement ;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView("#mensagemView");

    constructor(){
        this._inputData = <HTMLInputElement> document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement> document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement> document.querySelector('#valor');
        this._negociacoesView.update(this._negociacoes);
    }    
    */

    @domInject("#data")
   private _inputData: JQuery ;
   @domInject("#quantidade")
   private _inputQuantidade: JQuery;
   @domInject("#valor")
   private _inputValor: JQuery;

   private _negociacoes: Negociacoes = new Negociacoes();
   private _negociacoesView = new NegociacoesView('#negociacoesView');
   private _mensagemView = new MensagemView("#mensagemView");

   private _negociacaoService = new NegociacaoService();

   constructor(){
       //busca os elementos atraves do jQuery
       //vamos usar um decorator para realizar essa carga em lazyloading
       /*this._inputData = $('#data');
       this._inputQuantidade = $('#quantidade');
       this._inputValor = $('#valor');*/
       this._negociacoesView.update(this._negociacoes);
   } 

   @throttle()
    adiciona(event: Event){

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)){
            this._mensagemView.update('Somente negociacoes em dias uteis, caramba....');
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        
        this._negociacoes.adiciona(negociacao);
        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociacao adicionada com sucesso!!!");

        /*this._negociacoes.paraArray().forEach(negociacao => {
            console.log(negociacao.data);
            console.log(negociacao.valor);
            console.log(negociacao.volume);
        })*/


    }

    private _ehDiaUtil(data: Date){
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    /*@throttle()
    importarDados(){
        console.log("Entrou no metodo de importacao...");
        const  isOk: HandlerFunction = (res: Response) => {
            if(res.ok){
                return res;
            }else{
                throw new Error(res.statusText);
            }
        }
        //controlo a quantidade de click's nao honerando o servidor
            this._negociacaoService
            .obterNegociacoes(isOk)
            .then(negociacoesParaImportar => {
                const negociacoesJaImportadas = this._negociacoes.paraArray();
                console.log(`metodo de importacao, objeto negociacoesJaImportadas ${negociacoesJaImportadas}`);
                negociacoesParaImportar.filter(
                    negociacao => !negociacoesJaImportadas.some(jaImportada => {
                    negociacao.ehIgual(jaImportada)
                })).forEach(negociacao => this._negociacoes.adiciona(negociacao));
                
                this._negociacoesView.update(this._negociacoes);
            })
            .catch(err => {
                this._mensagemView.update(err.message);
            });
        
    }*/

    @throttle()
    //com a instrução await e async eu deixo o meu codigo assincrono e nao sincrono
    async importarDados(){
        console.log("Entrou no metodo de importacao...");
        //consigo usar o try catch para tratar uma função assincrona
        try{
                
            const negociacoesParaImportar = await this._negociacaoService
            .obterNegociacoes(res => {
                if(res.ok){
                    return res;
                }else{
                    throw new Error(res.statusText);
                }
            });

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            console.log(`metodo de importacao, objeto negociacoesJaImportadas ${negociacoesJaImportadas}`);

            negociacoesParaImportar.filter(
                negociacao => !negociacoesJaImportadas.some(jaImportada => {
                negociacao.ehIgual(jaImportada)
            })).forEach(negociacao => this._negociacoes.adiciona(negociacao));
            
          this._negociacoesView.update(this._negociacoes);

        }catch(error){
            this._mensagemView.update(error.message);
        }
    }

}

enum DiaDaSemana{
    Domingo,
    Segunda,
    Tercao,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}