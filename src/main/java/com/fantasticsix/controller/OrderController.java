package com.fantasticsix.controller;

import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fantasticsix.model.Order;
import com.fantasticsix.model.Product;
import com.fantasticsix.repository.ProductRepository;
import com.fantasticsix.service.OrderService;
import com.fantasticsix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/flashsale/orders")
    public List<Order> getAllOrders() {

        List<Order> orders = orderService.getAllOrders();

        return orders;
    }

    //search by id
    @GetMapping("/flashsale/orders/{id}")
    public Order getOrder(@PathVariable long id) {

        Order order = orderService.getOrder(id);
        return order;
    }

    @DeleteMapping("/flashsale/orders/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable long id) {

        orderService.deleteOrder(id);

        ResponseEntity<Void> responseEntity = ResponseEntity.noContent().build();
        return responseEntity;
    }

    @PutMapping("/flashsale/orders/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable long id,
                                                 @RequestBody Order order) {

        Order orderUpdated = orderService.updateOrder(id, order);

        ResponseEntity<Order> responseEntity = new ResponseEntity<Order>(orderUpdated, HttpStatus.OK);

        return responseEntity;
    }

//    @PostMapping("/flashsale/checkout")
//    public ResponseEntity<Void> createOrder(@RequestBody Order order){
//
//        Long userId = order.getUser().getId();
//
//        Order createdOrder = orderService.createOrder(order, userId);
//
//        productService.addProductsToOrder(createdOrder.getId(), order.getProducts());
//
//        if (createdOrder == null)
//            return ResponseEntity.noContent().build();
//
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdOrder.getId())
//                .toUri();
//
//        return ResponseEntity.created(uri).build();
//    }

//    @PostMapping("/flashsale/checkout/{userId}")
//    public ResponseEntity<Void> createOrder(@RequestBody Order order, @PathVariable(value = "userId") long userId){
//
//        Order createdOrder = orderService.createOrder(order, userId);
//
//        productService.addProductsToOrder(createdOrder.getId(), order.getProducts());
//
//        if (createdOrder == null)
//            return ResponseEntity.noContent().build();
//
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdOrder.getId())
//                .toUri();
//
//        return ResponseEntity.created(uri).build();
//    }

//    @PostMapping("/flashsale/checkout/{userId}")
//    public ResponseEntity<Void> createOrder(@RequestBody Order order, @PathVariable(value = "userId") long userId){
//
//        Order createdOrder = orderService.createOrder(order, userId);
//
//        Set<Product> products = new HashSet<>();
//        for (Product product : order.getProducts()) {
//            Product managedProduct = productRepository.findById(product.getId())
//                    .orElseThrow(() -> new ResourceNotFoundException("Not found Product with id = " + product.getId()));
//            products.add(managedProduct);
//        }
//
//        productService.addProductsToOrder(createdOrder.getId(), products);
//
//        if (createdOrder == null)
//            return ResponseEntity.noContent().build();
//
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdOrder.getId())
//                .toUri();
//
//        return ResponseEntity.created(uri).build();
//    }
    @PostMapping("/flashsale/checkout/{userId}")
    public ResponseEntity<Order> createOrder(@PathVariable(value = "userId") long userId, @RequestBody Order order, @RequestBody Product product) {

        Order createdOrder = orderService.createOrder(order, userId);

        productService.addProductsToOrder(createdOrder.getId(), product);

        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }
}
