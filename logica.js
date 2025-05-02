function analyzeCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    const detailDiv = document.getElementById('detail');
    resultDiv.innerHTML = '';
    detailDiv.innerHTML = '';

    if (!code) {
        detailDiv.innerHTML = '<p class="error">Error: No se ingresó ningún código</p>';
        resultDiv.innerHTML = '<p class="error">Error: No se ingresó ningún código</p>';
        return;
    }

    try {
        // Fase 1: Análisis Léxico
        const tokens = lexicalAnalysis(code);
        displayTokens(tokens, resultDiv);

        // Fase 2: Análisis Sintáctico
        const syntaxResult = syntacticAnalysis(tokens);
        detailDiv.innerHTML += '<p class="success">✓ Análisis sintáctico completado</p>';

        // Fase 3: Análisis Semántico y Ejecución
        const semanticResult = semanticAnalysis(code);
        detailDiv.innerHTML += '<p class="success">✓ Análisis semántico completado</p>';
        detailDiv.innerHTML += '<p>Salida: ' + (semanticResult.output || 'Sin salida') + '</p>';

    } catch (error) {
        const lineNumber = getErrorLine(code, error) - 4;
        let mensajeEnEspañol = traducirError(error.message, error, lineNumber);
        detailDiv.innerHTML += `<p class="error">Error en ${error.phase || 'análisis'}: ${mensajeEnEspañol}</p>`;
    }
}

function lexicalAnalysis(code) {
    const tokens = [];
    const lines = code.split('\n');
    const keywords = ['let', 'const', 'var', 'if', 'else', 'for', 'while', 'function', 'return'];
    // Modificamos la expresión regular para incluir cadenas entre comillas dobles
    const tokenRegex = /\b(let|const|var|if|else|for|while|function|return)\b|"[^"]*"|[\w]+|[=+\-*/();{}[\],.<>!&|]|\s+/g;

    lines.forEach((line, index) => {
        let match;
        let position = 0;
        while ((match = tokenRegex.exec(line)) !== null) {
            const token = match[0].trim();
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
        }
    });

    if (tokens.length === 0) {
        throw { message: 'No se encontraron tokens válidos', phase: 'léxico' };
    }
    return tokens;
}

function syntacticAnalysis(tokens) {
    let parentheses = []; // Usaremos un array para almacenar las líneas de los '('
    let braces = [];      // Usaremos un array para almacenar las líneas de los '{'
    let brackets = [];    // Usaremos un array para almacenar las líneas de los '['
    let expectingSemicolon = false;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const nextToken = tokens[i + 1];

        // Contar y almacenar líneas de delimitadores de apertura
        if (token.value === '(') {
            parentheses.push(token.line);
        }
        if (token.value === ')') {
            if (parentheses.length > 0) {
                parentheses.pop();
            } else {
                throw {
                    message: `Paréntesis ')' sin apertura, linea ${token.line}`,
                    line: token.line,
                    phase: 'sintáctico'
                };
            }
        }
        if (token.value === '{') {
            braces.push(token.line);
        }
        if (token.value === '}') {
            if (braces.length > 0) {
                braces.pop();
            } else {
                throw {
                    message: `Llave '}' sin apertura, linea ${token.line}`,
                    line: token.line,
                    phase: 'sintáctico'
                };
            }
        }
        if (token.value === '[') {
            brackets.push(token.line);
        }
        if (token.value === ']') {
            if (brackets.length > 0) {
                brackets.pop();
            } else {
                throw {
                    message: `Corchete ']' sin apertura, linea ${token.line}`,
                    line: token.line,
                    phase: 'sintáctico'
                };
            }
        }

        // Verificar declaraciones
        if (['let', 'const', 'var'].includes(token.value)) {
            expectingSemicolon = true;
        }

        // Verificar punto y coma
        if (expectingSemicolon && token.value === ';') {
            expectingSemicolon = false;
        } 
        // else if (expectingSemicolon && i === tokens.length - 1) {
        //     throw {
        //         message: `Falta punto y coma después de declaración, linea ${token.line}`,
        //         line: token.line,
        //         phase: 'sintáctico'
        //     };
        // }
    }

    if (parentheses.length > 0) {
        throw {
            message: `Paréntesis '(' sin cerrar, linea ${parentheses[parentheses.length - 1]}`,
            line: parentheses[parentheses.length - 1],
            phase: 'sintáctico'
        };
    }

    if (braces.length > 0) {
        throw {
            message: `Llave '{' sin cerrar, linea ${braces[braces.length - 1]}`,
            line: braces[braces.length - 1],
            phase: 'sintáctico'
        };
    }

    if (brackets.length > 0) {
        throw {
            message: `Corchete '[' sin cerrar, linea ${brackets[brackets.length - 1]}`,
            line: brackets[brackets.length - 1],
            phase: 'sintáctico'
        };
    }

    return { valid: true };
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

function semanticAnalysis(code) {
    const variablesDeclaradas = new Set();
    const erroresSemanticos = [];
    const lines = code.split('\n');

    // Expresión regular para identificar declaraciones (simplificada)
    const declarationRegex = /(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=?/;
    // Expresión regular para identificar usos de variables (simplificada)
    const usageRegex = /[a-zA-Z_][a-zA-Z0-9_]*/g;
    // Expresión regular para identificar strings (para ignorar su contenido)
    const stringRegex = /(['"])(.*?)\1/g;

    // Primera pasada: Registrar declaraciones
    lines.forEach((line, lineNumber) => {
        const match = line.match(declarationRegex);
        if (match) {
            const variableName = match[2];
            variablesDeclaradas.add(variableName);
        }
    });

    // Segunda pasada: Verificar usos (ignorando contenido de strings)
    lines.forEach((line, lineNumber) => {
        // Eliminar el contenido de las cadenas para no analizarlas como variables
        const codeWithoutStrings = line.replace(stringRegex, '');
        let match;
        while ((match = usageRegex.exec(codeWithoutStrings)) !== null) {
            const variableName = match[0];
            // Ignorar palabras clave
            if (!['const', 'let', 'var', 'if', 'else', 'for', 'while', 'function', 'return', 'true', 'false', 'null', 'undefined', 'NaN', 'Infinity'].includes(variableName)) {
                if (!variablesDeclaradas.has(variableName)) {
                    erroresSemanticos.push({
                        message: `Error semántico: La variable '${variableName}' no ha sido declarada, linea ${lineNumber+1}`,
                        line: lineNumber + 1
                    });
                }
            }
        }
        // Resetear el índice para la próxima línea
        usageRegex.lastIndex = 0;
    });

    if (erroresSemanticos.length > 0) {
        throw erroresSemanticos[0]; // Lanza el primer error encontrado
    }

    try {
        const sandbox = {
            output: '',
            console: {
                log: (...args) => sandbox.output += args.join(' ') + '\n'
            }
        };

        const func = new Function(`
            "use strict";
            ${code}
        `);
        func.call(sandbox);

        return {
            valid: true,
            output: sandbox.output.trim() || 'Ejecutado correctamente'
        };
    } catch (error) {
        const lineNumber = getErrorLine(code, error) - 4;
        let mensajeEnEspañol = traducirError(error.message, error, lineNumber);
        throw {
            message: mensajeEnEspañol,
            line: lineNumber,
            phase: 'semántico'
        };
    }
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