package com.fantasticsix.exception;

public class SellerNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 179856888745840942L;

    public SellerNotFoundException(Long id) {
        super("Seller id not found : " + id);
    }

    public SellerNotFoundException(String message, Long id) {
        super("Seller id not found : " + id + " TODO " + message);
    }
}
