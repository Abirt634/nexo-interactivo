const STORAGE_KEY_PREFIX = "nexo-progress:";

const MODULES = [
  {
    id: "arquitectura-datos",
    title: "Arquitectura de Datos",
    desc: "Tipos de datos, variables y estructuras básicas en JavaScript.",
    color: "#38D6E0",
    icon: "AD",
    introPdf: "assets/pdf/Arquitectura de Datos (2).pdf",
    videos: [
      {
        id: "ad-video-1",
        title: "Variables y tipos de dato — Operador typeof | Curso de JavaScript desde cero #2",
        desc: "Cómo declarar variables con let y const, y los tipos de dato primitivos de JavaScript, con buenas prácticas y el operador typeof para identificarlos.",
        url: "https://www.youtube.com/watch?v=XC-Mdb6KMBM",
        duration: "Youtube",
      },
    ],
    activities: [
      {
        id: "ad-quiz-1",
        type: "quiz",
        title: "Expediente: Tipos de dato",
        difficulty: "medio",
        points: 10,
        explanation: "En JavaScript, una <b>variable</b> es un espacio con nombre donde se guarda un valor. Se declara con <span class=\"mono\">let</span> (o <span class=\"mono\">const</span> si no cambiará) seguido del nombre, el signo <span class=\"mono\">=</span> y el valor. Los <b>tipos de dato primitivos</b> más comunes son: texto o <i>string</i> (entre comillas, ej. \"Ana\"), número o <i>number</i> (sin comillas, ej. 25) y booleano o <i>boolean</i> (true / false). Cada instrucción debe terminar con un único punto y coma <span class=\"mono\">;</span>.",
        questions: [
          {
            question: "¿Cuál de las siguientes es una declaración de variable válida en JavaScript?",
            code: `<span class="kw">let</span> nombre <span class="err">=</span> <span class="str">"Ana"</span><span class="err">;;</span>`,
            options: [
              { text: "let nombre = \"Ana\";", correct: true },
              { text: "variable nombre = Ana;", correct: false },
              { text: "let nombre == \"Ana\"", correct: false },
              { text: "nombre := \"Ana\";", correct: false },
            ],
            feedbackOk: "Correcto. 'let' declara una variable y el valor de texto debe ir entre comillas.",
            feedbackBad: "No es la sintaxis correcta. Revisa cómo se declara una variable con 'let' en JavaScript.",
          },
          {
            question: "¿Cuál de estos valores es del tipo texto (string)?",
            code: `<span class="kw">let</span> ciudad <span class="err">=</span> Quito;`,
            options: [
              { text: "\"Quito\"", correct: true },
              { text: "Quito", correct: false },
              { text: "25", correct: false },
              { text: "true", correct: false },
            ],
            feedbackOk: "Correcto. Un string siempre va entre comillas, por eso 'Quito' sin comillas produciría un error.",
            feedbackBad: "Un string debe ir siempre entre comillas. 'Quito' sin comillas no es texto válido en JavaScript.",
          },
          {
            question: "¿Qué tipo de dato es el valor 3.14 en 'let pi = 3.14;'?",
            code: `<span class="kw">let</span> pi = 3.14;`,
            options: [
              { text: "number", correct: true },
              { text: "string", correct: false },
              { text: "boolean", correct: false },
              { text: "no es un tipo válido", correct: false },
            ],
            feedbackOk: "Correcto. Los números, con o sin decimales, se escriben sin comillas y son del tipo number.",
            feedbackBad: "Revisa la sintaxis: los números no llevan comillas y corresponden al tipo number.",
          },
          {
            question: "¿Cuáles son los únicos dos valores posibles de un dato boolean?",
            code: `<span class="kw">let</span> activo = true;`,
            options: [
              { text: "true y false", correct: true },
              { text: "0 y 1 únicamente como texto", correct: false },
              { text: "sí y no", correct: false },
              { text: "on y off", correct: false },
            ],
            feedbackOk: "Correcto. Un boolean solo puede valer true o false, se usa mucho en condiciones.",
            feedbackBad: "Un boolean en JavaScript solo puede tomar los valores true o false.",
          },
          {
            question: "¿Cuál es la diferencia principal entre 'let' y 'const' al declarar una variable?",
            code: `<span class="kw">const</span> pi = 3.14;`,
            options: [
              { text: "'const' no permite reasignar el valor después de declararlo, 'let' sí", correct: true },
              { text: "'const' solo sirve para texto y 'let' solo para números", correct: false },
              { text: "No hay ninguna diferencia entre 'let' y 'const'", correct: false },
              { text: "'let' solo se usa dentro de funciones", correct: false },
            ],
            feedbackOk: "Correcto. Usa 'const' cuando el valor no cambiará, y 'let' cuando sí puede cambiar.",
            feedbackBad: "Piensa en cuál palabra clave 'bloquea' el valor una vez asignado.",
          },
        ],
      },
      {
        id: "ad-genially-1",
        type: "genially",
        title: "Expediente Genially: Arquitectura de Datos",
        difficulty: "medio",
        points: 15,
        url: "https://view.genially.com/6a586dc8a54a3795703cb2a9",
        description: "Actividad interactiva de Genially para practicar la clasificación de variables según su tipo de dato (texto, número, booleano).",
      },
    ],
  },
  {
    id: "logica-control",
    title: "Lógica de Control",
    desc: "Detección de errores de sintaxis y estructuras de control.",
    color: "#F97316",
    icon: "LC",
    introPdf: "assets/pdf/Lógica de Control en JavaScript (2).pdf",
    videos: [
      {
        id: "lc-video-1",
        title: "Explicación de if else en JavaScript y operadores lógicos",
        desc: "Cómo funcionan las condicionales if / else y los operadores lógicos && (Y), || (O) y ! (negación) en JavaScript.",
        url: "https://www.youtube.com/watch?v=CBYgTi8dpCI",
        duration: "YouTube",
      },
    ],
    activities: [
      {
        id: "lc-quiz-1",
        type: "quiz",
        title: "Expediente: Operadores lógicos",
        difficulty: "medio",
        points: 10,
        explanation: "Las estructuras de control como <span class=\"mono\">if / else</span> permiten que el programa tome decisiones. Dentro de la condición se pueden combinar varias comparaciones con <b>operadores lógicos</b>: <span class=\"mono\">&&</span> (Y) exige que <u>ambas</u> condiciones sean verdaderas, <span class=\"mono\">||</span> (O) exige que al menos <u>una</u> lo sea, y <span class=\"mono\">!</span> invierte un valor booleano. Si la condición del <span class=\"mono\">if</span> es falsa, se ejecuta el bloque <span class=\"mono\">else</span>.",
        questions: [
          {
            question: "¿Qué imprime este fragmento de código?",
            code: `<span class="kw">if</span> (5 > 3 <span class="kw">&&</span> 2 < 1) {<br>&nbsp;&nbsp;console.log(<span class="str">"Verdadero"</span>);<br>} <span class="kw">else</span> {<br>&nbsp;&nbsp;console.log(<span class="str">"Falso"</span>);<br>}`,
            options: [
              { text: "Verdadero", correct: false },
              { text: "Falso", correct: true },
              { text: "undefined", correct: false },
              { text: "Error de sintaxis", correct: false },
            ],
            feedbackOk: "Correcto. Con '&&' ambas condiciones deben cumplirse; 2 < 1 es falsa, por lo tanto se ejecuta el 'else'.",
            feedbackBad: "Revisa el operador '&&': ambas condiciones deben ser verdaderas para entrar al bloque 'if'.",
          },
          {
            question: "¿Qué se necesita para que 'esSabado || esDomingo' sea verdadero?",
            code: `<span class="kw">if</span> (esSabado <span class="kw">||</span> esDomingo) {<br>&nbsp;&nbsp;console.log(<span class="str">"Fin de semana"</span>);<br>}`,
            options: [
              { text: "Que al menos una de las dos sea verdadera", correct: true },
              { text: "Que las dos sean verdaderas al mismo tiempo", correct: false },
              { text: "Que las dos sean falsas", correct: false },
              { text: "El operador || siempre da false", correct: false },
            ],
            feedbackOk: "Correcto. Con '||' (O) basta con que una sola condición sea verdadera.",
            feedbackBad: "El operador '||' (O) es menos exigente que '&&': solo necesita que una condición se cumpla.",
          },
          {
            question: "¿Cuál es el error en este fragmento?",
            code: `<span class="kw">if</span> (usuario <span class="err">=</span> "admin") {<br>&nbsp;&nbsp;console.log(<span class="str">"Acceso"</span>);<br>}`,
            options: [
              { text: "Se usó '=' (asignar) en lugar de '===' (comparar)", correct: true },
              { text: "Falta la palabra 'let' antes de usuario", correct: false },
              { text: "Las comillas de \"admin\" están mal escritas", correct: false },
              { text: "No hay ningún error", correct: false },
            ],
            feedbackOk: "Correcto. Dentro de un 'if' se compara con '===', no se asigna con '='.",
            feedbackBad: "Fíjate bien en el símbolo dentro del paréntesis del 'if': ¿asigna o compara?",
          },
          {
            question: "¿Qué pasa si olvidas las llaves { } de un bloque if con varias instrucciones?",
            code: `<span class="kw">if</span> (activo)<br>&nbsp;&nbsp;console.log(<span class="str">"uno"</span>);<br>&nbsp;&nbsp;console.log(<span class="str">"dos"</span>);`,
            options: [
              { text: "Solo la primera instrucción queda dentro del if; la segunda se ejecuta siempre", correct: true },
              { text: "El programa no se ejecuta nunca", correct: false },
              { text: "Ambas instrucciones quedan dentro del if igualmente", correct: false },
              { text: "JavaScript agrega las llaves automáticamente sin cambiar el resultado", correct: false },
            ],
            feedbackOk: "Correcto. Sin llaves, solo la línea inmediatamente siguiente pertenece al if; el resto se ejecuta siempre.",
            feedbackBad: "Sin llaves { }, JavaScript solo considera parte del if a la instrucción inmediatamente siguiente.",
          },
          {
            question: "¿Qué hace el operador '!' antes de una variable booleana?",
            code: `<span class="kw">let</span> activo = false;<br><span class="kw">if</span> (<span class="kw">!</span>activo) {<br>&nbsp;&nbsp;console.log(<span class="str">"Inactivo"</span>);<br>}`,
            options: [
              { text: "Invierte el valor: si era false, lo trata como true", correct: true },
              { text: "Convierte la variable en texto", correct: false },
              { text: "Elimina la variable", correct: false },
              { text: "No hace nada, es un error de sintaxis", correct: false },
            ],
            feedbackOk: "Correcto. '!' es el operador de negación: invierte true por false y viceversa.",
            feedbackBad: "El símbolo '!' antes de un booleano lo niega: lo convierte en su valor opuesto.",
          },
        ],
      },
      {
        id: "lc-genially-1",
        type: "genially",
        title: "Cazador de Errores",
        difficulty: "facil",
        points: 20,
        url: "https://view.genially.com/6a3955f70262cecb094e98f8",
        description: "Analiza el fragmento de código, encuentra el error oculto y repáralo antes de que sea demasiado tarde.",
      },
    ],
  },
  {
    id: "puente-sintactico",
    title: "El Puente Sintáctico",
    desc: "Sintaxis y estructura de etiquetas en HTML y CSS.",
    color: "#4ADE80",
    icon: "PS",
    introPdf: "assets/pdf/HTML y CSS_El Puente Sintáctico.pdf",
    videos: [
      {
        id: "ps-video-1",
        title: "HTML y CSS curso práctico. Desde cero",
        desc: "Curso práctico de HTML y CSS desde cero: estructura de etiquetas, anidación correcta y sintaxis básica de selectores CSS.",
        url: "https://www.youtube.com/watch?v=rr2H086z16s",
        duration: "YouTube",
      },
    ],
    activities: [
      {
        id: "ps-quiz-1",
        type: "quiz",
        title: "Expediente: Etiquetas HTML",
        difficulty: "facil",
        points: 10,
        explanation: "HTML organiza el contenido de una página mediante <b>etiquetas</b>. La mayoría funcionan en pareja: una de <i>apertura</i> (ej. <span class=\"mono\">&lt;p&gt;</span>) y una de <i>cierre</i> con una barra diagonal antes del nombre (ej. <span class=\"mono\">&lt;/p&gt;</span>). El nombre de la etiqueta de cierre debe ser exactamente igual al de apertura; si no coinciden, el navegador puede interpretar mal la estructura del documento.",
        questions: [
          {
            question: "¿Cuál etiqueta cierra correctamente un párrafo en HTML?",
            code: `&lt;p&gt;Bienvenido a NEXO-INTERACTIVO<span class="err">&lt;/parrafo&gt;</span>`,
            options: [
              { text: "</parrafo>", correct: false },
              { text: "</p>", correct: true },
              { text: "<p/>", correct: false },
              { text: "<end-p>", correct: false },
            ],
            feedbackOk: "Correcto. Toda etiqueta de apertura <p> debe cerrarse con </p>.",
            feedbackBad: "La etiqueta de cierre debe coincidir exactamente con la de apertura: </p>.",
          },
          {
            question: "¿Cuál de estas etiquetas NO necesita etiqueta de cierre?",
            code: `&lt;img <span class="kw">src</span>="logo.png"&gt;`,
            options: [
              { text: "<img>", correct: true },
              { text: "<p>", correct: false },
              { text: "<a>", correct: false },
              { text: "<h1>", correct: false },
            ],
            feedbackOk: "Correcto. <img> es una etiqueta 'vacía': no envuelve contenido, así que no lleva cierre.",
            feedbackBad: "Piensa en qué etiqueta no envuelve contenido dentro de ella, sino que solo muestra un recurso.",
          },
          {
            question: "¿Cuál es la sintaxis correcta de una regla CSS?",
            code: `p <span class="err">{</span> color <span class="err">:</span> blue <span class="err">}</span>`,
            options: [
              { text: "selector { propiedad: valor; }", correct: true },
              { text: "selector: propiedad = valor;", correct: false },
              { text: "selector ( propiedad : valor )", correct: false },
              { text: "propiedad { selector: valor }", correct: false },
            ],
            feedbackOk: "Correcto. La regla CSS es selector { propiedad: valor; }, terminando con punto y coma.",
            feedbackBad: "Recuerda el orden: primero el selector, luego llaves, y dentro propiedad: valor;",
          },
          {
            question: "¿Qué problema tiene este código?",
            code: `&lt;b&gt;&lt;i&gt;texto<span class="err">&lt;/b&gt;&lt;/i&gt;</span>`,
            options: [
              { text: "Las etiquetas están mal anidadas: deben cerrarse en el orden inverso al que se abrieron", correct: true },
              { text: "Falta el atributo href", correct: false },
              { text: "El texto debe ir entre comillas", correct: false },
              { text: "No existe ningún problema", correct: false },
            ],
            feedbackOk: "Correcto. Si abres <b><i>, debes cerrar primero </i> y luego </b>: en orden inverso.",
            feedbackBad: "Fíjate en el orden de apertura y cierre: la última etiqueta abierta debe ser la primera en cerrarse.",
          },
          {
            question: "¿Cuál es la forma correcta de crear un enlace a una página?",
            code: `&lt;a&gt;Ver más&lt;/a&gt;`,
            options: [
              { text: "<a href=\"https://ejemplo.com\">Ver más</a>", correct: true },
              { text: "<a link=\"https://ejemplo.com\">Ver más</a>", correct: false },
              { text: "<link>Ver más</link>", correct: false },
              { text: "<a>Ver más<url>https://ejemplo.com</url></a>", correct: false },
            ],
            feedbackOk: "Correcto. El atributo href dentro de <a> indica hacia dónde apunta el enlace.",
            feedbackBad: "El destino del enlace se indica con el atributo href dentro de la etiqueta <a>.",
          },
        ],
      },
       {
        id: "ps-genially-1",
        type: "genially",
        title: "El Puente Sintáctico: arma la etiqueta",
        difficulty: "medio",
        points: 20,
        url: "https://view.genially.com/6a587a81a54a3795703dfec4",
        description: "Arrastra y ordena las piezas para construir correctamente etiquetas HTML y reglas CSS, cuidando la apertura, el cierre y la puntuación.",
      },
    ],
  },
  {
    id: "reto-final",
    title: "Reto Final",
    desc: "Desafío integrador que combina los tres módulos anteriores.",
    color: "#FBBF24",
    icon: "RF",
    requiresAll: true,
    activities: [
      {
        id: "rf-final-1",
        type: "final",
        title: "Expediente 010: Auditoría final del sistema",
        difficulty: "Difícil",
        points: 30,
        explanation: "Este expediente combina los tres módulos: <b>variables y tipos de dato</b> (Arquitectura de Datos), <b>operadores de comparación y control</b> (Lógica de Control) y la <b>puntuación correcta de instrucciones</b> (El Puente Sintáctico). Recuerda que <span class=\"mono\">=</span> asigna un valor mientras que <span class=\"mono\">===</span> compara dos valores, y que cada instrucción de JavaScript debe cerrar con <span class=\"mono\">;</span>.",
        questions: [
          {
            question: "El sistema NEXO detectó un fallo combinado. ¿Qué corrección resuelve el fragmento completo?",
            code: `<span class="kw">let</span> puntos = 10<br><span class="kw">if</span> (puntos &gt; 5 <span class="kw">&&</span> puntos <span class="err">=</span> 10) {<br>&nbsp;&nbsp;document.<span class="err">write</span>(<span class="str">"Nivel superado"</span>)<br>}`,
            options: [
              { text: "Cambiar '=' por '===' y agregar ';' al final de cada instrucción", correct: true },
              { text: "Eliminar la palabra 'let' de la declaración", correct: false },
              { text: "Cambiar '&&' por un punto y coma", correct: false },
              { text: "El fragmento no tiene ningún error", correct: false },
            ],
            feedbackOk: "Correcto. '=' es asignación, no comparación; se necesita '===', y cada instrucción debe cerrar con ';'.",
            feedbackBad: "Vuelve a revisar la comparación dentro del 'if' y la puntuación de cada línea.",
          },
          {
            question: "¿Qué corrige 'if (x = 5)' para que compare en vez de asignar?",
            code: `<span class="kw">if</span> (x <span class="err">=</span> 5) { ... }`,
            options: [
              { text: "Cambiar '=' por '==='", correct: true },
              { text: "Cambiar '=' por '&&'", correct: false },
              { text: "Quitar los paréntesis", correct: false },
              { text: "Cambiar 'if' por 'let'", correct: false },
            ],
            feedbackOk: "Correcto. Para comparar dos valores dentro de una condición se usa '===', no '='.",
            feedbackBad: "El símbolo '=' asigna; para comparar dentro de un 'if' se necesita '==='.",
          },
          {
            question: "¿Qué tipo de dato es 'true' en JavaScript?",
            code: `<span class="kw">let</span> activo = true;`,
            options: [
              { text: "booleano", correct: true },
              { text: "string", correct: false },
              { text: "number", correct: false },
              { text: "no es un tipo de dato", correct: false },
            ],
            feedbackOk: "Correcto. true y false son los únicos valores del tipo boolean.",
            feedbackBad: "true (y false) corresponden al tipo de dato boolean.",
          },
          {
            question: "¿Qué falta en <p>Texto<p>?",
            code: `&lt;p&gt;Texto<span class="err">&lt;p&gt;</span>`,
            options: [
              { text: "La barra en la etiqueta de cierre: </p>", correct: true },
              { text: "Un punto y coma al final", correct: false },
              { text: "Comillas alrededor de 'Texto'", correct: false },
              { text: "No falta nada", correct: false },
            ],
            feedbackOk: "Correcto. La etiqueta de cierre necesita la barra diagonal: </p>.",
            feedbackBad: "Toda etiqueta de cierre debe llevar una barra diagonal antes del nombre: </p>.",
          },
          {
            question: "¿Qué operador exige que ambas condiciones sean verdaderas?",
            code: `condicionA <span class="kw">&&</span> condicionB`,
            options: [
              { text: "&&", correct: true },
              { text: "||", correct: false },
              { text: "!", correct: false },
              { text: "===", correct: false },
            ],
            feedbackOk: "Correcto. '&&' (Y) exige que ambas condiciones se cumplan al mismo tiempo.",
            feedbackBad: "El operador que exige que las dos condiciones sean verdaderas es '&&'.",
          },
        ],
      },
      {
        id: "ps-genially-10",
        type: "genially",
        title: "Reto final - Caso 001",
        difficulty: "medio",
        points: 50,
        url: "https://view.genially.com/6a58839f034b3939d5ed8a6e",
        description: "Completa el último desafío.",
      },
    ],
  },
];


