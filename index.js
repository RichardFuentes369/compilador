function analizadorLexico(codigo) {

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
			"token": "[_t:[;]]",
			"valor": ";",
		},
		{
			"tipo": "simbolo reservado .",
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
			"tipo": "operador suma",
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
			"tipo": "operador ternario, si no",
			"token": "[_t:[:]]",
			"valor": ":",
		},
		{
			"tipo": "operador entontes",
			"token": "[_t:[?]]",
			"valor": "?",
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
			"token": "[_t:[??=]]",
			"valor": "??=",
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

	const tokenMetodosConsole = [
		"log", 
		"info", 
		"warn", 
		"error", 
		"debug", 
		"trace", 
		"time", 
		"timeEnd",
		"timeLog", 
		"group", 
		"groupCollapsed", 
		"groupEnd", 
		"count", 
		"countReset",
		"table", 
		"dir", 
		"dirxml", 
		"assert", 
		"clear", 
		"profile", 
		"profileEnd",
		"memory", 
		"exception", 
		"markTimeline", 
		"timeStamp"
	];


	let i = 0;
	const tokens = [];

	try {
		const regex = /\b(\w+)\b|(\S)/g; // Identifica palabras y caracteres individuales
		const regexVariables = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Regex para validar nombres de variables
    let match;

		while((match = regex.exec(codigo)) !== null){
			const token = match[1] || match[2];
			console.log(token)
		}
	} catch (error) {
		console.error("Error durante el análisis léxico:", error.message);
		return null;
	}
	return tokens;

}


const codigo = `
	let _x = 10;
	let _y = 10;
	if (parseInt(_x) + 5 * parseInt(_y) > 100) {
			/*Hola mundo*/
			// Aqui desde mañana 
			_y = _x * 2
	} else if(parseInt(_x) + 5 * parseInt(_y) < 100){ 
			_y = _x ** 2
	} else { 
			return "bye"
	}
	console.log(_y)
`
  
console.log(codigo);
const tokens = analizadorLexico(codigo);
console.log(tokens);