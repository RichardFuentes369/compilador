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

		const tokens = [];


		


	
    const regex = /\b(\w+)\b|(\S)/g; // Identifica palabras y caracteres individuales
		const regexVariables = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Regex para validar nombres de variables
    let match;

		posibleComentario = 0
		cadenaComentario = ''
		let storage = ''

		recorrido = 0

    while ((match = regex.exec(codigo)) !== null) {
      const token = match[1] || match[2];

			const palabraClave = tokenPalabrasReservadas.find(obj => obj.valor === token);
  		const operador = tokenOperadoresSimples.find(obj => obj.valor === token);
  		const corchete = tokenCorchetes.find(obj => obj.valor === token);
			const metodoAcceso = tokenMetodosConsole.find(e => e == token)

			/*
				* Primer if => Valida si es un comentario o no
				* Segundo if => Valida si es una palabra reservada
				* Tercer if => Valida si es un número
				* Cuarto if => Valida si es un corchete o parentesis
				* Quinto if => Valida si es una variable, toda variable inicia con (_), ejemplo:  _Algo
				* Sexto Es una cadena
			*/

			if (operador) {

				if(storage == ''){
					storage = {
						tipo: "operadorLogico",
						valor: token,
						// descripcion: operador.descripcion
					}
				}

				if (token == '/' || token == '*'){

					posibleComentario = posibleComentario+1
					cadenaComentario += token

					if(posibleComentario == 2){
						tokens.push(
							{
								tipo: "operadorComentario",
								valor: cadenaComentario,
								// descripcion: operador.descripcion
							}
						)
						posibleComentario = 0
						cadenaComentario = ''
						storage = ''
					}
				}else{
					if(posibleComentario == 1){
						tokens.push(storage)
						cadenaComentario = ''
						storage = ''
						posibleComentario = 0
					}
					tokens.push(
						{
							tipo: "operadorLogico",
							valor: token,
							// descripcion: operador.descripcion
						}
					)
					storage = ''
					cadenaComentario = ''
					posibleComentario = 0
				}

			}	else if (palabraClave) {
        tokens.push(
					{
						tipo: "palabraReservada",
						token: palabraClave.token,
						valor: palabraClave.valor,
						// descripcion: palabraClave.descripcion
					});
      } else if (/\d+/.test(token)) {
				if(storage){
					tokens.push(
						{
							tipo: storage.tipo,
							valor: storage.valor,
							// descripcion: "Valor númerico"
						}
					);
					storage = ''
				}
        tokens.push(
					{
						tipo: "numero",
						valor: token,
						// descripcion: "Valor númerico"
					}
				);
      } else if(corchete){
				if(storage){
					tokens.push(
						{
							tipo: storage.tipo,
							valor: storage.valor,
							// descripcion: "Valor númerico"
						}
					);
					storage = ''
				}
        tokens.push(
					{
						tipo: "corchete",
						valor: token,
						// descripcion: "Variable declarada en el sistema por el usuario"
					}
				);
			} else if((match = regexVariables.exec(token))){
        tokens.push(
					{
						tipo: "variable",
						valor: token,
						// descripcion: "Variable declarada en el sistema por el usuario"
					}
				);
      } else if(token == '.'){
				tokens.push(
					{
						tipo: "accesoPropiedad",
						valor: token,
						// descripcion: "Cadena de texto escrita por el usuario"
					}
				);
			} else if(metodoAcceso){
				tokens.push(
					{
						tipo: "propiedadConsole",
						valor: metodoAcceso,
						// descripcion: "Cadena de texto escrita por el usuario"
					}
				);
			} else {
        tokens.push(
					{
						tipo: "cadena",
						valor: token,
						// descripcion: "Cadena de texto escrita por el usuario"
					}
				);
      }
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
  
	const tokens = analizadorLexico(codigo);
  console.log(codigo);
  console.log(tokens);