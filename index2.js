function analizarLexico(codigo) {
    const tokens = [];
    let i = 0;

    const palabrasClave = [
        "let", 
        "const", 
        "if", 
        "else", 
        "for", 
        "while", 
        "function", 
        "return"
    ];
    const metodosConsole = [
        'log', 
        'info', 
        'warn', 
        'error', 
        'debug', 
        'trace', 
        'time', 
        'timeEnd',
        'timeLog', 
        'group', 
        'groupCollapsed', 
        'groupEnd', 
        'count', 
        'countReset',
        'table', 
        'dir', 
        'dirxml', 
        'assert', 
        'clear', 
        'profile', 
        'profileEnd',
        'memory', 
        'exception', 
        'markTimeline', 
        'timeStamp'
    ];
    const regexVariables = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Regex para validar nombres de variables

    try {
        while (i < codigo.length) {
            const caracter = codigo[i];

            switch (caracter) {
                case ' ':
                case '\t':
                case '\n':
                    i++;
                    break;

                // Operadores (incluyendo los nuevos)
                case '+':
                case '-':
                case '*':
                case '/':
                case '=':
                case '<':
                case '>':
                case '!':
                case '%': // Modulo
                case '&': // AND
                case '|': // OR
                case '^': // XOR
                case '~': // NOT
                case '?': // Ternario
                case ':': // Ternario
                    let operador = caracter;
                    // Combinaciones de 2 o 3 caracteres
                    if (codigo[i + 1] === '=' || codigo[i + 1] === '+' || codigo[i + 1] === '-' || codigo[i + 1] === '*' || codigo[i + 1] === '/' || codigo[i + 1] === '<' || codigo[i + 1] === '>' || codigo[i + 1] === '!' || codigo[i + 1] === '&' || codigo[i + 1] === '|') {
                        operador += codigo[i + 1];
                        i++;
                        // Combinaciones de 3 caracteres (===, !==)
                        if (codigo[i + 1] === '=') {
                            operador += codigo[i + 1];
                            i++;
                        }
                    }
                    tokens.push({ tipo: "operador", valor: operador });
                    i++;
                    break;

                case '(':
                case ')':
                case '{':
                case '}':
                case '[':
                case ']':
                    tokens.push({ tipo: "simbolo", valor: caracter });
                    i++;
                    break;

                case '"': // Cadenas
                    let cadena = "";
                    i++;
                    while (codigo[i] !== '"') {
                        cadena += codigo[i];
                        i++;
                    }
                    tokens.push({ tipo: "cadena", valor: cadena });
                    i++; // Saltar la comilla de cierre
                    break;

                case '`': // Template literals (template strings)
                    let template = "";
                    i++;
                    while (codigo[i] !== '`') {
                        template += codigo[i];
                        i++;
                    }
                    tokens.push({ tipo: "template", valor: template });
                    i++; // Saltar la comilla de cierre
                    break;

                case '/': // Comentarios o división
                    if (codigo[i + 1] === '/') { // Comentario de línea
                        i += 2; // Saltar //
                        let comentario = "";
                        while (i < codigo.length && codigo[i] !== '\n') {
                            comentario += codigo[i];
                            i++;
                        }
                        tokens.push({ tipo: "comentario", valor: comentario.trim() }); // Agregar comentario como token
                    } else if (codigo[i + 1] === '*') { // Comentario de bloque
                        i += 2; // Saltar /*
                        let comentario = "";
                        while (i < codigo.length && (codigo[i] !== '*' || codigo[i + 1] !== '/')) {
                            comentario += codigo[i];
                            i++;
                        }
                        i += 2; // Saltar */
                        tokens.push({ tipo: "comentario", valor: comentario.trim() }); // Agregar comentario como token
                    } else {
                        tokens.push({ tipo: "operador", valor: caracter }); // División
                        i++;
                    }
                    break;

                default:
                    if (/[a-zA-Z_]/.test(caracter)) { // Identificador o palabra clave
                        let palabra = caracter;
                        i++;
                        while (/[a-zA-Z0-9_]/.test(codigo[i])) {
                            palabra += codigo[i];
                            i++;
                        }
                        if (palabrasClave.includes(palabra)) {
                            tokens.push({ tipo: "palabraClave", valor: palabra });
                        } else if (palabra === "console") {
                            let metodo = "";
                            let j = i;
                            while (/[a-zA-Z.]/.test(codigo[j])) {
                                metodo += codigo[j];
                                j++;
                            }
                            const nombreMetodo = metodo.slice(1);
                            if (metodo.startsWith(".") && metodosConsole.includes(nombreMetodo)) {
                                const tipoConsole = "console" + nombreMetodo.charAt(0).toUpperCase() + nombreMetodo.slice(1);
                                tokens.push({ tipo: tipoConsole, valor: "console" + metodo });
                                i = j;
                            } else if (regexVariables.test(palabra)) { // Si no es un método console válido, podría ser una variable
                                tokens.push({ tipo: "identificador", valor: palabra });
                            } else {
                                throw new Error("Identificador no válido: " + palabra);
                            }
                        } else if (regexVariables.test(palabra)) {
                            tokens.push({ tipo: "identificador", valor: palabra });
                        } else {
                            throw new Error("Identificador no válido: " + palabra);
                        }
                    } else if (/[0-9]/.test(caracter)) { // Número
                        let numero = caracter;
                        i++;
                        while (/[0-9]/.test(codigo[i])) {
                            numero += codigo[i];
                            i++;
                        }
                        tokens.push({ tipo: "numero", valor: numero });
                    } else {
                        throw new Error("Carácter no reconocido: " + caracter);
                    }
            }
        }
    } catch (error) {
        console.error("Error durante el análisis léxico:", error.message);
        return null; // O puedes lanzar el error nuevamente si lo prefieres
    }

    return tokens;
}

const codigo = `
    let _x = 10
    let _y = 10
    if (parseInt(_x) + 5 * parseInt(_y) > 100) {
        /*Hola mundo*/ 
        _y = _x * 2
    } else if(parseInt(_x) + 5 * parseInt(_y) < 100){ 
        _y = _x ** 2
    } else { 
        return "bye"
    }
    console.log(_y)
`
console.log(analizarLexico(codigo))