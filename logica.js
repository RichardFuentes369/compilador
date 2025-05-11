let tokens = [];
const valoresUnicos = new Set();
const variablesDeclaradas = new Set();


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

  valoresUnicos.clear();
  variablesDeclaradas.clear();
  tokens = []
  
  //  Fase 1: Análisis Sintacticos y Ejecución
  erroresLexicos = []
  const lexicoResult = lexicoAnalysis(code);
  if(erroresLexicos.length > 0){
    detailDiv.innerHTML += '<p class="error">✗ Análisis lexico error</p>';
    detailDiv.innerHTML += '<p><b>Salida:</b>' + (erroresLexicos[0].message || 'Ejecutado correctamente') +'</p>';
    displayTokens(lexicoResult, resultDiv);
    return;
  }else{
    detailDiv.innerHTML += '<p class="success">✓ Análisis lexico completado</p>';
    detailDiv.innerHTML += '<p><b>Salida:</b> ' + ('Ejecutado correctamente') + '</p>';
    displayTokens(lexicoResult, resultDiv);
  }

  // Fase 2: Análisis Sintacticos y Ejecución
  erroresSintacticos = []
  validarParentesis(code);
  const sintacticResult = sintacticoAnalysis(code);
  if(erroresSintacticos.length > 0){
      detailDiv.innerHTML += '<p class="error">✗ Análisis sintactico error</p>';
      detailDiv.innerHTML += '<p><b>Salida:</b>' + (erroresSintacticos[0].message || 'Ejecutado correctamente') +'</p>';
      displayTokens(sintacticResult, resultDiv);
      return;
  }else{
      detailDiv.innerHTML += '<p class="success">✓ Análisis sintactico completado</p>';
      detailDiv.innerHTML += '<p><b>Salida:</b> ' + ('Ejecutado correctamente') + '</p>';
      displayTokens(sintacticResult, resultDiv);
  }

  console.log('aqui estoy')
  // Fase 3: Análisis Semántico y Ejecución
  erroresSemanticos = []
  const semanticResult = semanticoAnalysis(code);
  if(erroresSemanticos.length > 0){
      detailDiv.innerHTML += '<p class="error">✗ Análisis semántico error</p>';
      detailDiv.innerHTML += '<p><b>Salida:</b>' + (erroresSemanticos[0].message || 'Sin salida') +'</p>';
      displayTokens(semanticResult, resultDiv);
      return;
  }else{
      detailDiv.innerHTML += '<p class="success">✓ Análisis semántico completado</p>';
      detailDiv.innerHTML += '<p><b>Salida:</b> ' + ('Sin salida') + '</p>';
      displayTokens(semanticResult, resultDiv);
  }
}

