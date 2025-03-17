/*
	* Diccionario de tokens
*/
const tokenPalabrasReservadasPuntoComa = [
	{
		"tipo": "palabra reservada break",
		"token": "[_t:[break]]",
		"valor": "break",
	},
	{
		"tipo": "palabra reservada case",
		"token": "[_t:[case]]",
		"valor": "case",
	},
	{
		"tipo": "palabra reservada catch",
		"token": "[_t:[catch]]",
		"valor": "catch",
	},
	{
		"tipo": "palabra reservada class",
		"token": "[_t:[class]]",
		"valor": "class",
	},
	{
		"tipo": "palabra reservada const",
		"token": "[_t:[const]]",
		"valor": "const",
	},
	{
		"tipo": "palabra reservada continue",
		"token": "[_t:[continue]]",
		"valor": "continue",
	},
	{
		"tipo": "palabra reservada debugger",
		"token": "[_t:[debugger]]",
		"valor": "debugger",
	},
	{
		"tipo": "palabra reservada default",
		"token": "[_t:[default]]",
		"valor": "default",
	},
	{
		"tipo": "palabra reservada delete",
		"token": "[_t:[delete]]",
		"valor": "delete",
	},
	{
		"tipo": "palabra reservada do",
		"token": "[_t:[do]]",
		"valor": "do",
	},
	{
		"tipo": "palabra reservada else",
		"token": "[_t:[else]]",
		"valor": "else",
	},
	{
		"tipo": "palabra reservada export",
		"token": "[_t:[export]]",
		"valor": "export",
	},
	{
		"tipo": "palabra reservada extends",
		"token": "[_t:[extends]]",
		"valor": "extends",
	},
	{
		"tipo": "palabra reservada finally",
		"token": "[_t:[finally]]",
		"valor": "finally",
	},
	{
		"tipo": "palabra reservada for",
		"token": "[_t:[for]]",
		"valor": "for",
	},
	{
		"tipo": "palabra reservada function",
		"token": "[_t:[function]]",
		"valor": "function",
	},
	{
		"tipo": "palabra reservada if",
		"token": "[_t:[if]]",
		"valor": "if",
	},
	{
		"tipo": "palabra reservada import",
		"token": "[_t:[import]]",
		"valor": "import",
	},
	{
		"tipo": "palabra reservada in",
		"token": "[_t:[in]]",
		"valor": "in",
	},
	{
		"tipo": "palabra reservada let",
		"token": "[_t:[let]]",
		"valor": "let",
	},
	{
		"tipo": "palabra reservada of",
		"token": "[_t:[of]]",
		"valor": "of",
	},
	{
		"tipo": "palabra reservada instanceof",
		"token": "[_t:[instanceof]]",
		"valor": "instanceof",
	},
	{
		"tipo": "palabra reservada new",
		"token": "[_t:[new]]",
		"valor": "new",
	},
	{
		"tipo": "palabra reservada return",
		"token": "[_t:[return]]",
		"valor": "return",
	},
	{
		"tipo": "palabra reservada super",
		"token": "[_t:[super]]",
		"valor": "super",
	},
	{
		"tipo": "palabra reservada switch",
		"token": "[_t:[switch]]",
		"valor": "switch",
	},
	{
		"tipo": "palabra reservada this",
		"token": "[_t:[this]]",
		"valor": "this",
	},
	{
		"tipo": "palabra reservada throw",
		"token": "[_t:[throw]]",
		"valor": "throw",
	},
	{
		"tipo": "palabra reservada try",
		"token": "[_t:[try]]",
		"valor": "try",
	},
	{
		"tipo": "palabra reservada typeof",
		"token": "[_t:[typeof]]",
		"valor": "typeof",
	},
	{
		"tipo": "palabra reservada var",
		"token": "[_t:[var]]",
		"valor": "var",
	},
	{
		"tipo": "palabra reservada void",
		"token": "[_t:[void]]",
		"valor": "void",
	},
	{
		"tipo": "palabra reservada while",
		"token": "[_t:[while]]",
		"valor": "while",
	},
	{
		"tipo": "palabra reservada with",
		"token": "[_t:[with]]",
		"valor": "with",
	},
	{
		"tipo": "palabra reservada yield",
		"token": "[_t:[yield]]",
		"valor": "yield",
	},
	{
		"tipo": "palabra reservada parseInt",
		"token": "[_t:[parseInt]]",
		"valor": "parseInt",
	},
	{
		"tipo": "palabra reservada parseFloat",
		"token": "[_t:[parseFloat]]",
		"valor": "parseFloat",
	},
	{
		"tipo": "simbolo reservado ;",
		"descripcion": "indica que se le dio valor a una variable",
		"token": "[_t:[;]]",
		"valor": ";",
	},
	{
		"tipo": "simbolo reservado .",
		"descripcion": "indica que entrara a los valores de un objeto",
		"token": "[_t:[.]]",
		"valor": ".",
	},
];

