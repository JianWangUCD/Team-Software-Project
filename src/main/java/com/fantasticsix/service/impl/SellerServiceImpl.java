package com.fantasticsix.service.impl;

import com.fantasticsix.exception.SellerNotFoundException;
import com.fantasticsix.model.Seller;
import com.fantasticsix.repository.SellerRepository;
import com.fantasticsix.service.SellerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerServiceImpl implements SellerService {
    Logger logger = LoggerFactory.getLogger(SellerServiceImpl.class);

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public List<Seller> getAllSellers() {
        logger.trace("Entered getAllSellers method");

        List<Seller> sellers = sellerRepository.findAll();

        return sellers;
    }

    @Override
    public Seller getSeller(long id) {
        return sellerRepository.findById(id).orElseThrow(() -> new SellerNotFoundException(id));
    }

    @Override
    public void deleteSeller(long id) {
        Optional<Seller> seller = sellerRepository.findById(id);
        if(seller.isPresent()) {
            sellerRepository.deleteById(id);
        } else {
            throw new SellerNotFoundException(id);
        }
    }

    @Override
    public Seller updateSeller(long id, Seller seller) {
        Seller sellerUpdated = sellerRepository.save(seller);
        return sellerUpdated;
    }

    @Override
    public Seller createSeller(Seller seller) {
        Seller createdSeller = sellerRepository.save(seller);
        return createdSeller;
    }
}
