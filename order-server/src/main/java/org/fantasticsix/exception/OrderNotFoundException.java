package org.fantasticsix.exception;

public class OrderNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 179856888745840942L;

    public OrderNotFoundException(Long id) {
        super("Order id not found : " + id);
    }

    public OrderNotFoundException(String message, Long id) {
        super("Order id not found : " + id + " TODO " + message);
    }
}