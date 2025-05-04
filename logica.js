function analyzeCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    const detailDiv = document.getElementById('detail');
    resultDiv.innerHTML = '';
    detailDiv.innerHTML = '';

    if (!code) {
        detailDiv.innerHTML = '<p class="error">Error: No se ingresó ningún código</p>';
        return;
    }

    // Fase 1: Análisis Léxico
    const lexicoResult = lexicalAnalysis(code);
    
    if(lexicoResult.message != undefined){
        detailDiv.innerHTML += '<p class="error">✗ Análisis lexico error</p>';
        detailDiv.innerHTML += '<p>Salida:' + (lexicoResult.message || 'Sin salida') +'</p>';
        displayTokens([], resultDiv);
    }else{
        detailDiv.innerHTML += '<p class="success">✓ Análisis lexico completado</p>';
        detailDiv.innerHTML += '<p>Salida: ' + (lexicoResult.output || 'Sin salida') + '</p>';
        displayTokens(lexicoResult, resultDiv);
    }

    // // Fase 2: Análisis Sintáctico
    // const syntaxResult = syntacticAnalysis(tokens);
    // detailDiv.innerHTML += '<p class="success">✓ Análisis sintáctico completado</p>';
    // detailDiv.innerHTML += '<p>Salida: ' + (syntaxResult.output || 'Sin salida') + '</p>';

    // // Fase 3: Análisis Semántico y Ejecución
    // const semanticResult = semanticAnalysis(code);
    // detailDiv.innerHTML += '<p class="success">✓ Análisis semántico completado</p>';
    // detailDiv.innerHTML += '<p>Salida: ' + (semanticResult.output || 'Sin salida') + '</p>';
}

function lexicalAnalysis(code) {
    const erroresLexicos = [];
    const tokens = [];
    const lines = code.split('\n');
    const keyWordDeclaration = ['let', 'const', 'var'];
    const keyWordMethod = ['if', 'else', 'for', 'while'];
    const keywords = ['let', 'const', 'var', 'if', 'else', 'for', 'while', 'function', 'return'];
    const tokenRegex = /\b(let|const|var|if|else|for|while|function|return)\b|"[^"]*"|[\w]+|[=+\-*/();{}[\],.<>!&|]|\s+/g;
    const declarationRegex = /^(let|var|const)\s+[a-zA-Z_]\w*\s*=\s*\d+$/;
    const regexLexicoSintactico = /^\w+\s*=\s*\w+$/;
    let tokenAnteriro = '';
    let linea = 1;

    for (let index = 0; index < lines.length; index++) { // Usamos un bucle for para un control más claro
        const line = lines[index];
        const numeroLinea = index + 1;
        let match;
        let lineaActual = 1;
        tokenRegex.lastIndex = 0; // Importante: Resetear el índice para cada línea

        let position = 0;
           
        while ((match = tokenRegex.exec(line)) !== null) {
            const token = match[0].trim();

            if (token && keyWordMethod.includes(token)) {
                return tokens; 
            }

            // esto va
            if (tokenAnteriro !== '' && keywords.includes(tokenAnteriro) && keywords.includes(token) && lineaActual === numeroLinea) {
                erroresLexicos.push({
                    message: `
                    <br>
                        Error sintactico <br>
                        Numero de linea : ${numeroLinea} <br>
                        Mensaje: Recuerde que no puede haber mas de 1 palabra de declaracion<br>
                        Linea con error ${line} <br>
                        Error exacto ${tokenAnteriro} ${token} <br>`,
                    line: numeroLinea
                });
            }

            // eso va
            if (lineaActual !== numeroLinea) {
                tokenAnteriro = '';
                lineaActual += 1;
            }

            // eso va
            if (tokenAnteriro = '' && !keyWordDeclaration.includes(token)) {
                if (declarationRegex.exec(line)) {
                    erroresLexicos.push({
                        message: `
                        <br>
                            Error lexico <br>
                            Numero de linea : ${numeroLinea} <br>
                            Mensaje: Recuerde que debe usar algun tipo de declaracion ${keyWordDeclaration} para las variables<br>
                            Linea con error ${line} <br>`,
                        line: numeroLinea
                    });
                }

                if (regexLexicoSintactico.exec(line)) {
                    erroresLexicos.push({
                        message: `
                        <br>
                            Error semantico <br>
                            Numero de linea : ${numeroLinea} <br>
                            Mensaje: Recuerde que debe usar algun tipo de declaracion ${keyWordDeclaration} para las variables<br>
                            Linea con error ${line} <br>`,
                        line: numeroLinea
                    });
                }
            }

            // eso va
            if (declarationRegex.exec(line) === null) {
                erroresLexicos.push({
                    message: `
                    <br>
                        Error sintactico o lexico <br>
                        Numero de linea : ${numeroLinea} <br>
                        Mensaje: Se presenta un error de tipo sintactico o lexico, la estructura no cumple<br>
                        Linea con error ${line} <br>`,
                    line: numeroLinea
                });
            }

            if (token) {
                let type = 'identificador'; // Tipo por defecto

                if (keywords.includes(token)) {
                    type = 'palabra clave';
                } else if (/[0-9]/.test(token)) {
                    type = 'numero';
                } else if (/[+\-*/=<>!&|]/.test(token)) {
                    type = 'operador';
                } else if (/[();{}[\],.]/.test(token)) {
                    type = 'puntuacion';
                } else if (token.startsWith('"') && token.endsWith('"')) {
                    type = 'texto'; // Nuevo tipo para cadenas de texto
                }

                tokens.push({
                    value: token,
                    type: type,
                    line: index + 1,
                    position: position
                });
                position += match.index + token.length;
            }

            if (token !== '') {
                tokenAnteriro = token;
            }
        }

        if (erroresLexicos.length > 0) {
            return erroresLexicos[0]
        }
    }

    if (tokens.length === 0) {
        return tokens;
    }

    return tokens;
}

