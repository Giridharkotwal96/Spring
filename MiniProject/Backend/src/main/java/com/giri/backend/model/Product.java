package com.giri.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    private String brand;

    private BigDecimal price;

    private String category;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;

    private Boolean availability;

    private Integer quantity;

    private String imageName;

    private String imageType;

    @Lob
    private byte[] imageData;
}