package com.gabcytn.toycommerce.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private int price;
    private LocalDate release_date;
    private int quantity;
    @Column(name = "image_url")
    private String imageURL;
    @Column(name = "image_public_id")
    private String imagePublicID;

    public Item () {}
    public Item(String name, String description, int price, int quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    @PrePersist
    public void onCreate () {
        setDate(LocalDate.now());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public LocalDate getDate() {
        return release_date;
    }

    public void setDate(LocalDate date) {
        this.release_date = date;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return imageURL;
    }

    public void setImage(String image) {
        this.imageURL = image;
    }

    public String getImagePublicID() {
        return imagePublicID;
    }

    public void setImagePublicID(String imagePublicID) {
        this.imagePublicID = imagePublicID;
    }
}
