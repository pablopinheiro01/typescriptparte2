//padrao de projeto para evitar centenas de requisições do usuario nos botões
//configurando o famoso settimeout neste decorator conseguimos controlar as requisições do usuario
export function throttle(milisegundos = 500){

    return function( target: any, propertyKey: string, descriptor: PropertyDescriptor){

        //metodo onde o decorator foi posicionado com toda a sua logica
        const metodoOriginal = descriptor.value;
        let timer = 0;
        //sobreescreve o metodo original passando uma nova funcao
        descriptor.value = function(...args: any[]){
            //verifica se existe event por ser um objeto implicito da minha função para cancelar o evento
            if(event) event.preventDefault();
            clearInterval(timer);
            timer = setTimeout( () => metodoOriginal.apply(this,args), milisegundos);
        }
        return descriptor;
    }
}