let state = {
  screen: "login",
  user: null, 
  currentModuleId: null,
  currentActivityId: null,
};

function levelForPoints(points){
  if (points >= 120) return { name: "Experto", short:"EX", next: null, floor:120 };
  if (points >= 80)  return { name: "Avanzado", short:"AV", next: 120, floor:80 };
  if (points >= 40)  return { name: "Intermedio", short:"IN", next: 80, floor:40 };
  return { name: "Principiante", short:"PR", next: 40, floor:0 };
}

function totalPoints(){
  return MODULES.flatMap(m => m.activities).reduce((sum,a)=>sum+a.points,0);
}

function findActivity(moduleId, activityId){
  const mod = MODULES.find(m=>m.id===moduleId);
  const act = mod.activities.find(a=>a.id===activityId);
  return { mod, act };
}

function isModuleComplete(mod, user){
  return mod.activities.every(a => user.completed.includes(a.id));
}

function moduleUnlocked(mod, user){
  if (!mod.requiresAll) return true;
  return MODULES.filter(m=>!m.requiresAll).every(m => isModuleComplete(m, user));
}

function videosWatched(mod, user){
  if (!mod.videos || mod.videos.length === 0) return true;
  return mod.videos.every(v => user.watchedVideos.includes(v.id));
}

function moduleMaxPoints(mod){
  return mod.activities.reduce((sum,a)=>sum+a.points,0);
}

