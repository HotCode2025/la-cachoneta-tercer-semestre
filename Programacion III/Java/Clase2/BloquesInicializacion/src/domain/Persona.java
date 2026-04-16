package domain;

public class Persona {
    private final int idPersona;
    private static int contadorPersonas;
    
    static{ //Bloque de inicializacion estatico
        System.out.println("Ejecucion del bloque estatico");
        ++Persona.contadorPersonas;
    }
    
    {//Bloque de inicializacion NO estatico (contexto dinamico)
        System.out.println("Ejecucion de bloque NO estatico");
        this.idPersona = Persona.contadorPersonas++; //Incrementamos el atributo
    }
    
    //Los bloques de inicializacion se ejecutan antes del constructor, cada vez que creemos un objeto se ejecuta por eso incrementamos en 1
    
    //El estatico se ejecuta una sola vez
    
    
    //Constructor
    
    public Persona(){
        System.out.println("Ejecucion del constructor");
    }
    
    public int idPersona(){
        return this.idPersona;
    }

    @Override
    public String toString() {
        return "Persona{" + "idPersona=" + idPersona + '}';
    }
    
    
}




