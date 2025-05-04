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

function semanticAnalysis(code) {
    const variablesDeclaradas = new Set();
    const erroresSemanticos = [];
    const lines = code.split('\n');

    const _identificadas = []

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
        const declaracionVariable = ['const', 'let', 'var']
        const declaracionVariableFuncion = ['if', 'else', 'for', 'while']
        const palabrasReservadas = ['function', 'return', 'true', 'false', 'null', 'undefined', 'NaN', 'Infinity']
        let match;

        while ((match = usageRegex.exec(codeWithoutStrings)) !== null) {
            const variableName = match[0];

            if (!variablesDeclaradas.has(variableName) && !declaracionVariable.includes(variableName)) {
                if(
                    declaracionVariable.includes(variableName) == false
                ){

                    const contienePalabraClave = declaracionVariableFuncion.some(palabraClave => {
                        return variableName.includes(palabraClave);
                    });

                    if(
                        declaracionVariable.filter(obj => obj == variableName).length == 0
                        &&
                        declaracionVariableFuncion.filter(obj => obj == variableName).length == 0
                    ){
                        if(contienePalabraClave){
                            erroresSemanticos.push({
                                message: `
                                Error lexico sintactico: No existe la palabra reservada '${variableName}' 
                                como funcion en js, linea ${lineNumber+1}`,
                                line: lineNumber + 1
                            });
                        }

                        if(variablesDeclaradas.has(variableName)){
                            erroresSemanticos.push({
                                message: `
                                Error semantico: No se declaro la variable '${variableName}', linea ${lineNumber+1}`,
                                line: lineNumber + 1
                            });
                        }

                        erroresSemanticos.push({
                            message: `
                            Error lexico: No existe la palabra reservada '${variableName}' 
                            como declaracion de variable en js, linea ${lineNumber+1}`,
                            line: lineNumber + 1
                        });
                    }

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