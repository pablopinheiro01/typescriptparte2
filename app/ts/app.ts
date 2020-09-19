import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

/*
document.querySelector('.form')
.addEventListener('submit', controller.adiciona.bind(controller));

*/

$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importarDados.bind(controller));
