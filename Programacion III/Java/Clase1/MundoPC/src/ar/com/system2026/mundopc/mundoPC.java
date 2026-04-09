package ar.com.system2026.mundopc;

public class mundoPC {
    public static void main(String[] args) {
        Monitor monitorLG = new Monitor("LG", 23);
        Teclado tecladoRD = new Teclado("USB", "Red Dragon");
        Raton ratonRD = new Raton("USB", "Red Dragon");
        Computadora computadoraDT = new Computadora("Computadora de Escritorio", monitorLG, tecladoRD, ratonRD);
        
        //Computadora 2
        
        Monitor monitorOficina = new Monitor("Samsung", 17);
        Teclado tecladoOficina = new Teclado("Bluetooth", "Samsung");
        Raton ratonOficina = new Raton("Bluetooth", "Samsung");
        Computadora computadoraO = new Computadora("Computadora Omen", monitorOficina, tecladoOficina, ratonOficina);
        
        //Computadora 3

        Monitor monitorSamsung = new Monitor("Samsung", 27);
        Teclado tecladoRazer = new Teclado("USB", "Razer");
        Raton ratonRazer = new Raton("USB", "Razer");
        Computadora computadora3 = new Computadora("Computadora Escritorio", monitorSamsung, tecladoRazer, ratonRazer);
        
        
        Orden orden1= new Orden();
        Orden orden2= new Orden(); //Se agregó la orden 2
        Orden orden3= new Orden(); //Agregue orden 3

        orden1.agregarComputadora(computadoraDT);
        orden1.agregarComputadora(computadoraO);
        
        
        Computadora computadoraVarias = new Computadora ("Computadora de diferentes marcas", monitorLG, tecladoOficina, ratonRD);
        orden2.agregarComputadora(computadoraVarias);

        //Agregado el orden 3
        orden3.agregarComputadora(computadora3);
        
        orden1.mostrarOrden();
        orden2.mostrarOrden();
        orden3.mostrarOrden();
        
    }
}
