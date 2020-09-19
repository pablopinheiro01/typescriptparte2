import { logarTempoExecusao } from '../helpers/decorators/index';

//mascaramos o problema de compilação do uso do jquery
//declare var $: any;
//o codigo acima foi substituido pela instalação de types do typescript garantindo o uso de bibliotecas na linguagaem
// só é utilizado o declare var no caso de nao existir um type para a biblioteca que queremos utilizar


//definindo que a View vai trabalhar com o tipo T generico
export abstract class View<T>{

    //o atributo definido como private garante que não esta relaxado no encapsulamento e pode ser acessado atraves
    //do generics implementado na classe pai
    private _elemento: JQuery;

    //parametro contendo a interrogacao no construtor indiga que ele e opcional
    //quando nao e informado nada ele vai como undefined
    private _escapar: boolean;

    //os parametros opcionais sempre devem ser os ultimos do seu construtor
    //constructor(selector: string, _escapar?: boolean )
    //removemos o _escapar como opcional devido a habilitacao da config         "strictNullChecks": true 
    //essa config valida se a app nao tem valores null ou undefined
    constructor(selector: string, _escapar: boolean = false){
        this._elemento = $(selector);
        this._escapar = _escapar;
    }

    @logarTempoExecusao(true)

    update(model: T ){
        let template = this.template(model);
        //codigo para tratamento de scripts indesejados
        if(this._escapar){
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        }
        this._elemento.html(this.template(model));
    }

    /*template(model: T) : string{
        throw new Error("Voce deve implementar o metodo template!!!");
    }*/
    //vou colocar o template como metodo abstrato para avisar o desenvolvedor em tempo de compilação
    abstract template(model: T): string;

}

