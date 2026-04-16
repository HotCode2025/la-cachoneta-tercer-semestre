package domain;

public class PersonaSinBloques {
    private final int idPersona;
    // Reemplazo del bloque estatico, se usa inicialización directa
    private static int contadorPersonas = 0; 

    public PersonaSinBloques() {
        // Este es el reemplazo del bloque NO estatico, ahora lo lógica se pone aca
        this.idPersona = ++PersonaSinBloques.contadorPersonas;
        
        System.out.println("Ejecución del constructor (Sin bloques)");
    }

    @Override
    public String toString() {
        return "PersonaSinBloques{" + "idPersona=" + idPersona + '}';
    }
}
