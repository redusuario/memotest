console.log('memotest');

let turnos = 0;
let $primerCuadro = null;
let cantidadCuadros;
const $tablero = document.querySelector('#tablero-juego');
const $cuadros = $tablero.querySelectorAll('.cuadro');
//console.log($cuadros);


function configurarJuego() {
  	const coloresBase = ['rojo', 'azul', 'verde', 'amarillo', 'negro', 'blanco'];
	const coloresDuplicados = coloresBase.concat(coloresBase);
	cantidadCuadros = coloresDuplicados.length;
  	configurarCuadros($cuadros, coloresDuplicados);
  	manejarEventos($tablero);

}




function configurarCuadros($cuadros, colores) {

	const coloresRandom = colores.sort(function() {
	    return 0.5 - Math.random();
	});

	coloresRandom.forEach(function(color, i) {
	    $cuadros[i].classList.add(color);
	});
}


function manejarEventos($tablero) {

  // $cuadros.forEach(function($cuadro){
  //   $cuadro.onclick = function(){
  //     manejarClickCuadro($cuadro);
  //   }
  // });

  	$tablero.onclick = function(e) {
    	const $elemento = e.target;
    	if ($elemento.classList.contains('cuadro')) {
      		manejarClickCuadro($elemento);
    	}
    	//console.log($elemento);
  	};


}




function manejarClickCuadro($cuadroActual) {
	
	mostrarCuadro($cuadroActual);

	if(comprobarSiEsCuadroResuelto($cuadroActual)){
		return;
	}else{

	  	if ($primerCuadro === null) {
	    	$primerCuadro = $cuadroActual;
	  	} else {


	    	if ($primerCuadro === $cuadroActual) {
	      		return;
	    	}

	    	turnos++;

	    	if (cuadrosSonIguales($primerCuadro, $cuadroActual)) {
	      		//eliminarCuadro($primerCuadro);
	      		//eliminarCuadro($cuadroActual);

	      		marcarCuadrosComoYaElegidos($primerCuadro, $cuadroActual);

	      		cantidadCuadros = cantidadCuadros - 2;
	      		evaluarFinDeJuego(cantidadCuadros);
	      		console.log('cantida cuadros: '+cantidadCuadros);
	    	} else {
	      		ocultarCuadro($primerCuadro);
	      		ocultarCuadro($cuadroActual);
	    	}
	    	$primerCuadro = null;
	  	}
	}

}


function comprobarSiEsCuadroResuelto($cuadroActual) {
	if ($cuadroActual.classList.contains('completo')) {
		return true;
	}else{
		return false;
	}
}


function marcarCuadrosComoYaElegidos($primerCuadro, $cuadroActual) {
	$primerCuadro.classList.add('completo');
	$cuadroActual.classList.add('completo');
	console.log($primerCuadro);
	console.log($cuadroActual);
	console.log($cuadros);
}




function evaluarFinDeJuego(cantidadCuadros) {
 	if (cantidadCuadros === 0) {
    	$tablero.style.display = 'none';
    	//document.querySelector('#mensaje-final').textContent = turnos.toString();
   	 	//$mensajeFinJuego.style.display = 'block';
   	 	document.querySelector('#mensaje-final').className = '';
   	 	document.querySelector('#mensaje-final').querySelector('h1').textContent = 'JUEGO FINALIZADO EN '+ turnos.toString()+' TURNOS';
  	}
}


function cuadrosSonIguales($cuadro1, $cuadro2) {
  return $cuadro1.className === $cuadro2.className;

  /*
  //Este patrón siempre se puede simplificar:
  if($cuadro1.className === $cuadro2.className){
    return true;
  }else{
    return false;
  }
  */
}



function ocultarCuadro($cuadro) {
 	setTimeout(function() {
    	$cuadro.style.opacity = '0';
  	}, 500);
}



function mostrarCuadro($cuadro) {
  $cuadro.style.opacity = '1';
}


configurarJuego();



//-------------------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------------------
















