function analizadorLexico(codigo) {

		/*
			* Diccionario de tokens
		*/
		const tokenPalabrasReservadas = [
			{
				"token": "[_t:[break]]",
				"valor": "break",
			},
			{
				"token": "[_t:[case]]",
				"valor": "case",
			},
			{
				"token": "[_t:[catch]]",
				"valor": "catch",
			},
			{
				"token": "[_t:[class]]",
				"valor": "class",
			},
			{
				"token": "[_t:[const]]",
				"valor": "const",
			},
			{
				"token": "[_t:[continue]]",
				"valor": "continue",
			},
			{
				"token": "[_t:[debugger]]",
				"valor": "debugger",
			},
			{
				"token": "[_t:[default]]",
				"valor": "default",
			},
			{
				"token": "[_t:[delete]]",
				"valor": "delete",
			},
			{
				"token": "[_t:[do]]",
				"valor": "do",
			},
			{
				"token": "[_t:[else]]",
				"valor": "else",
			},
			{
				"token": "[_t:[export]]",
				"valor": "export",
			},
			{
				"token": "[_t:[extends]]",
				"valor": "extends",
			},
			{
				"token": "[_t:[finally]]",
				"valor": "finally",
			},
			{
				"token": "[_t:[for]]",
				"valor": "for",
			},
			{
				"token": "[_t:[function]]",
				"valor": "function",
			},
			{
				"token": "[_t:[if]]",
				"valor": "if",
			},
			{
				"token": "[_t:[import]]",
				"valor": "import",
			},
			{
				"token": "[_t:[in]]",
				"valor": "in",
			},
			{
				"token": "[_t:[let]]",
				"valor": "let",
			},
			{
				"token": "[_t:[of]]",
				"valor": "of",
			},
			{
				"token": "[_t:[instanceof]]",
				"valor": "instanceof",
			},
			{
				"token": "[_t:[new]]",
				"valor": "new",
			},
			{
				"token": "[_t:[return]]",
				"valor": "return",
			},
			{
				"token": "[_t:[super]]",
				"valor": "super",
			},
			{
				"token": "[_t:[switch]]",
				"valor": "switch",
			},
			{
				"token": "[_t:[this]]",
				"valor": "this",
			},
			{
				"token": "[_t:[throw]]",
				"valor": "throw",
			},
			{
				"token": "[_t:[try]]",
				"valor": "try",
			},
			{
				"token": "[_t:[typeof]]",
				"valor": "typeof",
			},
			{
				"token": "[_t:[var]]",
				"valor": "var",
			},
			{
				"token": "[_t:[void]]",
				"valor": "void",
			},
			{
				"token": "[_t:[while]]",
				"valor": "while",
			},
			{
				"token": "[_t:[with]]",
				"valor": "with",
			},
			{
				"token": "[_t:[yield]]",
				"valor": "yield",
			},
			{
				"token": "[_t:[parseInt]]",
				"valor": "parseInt",
			},
			{
				"token": "[_t:[parseFloat]]",
				"valor": "parseFloat",
			},
			{
				"token": "[_t:[;]]",
				"valor": ";",
			},
		];

		const tokenOperadoresSimples = [
			{
				"token": "[_t:[<]]",
				"valor": "<",
			},
			{
				"token": "[_t:[>]]",
				"valor": ">",
			},
			{
				"token": "[_t:[+]]",
				"valor": "+",
			},
			{
				"token": "[_t:[:]]",
				"valor": ":",
			},
			{
				"token": "[_t:[*]]",
				"valor": "*",
			},
			{
				"token": "[_t:[/]]",
				"valor": "/",
			},
			{
				"token": "[_t:[=]]",
				"valor": "=",
			},
			{
				"token": "[_t:[:]]",
				"valor": ":",
			},
			{
				"token": "[_t:[%]]",
				"valor": "%",
			},
			{
				"token": "[_t:[?]]",
				"valor": "?",
			},
		];

		const tokenOperadoresCompuestos = [
			{
				"token": "[_t:[+=]]",
				"valor": "+=",
			},
			{
				"token": "[_t:[-=]]",
				"valor": "-=",
			},
			{
				"token": "[_t:[*=]]",
				"valor": "*=",
			},
			{
				"token": "[_t:[/=]]",
				"valor": "/=",
			},
			{
				"token": "[_t:[%=]]",
				"valor": "%=",
			},
			{
				"token": "[_t:[**=]]",
				"valor": "**=",
			},
			{
				"token": "[_t:[++]]",
				"valor": "++",
			},
			{
				"token": "[_t:[--]]",
				"valor": "--",
			},
			{
				"token": "[_t:[**]]",
				"valor": "**",
			},
			{
				"token": "[_t:[<<=]]",
				"valor": "<<=",
			},
			{
				"token": "[_t:[>>=]]",
				"valor": ">>=",
			},
			{
				"token": "[_t:[>>>=]]",
				"valor": ">>>=",
			},
			{
				"token": "[_t:[&=]]",
				"valor": "&=",
			},
			{
				"token": "[_t:[^=]]",
				"valor": "^=",
			},
			{
				"token": "[_t:[|=]]",
				"valor": "|=",
			},
			{
				"token": "[_t:[&&=]]",
				"valor": "&&=",
			},
			{
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
				"token": "[_t:[{]]",
				"valor": "{",
			},
			{
				"token": "[_t:[}]]",
				"valor": "}",
			},
			{
				"token": "[_t:[(]]",
				"valor": "(",
			},
			{
				"token": "[_t:[)]]",
				"valor": ")",
			},
			{
				"token": "[_t:[[]]",
				"valor": "[",
			},
			{
				"token": "[_t:[]]]",
				"valor": "]",
			},
		];

		const tokenCadenaImpresion = [
			{
				"token": "[_t:[']]",
				"valor": "'",
			},
			{
				"token": "[_t:[`]]",
				"valor": "`",
			},
			{
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
			console.log('aqui estoy')
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