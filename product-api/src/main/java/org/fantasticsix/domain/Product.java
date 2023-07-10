package org.fantasticsix.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long sellerId;
    //private Integer sellerId;
    private String productName;
    private String img;
    private String detail;
    private Double price;
    private Integer stock;
    private Date saleStartTime;
    private Date saleEndTime;
}
