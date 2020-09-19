export function logarTempoExecusao(emSegundos: boolean = false){

    return function( target: any, propertyKey: string, descriptor: PropertyDescriptor){
        //metodo onde o decorator foi posicionado com toda a sua logica
        const metodoOriginal = descriptor.value;

        //sobreescreve o metodo original passando uma nova funcao
        descriptor.value = function(...args: any[]){
            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos){
                unidade = 's';
                divisor = 1000;
            }
            console.log("-------------------------");
            console.log(`Parametros passados para o metodo ${propertyKey}: ${JSON.stringify(args)}`)
            const t1 = performance.now();
            //chamo o metodo original no contexto de this, passando todos os parametros que eu quero args
            const retorno = metodoOriginal.apply(this, args);
            
            const t2 = performance.now();
            console.log(` O retorno do metodo ${propertyKey} demorou ${(t2 -t1)/divisor} ${unidade}`)
            console.log(`O retorno do metodo ${propertyKey} é ${JSON.stringify(retorno)}`)
            return retorno;
        }

        return descriptor;

    }
}