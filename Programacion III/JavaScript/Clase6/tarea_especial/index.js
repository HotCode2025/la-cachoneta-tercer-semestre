const reloj = document.getElementById("clock");
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function actualizarReloj() {
	// Crea un objeto date
	const fecha = new Date();

	// Obtenemos hora, minuto y segundo del dia
	// Nota: padStart es un metodo de cadenas que se utiliza para agregar 0 en caso de tener 1 digito, por eso convertimos el valor a string
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const segundos = String(fecha.getSeconds()).padStart(2, "0");

	// Obtenemos el p del contenedor "description"
	const textoFecha = document.querySelector(".description p");
	const dia = fecha.getDate();
	const mes = fecha.getMonth();
	const anio = fecha.getFullYear();
	console.log(dia, mes, anio);

	// Modificamos el texto del contenedor "clock" con la hora actual
  reloj.textContent = `${horas}:${minutos}:${segundos}`;

	// Modificamos el texto del dia actual
	textoFecha.textContent = `Hoy es ${dia} de ${meses[mes]} del ${anio}`;

}

setInterval(actualizarReloj, 1000);
// Ejecutamos la funcion para no ver 00:00:00 al ejecutar el proyecto
actualizarReloj();
