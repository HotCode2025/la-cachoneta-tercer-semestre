
package test;
import domain.Persona;
import domain.PersonaSinBloques;

public class TestBloqueInicializacion {
    public static void main(String[] args) {
        Persona persona1 = new Persona();
        System.out.println("persona1 = " + persona1);
        Persona persona2 = new Persona();
        System.out.println("persona2 = " + persona2);
        
        System.out.println("Prueba original con bloques");
        System.out.println("");
        
        //Esta es la prueba original sin bloques
        PersonaSinBloques Persona = new PersonaSinBloques(); // Aca se ve solo el mensaje del constructor
        System.out.println(Persona);
        System.out.println("Prueba original sin bloques");
    }
}
