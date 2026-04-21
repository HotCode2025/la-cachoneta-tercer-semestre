// Clase Orden (AGREGACIÓN)
class Orden {
  static contadorOrdenes = 0;

  constructor() {
    this._idOrden = ++Orden.contadorOrdenes;
    this._computadoras = [];
  }

  agregarComputadora(computadora) {
    this._computadoras.push(computadora);
  }

  mostrarOrden() {
    return `Orden: ${this._idOrden} \n\n-- Computadoras -- \n${this._computadoras.map(computadora => computadora.toString()).join('\n\n')}`;
  }
}

// Clase Computadora
class Computadora {
  static contadorComputadora = 0;

  // Este es el metodo para aplicar polimorfismo, ya que se puede usar para imprimir cualquier objeto que tenga el metodo toString()
  static imprimirDetalles(objeto) {
    console.log('Detalles del objeto "POLIMORFISMO":');
    console.log(objeto.toString());
    console.log('-----------------------------');
  }

  constructor(nombre, monitor, teclado, raton) {
    this._idComputadora = ++Computadora.contadorComputadora;
    this._nombre = nombre;
    this._monitor = monitor;
    this._teclado = teclado;
    this._raton = raton;
  }

  toString() {
    return `Computadora: ${this._idComputadora} \nNombre: ${this._nombre} \n- Monitor - \n${this._monitor} \n- Teclado - \n${this._teclado} \n- Raton - \n${this._raton}`;
  }
}

// Clase Monitor
class Monitor {
  static contadorMonitor = 0;

  constructor(marca, tamano) {
    
    this._idMonitor = ++Monitor.contadorMonitor;
    this._marca = marca;
    this._tamano = tamano;
  }

  get idMonitor() {
    return this._idMonitor;
  }

  toString() {
    return `Monitor: ${this._idMonitor} \nMarca: ${this._marca} \nTamaño: ${this._tamano}`;
  }
}

// Clase DispositivoEntrada (PADRE)
class DispositivoEntrada {
  constructor(tipoEntrada, marca) {
    this._tipoEntrada = tipoEntrada;
    this._marca = marca;
  }

  get tipoEntrada() {
    return this._tipoEntrada;
  }
  set tipoEntrada(tipoEntrada) {
    this._tipoEntrada = tipoEntrada;
  }

  get marca() {
    return this._marca;
  }
  set marca(marca) {
    this._marca = marca;
  }
  
  toString() {
    return `Tipo de Entrada: ${this.tipoEntrada} \nMarca: ${this.marca}`;
  }
}

// Clase Teclado (HIJO de DispositivoEntrada)
class Teclado extends DispositivoEntrada {
  static contadorTeclado = 0;

  constructor(tipoEntrada, marca) {
    super(tipoEntrada, marca);
    this._idTeclado = ++Teclado.contadorTeclado;
  }

  toString() {
    return `Teclado: ${this._idTeclado} \nTipo de Entrada: ${this.tipoEntrada} \nMarca: ${this.marca}`;
  }
}

// Clase Raton (HIJO de DispositivoEntrada)
class Raton extends DispositivoEntrada {
  static contadorRaton = 0;

  constructor(tipoEntrada, marca) {
    super(tipoEntrada, marca);
    this._idRaton = ++Raton.contadorRaton;
  }

  toString() {
    return `Raton: ${this._idRaton} \nTipo de Entrada: ${this.tipoEntrada} \nMarca: ${this.marca}`;
  }
}

// PRUEBA

// Dispostivos de Entrada
let raton = new Raton('USB', 'Logitech');
console.log(raton.toString());
let raton2 = new Raton('Bluetooth', 'HP');

let teclado = new Teclado('USB', 'Microsoft');
console.log(teclado.toString());
let teclado2 = new Teclado('Bluetooth', 'Dell');


// Monitores
let monitor = new Monitor('Dell', '24 pulgadas');
console.log(monitor.toString());
let monitor2 = new Monitor('HP', '27 pulgadas');

// Computadoras
let computadora = new Computadora('HP', monitor, teclado, raton);
console.log(computadora.toString());
let computadora2 = new Computadora('Dell', monitor2, teclado2, raton2);

// Usamos el metodo de polimorfismo para imprimir los detalles de cada objeto
Computadora.imprimirDetalles(monitor);
Computadora.imprimirDetalles(teclado);
Computadora.imprimirDetalles(raton);
Computadora.imprimirDetalles(computadora);

// Orden
let orden = new Orden();
orden.agregarComputadora(computadora);
orden.agregarComputadora(computadora2);
console.log(orden.mostrarOrden());

// ¿Qué pasa con la clase Orden luego de agregar el metodo imprimirDetalles en la clase Computadora?
// La clase Orden no se ve afectada por el metodo imprimirDetalles, ya que este metodo es estatico y se puede usar para imprimir cualquier objeto que tenga el metodo toString(),
// por lo que no es necesario modificar la clase Orden para usar el metodo imprimirDetalles. Ademas, si en el futuro se agregan nuevos tipos de objetos, la clase Orden no se ve
// afectada, ya que el metodo mostrarOrden() sigue funcionando correctamente al llamar al metodo toString() de cada objeto.