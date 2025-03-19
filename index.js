/*
	* Diccionario de tokens
*/
const tokenPalabrasReservadasPuntoComa = [
	{
		"tipo": "palabra reservada break",
		"token": "palabra_reservada_break",
		"valor": "break",
	},
	{
		"tipo": "palabra reservada case",
		"token": "palabra_reservada_case",
		"valor": "case"
	},
	{
		"tipo": "palabra reservada catch",
		"token": "palabra_reservada_catch",
		"valor": "catch"
	},
	{
		"tipo": "palabra reservada class",
		"token": "palabra_reservada_class",
		"valor": "class"
	},
	{
		"tipo": "palabra reservada const",
		"token": "palabra_reservada_const",
		"valor": "const"
	},
	{
		"tipo": "palabra reservada continue",
		"token": "palabra_reservada_continue",
		"valor": "continue"
	},
	{
		"tipo": "palabra reservada debugger",
		"token": "palabra_reservada_debugger",
		"valor": "debugger"
	},
	{
		"tipo": "palabra reservada default",
		"token": "palabra_reservada_default",
		"valor": "default"
	},
	{
		"tipo": "palabra reservada delete",
		"token": "palabra_reservada_delete",
		"valor": "delete"
	},
	{
		"tipo": "palabra reservada do",
		"token": "palabra_reservada_do",
		"valor": "do"
	},
	{
		"tipo": "palabra reservada else",
		"token": "palabra_reservada_else",
		"valor": "else"
	},
	{
		"tipo": "palabra reservada export",
		"token": "palabra_reservada_export",
		"valor": "export"
	},
	{
		"tipo": "palabra reservada extends",
		"token": "palabra_reservada_extends",
		"valor": "extends"
	},
	{
		"tipo": "palabra reservada finally",
		"token": "palabra_reservada_finally",
		"valor": "finally"
	},
	{
		"tipo": "palabra reservada for",
		"token": "palabra_reservada_for",
		"valor": "for"
	},
	{
		"tipo": "palabra reservada function",
		"token": "palabra_reservada_function",
		"valor": "function"
	},
	{
		"tipo": "palabra reservada if",
		"token": "palabra_reservada_if",
		"valor": "if"
	},
	{
		"tipo": "palabra reservada import",
		"token": "palabra_reservada_import",
		"valor": "import"
	},
	{
		"tipo": "palabra reservada in",
		"token": "palabra_reservada_in",
		"valor": "in"
	},
	{
		"tipo": "palabra reservada let",
		"token": "palabra_reservada_let",
		"valor": "let"
	},
	{
		"tipo": "palabra reservada of",
		"token": "palabra_reservada_of",
		"valor": "of"
	},
	{
		"tipo": "palabra reservada instanceof",
		"token": "palabra_reservada_instanceof",
		"valor": "instanceof"
	},
	{
		"tipo": "palabra reservada new",
		"token": "palabra_reservada_new",
		"valor": "new"
	},
	{
		"tipo": "palabra reservada return",
		"token": "palabra_reservada_return",
		"valor": "return"
	},
	{
		"tipo": "palabra reservada super",
		"token": "palabra_reservada_super",
		"valor": "super"
	},
	{
		"tipo": "palabra reservada switch",
		"token": "palabra_reservada_switch",
		"valor": "switch"
	},
	{
		"tipo": "palabra reservada this",
		"token": "palabra_reservada_this",
		"valor": "this"
	},
	{
		"tipo": "palabra reservada throw",
		"token": "palabra_reservada_throw",
		"valor": "throw"
	},
	{
		"tipo": "palabra reservada try",
		"token": "palabra_reservada_try",
		"valor": "try"
	},
	{
		"tipo": "palabra reservada typeof",
		"token": "palabra_reservada_typeof",
		"valor": "typeof"
	},
	{
		"tipo": "palabra reservada var",
		"token": "palabra_reservada_var",
		"valor": "var"
	},
	{
		"tipo": "palabra reservada void",
		"token": "palabra_reservada_void",
		"valor": "void"
	},
	{
		"tipo": "palabra reservada while",
		"token": "palabra_reservada_while",
		"valor": "while"
	},
	{
		"tipo": "palabra reservada with",
		"token": "palabra_reservada_with",
		"valor": "with"
	},
	{
		"tipo": "palabra reservada yield",
		"token": "palabra_reservada_yield",
		"valor": "yield"
	},
	{
		"tipo": "palabra reservada parseInt",
		"token": "palabra_reservada_parseInt",
		"valor": "parseInt"
	},
	{
		"tipo": "palabra reservada parseFloat",
		"token": "palabra_reservada_parseFloat",
		"valor": "parseFloat"
	},
	{
		"tipo": "simbolo reservado ;",
		"token": "simbolo_reservado_punto_y_coma",
		"valor": ";"
	},
	{
		"tipo": "simbolo reservado .",
		"token": "simbolo_reservado_punto",
		"valor": "."
	}
	
];

