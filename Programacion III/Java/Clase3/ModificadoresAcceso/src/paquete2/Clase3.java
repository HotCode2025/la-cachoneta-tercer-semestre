package paquete2;

import paquete1.Clase1;

public class Clase3 extends Clase1 {
    public Clase3(){
        super();
        this.atributoPublic = "Accedemos desde la clase hija";
        System.out.println("AtributoProtected = " + this.atributoPublic);
        this.atributoPublic = "es totalmente publico";
    }
}
