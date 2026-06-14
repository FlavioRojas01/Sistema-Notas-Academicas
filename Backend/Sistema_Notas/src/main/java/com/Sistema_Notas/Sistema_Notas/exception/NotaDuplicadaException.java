package com.Sistema_Notas.Sistema_Notas.exception;

public class NotaDuplicadaException extends RuntimeException{

    public NotaDuplicadaException(
            String mensaje) {

        super(mensaje);
    }

}