function syntacticAnalysis(tokens) {
    erroresSemanticos.push({
        message: `
        Error sintactico: No existe la palabra reservada '${variableName}' 
        como declaracion de variable en js, linea ${lineNumber+1}`,
        line: lineNumber + 1
    });
}

function semanticAnalysis(code) {
    erroresSemanticos.push({
        message: `
        Error semantico: No existe la palabra reservada '${variableName}' 
        como declaracion de variable en js, linea ${lineNumber+1}`,
        line: lineNumber + 1
    });
}

// Función auxiliar para traducir errores
function traducirError(mensaje, error, linea) {
    let mensajeConLinea = `Línea ${linea}: `; // Prefijo para el mensaje con la línea

    // Identificar el tipo de error y traducir mensajes comunes
    if (error instanceof ReferenceError) {
        if (mensaje.includes('is not defined')) {
            const variable = mensaje.split(' ')[0];
            return `${variable} no está definida, ${mensajeConLinea}`;
        }
        if (mensaje.includes("Cannot access") && mensaje.includes("before initialization")) {
            const variable = mensaje.split("'")[1];
            return `no se puede acceder a la variable ${variable} antes de la inicialización`;
        }
    } else if (error instanceof TypeError) {
        if (mensaje.includes('is not a function')) {
            const elemento = mensaje.split(' ')[0];
            return `${elemento} no es una función`;
        } else if (mensaje.includes('undefined is not an object')) {
            return `No se puede acceder a una propiedad porque el objeto es undefined`;
        } else if (mensaje.includes('null is not an object')) {
            return `No se puede acceder a una propiedad porque el objeto es null`;
        } else if (mensaje.includes('Cannot read properties of')) {
            const tipo = mensaje.includes('undefined') ? 'undefined' : 'null';
            const propiedad = mensaje.match(/'(.*?)'/)[1];
            return `No se puede leer la propiedad '${propiedad}' de ${tipo === 'undefined' ? 'undefined' : 'null'}`;
        }
    } else if (error instanceof SyntaxError) {
        if (mensaje.includes('Unexpected number')) {
            return `Error de sintaxis: Número inesperado`;
        }    
        if (mensaje.includes('Unexpected identifier')) {
            return `Error de sintaxis: Identificador inesperado`;
        }
        if (mensaje.includes('Unexpected token')) {
            return `Error de sintaxis: Token inesperado`;
        }        
        if (mensaje.includes('Unexpected strict mode reserved word')) {
            return `Palabra reservada de modo estricto inesperada`;
        }
        if (mensaje.includes('Invalid left-hand side in assignment')) {
            return `Error de sintaxis: Lado izquierdo no válido en la tarea`;
        }
        if (mensaje.includes('Invalid rigth-hand side in assignment')) {
            return `Error de sintaxis: Lado derecho no válido en la tarea`;
        }
        if (mensaje.includes('Invalid or unexpected token')) {
            return `Error de sintaxis: Token no válido o inesperado`;
        }        
        if (mensaje.includes('Numeric separators are not allowed at the end of numeric literals')) {
            return `No se permiten separadores numéricos al final de literales numéricos`;
        }        
        if (mensaje.includes('Missing initializer in const declaration')) {
            return `Falta el inicializador en la declaración constante`;
        }
        if (mensaje.includes('has already been declared')) {
            let inicio = mensaje.indexOf("'"); // Encuentra la posición de la primera comilla simple
            let fin = mensaje.lastIndexOf("'");   // Encuentra la posición de la última comilla simple
            let variable = ''
            if (inicio !== -1 && fin !== -1 && inicio < fin) {
                let contenido = mensaje.substring(inicio + 1, fin);
                variable = contenido
            }
            return `Error de sintaxis: El identificador ${variable}  ya ha sido declarado`;
        }
        return `Error de sintaxis: ${mensaje}`;
    }

    // Si no se reconoce el error, devolver el mensaje original con la línea
    return `${mensaje}`;
}

