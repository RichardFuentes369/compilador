function analyzeCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!code) {
        resultDiv.innerHTML = '<p class="error">Error: No se ingresó ningún código</p>';
        return;
    }

    try {
        // Fase 1: Análisis Léxico
        const tokens = lexicalAnalysis(code);
        console.log(tokens);
        displayTokens(tokens, resultDiv);

        // Fase 2: Análisis Sintáctico
        const syntaxResult = syntacticAnalysis(tokens);
        resultDiv.innerHTML += '<p class="success">✓ Análisis sintáctico completado</p>';

        // Fase 3: Análisis Semántico y Ejecución
        const semanticResult = semanticAnalysis(code);
        resultDiv.innerHTML += '<p class="success">✓ Análisis semántico completado</p>';
        resultDiv.innerHTML += '<p>Salida: ' + (semanticResult.output || 'Sin salida') + '</p>';

    } catch (error) {
        resultDiv.innerHTML += `<p class="error">Error en ${error.phase || 'análisis'}: ${traducirError(error.message, error)}</p>`;
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
    let parentheses = 0;
    let braces = 0;
    let brackets = 0;
    let expectingSemicolon = false;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const nextToken = tokens[i + 1];

        // Contar delimitadores
        if (token.value === '(') parentheses++;
        if (token.value === ')') parentheses--;
        if (token.value === '{') braces++;
        if (token.value === '}') braces--;
        if (token.value === '[') brackets++;
        if (token.value === ']') brackets--;

        // Verificar declaraciones
        if (['let', 'const', 'var'].includes(token.value)) {
            expectingSemicolon = true;
        }

        // Verificar punto y coma
        if (expectingSemicolon && token.value === ';') {
            expectingSemicolon = false;
        } else if (expectingSemicolon && i === tokens.length - 1) {
            throw {
                message: 'Falta punto y coma después de declaración',
                line: token.line,
                phase: 'sintáctico'
            };
        }

        // Verificar balance
        if (parentheses < 0 || braces < 0 || brackets < 0) {
            throw {
                message: `Delimitador ${token.value} sin apertura`,
                line: token.line,
                phase: 'sintáctico'
            };
        }
    }

    if (parentheses !== 0 || braces !== 0 || brackets !== 0) {
        throw {
            message: 'Delimitadores sin cerrar',
            line: tokens[tokens.length - 1].line,
            phase: 'sintáctico'
        };
    }

    return { valid: true };
}

// Función auxiliar para traducir errores
function traducirError(mensaje, error) {
    console.log(error);
    // Identificar el tipo de error y traducir mensajes comunes
    if (error instanceof ReferenceError) {
        if (mensaje.includes('is not defined')) {
            const variable = mensaje.split(' ')[0];
            return `${variable} no está definida`;
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
        if (mensaje.includes('Invalid left-hand side in assignment')) {
            return `Error de sintaxis: Lado izquierdo no válido en la tarea`;
        }
        if (mensaje.includes('Invalid rigth-hand side in assignment')) {
            return `Error de sintaxis: Lado derecho no válido en la tarea`;
        }
        if (mensaje.includes('Invalid or unexpected token')) {
            return `Error de sintaxis: Token no válido o inesperado`;
        }
        return `Error de sintaxis: ${mensaje}`;
    }

    // Si no se reconoce el error, devolver el mensaje original
    return mensaje;
}

function semanticAnalysis(code) {
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
        let mensajeEnEspañol = traducirError(error.message, error);
        throw {
            message: mensajeEnEspañol,
            line: getErrorLine(code, error),
            phase: 'semántico'
        };
    }
}

function getErrorLine(code, error) {
    const lines = code.split('\n');
    const stack = error.stack || '';
    const lineMatch = stack.match(/<anonymous>:(\d+)/);
    return lineMatch ? parseInt(lineMatch[1]) : 'desconocida';
}

function displayTokens(tokens, resultDiv) {
    const valoresUnicos = new Set();
    let tokenHTML = '<div class="token-list"><h3>Tokens encontrados:</h3><ul>';

    const tipoTokenMap = {
        'palabra clave': (value) => {
            if (value === 'for') return 'reservado_for';
            if (value === 'if') return 'reservado_if';
            if (value === 'else') return 'reservado_else';
            if (value === 'while') return 'reservado_while';
            if (value === 'function') return 'reservado_function';
            if (value === 'return') return 'reservado_return';
            if (['let', 'const', 'var'].includes(value)) return 'declaracion_variable';
            return `reservado_${value}`; // Para otras palabras clave
        },
        'numero': () => 'literal_numero',
        'operador': (value) => {
            if (value === '=') return 'operador_igual';
            if (value === '<') return 'operador_menor_que';
            if (value === '>') return 'operador_mayor_que';
            if (value === '+') return 'operador_mas';
            if (value === '-') return 'operador_menos';
            if (value === '*') return 'operador_multiplicacion';
            if (value === '/') return 'operador_division';
            if (value === '<') return 'operador_menor_que';
            if (value === '>') return 'operador_mayor_que';
            if (value === '!') return 'operador_negacion';
            if (value === '&') return 'operador_and_bitwise';
            if (value === '|') return 'operador_or_bitwise';
            return `operador_${value}`;
        },
        'puntuacion': (value) => {
            if (value === '(') return 'parentesis_abre';
            if (value === ')') return 'parentesis_cierra';
            if (value === '{') return 'llave_abre';
            if (value === '}') return 'llave_cierra';
            if (value === '[') return 'corchete_abre';
            if (value === ']') return 'corchete_cierra';
            if (value === ';') return 'punto_coma';
            if (value === ',') return 'coma';
            if (value === '.') return 'punto';
            return `puntuacion_${value}`;
        },
        'identificador': () => 'identificador',
        'texto': () => 'literal_texto' // Asegúrate de haber añadido este tipo en lexicalAnalysis
    };

    tokens.forEach(token => {
        if (!valoresUnicos.has(token.value)) {
            valoresUnicos.add(token.value);
            const tipoEspecifico = tipoTokenMap[token.type] ? tipoTokenMap[token.type](token.value) : token.type;
            tokenHTML += `<li>${token.value} (${tipoEspecifico})</li>`;
        }
    });

    tokenHTML += '</ul></div>';
    resultDiv.innerHTML += tokenHTML;
}