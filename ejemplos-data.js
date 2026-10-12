/* ========================================
   CRITIA — ejemplos-data.js
   Piezas de EJEMPLO (inventadas) para mostrar cómo se ve una crítica.
   Se usan en ejemplos.html y en resultado.html?demo=ID.
   Para agregar un ejemplo: copiá un bloque y cambiá los textos.
   ======================================== */

window.CRITIA_EJEMPLOS = [
  {
    id: 'cafe-molienda',
    titulo: 'Café Molienda',
    tipo: 'Identidad / Logo',
    objetivo: 'Comunicar la identidad de una cafetería de especialidad en Palermo.',
    audiencia: 'Adultos de 25 a 40 años, con sensibilidad estética alta.',
    mensaje: 'Artesanal, cálido, con guiños al modernismo.',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#efe6d6"/><circle cx="200" cy="200" r="92" fill="none" stroke="#5a3a22" stroke-width="10"/><path d="M150 230 Q200 120 250 230" fill="none" stroke="#5a3a22" stroke-width="10"/><circle cx="200" cy="205" r="10" fill="#c8673a"/><text x="200" y="365" font-family="Georgia,serif" font-size="40" text-anchor="middle" fill="#5a3a22">Molienda</text><text x="200" y="398" font-family="Arial,sans-serif" font-size="13" letter-spacing="6" text-anchor="middle" fill="#8a6a50">CAFÉ DE ESPECIALIDAD</text></svg>',
    resultado: {
      sintesis: 'La marca transmite calidez y oficio. El símbolo y el nombre compiten un poco, y el descriptor pierde legibilidad en tamaños chicos.',
      dimensiones: [
        { nombre: 'Jerarquía visual', estado: 'mejorar', funciona: 'El símbolo circular atrae la mirada primero y funciona como sello reconocible.', problema: 'El nombre y el símbolo tienen un peso visual parecido, entonces el ojo duda entre los dos.', porque: 'Una marca necesita un punto de entrada claro: cuando dos elementos pesan lo mismo, la lectura se dispersa.', mejora: 'Definí qué manda: o reducí el símbolo a un acompañante del nombre, o hacé el nombre más liviano y dejá el sello como protagonista.', pregunta: '¿Qué querés que la gente recuerde primero: el sello o el nombre?', pista: 'Mirá la pieza de lejos, entrecerrando los ojos.' },
        { nombre: 'Composición', estado: 'bien', funciona: 'La disposición centrada y vertical es estable y se adapta bien a vasos, bolsas y cartelería.', problema: 'El espacio entre el símbolo y el nombre es un poco mayor que el necesario y los separa en dos bloques.', porque: 'La proximidad agrupa: elementos que pertenecen a la misma unidad deben estar más cerca entre sí que del entorno.', mejora: 'Acortá la distancia entre símbolo y nombre para que se lean como un solo bloque.', pregunta: '¿Se ve como una sola marca o como dos piezas apiladas?', pista: 'Medí el aire entre símbolo y nombre contra el aire que rodea todo el conjunto.' },
        { nombre: 'Contraste', estado: 'mejorar', funciona: 'El marrón sobre crema tiene buen contraste para el nombre principal.', problema: 'El descriptor "café de especialidad" usa un marrón claro y un cuerpo chico que se pierde.', porque: 'El texto pequeño necesita más contraste que el grande para mantener la legibilidad.', mejora: 'Usá para el descriptor el mismo marrón oscuro del nombre, o aumentá su cuerpo.', pregunta: '¿Qué parte del logo se lee con más dificultad?', pista: 'Probá el logo impreso a 2 cm de ancho.' },
        { nombre: 'Tipografía', estado: 'bien', funciona: 'La serif aporta tradición y la sans espaciada del descriptor da un toque moderno: el par cuenta el concepto.', problema: 'El tracking amplio del descriptor deja huecos irregulares en "ESPECIALIDAD".', porque: 'El espaciado amplio en mayúsculas pide ajuste óptico, porque cada par de letras genera huecos distintos.', mejora: 'Revisá el kerning del descriptor letra por letra.', pregunta: '¿Por qué elegiste combinar una serif con una sans?', pista: 'Pensá qué aporta cada familia al concepto.' },
        { nombre: 'Color', estado: 'bien', funciona: 'La paleta de crema, marrón y terracota remite al café y al oficio sin caer en lo obvio.', problema: 'El acento terracota aparece una sola vez y casi no se percibe.', porque: 'Un color de acento necesita presencia suficiente o repetición para convertirse en parte del sistema.', mejora: 'Definí dónde vive el terracota en el sistema (packaging, detalles) para que tenga rol.', pregunta: '¿Qué color manda en tu marca y qué comunica?', pista: 'Pensá en la marca aplicada en un vaso, no solo en el archivo.' },
        { nombre: 'Coherencia conceptual', estado: 'bien', funciona: 'Lo artesanal y lo cálido están bien resueltos en forma, color y tipografía.', problema: 'El guiño al modernismo es tímido: hoy la marca se lee más clásica que moderna.', porque: 'Si el concepto declara dos ideas, ambas tienen que tener una decisión visual que las represente.', mejora: 'Sumá un rasgo moderno concreto: geometría más pura en el símbolo o una grilla más rígida.', pregunta: 'Sin contexto, ¿qué palabra usaría alguien para describir tu marca?', pista: 'Compará esa palabra con las tres que pusiste en el concepto.' },
      ],
    },
  },
  {
    id: 'festival-ruido',
    titulo: 'Festival Ruido',
    tipo: 'Afiche / Post',
    objetivo: 'Vender entradas para un festival de música independiente.',
    audiencia: 'Jóvenes de 18 a 30 años que siguen la escena local.',
    mensaje: 'Energía, caos controlado, urbano.',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#111"/><text x="-20" y="230" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="150" fill="#ff5a0a" transform="rotate(-8 200 250)">RUI</text><text x="40" y="360" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="150" fill="#ff5a0a" transform="rotate(-8 200 250)">DO</text><text x="30" y="455" font-family="Arial,sans-serif" font-size="13" fill="#666">12.11 · Club Atlas · 21 h · entradas en ruido.ar</text></svg>',
    resultado: {
      sintesis: 'El título tiene una fuerza enorme y transmite la energía buscada. La información práctica casi no se ve, y eso le juega en contra al objetivo de vender entradas.',
      dimensiones: [
        { nombre: 'Jerarquía visual', estado: 'bien', funciona: 'El nombre del festival domina sin discusión y se lee a distancia.', problema: 'Después del título no hay un segundo nivel: la fecha y el lugar quedan al mismo nivel que un pie de página.', porque: 'Un afiche necesita al menos tres niveles: impacto, información clave y detalle.', mejora: 'Creá un segundo nivel para fecha y lugar, más grande y más claro que el resto del texto.', pregunta: 'Después del título, ¿qué es lo segundo que lee una persona?', pista: 'Pensá qué necesita saber alguien para comprar una entrada.' },
        { nombre: 'Composición', estado: 'mejorar', funciona: 'La rotación del título genera tensión y movimiento, alineada con el caos controlado.', problema: 'Las letras cortadas en el borde izquierdo hacen que "RUIDO" pierda la R en algunos formatos.', porque: 'El sangrado expresivo funciona cuando lo cortado no compromete la lectura de la palabra.', mejora: 'Ajustá el corte para que la R se reconozca completa en todos los formatos del afiche.', pregunta: '¿Qué pasa con tu pieza si se recorta para una historia de Instagram?', pista: 'Probá la pieza en 1:1 y en 9:16.' },
        { nombre: 'Contraste', estado: 'revisar', funciona: 'El naranja sobre negro tiene muchísimo impacto.', problema: 'El texto informativo en gris oscuro sobre negro casi no se lee.', porque: 'El gris #666 sobre negro no alcanza un contraste mínimo de lectura (4,5:1 para texto chico).', mejora: 'Pasá la información a blanco o al mismo naranja, y subí el cuerpo.', pregunta: '¿Qué parte de tu afiche se lee con más dificultad?', pista: 'Mirá la pieza en el celular, con el brillo bajo.' },
        { nombre: 'Tipografía', estado: 'bien', funciona: 'La sans extra negrita en caja alta es contundente y se apropia del formato.', problema: 'El texto de información usa una sans genérica que no dialoga con el título.', porque: 'Un sistema tipográfico gana fuerza cuando los niveles secundarios comparten familia o carácter con el principal.', mejora: 'Usá la misma familia del título en un peso más liviano para la información.', pregunta: '¿Qué transmite la tipografía del título?', pista: 'Imaginá el mismo título en una serif fina.' },
        { nombre: 'Color', estado: 'bien', funciona: 'Una paleta reducida de negro y naranja es directa y reconocible.', problema: 'El gris no forma parte del sistema y se ve como un error.', porque: 'En paletas mínimas, cada color extra tiene que tener una función clara.', mejora: 'Quedate solo con negro, naranja y blanco.', pregunta: '¿Qué función cumple cada color de tu paleta?', pista: 'Si sacás un color, ¿algo deja de funcionar?' },
        { nombre: 'Coherencia conceptual', estado: 'mejorar', funciona: 'La energía y lo urbano están muy bien comunicados.', problema: 'El objetivo es vender entradas, pero la pieza no ayuda a hacerlo: el dato de compra está escondido.', porque: 'Un afiche promocional se evalúa por la acción que genera, no solo por su impacto.', mejora: 'Dale visibilidad al llamado a la acción y al lugar donde se compran las entradas.', pregunta: 'Si alguien ve el afiche 3 segundos, ¿sabe cómo comprar una entrada?', pista: 'Contá los segundos que tardás en encontrar la web.' },
      ],
    },
  },
  {
    id: 'brote-lata',
    titulo: 'Brote, bebida botánica',
    tipo: 'Packaging / Editorial',
    objetivo: 'Diferenciar una bebida botánica sin azúcar en la góndola.',
    audiencia: 'Adultos de 25 a 45 años que cuidan lo que consumen.',
    mensaje: 'Fresco, natural, honesto.',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#f4f1ea"/><rect x="120" y="60" width="160" height="380" rx="22" fill="#2f6b4f"/><rect x="120" y="60" width="160" height="26" rx="10" fill="#c9c9c9"/><path d="M200 300 C160 250 170 190 200 160 C230 190 240 250 200 300Z" fill="#a8d5a2"/><line x1="200" y1="300" x2="200" y2="190" stroke="#2f6b4f" stroke-width="4"/><text x="200" y="360" font-family="Arial,sans-serif" font-weight="700" font-size="34" text-anchor="middle" fill="#f4f1ea">brote</text><text x="200" y="392" font-family="Arial,sans-serif" font-size="9" text-anchor="middle" fill="#a8d5a2">LIMA · JENGIBRE · 0% AZÚCAR</text></svg>',
    resultado: {
      sintesis: 'El envase es claro y transmite frescura. Le falta un rasgo propio para no confundirse con otras bebidas "naturales" de la góndola.',
      dimensiones: [
        { nombre: 'Jerarquía visual', estado: 'bien', funciona: 'La hoja y el nombre forman un bloque central claro que se lee de frente en la góndola.', problema: 'El dato "0% azúcar", que es el diferencial, está en el nivel más bajo.', porque: 'En packaging, el beneficio diferencial suele necesitar un nivel propio de lectura.', mejora: 'Subí "0% azúcar" a un segundo nivel, separado de los sabores.', pregunta: '¿Qué información decide la compra en menos de dos segundos?', pista: 'Pensá en alguien comparando tres latas en la góndola.' },
        { nombre: 'Composición', estado: 'bien', funciona: 'La composición centrada aprovecha bien el frente de la lata y deja aire.', problema: 'El bloque central está un poco alto y el tercio inferior queda vacío.', porque: 'En envases cilíndricos el centro óptico está algo por encima del centro geométrico, pero no tanto.', mejora: 'Bajá ligeramente el conjunto o usá el tercio inferior para el diferencial.', pregunta: '¿Dónde le sobra aire a tu envase?', pista: 'Dividí el frente en tercios horizontales.' },
        { nombre: 'Contraste', estado: 'mejorar', funciona: 'El nombre en crema sobre verde oscuro es muy legible.', problema: 'El verde claro de los sabores sobre verde oscuro pierde contraste en tamaño chico.', porque: 'Dos tonos de la misma familia tienen poco contraste de luminosidad.', mejora: 'Pasá los sabores a crema o subí el cuerpo.', pregunta: '¿Qué texto del envase te cuesta leer?', pista: 'Imprimí la lata en escala de grises.' },
        { nombre: 'Tipografía', estado: 'mejorar', funciona: 'La sans en caja baja transmite cercanía y honestidad.', problema: 'Es una sans muy genérica: no aporta personalidad a la marca.', porque: 'En categorías saturadas, la tipografía es uno de los recursos más baratos para diferenciarse.', mejora: 'Probá un logotipo con algún rasgo dibujado o una sans con carácter.', pregunta: '¿Tu nombre se reconocería si cambiaras el color?', pista: 'Escribí "brote" con otras tres tipografías y compará.' },
        { nombre: 'Color', estado: 'bien', funciona: 'El verde profundo con verde claro comunica botánico y fresco.', problema: 'Es la paleta más usada de la categoría "natural".', porque: 'El color es el primer filtro en góndola: si repetís la paleta de la categoría, te mimetizás.', mejora: 'Sumá un acento inesperado (por ejemplo, el amarillo de la lima) para destacarte.', pregunta: '¿Qué colores usan tus competidores directos?', pista: 'Armá un moodboard con 5 bebidas similares.' },
        { nombre: 'Coherencia conceptual', estado: 'mejorar', funciona: 'Fresco y natural están bien comunicados.', problema: '"Honesto" no tiene una decisión visual que lo represente.', porque: 'Cada palabra del concepto debería poder señalarse en la pieza.', mejora: 'Por ejemplo, mostrá los ingredientes de forma más directa y transparente en el frente.', pregunta: '¿Dónde está lo "honesto" en tu envase?', pista: 'Señalá con el dedo cada palabra del concepto en la pieza.' },
      ],
    },
  },
  {
    id: 'estudio-norte',
    titulo: 'Estudio Norte',
    tipo: 'Identidad / Logo',
    objetivo: 'Identidad para un estudio de arquitectura joven.',
    audiencia: 'Clientes particulares y desarrolladoras inmobiliarias.',
    mensaje: 'Preciso, sobrio, contemporáneo.',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#fff"/><path d="M130 260 V140 L270 260 V140" fill="none" stroke="#111" stroke-width="18" stroke-linejoin="miter"/><text x="200" y="320" font-family="Arial,sans-serif" font-size="20" letter-spacing="10" text-anchor="middle" fill="#111">ESTUDIO NORTE</text></svg>',
    resultado: {
      sintesis: 'Una identidad sólida y coherente con la arquitectura. Los ajustes son de precisión: grosores y espaciado.',
      dimensiones: [
        { nombre: 'Jerarquía visual', estado: 'bien', funciona: 'El monograma N manda y el nombre acompaña: el orden de lectura es claro.', problema: 'A tamaños chicos el nombre queda muy débil frente al símbolo.', porque: 'Las marcas necesitan versiones según el tamaño de uso.', mejora: 'Diseñá una versión reducida con el nombre en un peso mayor.', pregunta: '¿Qué ve primero alguien que mira tu logo?', pista: 'Probalo a 1 cm de alto.' },
        { nombre: 'Composición', estado: 'bien', funciona: 'Simetría y centrado transmiten estabilidad, muy acorde a la disciplina.', problema: 'El ancho del nombre supera al del símbolo y desbalancea el conjunto.', porque: 'En lockups centrados, alinear anchos genera un bloque más compacto.', mejora: 'Ajustá el tracking para que el nombre tenga el mismo ancho que la N.', pregunta: '¿El conjunto se siente como un bloque?', pista: 'Dibujá el rectángulo que contiene todo el logo.' },
        { nombre: 'Contraste', estado: 'bien', funciona: 'Negro sobre blanco: máximo contraste y legibilidad.', problema: 'No hay versión en negativo resuelta.', porque: 'Un logo con trazos finos puede empastarse en negativo.', mejora: 'Probá la versión en negativo y ajustá el grosor del trazo.', pregunta: '¿Cómo se ve tu logo sobre fondo negro?', pista: 'Invertí los colores y miralo de lejos.' },
        { nombre: 'Tipografía', estado: 'mejorar', funciona: 'La sans espaciada en caja alta es sobria y contemporánea.', problema: 'El trazo del texto es mucho más fino que el de la N y parecen de dos sistemas distintos.', porque: 'La relación de grosores entre símbolo y texto da unidad al logotipo.', mejora: 'Subí el peso del texto o afiná el trazo de la N para acercarlos.', pregunta: '¿El texto y el símbolo parecen hechos por la misma mano?', pista: 'Compará el grosor de las líneas.' },
        { nombre: 'Color', estado: 'bien', funciona: 'El monocromo refuerza la idea de precisión y sobriedad.', problema: 'Sin un color institucional, la marca puede costar recordarse.', porque: 'El color ayuda a la recordación de marca, incluso como acento.', mejora: 'Evaluá un acento cromático para aplicaciones digitales y papelería.', pregunta: '¿Tu marca necesita un color propio?', pista: 'Pensá en cómo la reconocería alguien en una obra.' },
        { nombre: 'Coherencia conceptual', estado: 'bien', funciona: 'Preciso, sobrio y contemporáneo están representados en la geometría y la paleta.', problema: 'Poco riesgo: puede confundirse con otros estudios.', porque: 'La sobriedad no excluye un rasgo distintivo.', mejora: 'Buscá un detalle propio en la N (un corte, un ángulo) que se vuelva firma.', pregunta: '¿Qué hace única a tu marca dentro de su rubro?', pista: 'Buscá 5 logos de estudios de arquitectura y comparalos.' },
      ],
    },
  },
  {
    id: 'muestra-fractura',
    titulo: 'Muestra Fractura',
    tipo: 'Afiche / Post',
    objetivo: 'Difundir una muestra de arte contemporáneo en un centro cultural.',
    audiencia: 'Estudiantes de arte y público general interesado en cultura.',
    mensaje: 'Ruptura, tensión, materia.',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#e9e4da"/><rect x="40" y="40" width="150" height="190" fill="#1d1d1d"/><rect x="200" y="40" width="160" height="90" fill="#b23a2a"/><rect x="200" y="140" width="70" height="90" fill="#8c8c8c"/><rect x="280" y="140" width="80" height="200" fill="#1d1d1d"/><rect x="40" y="240" width="230" height="100" fill="#cfc7b8"/><text x="40" y="410" font-family="Georgia,serif" font-size="54" fill="#1d1d1d">Fractura</text><text x="40" y="445" font-family="Arial,sans-serif" font-size="14" fill="#1d1d1d">Muestra colectiva · 3 al 28 de mayo · Centro Cultural Sur</text></svg>',
    resultado: {
      sintesis: 'La grilla de bloques es atractiva, pero se lee ordenada y estable: la ruptura del concepto no aparece en la forma.',
      dimensiones: [
        { nombre: 'Jerarquía visual', estado: 'mejorar', funciona: 'El bloque rojo es el primer punto de atención y le da energía a la pieza.', problema: 'El título queda debajo de la composición y compite con los bloques negros.', porque: 'El elemento más contrastado atrae la mirada primero, aunque no sea el más importante.', mejora: 'Integrá el título a la grilla o dale más escala para que sea el segundo nivel.', pregunta: '¿Cuál creés que es el primer elemento que ve una persona en tu afiche?', pista: 'Pensá qué color o forma tiene más contraste con el fondo.' },
        { nombre: 'Composición', estado: 'mejorar', funciona: 'La grilla modular está bien construida y tiene ritmo.', problema: 'Todos los bloques respetan la grilla: no hay ninguna ruptura.', porque: 'Romper una grilla funciona cuando la grilla es visible y la ruptura es intencional.', mejora: 'Desplazá, rotá o superponé uno de los bloques para materializar la fractura.', pregunta: '¿Dónde está la ruptura en tu composición?', pista: 'Si todo está alineado, ¿qué se rompe?' },
        { nombre: 'Contraste', estado: 'bien', funciona: 'Los bloques negros sobre fondo claro generan contraste fuerte y tensión.', problema: 'El bloque gris claro casi desaparece contra el fondo.', porque: 'Elementos de luminosidad parecida se funden visualmente.', mejora: 'Oscurecé ese bloque o eliminalo.', pregunta: '¿Hay algún elemento que casi no se vea?', pista: 'Pasá la pieza a escala de grises.' },
        { nombre: 'Tipografía', estado: 'mejorar', funciona: 'La serif aporta un tono cultural e institucional.', problema: 'Es demasiado clásica y tranquila para un concepto de ruptura.', porque: 'La tipografía también es imagen: su forma comunica antes que su contenido.', mejora: 'Probá cortar, superponer o deformar el título para que participe del concepto.', pregunta: '¿Qué sensación transmite tu título por sí solo?', pista: 'Tapá la imagen y mirá solo la palabra.' },
        { nombre: 'Color', estado: 'bien', funciona: 'Paleta terrosa con acento rojo: remite a materia y a tensión.', problema: 'El rojo aparece una sola vez y queda aislado.', porque: 'Un acento gana sentido cuando dialoga con otro punto de la pieza.', mejora: 'Repetí el rojo en un detalle tipográfico.', pregunta: '¿Por qué elegiste el rojo?', pista: 'Pensá qué palabra del concepto representa.' },
        { nombre: 'Coherencia conceptual', estado: 'revisar', funciona: '"Materia" se percibe en la paleta y los bloques sólidos.', problema: '"Ruptura" y "tensión" no aparecen: la pieza transmite orden.', porque: 'Si la forma contradice el concepto, el público lee la forma.', mejora: 'Elegí una decisión formal clara que exprese ruptura (corte, desplazamiento, choque de escalas).', pregunta: 'Si alguien ve la pieza sin contexto, ¿qué palabra usaría para describirla?', pista: 'Compará esa palabra con las del concepto.' },
      ],
    },
  },
  {
    id: 'revista-pulso',
    titulo: 'Revista Pulso, tapa',
    tipo: 'Packaging / Editorial',
    objetivo: 'Tapa de una revista universitaria de cultura y actualidad.',
    audiencia: 'Estudiantes universitarios de 18 a 26 años.',
    mensaje: 'Actual, crítica, joven.',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#f2f2f2"/><text x="30" y="90" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="86" fill="#1a1aff">PULSO</text><circle cx="250" cy="280" r="110" fill="#ffcf33"/><rect x="150" y="200" width="120" height="160" fill="#1a1aff" opacity=".85"/><text x="30" y="430" font-family="Arial,sans-serif" font-weight="700" font-size="22" fill="#111">¿Quién decide</text><text x="30" y="458" font-family="Arial,sans-serif" font-weight="700" font-size="22" fill="#111">qué es arte?</text><text x="300" y="470" font-family="Arial,sans-serif" font-size="12" fill="#111">N.º 14</text></svg>',
    resultado: {
      sintesis: 'Una tapa con carácter y buen uso del color. Hay que reforzar la lectura del titular de portada.',
      dimensiones: [
        { nombre: 'Jerarquía visual', estado: 'bien', funciona: 'Cabecera, imagen y titular tienen niveles claros.', problema: 'El número de edición está muy cerca del titular y se confunde con él.', porque: 'Los datos de servicio deben separarse del contenido editorial.', mejora: 'Mové el número de edición junto a la cabecera.', pregunta: '¿En qué orden se lee tu tapa?', pista: 'Numerá los elementos del 1 al 4.' },
        { nombre: 'Composición', estado: 'bien', funciona: 'La superposición de círculo y rectángulo genera dinamismo.', problema: 'El titular queda apretado contra el margen inferior.', porque: 'Los márgenes consistentes dan respiro y profesionalismo editorial.', mejora: 'Igualá el margen inferior al superior.', pregunta: '¿Tus márgenes son iguales en los cuatro lados?', pista: 'Medilos.' },
        { nombre: 'Contraste', estado: 'bien', funciona: 'Azul eléctrico, amarillo y negro sobre gris claro: contraste alto y llamativo.', problema: 'El azul con transparencia sobre el amarillo genera un verde sucio.', porque: 'Las transparencias mezclan colores y pueden crear tonos no deseados.', mejora: 'Usá el azul sólido o un modo de fusión controlado.', pregunta: '¿Hay algún color que no elegiste pero aparece?', pista: 'Mirá dónde se cruzan las formas.' },
        { nombre: 'Tipografía', estado: 'mejorar', funciona: 'La cabecera extra negrita es contundente y joven.', problema: 'El titular usa una negrita estándar con poca presencia frente a la cabecera.', porque: 'El contraste de escala entre cabecera y titular define la voz editorial.', mejora: 'Agrandá el titular o usá una tipografía con más carácter.', pregunta: '¿El titular invita a abrir la revista?', pista: 'Leelo en voz alta: ¿tiene el peso visual que merece?' },
        { nombre: 'Color', estado: 'bien', funciona: 'Primarios saturados que comunican juventud y actualidad.', problema: 'Sin una regla de color por edición, la serie puede perder unidad.', porque: 'En publicaciones periódicas el color suele ser un sistema.', mejora: 'Definí qué color se mantiene fijo y cuál cambia en cada número.', pregunta: '¿Cómo va a ser la tapa del próximo número?', pista: 'Pensá la tapa como parte de una colección.' },
        { nombre: 'Coherencia conceptual', estado: 'bien', funciona: 'Actual y joven están muy bien comunicados.', problema: 'Lo "crítico" depende solo del titular.', porque: 'La imagen también puede plantear una pregunta, no solo ilustrarla.', mejora: 'Hacé que la imagen genere tensión o contradicción con el titular.', pregunta: '¿La imagen de tapa opina algo?', pista: 'Tapá el titular: ¿la imagen sola dice algo?' },
      ],
    },
  },
  {
    id: 'turnero-app',
    titulo: 'Turnero, app de turnos',
    tipo: 'UI / Presentación',
    objetivo: 'Que los pacientes de una clínica saquen turno en menos de un minuto.',
    audiencia: 'Adultos de 30 a 70 años, con distintos niveles de experiencia digital.',
    mensaje: 'Simple, confiable, accesible.',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#dfe7ef"/><rect x="110" y="30" width="180" height="440" rx="26" fill="#fff" stroke="#222" stroke-width="4"/><text x="130" y="90" font-family="Arial,sans-serif" font-weight="700" font-size="18" fill="#222">Nuevo turno</text><rect x="130" y="110" width="140" height="44" rx="8" fill="#eef2f6"/><rect x="130" y="164" width="140" height="44" rx="8" fill="#eef2f6"/><rect x="130" y="218" width="140" height="44" rx="8" fill="#eef2f6"/><text x="142" y="137" font-family="Arial,sans-serif" font-size="12" fill="#999">Especialidad</text><text x="142" y="191" font-family="Arial,sans-serif" font-size="12" fill="#999">Profesional</text><text x="142" y="245" font-family="Arial,sans-serif" font-size="12" fill="#999">Fecha</text><rect x="130" y="400" width="140" height="44" rx="22" fill="#9fc3e6"/><text x="200" y="427" font-family="Arial,sans-serif" font-size="13" text-anchor="middle" fill="#fff">Confirmar</text></svg>',
    resultado: {
      sintesis: 'El flujo es claro y corto. El botón principal y los campos tienen poco contraste para un público amplio que incluye personas mayores.',
      dimensiones: [
        { nombre: 'Jerarquía visual', estado: 'mejorar', funciona: 'El título de la pantalla deja claro qué se está haciendo.', problema: 'El botón "Confirmar" en celeste pálido no se percibe como la acción principal.', porque: 'La acción principal debe ser el elemento con más peso visual de la pantalla.', mejora: 'Usá un color saturado y oscuro para el botón principal.', pregunta: '¿Dónde tocaría primero alguien que entra a esta pantalla?', pista: 'Buscá el elemento con más contraste.' },
        { nombre: 'Composición', estado: 'bien', funciona: 'Campos apilados en el orden lógico del trámite.', problema: 'Hay un hueco grande entre el último campo y el botón.', porque: 'La distancia sugiere que el botón no pertenece al formulario.', mejora: 'Acercá el botón al último campo o fijalo abajo con un resumen.', pregunta: '¿El botón parece parte del formulario?', pista: 'Mirá el espacio vacío en el centro.' },
        { nombre: 'Contraste', estado: 'revisar', funciona: 'El título negro sobre blanco se lee perfecto.', problema: 'El texto gris claro de los campos y el blanco sobre celeste no alcanzan el contraste mínimo.', porque: 'WCAG pide 4,5:1 para texto normal; es clave para un público de hasta 70 años.', mejora: 'Oscurecé los textos de los campos y el fondo del botón.', pregunta: '¿Qué texto le costaría leer a alguien con vista cansada?', pista: 'Usá un verificador de contraste.' },
        { nombre: 'Tipografía', estado: 'mejorar', funciona: 'Una sans neutra y legible.', problema: 'El cuerpo de 12 px en los campos es chico para el público.', porque: 'En interfaces para público amplio se recomienda 16 px como mínimo en campos.', mejora: 'Subí el texto de campos y botones a 16 px.', pregunta: '¿Tu abuela podría leer esta pantalla sin anteojos?', pista: 'Mirá la pantalla en un celular real.' },
        { nombre: 'Color', estado: 'mejorar', funciona: 'Los azules transmiten confianza y salud.', problema: 'La paleta es tan suave que nada se destaca.', porque: 'El color en interfaces también comunica función: qué se puede tocar.', mejora: 'Reservá un azul fuerte solo para acciones.', pregunta: '¿Qué te dice el color sobre qué se puede tocar?', pista: 'Marcá todo lo interactivo con un mismo color.' },
        { nombre: 'Coherencia conceptual', estado: 'mejorar', funciona: 'Simple y confiable están logrados.', problema: '"Accesible" no se cumple por el contraste y el tamaño de texto.', porque: 'La accesibilidad es una condición técnica, no solo una sensación.', mejora: 'Revisá contraste, tamaño de toque (44 px) y tamaño de texto.', pregunta: '¿Cómo comprobaste que la app es accesible?', pista: 'Probala con alguien de 65 años o más.' },
      ],
    },
  },
  {
    id: 'panaderia-trigo',
    titulo: 'Panadería Trigo',
    tipo: 'Identidad / Logo',
    objetivo: 'Renovar la marca de una panadería de barrio con 30 años de historia.',
    audiencia: 'Vecinos de todas las edades.',
    mensaje: 'Familiar, cercano, de siempre pero actual.',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f7e9c8"/><g fill="#b5702a"><ellipse cx="200" cy="120" rx="14" ry="26"/><ellipse cx="178" cy="160" rx="14" ry="26" transform="rotate(-25 178 160)"/><ellipse cx="222" cy="160" rx="14" ry="26" transform="rotate(25 222 160)"/><ellipse cx="178" cy="200" rx="14" ry="26" transform="rotate(-25 178 200)"/><ellipse cx="222" cy="200" rx="14" ry="26" transform="rotate(25 222 200)"/></g><line x1="200" y1="140" x2="200" y2="250" stroke="#b5702a" stroke-width="6"/><text x="200" y="305" font-family="Brush Script MT,cursive" font-size="58" text-anchor="middle" fill="#7a4317">Trigo</text><text x="200" y="335" font-family="Arial,sans-serif" font-size="12" letter-spacing="5" text-anchor="middle" fill="#7a4317">PANADERÍA · DESDE 1994</text></svg>',
    resultado: {
      sintesis: 'La marca es cálida y familiar, pero la tipografía script le resta actualidad y legibilidad en cartelería.',
      dimensiones: [
        { nombre: 'Jerarquía visual', estado: 'bien', funciona: 'Espiga, nombre y descriptor tienen un orden claro de arriba hacia abajo.', problema: 'La espiga pesa casi lo mismo que el nombre.', porque: 'En marcas de comercio de barrio, el nombre suele tener que leerse primero.', mejora: 'Reducí un poco la espiga.', pregunta: '¿Qué se lee primero desde la vereda de enfrente?', pista: 'Imaginá el logo en la marquesina.' },
        { nombre: 'Composición', estado: 'bien', funciona: 'El conjunto centrado es equilibrado y fácil de aplicar.', problema: 'El descriptor es más ancho que el nombre.', porque: 'Un descriptor más ancho que el nombre desplaza el peso hacia abajo.', mejora: 'Ajustá el tracking del descriptor.', pregunta: '¿El logo se siente estable o pesado abajo?', pista: 'Mirá el contorno general del conjunto.' },
        { nombre: 'Contraste', estado: 'bien', funciona: 'El marrón sobre amarillo crema tiene buen contraste.', problema: 'La espiga en marrón claro pierde fuerza en impresiones de baja calidad.', porque: 'Los tonos medios se empastan en impresiones económicas (bolsas, servilletas).', mejora: 'Prepará una versión a una tinta en marrón oscuro.', pregunta: '¿Cómo se ve tu logo impreso en una bolsa de papel?', pista: 'Imprimilo en blanco y negro.' },
        { nombre: 'Tipografía', estado: 'revisar', funciona: 'La script aporta calidez y tono familiar.', problema: 'Es una script muy usada que se asocia a lo antiguo y se lee mal a distancia.', porque: 'Las scripts genéricas restan identidad y bajan la legibilidad en cartelería.', mejora: 'Probá un lettering propio o una serif amable con algún rasgo dibujado.', pregunta: '¿La tipografía dice "de siempre" o dice "actual"?', pista: 'Buscá la misma tipografía en otras marcas.' },
        { nombre: 'Color', estado: 'bien', funciona: 'Ocres y marrones remiten al pan y al horno.', problema: 'Es la paleta esperable del rubro.', porque: 'La paleta cumple, pero no diferencia.', mejora: 'Sumá un acento propio que la distinga de otras panaderías.', pregunta: '¿Tu panadería se distingue de la de la otra cuadra?', pista: 'Mirá marcas de panaderías cercanas.' },
        { nombre: 'Coherencia conceptual', estado: 'mejorar', funciona: 'Familiar y cercano están logrados.', problema: '"Actual" no se ve: la renovación se percibe tímida.', porque: 'En un rediseño, el cambio tiene que ser perceptible para comunicar renovación.', mejora: 'Concentrá la actualización en la tipografía y la simplificación de la espiga.', pregunta: '¿Qué cambió respecto de la marca anterior?', pista: 'Ponelas una al lado de la otra.' },
      ],
    },
  },
];
