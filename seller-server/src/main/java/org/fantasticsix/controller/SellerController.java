package org.fantasticsix.controller;

import org.fantasticsix.domain.Seller;
import org.fantasticsix.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @GetMapping("/flashsale/sellers")
    public List<Seller> getAllSellers() {

        List<Seller> sellers = sellerService.getAllSellers();

        return sellers;
    }

    //search by id
    @GetMapping("/flashsale/sellers/{id}")
    public Seller getSeller(@PathVariable long id) {

        Seller seller = sellerService.getSeller(id);
        return seller;
    }

    @DeleteMapping("/flashsale/sellers/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable long id) {

        sellerService.deleteSeller(id);

        ResponseEntity<Void> responseEntity = ResponseEntity.noContent().build();
        return responseEntity;
    }

    @PutMapping("/flashsale/sellers/{id}")
    public ResponseEntity<Seller> updateSeller(@PathVariable long id,
                                               @RequestBody Seller seller) {

        Seller sellerUpdated = sellerService.updateSeller(id, seller);

        ResponseEntity<Seller> responseEntity = new ResponseEntity<Seller>(sellerUpdated, HttpStatus.OK);

        return responseEntity;
    }

    @PostMapping("/flashsale/sellers")
    public ResponseEntity<Void> createSeller(@RequestBody Seller seller) {

        Seller createdSeller = sellerService.createSeller(seller);

        if (createdSeller == null)
            return ResponseEntity.noContent().build();

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdSeller.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }
}