function getErrorLine(code, error) {
    const stack = error.stack || '';
    const lines = code.split('\n');
    const anonymousRegex = /<anonymous>:(\d+):\d+/;

    const match = stack.match(anonymousRegex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }

    const generalRegex = /eval:(\d+):\d+/;
    const generalMatch = stack.match(generalRegex);
    if (generalMatch && generalMatch[1]) {
        return parseInt(generalMatch[1], 10);
    }

    return 'desconocida';
}

function displayTokens(tokens, resultDiv) {
    const valoresUnicos = new Set();
    let tokenHTML = '<div class="token-list"><h3>Tokens encontrados:</h3><ul>';

    const tipoTokenMap = {
        'palabra clave': (value) => {
            if (value === 'for') return 'key_reservada_for';
            if (value === 'if') return 'key_reservada_if';
            if (value === 'else') return 'key_reservada_else';
            if (value === 'while') return 'key_reservada_while';
            if (value === 'function') return 'key_reservada_function';
            if (value === 'return') return 'key_reservada_return';
            if (['let', 'const', 'var'].includes(value)) return `key_reservada_${value}`;
            return `key_reservada_${value}`; // Para otras palabras clave
        },
        'numero': (value) => {
            const tieneNumero = /\d/.test(value);
            const tieneLetra = /[a-zA-Z]/.test(value);
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                return "key_cadena";
            }else if(tieneNumero && tieneLetra){
                return `key_identificador_${value}`;
            }else{
                return `numero_${value}`
            }
        },
        'operador': (value) => {
            if (value === '=') return 'key_operador_igual';
            if (value === '<') return 'key_operador_menor_que';
            if (value === '>') return 'key_operador_mayor_que';
            if (value === '+') return 'key_operador_mas';
            if (value === '-') return 'key_operador_menos';
            if (value === '*') return 'key_operador_multiplicacion';
            if (value === '/') return 'key_operador_division';
            if (value === '<') return 'key_operador_menor_que';
            if (value === '>') return 'key_operador_mayor_que';
            if (value === '!') return 'key_operador_negacion';
            if (value === '&') return 'key_operador_and_bitwise';
            if (value === '|') return 'key_operador_or_bitwise';
            return `operador_${value}`;
        },
        'puntuacion': (value) => {
            if (value === '(') return 'key_parentesis_abre';
            if (value === ')') return 'key_parentesis_cierra';
            if (value === '{') return 'key_llave_abre';
            if (value === '}') return 'key_llave_cierra';
            if (value === '[') return 'key_corchete_abre';
            if (value === ']') return 'key_corchete_cierra';
            if (value === ';') return 'key_punto_coma';
            if (value === ',') return 'key_coma';
            if (value === '.') return 'key_punto';
            return `key_puntuacion_${value}`;
        },
        'identificador': (value) => `key_identificador_${value}`,
        'texto': () => 'key_literal_texto' // Asegúrate de haber añadido este tipo en lexicalAnalysis
    };

    tokens.forEach(token => {
        if (!valoresUnicos.has(token.value)) {
            valoresUnicos.add(token.value);
            const tipoEspecifico = tipoTokenMap[token.type] ? tipoTokenMap[token.type](token.value) : token.type;
            
            tokenHTML += `<li> 
                <b>Valor:</b> ${token.value} <br> 
                <b>Token:</b> ${tipoEspecifico} 
            </li><br>`;
        }
    });

    tokenHTML += '</ul></div>';
    resultDiv.innerHTML += tokenHTML;
}

function limpiar(){
    const code = document.getElementById('codeInput').value = "";
    const resultDiv = document.getElementById('result');
    const detailDiv = document.getElementById('detail');
    resultDiv.textContent = '';
    detailDiv.textContent = '';
}