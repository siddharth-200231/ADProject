package com.adp.backend.models;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "description")
    private String desc;
    
    private String name;
    private String category;
    
    @Column(name = "release_date")
    private Date releaseDate;
    
    private int price;
    private String brand;
    private boolean available;
    private int stockQuantity;

    public Long getId() {
        return id;
    }
}
