//este decorator foi criado com o objetivo de carregar os atributos em modo de lazy load poupando processamento da
//pagina
export function domInject(seletor: string){

    return function(target: any, key: string){
        let elemento: JQuery;

        const getter = function(){
            if(!elemento){
                console.log(`Buscando o elemento ${seletor} para injetar em ${key} `);
                elemento = $(seletor);
            }

            return elemento;
        }

        //para exportar um getter ou um setter eu preciso definir essa propriedade da seguinte forma
        //parametros sao target, chave, e o metodo get
        Object.defineProperty(target, key ,{
            get: getter
        });
    }

}