const tokenOperadoresSimples = [
	{
		"tipo": "operador menor que",
		"token": "operador_menor_que",
		"valor": "<"
	},
	{
		"tipo": "operador mayor que",
		"token": "operador_mayor_que",
		"valor": ">"
	},
	{
		"tipo": "operador suma o concatenacion",
		"token": "operador_suma_o_concatenacion",
		"valor": "+"
	},
	{
		"tipo": "operador resta",
		"token": "operador_resta",
		"valor": "-"
	},
	{
		"tipo": "operador multiplicacion",
		"token": "operador_multiplicacion",
		"valor": "*"
	},
	{
		"tipo": "operador dividiendo",
		"token": "operador_dividiendo",
		"valor": "/"
	},
	{
		"tipo": "operador igualdad",
		"token": "operador_igualdad",
		"valor": "="
	},
	{
		"tipo": "operador modulo",
		"token": "operador_modulo",
		"valor": "%"
	},
	{
		"tipo": "operador ternario, si no o terminacion case",
		"token": "operador_ternario",
		"valor": ":"
	},
	{
		"tipo": "operador entontes",
		"token": "operador_entonces",
		"valor": "?"
	},
	{
		"tipo": "operador negacion",
		"token": "operador_negacion",
		"valor": "!"
	},
	{
		"tipo": "operador or simple",
		"token": "operador_or_simple",
		"valor": "|"
	},
	{
		"tipo": "operador and simple",
		"token": "operador_and_simple",
		"valor": "&"
	}
	
];

const tokenCorchetes = [
	{
		"tipo": "parentesis abre",
		"token": "abre_parentesis",
		"valor": "("
	},
	{
		"tipo": "parentesis cierra",
		"token": "cierra_parentesis",
		"valor": ")"
	},
	{
		"tipo": "corchete abre",
		"token": "abre_corchete",
		"valor": "["
	},
	{
		"tipo": "corchete cierra",
		"token": "cierra_corchete",
		"valor": "]"
	},
	{
		"tipo": "llave abre",
		"token": "abre_llave",
		"valor": "{"
	},
	{
		"tipo": "llave cierra",
		"token": "cierra_llave",
		"valor": "}"
	},
];

const tokenCadenaImpresion = [
	{
		"tipo": "comentario",
		"token": "[_t:[']]",
		"valor": "'",
	},
	{
		"tipo": "template",
		"token": "[_t:[`]]",
		"valor": "`",
	},
	{
		"tipo": "comentario",
		"token": "[_t:[\"]]",
		"valor": "\"",
	},
];

const tokenOperadoresCompuestos = [
	{
		"tipo": "operacion suma",
		"token": "suma_asignacion",
		"valor": "+="
	},
	{
		"tipo": "operacion resta",
		"token": "resta_asignacion",
		"valor": "-="
	},
	{
		"tipo": "operacion multiplicacion",
		"token": "multiplicacion_asignacion",
		"valor": "*="
	},
	{
		"tipo": "operacion division",
		"token": "division_asignacion",
		"valor": "/="
	},
	{
		"tipo": "operacion modulo",
		"token": "modulo_asignacion",
		"valor": "%="
	},
	{
		"tipo": "operacion mayor igual",
		"token": "mayor_igual",
		"valor": ">="
	},
	{
		"tipo": "operacion menor igual",
		"token": "menor_igual",
		"valor": "<="
	},
	{
		"tipo": "operacion exponente",
		"token": "exponente_asignacion",
		"valor": "**="
	},
	{
		"tipo": "operacion suma",
		"token": "incremento",
		"valor": "++"
	},
	{
		"tipo": "operacion resta",
		"token": "decremento",
		"valor": "--"
	},
	{
		"tipo": "operacion exponente",
		"token": "exponente",
		"valor": "**"
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "desplazamiento_izquierda_asignacion",
		"valor": "<<="
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "desplazamiento_derecha_asignacion",
		"valor": ">>="
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "desplazamiento_derecha_logico_asignacion",
		"valor": ">>>="
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "and_binario_asignacion",
		"valor": "&="
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "xor_asignacion",
		"valor": "^="
	},
	{
		"tipo": "operacion or compuesto",
		"token": "or_logico",
		"valor": "||"
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "or_binario_asignacion",
		"valor": "|="
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "or_logico_asignacion",
		"valor": "||="
	},
	{
		"tipo": "operacion and compuesta",
		"token": "and_logico",
		"valor": "&&"
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "nullish_asignacion",
		"valor": "??="
	}
	
];

