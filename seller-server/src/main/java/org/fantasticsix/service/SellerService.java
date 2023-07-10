package org.fantasticsix.service;

import org.fantasticsix.domain.Seller;

import java.util.List;

public interface SellerService {
    List<Seller> getAllSellers();

    Seller getSeller(long id);

    void deleteSeller(long id);

    Seller updateSeller(long id, Seller seller);

    Seller createSeller(Seller seller);
}