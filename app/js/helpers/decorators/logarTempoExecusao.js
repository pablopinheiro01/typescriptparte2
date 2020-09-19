System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoExecusao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (emSegundos) {
                    unidade = 's';
                    divisor = 1000;
                }
                console.log("-------------------------");
                console.log(`Parametros passados para o metodo ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const t2 = performance.now();
                console.log(` O retorno do metodo ${propertyKey} demorou ${(t2 - t1) / divisor} ${unidade}`);
                console.log(`O retorno do metodo ${propertyKey} é ${JSON.stringify(retorno)}`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoExecusao", logarTempoExecusao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