const tokenComentarioCompuestos = [
	{
		"tipo": "Apertura de comentario, ignorado por interprete",
		"token": "[_t:['/*']]",
		"valor": "/*",
	},
	{
		"tipo": "Cierre de comentario, ignorado por interprete",
		"token": "[_t:['*/']]",
		"valor": "*/",
	},
	{
		"tipo": "Apertura de comentario, en una sola linea",
		"token": "[_t:['//']]",
		"valor": "//",
	},
	{
		"tipo": "Apertura de comentario de documentacion, ignorado por interprete",
		"token": "[_t:['/**']]",
		"valor": "/**",
	},
];

const tokenMetodosConsoleCompuestos = [
	{
		"tipo": "consolelog",
		"token": "[_t:['console.log']]",
		"valor": "console.log",
	},
	{
		"tipo": "consoleinfo",
		"token": "[_t:['console.info']]",
		"valor": "console.info"
	},
	{
		"tipo": "consolewarn",
		"token": "[_t:['console.warn']]",
		"valor": "console.warn"
	},
	{
		"tipo": "consoleerror",
		"token": "[_t:['console.error']]",
		"valor": "console.error"
	},
	{
		"tipo": "consoledebug",
		"token": "[_t:['console.debug']]",
		"valor": "console.debug"
	},
	{
		"tipo": "consoletrace",
		"token": "[_t:['console.trace']]",
		"valor": "console.trace"
	},
	{
		"tipo": "consoletime",
		"token": "[_t:['console.time']]",
		"valor": "console.time"
	},
	{
		"tipo": "consoletimeEnd",
		"token": "[_t:['console.timeEnd']]",
		"valor": "console.timeEnd"
	},
	{
		"tipo": "consoletimeLog",
		"token": "[_t:['console.timeLog']]",
		"valor": "console.timeLog"
	},
	{
		"tipo": "consolegroup",
		"token": "[_t:['console.group']]",
		"valor": "console.group"
	},
	{
		"tipo": "consolegroupCollapsed",
		"token": "[_t:['console.groupCollapsed']]",
		"valor": "console.groupCollapsed"
	},
	{
		"tipo": "consolegroupEnd",
		"token": "[_t:['console.groupEnd']]",
		"valor": "console.groupEnd"
	},
	{
		"tipo": "consolecount",
		"token": "[_t:['console.count']]",
		"valor": "console.count"
	},
	{
		"tipo": "consolecountReset",
		"token": "[_t:['console.countReset']]",
		"valor": "console.countReset"
	},
	{
		"tipo": "consoletable",
		"token": "[_t:['console.table']]",
		"valor": "console.table"
	},
	{
		"tipo": "consoledir",
		"token": "[_t:['console.dir']]",
		"valor": "console.dir"
	},
	{
		"tipo": "consoledirxml",
		"token": "[_t:['console.dirxml']]",
		"valor": "console.dirxml"
	},
	{
		"tipo": "consoleassert",
		"token": "[_t:['console.assert']]",
		"valor": "console.assert"
	},
	{
		"tipo": "consoleclear",
		"token": "[_t:['console.clear']]",
		"valor": "console.clear"
	},
	{
		"tipo": "consoleprofile",
		"token": "[_t:['console.profile']]",
		"valor": "console.profile"
	},
	{
		"tipo": "consoleprofileEnd",
		"token": "[_t:['console.profileEnd']]",
		"valor": "console.profileEnd"
	},
	{
		"tipo": "consolememory",
		"token": "[_t:['console.memory']]",
		"valor": "console.memory"
	},
	{
		"tipo": "consoleexception",
		"token": "[_t:['console.exception']]",
		"valor": "console.exception"
	},
	{
		"tipo": "consolemarkTimeline",
		"token": "[_t:['console.markTimeline']]",
		"valor": "console.markTimeline"
	},
	{
		"tipo": "consoletimeStamp",
		"token": "[_t:['console.timeStamp']]",
		"valor": "console.timeStamp"
	}
];