const inicioLetVarConstRegex = /^(let|const|var)\b/;
const variableRegex = /^[a-zA-Z]+(?:_[a-zA-Z]+)*$|^[a-zA-Z]*_[a-zA-Z_]*$/;
const igualRegex = /^=$/;
const numerosRegex = /^\d+$/;
const textoRegex = /^(["'`]).*\1$/;
const keywords = ['let', 'const', 'var'];
const keywordsMethods = ['if', 'else'];

function dividirLineaInteligente(linea) {
  const elementos = [];
  let dentroDeComillas = null;
  let elementoActual = "";

  for (let i = 0; i < linea.length; i++) {
    const char = linea[i];

    if (char === '"' || char === "'" || char === "`") {
      if (dentroDeComillas === null) {
        dentroDeComillas = char;
        elementoActual += char;
      } else if (dentroDeComillas === char) {
        elementoActual += char;
        elementos.push(elementoActual);
        elementoActual = "";
        dentroDeComillas = null;
      } else {
        elementoActual += char; // Incluir comillas anidadas o diferentes dentro de la cadena actual
      }
    } else if (char === ' ' && dentroDeComillas === null) {
      if (elementoActual.trim() !== "") {
        elementos.push(elementoActual.trim());
      }
      elementoActual = "";
    } else {
      elementoActual += char;
    }
  }

  if (elementoActual.trim() !== "") {
    elementos.push(elementoActual.trim());
  }

  return elementos;
}

function lexicoAnalysis(code){
  const lines = code.split('\n');
  line_count = 0

  for (const element of lines) {
    const estructuraLinea = dividirLineaInteligente(element)

    if(estructuraLinea.length == 1 || estructuraLinea.length == 0){
      return
    }

    line_count += 1
    if(
      (estructuraLinea[0] == 'let' || estructuraLinea == 'var') && estructuraLinea.length < 2 
      || 
      (estructuraLinea[0] == 'let' || estructuraLinea == 'var') && estructuraLinea.length == 3
      || 
      (estructuraLinea[0] == 'let' || estructuraLinea == 'var') && estructuraLinea.length > 4
      ||
      (estructuraLinea.length >= 3 && estructuraLinea[2] != '=')
    ){
      erroresLexicos.push({
        message: `
          <br>
          <b>Error:</b> (lexico)<br>
          <b>Linea error:</b> ${line_count}<br>
          <b>Error exacto:</b> ${element} <br>
          <b>Ejemlplo:</b> ${estructuraLinea[0]} x = 2 ó ${estructuraLinea[0]} x = "palabra ó frase"<br>
          <b>Recomendación:</b> Solo se puede asignar una variable por declaracion en javascript.<br>
          `,
      });
    }
    if(!inicioLetVarConstRegex.test(element)){
      erroresLexicos.push({
        message: `
          <br>
          <b>Error:</b> (lexico)<br>
          <b>Linea error:</b> ${line_count}<br>
          <b>Error exacto:</b> ${element} <br>
          <b>Ejemlplo:</b> let a = 1 ó const a = 1 ó var a = 1<br>
          <b>Recomendación:</b> Recuerde que para declarar una variable en javascript, esta debe iniciar con let, var, o const y seguir una estructura <b>xxx xx = x</b>.<br>
          `,
      });
    }

    if(inicioLetVarConstRegex.test(element)){
      if(estructuraLinea.length >= 5){
        erroresLexicos.push({
          message: `
            <br>
            <b>Error:</b> (lexico)<br>
            <b>Linea error:</b> ${line_count}<br>
            <b>Error exacto:</b> ${element} <br>
            <b>Ejemlplo:</b> let a = 1 ó const a = 1 ó var a = 1<br>
            <b>Recomendación:</b> Recuerde que para declarar una variable en javascript, esta debe iniciar con let, var, o const y seguir una estructura <b>xxx xx = x</b>.<br>
            `,
        });
      }
    }

    if(!textoRegex.test(estructuraLinea[3])){
      if(!numerosRegex.test(estructuraLinea[3])){
        erroresLexicos.push({
          message: `
            <br>
            <b>Error:</b> (lexico)<br>
            <b>Linea error:</b> ${line_count}<br>
            <b>Error exacto:</b> ${element} <br>
            <b>Ejemlplo:</b> ${estructuraLinea[0]} x = 2 ó ${estructuraLinea[0]} x = "palabra ó frase"<br>
            <b>Recomendación:</b> Solo se puede asignar numeros o texto javascript.<br>
            `,
        });
      }
    }

    for (const element of estructuraLinea) {
      if(keywords.includes(element)){
        if(!tokens.find(e => e.token == element)){
          tokens.push({
            value: element,
            type: 'palabra_clave',
          });
        }
      }
      if(
        variableRegex.exec(element) && element !== 'let' && element !== 'var' && element !== 'const'
      ){
        if(!tokens.find(e => e.token == element)){
          tokens.push({
            value: element,
            type: 'identificador',
          });
        }
      }      
      if(igualRegex.exec(element)){
        if(!tokens.find(e => e.token == element)){
          tokens.push({
            value: element,
            type: 'operador',
          });
        }
      }      
      if(numerosRegex.exec(element)){
        if(!tokens.find(e => e.token == element)){
          tokens.push({
            value: element,
            type: 'numero',
          });
        }
      }
      if(textoRegex.exec(element)){
        if(!tokens.find(e => e.token == element[0])){
          tokens.push({
            value: element[0],
            type: (element[0] == "'") ? 'cadena_sencilla' : (element[0] == '"') ? 'cadena_doble' : 'cadena_multilinea',
          });
        }
        if(!tokens.find(e => e.token == "key_cadena")){
          tokens.push({
            value: "cadena",
            type: "key_cadena",
          });
        }
      }
    }
      
  }
  
  return tokens;
}

function validarParentesis(code) {
    const pila = [];
    const lineas = code.split('\n');

    for (let i = 0; i < lineas.length; i++) {
        const linea = lineas[i];
        for (let j = 0; j < linea.length; j++) {
            const caracter = linea[j];
            if (caracter === '(' || caracter === '{') {
                pila.push({ caracter, linea: i + 1, columna: j + 1 });
                if(!tokens.includes(caracter)){
                    tokens.push({
                        value: caracter,
                        type: 'puntuacion',
                    });
                }
            } else if (caracter === ')') {
                if (pila.length > 0 && pila[pila.length - 1].caracter === '(') {
                    pila.pop();
                    if(!tokens.includes(caracter)){
                        tokens.push({
                            value: caracter,
                            type: 'puntuacion',
                        });
                    }
                } else {
                    erroresSintacticos.push({
                        message: `
                        <br>
                        <b>Error sintactico</b> <br>
                        <b>Numero de linea: </b> ${i + 1} <br>
                        <b>Mensaje: </b>Parentesis de cierre ')' sin apertura. <br>
                        <b>Linea con error: ${linea} <br>
                        `,
                    });
                    return tokens
                }
            } else if (caracter === '}') {
                if (pila.length > 0 && pila[pila.length - 1].caracter === '{') {
                    pila.pop();
                    if(!tokens.includes(caracter)){
                        tokens.push({
                            value: caracter,
                            type: 'puntuacion',
                        });
                    }
                } else {
                    erroresSintacticos.push({
                        message: `
                        <br>
                        <b>Error sintactico</b> <br>
                        <b>Numero de linea: </b> ${i + 1} <br>
                        <b>Mensaje: </b>Error: Llave de cierre '}' sin apertura. <br>
                        <b>Linea con error: ${linea} <br>
                        `,
                    });
                    return tokens
                }
            }
        }
    }

    if (pila.length > 0) {
        pila.forEach(apertura => {
            erroresSintacticos.push({
                message: `
                <br>
                <b>Error sintactico</b><br>
                <b>Numero de linea: </b>${pila[0].linea}<br>
                <b>Mensaje: </b> Error agrupador de apertura '${apertura.caracter}' sin cierre.
                 <br>
                `,
            });
        });
        return tokens
    }

    return erroresSintacticos;
}

function sintacticoAnalysis(code) {
  // si abro pero no cierro parentesis
  // si hago ijkjkjf en vez de if
}

function semanticoAnalysis(code) {
  // que se declaren 2 0 mas veces las variables
  // se usa una variable que nunca fue declarada
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
  let tokenHTML = ''

  tokenHTML += '<div class="token-list"><h3>Tokens encontrados:</h3><ul>'


  const tipoTokenMap = {
    'palabra_clave': (value) => {
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
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")) || (value.startsWith("`") && value.endsWith("`"))) {
          return "key_literal_texto";
      }else if(tieneNumero && tieneLetra){
          return `key_identificador_${value}`;
      }else{
          return `key_numero_${value}`
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
    'cadena': (value) => {
      return "key_cadena";
    },
    'identificador': (value) => {
      return `key_identificador_${value}`
    }
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