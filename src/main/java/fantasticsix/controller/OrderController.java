package fantasticsix.controller;

import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin("http://localhost:3000")
@Slf4j
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/flashsale/orders")
    public List<Order> getAllOrders() {

        List<Order> orders = orderService.getAllOrders();

        return orders;
    }

    @GetMapping("/flashsale/user/{userId}/orders")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {

        return orderService.getOrdersByUserId(userId);
    }


    @GetMapping("/flashsale/user/{userId}/product/{productId}/orders")
    public List<Order> getOrdersByUserIdAndProductId(@PathVariable Long userId, @PathVariable Long productId) {
        return orderService.getOrdersByUserIdAndProductId(userId, productId);
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


    @RequestMapping("/flashsale/stock-check")
    public Boolean stockCheck(long productId){
        return orderService.stockCheck(productId);
    }

    @PostMapping("/flashsale/checkout")
    public Order createOrder(Long productId, Long userId) {
        if(userId == null)
            userId = (long)(Math.random() * 5) + 1;
        return orderService.createOrder(productId, userId);
    }
}
