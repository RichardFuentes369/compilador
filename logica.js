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
        console.log(tokens)
        displayTokens(tokens, resultDiv);

        // Fase 2: Análisis Sintáctico
        const syntaxResult = syntacticAnalysis(tokens);
        resultDiv.innerHTML += '<p class="success">✓ Análisis sintáctico completado</p>';

        // Fase 3: Análisis Semántico y Ejecución
        const semanticResult = semanticAnalysis(code);
        resultDiv.innerHTML += '<p class="success">✓ Análisis semántico completado</p>';
        resultDiv.innerHTML += '<p>Salida: ' + (semanticResult.output || 'Sin salida') + '</p>';

    } catch (error) {
        resultDiv.innerHTML += `<p class="error">Error en ${error.phase || 'análisis'}: Línea ${error.line || 'desconocida'}: ${traducirError(error.message, error)}</p>`;
    }
}

function lexicalAnalysis(code) {
    const tokens = [];
    const lines = code.split('\n');
    const keywords = ['let', 'const', 'var', 'if', 'else', 'for', 'while', 'function', 'return'];
    const tokenRegex = /\b(let|const|var|if|else|for|while|function|return)\b|[\w]+|[=+\-*/();{}[\],.<>!&|]|\s+/g;

    lines.forEach((line, index) => {
        let match;
        let position = 0;
        while ((match = tokenRegex.exec(line)) !== null) {
            const token = match[0].trim();
            if (token) {
                tokens.push({
                    value: token,
                    type: keywords.includes(token) ? 'palabra clave' : 
                          /[0-9]/.test(token) ? 'numero' : 
                          /[+\-*/=<>!&|]/.test(token) ? 'operador' : 
                          /[();{}[\],.]/.test(token) ? 'puntuacion' : 'identificador',
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
                message: `Delimitador ${token.value} sin pareja`, 
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
    console.log(error)
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
        if ( mensaje.includes('Unexpected number') ){
            return `Error de sintaxis: Número inesperado`;
        }                
        if ( mensaje.includes('Unexpected identifier') ){
            return `Error de sintaxis: Identificador inesperado`;
        }       
        if ( mensaje.includes('Unexpected token') ){
            return `Error de sintaxis: Token inesperado`;
        }                
        if ( mensaje.includes('Invalid left-hand side in assignment') ){
            return `Error de sintaxis: Lado izquierdo no válido en la tarea`;
        }                
        if ( mensaje.includes('Invalid rigth-hand side in assignment') ){
            return `Error de sintaxis: Lado derecho no válido en la tarea`;
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
    // let tokenHTML = '<div class="token-list"><h3>Tokens encontrados:</h3><ul>';
    // tokens.forEach(token => {
    //     tokenHTML += `<li>Línea ${token.line}: ${token.value} (${token.type})</li>`;
    // });
    // tokenHTML += '</ul></div>';
    // resultDiv.innerHTML += tokenHTML;

    // token sin repetir
    const valoresUnicos = new Set();
    let tokenHTML = '<div class="token-list"><h3>Tokens encontrados:</h3><ul>';
        
    tokens.forEach(token => {
        if (!valoresUnicos.has(token.value)) {
            valoresUnicos.add(token.value);
            tokenHTML += `<li>${token.value} (${token.type})</li>`;
        }
    });

    tokenHTML += '</ul></div>';
    resultDiv.innerHTML += tokenHTML;
}