const tokenOperadoresSimples = [
	{
		"tipo": "operador menor que",
		"token": "[_t:[<]]",
		"valor": "<",
	},
	{
		"tipo": "operador mayor que",
		"token": "[_t:[>]]",
		"valor": ">",
	},
	{
		"tipo": "operador suma o concatenacion",
		"token": "[_t:[+]]",
		"valor": "+",
	},
	{
		"tipo": "operador resta",
		"token": "[_t:[-]]",
		"valor": "-",
	},
	{
		"tipo": "operador multiplicacion",
		"token": "[_t:[*]]",
		"valor": "*",
	},
	{
		"tipo": "operador dividiendo",
		"token": "[_t:[/]]",
		"valor": "/",
	},
	{
		"tipo": "operador igualacion",
		"token": "[_t:[=]]",
		"valor": "=",
	},
	{
		"tipo": "operador modulo",
		"token": "[_t:[%]]",
		"valor": "%",
	},
	{
		"tipo": "operador ternario, si no o terminacion case",
		"token": "[_t:[:]]",
		"valor": ":",
	},
	{
		"tipo": "operador entontes",
		"token": "[_t:[?]]",
		"valor": "?",
	},
	{
		"tipo": "operador negacion",
		"token": "[_t:[!]]",
		"valor": "!",
	},
	{
		"tipo": "operador or simple",
		"token": "[_t:[|]]",
		"valor": "|",
	},
	{
		"tipo": "operador and simple",
		"token": "[_t:[&]]",
		"valor": "&",
	},
];

const tokenCorchetes = [
	{
		"tipo": "llave abre",
		"token": "[_t:[{]]",
		"valor": "{",
	},
	{
		"tipo": "llave cierra",
		"token": "[_t:[}]]",
		"valor": "}",
	},
	{
		"tipo": "parentesis abre",
		"token": "[_t:[(]]",
		"valor": "(",
	},
	{
		"tipo": "parentesis cierra",
		"token": "[_t:[)]]",
		"valor": ")",
	},
	{
		"tipo": "corchete abre",
		"token": "[_t:[[]]",
		"valor": "[",
	},
	{
		"tipo": "corchete cierra",
		"token": "[_t:[]]]",
		"valor": "]",
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
		"token": "[_t:[+=]]",
		"valor": "+=",
	},
	{
		"tipo": "operacion resta",
		"token": "[_t:[-=]]",
		"valor": "-=",
	},
	{
		"tipo": "operacion multiplicacion",
		"token": "[_t:[*=]]",
		"valor": "*=",
	},
	{
		"tipo": "operacion division",
		"token": "[_t:[/=]]",
		"valor": "/=",
	},
	{
		"tipo": "operacion modulo",
		"token": "[_t:[%=]]",
		"valor": "%=",
	},
	{
		"tipo": "operacion mayor igual",
		"token": "[_t:[>=]]",
		"valor": ">=",
	},
	{
		"tipo": "operacion menor igual",
		"token": "[_t:[<=]]",
		"valor": "<=",
	},
	{
		"tipo": "operacion exponente",
		"token": "[_t:[**=]]",
		"valor": "**=",
	},
	{
		"tipo": "operacion suma",
		"token": "[_t:[++]]",
		"valor": "++",
	},
	{
		"tipo": "operacion resta",
		"token": "[_t:[--]]",
		"valor": "--",
	},
	{
		"tipo": "operacion exponente",
		"token": "[_t:[**]]",
		"valor": "**",
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "[_t:[<<=]]",
		"valor": "<<=",
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "[_t:[>>=]]",
		"valor": ">>=",
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "[_t:[>>>=]]",
		"valor": ">>>=",
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "[_t:[&=]]",
		"valor": "&=",
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "[_t:[^=]]",
		"valor": "^=",
	},
	{
		"tipo": "operacion or compuesto",
		"token": "[_t:[||]]",
		"valor": "||",
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "[_t:[|=]]",
		"valor": "|=",
	},
	{
		"tipo": "operacion asignacion compuesta",
		"token": "[_t:[||=]]",
		"valor": "||=",
	},
	{
		"tipo": "operacion and compuesta",
		"token": "[_t:[&&]]",
		"valor": "&&",
	},
	{
		"token": "[_t:[??=]]",
		"valor": "??=",
	},
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


	// toca jugar con esto
	let oldToken = ''
	let newToken = ''

	try {
		const regex = /\b(\w+)\b|(\S)/g; // Identifica palabras y caracteres individuales
		const regexVariables = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Regex para validar nombres de variables
    	let match;

		while((match = regex.exec(codigo)) !== null){

			i += 1
			const token = match[1] || match[2];

			let unitario = filtroBusquedaUnitario(token).toString() // caracteres es 1
			
			if(unitario){
				tokenCompuestoEvaluar = tokens[tokens.length - 1] + token
				let compuesto = filtroBusquedaCompuesto(tokenCompuestoEvaluar).toString() // caracteres es 2,3,4
				if(compuesto){
					console.log(compuesto)
					tokens[tokens.length - 1];
					tokens.pop()
					if(!tokens.find(obj => obj === compuesto)){
						tokens.push(compuesto)
					}
				}else{
					if(!tokens.find(obj => obj === unitario)){
						tokens.push(unitario)
					}
				}
			}else{
				palabraCadena = "textoEnCadena"
				if(!tokens.find(obj => obj === palabraCadena)){
					tokens.push(palabraCadena)
				}
			}

		}

		return tokens
	} catch (error) {
		console.error("Error durante el análisis léxico:", error.message);
		return null;
	}

}

// const codigo = `
// 	let _x = 10;
// 	let _y = 10;
// 	if (parseInt(_x) + 5 >= 30 || parseInt(_x) + 5 < 1 && parseInt(_y) = 30) {
// 		/* Hola mundo */
// 		// Aqui desde mañana 
// 		_y = _x * 2
// 		_y += _x * 2
// 	} else if(parseInt(_x) + 5 * parseInt(_y) < 100){ 
// 		_y = _x ** 2
// 	} else { 
// 		return "bye"
// 	}
// 	console.log(_y);
// `

const codigo = `
	_z = 2 * 4
	_r = _z ** 4
`
  
console.log(codigo);
const tokens = analizadorLexico(codigo);
console.log(tokens);