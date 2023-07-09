package com.fantasticsix.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    private Integer sellerId;
    private String productName;
    private String img;
    private String detail;
    private Double price;
    private Integer stock;
    private Date saleStartTime;
    private Date saleEndTime;

    public Product(){}

    public Product(Long id, Integer sellerId, String productName, String img, String detail, Double price, Integer stock, Date saleStartTime, Date saleEndTime) {
        this.id = id;
        this.sellerId = sellerId;
        this.productName = productName;
        this.img = img;
        this.detail = detail;
        this.price = price;
        this.stock = stock;
        this.saleStartTime = saleStartTime;
        this.saleEndTime = saleEndTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Date getSaleStartTime() {
        return saleStartTime;
    }

    public void setSaleStartTime(Date saleStartTime) {
        this.saleStartTime = saleStartTime;
    }

    public Date getSaleEndTime() {
        return saleEndTime;
    }

    public void setSaleEndTime(Date saleEndTime) {
        this.saleEndTime = saleEndTime;
    }
}
