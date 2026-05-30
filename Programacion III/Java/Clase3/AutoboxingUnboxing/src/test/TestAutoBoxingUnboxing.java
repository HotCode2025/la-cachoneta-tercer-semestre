package test;

public class TestAutoBoxingUnboxing {
    public static void main(String[] args) {
        //Clases envolventes o Wrapper
        /*
        Clases envolventes de tipos primitivos
        int = clase envolvente es integrer
        long = la clase envolvente es Long
        float= la clase envolvente es Float
        double = la clase envolvente es Double
        boolean= la clase envolvente es Boolean
        byte = la clase envolvente es Byte
        char = la clase envolvente es Character
        short = la clase envolvente es Short
        */
        
        int enteroPrim = 10; //Tipo primitivo
        System.out.println("enteroPrim = " + enteroPrim);
        Integer entero = 10; //Tipo object con la clase Integer
        System.out.println("entero = " + entero.doubleValue()); //Con AUTOBOXING podes cambiar el object
        
        int entero2= entero; //Unboxing es lo contrario, ya no es objeto es primitivo
        System.out.println("entero2 = " + entero2);
    }
}