function filtroBusquedaUnitario(valorBusqueda) {

	let _tokenPalabrasReservadasPuntoComa = tokenPalabrasReservadasPuntoComa.find(e => e.valor === valorBusqueda)
	let _tokenOperadoresSimples = tokenOperadoresSimples.find(e => e.valor === valorBusqueda)
	let _tokenCorchetes = tokenCorchetes.find(e => e.valor === valorBusqueda)
	let _tokenCadenaImpresion = tokenCadenaImpresion.find(e => e.valor === valorBusqueda)
	let _tokenMetodosConsoleCompuestos = tokenMetodosConsoleCompuestos.find(e => e.valor === valorBusqueda)

	let x = ''

	if(_tokenPalabrasReservadasPuntoComa){
		x = _tokenPalabrasReservadasPuntoComa.valor
	}	
	if(_tokenOperadoresSimples){
		x = _tokenOperadoresSimples.valor
	}
	if(_tokenCorchetes){
		x = _tokenCorchetes.valor
	}
	if(_tokenCadenaImpresion){
		x = _tokenCadenaImpresion.valor
	}	
	if(_tokenMetodosConsoleCompuestos){
		x = _tokenMetodosConsoleCompuestos.valor
	}	
	if(valorBusqueda.startsWith("_")){
		// x = "[_t:["+valorBusqueda+"]]"
		x = valorBusqueda
	}

	if(/^-?\d+$/.test(valorBusqueda) == true){
		// x = "[_t:[numero"+valorBusqueda+"]]"
		x = "numero"+valorBusqueda
	}

	return x

}

function filtroBusquedaCompuesto(valorBusqueda) {

	let _tokenOperadoresCompuestos = tokenOperadoresCompuestos.find(e => e.valor === valorBusqueda)
	let _tokenComentarioCompuestos = tokenComentarioCompuestos.find(e => e.valor === valorBusqueda)

	let x = ''

	if(_tokenOperadoresCompuestos){
		x = _tokenOperadoresCompuestos.valor
	}
	if(_tokenComentarioCompuestos){
		x = _tokenComentarioCompuestos.valor
	}	

	return x

}

function analizadorLexico(codigo) {

	let i = 0;
	const tokens = [];

	let tokenAcumulado = ''

	try {
		const regex = /\b(\w+)\b|(\S)/g; // Identifica palabras y caracteres individuales
		const regexVariables = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Regex para validar nombres de variables
    	let match;

		// recorro y almaceno tokens
		while((match = regex.exec(codigo)) !== null){

			i += 1
			const token = match[1] || match[2];

			let unitario = filtroBusquedaUnitario(token).toString() // caracteres es 1
			
			if(unitario){

				tokenAcumulado += unitario

				// evaluo si el token puede ser un compuesto
				let acumulado = filtroBusquedaCompuesto(tokenAcumulado).toString() // caracteres es 2,3,4

				// si es compuesto
				if(acumulado != ""){
					// elimino el ultimo insertado
					if(token.length > 0){
						tokens.pop(token.length - 1)
					}
					// almaceno el compuesto
					tokens.push(tokenAcumulado)
				}

				// si no encontro el compuesto pero si unitario
				if(acumulado == "" && unitario){
					// elimino el compuesto dejandolo en ""
					tokenAcumulado = ""
					// almaceno el ultimo unitario a guardar
					tokenAcumulado += unitario
					// guardo el ultimo unitario
					tokens.push(tokenAcumulado)
				}

			}else{
				palabraCadena = "textoEnCadena"
				if(!tokens.find(obj => obj === palabraCadena)){
					tokens.push(palabraCadena)
				}
			}

		}

		// duplico el array original y saco los que se repiten
		let arraySinDuplicados = [...new Set(tokens)];
		// devuelvo los tokens reales
		return arraySinDuplicados
	} catch (error) {
		console.error("Error durante el análisis léxico:", error.message);
		return null;
	}

}

const codigo = `
let _x = 10;
let _y = 15;
if (parseInt(_x) + 5 >= 30 || parseInt(_x) + 5 < 1 && parseInt(_y) = 30) {
	 _y = _x * 2
	 _y += _x * 2
 } else if(parseInt(_x) + 5 * parseInt(_y) < 100){ 
	 _y = _x ** 2
 } else { 
	 return "bye"
 }  
`

// let _x = 10;
// let _y = 15;
// if (parseInt(_x) + 5 >= 30 || parseInt(_x) + 5 < 1 && parseInt(_y) = 30) {
// 	/* Hola mundo */
// 	 // Aqui desde mañana 
// 	 _y = _x * 2
// 	 _y += _x * 2
//  } else if(parseInt(_x) + 5 * parseInt(_y) < 100){ 
// 	 _y = _x ** 2
//  } else { 
// 	 return "bye"
//  }
//  console.log(_y);
  
console.log(codigo);
const tokens = analizadorLexico(codigo);
console.log(tokens);