function pointsForActivity(act, user){
  if (user.earnedPoints && typeof user.earnedPoints[act.id] === "number") return user.earnedPoints[act.id];
  return act.points; // compatibilidad con progreso guardado antes de esta actualización
}

function modulePointsEarned(mod, user){
  return mod.activities.filter(a=>user.completed.includes(a.id)).reduce((sum,a)=>sum+pointsForActivity(a,user),0);
}

function grandMaxPoints(){
  return MODULES.reduce((sum,m)=>sum+moduleMaxPoints(m),0);
}

function grandPointsEarned(user){
  return MODULES.reduce((sum,m)=>sum+modulePointsEarned(m,user),0);
}

async function saveProgress(){
  try{
    localStorage.setItem(STORAGE_KEY_PREFIX + state.user.name.toLowerCase(), JSON.stringify(state.user));
  }catch(e){ console.warn("No se pudo guardar el progreso:", e); }
}

async function loadProgress(name){
  try{
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + name.toLowerCase());
    if (raw) return JSON.parse(raw);
  }catch(e){}
  return null;
}

const app = document.getElementById("app");

function render(){
  if (state.screen === "login") return renderLogin();
  return renderShell();
}
function iconFor(type){
  return { quiz:"Q", genially:"G", final:"★" }[type] || "•";
}
function labelFor(type){
  return { quiz:"Cuestionario", genially:"Actividad Genially", final:"Reto final" }[type] || type;
}
function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

(function paintBgCode(){
  const snippets = [
    'function iniciarModulo(id) {', '  const datos = fetch(id);', '  return datos.json();', '}',
    'let puntos = 0;', 'if (respuesta === correcta) {', '  puntos += 10;', '}',
    '<div class="modulo">', '  <span>Arquitectura</span>', '</div>',
    'class Actividad {', '  constructor(tipo) {', '    this.tipo = tipo;', '  }', '}',
  ];
  const el = document.getElementById("bgCode");
  let out = "";
  for (let i=0;i<14;i++) out += snippets[Math.floor(Math.random()*snippets.length)] + "\n";
  el.textContent = out;
})();
