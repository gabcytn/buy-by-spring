package com.gabcytn.toycommerce.Controller;

import com.gabcytn.toycommerce.Model.Item;
import com.gabcytn.toycommerce.Service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/items")
    public List<Item> getAllItems () {
        return itemService.getAllItems();
    }

    @PostMapping(path = "/item", consumes = "multipart/form-data")
    public ResponseEntity<Item> fileUploadTest (@RequestPart Item item, @RequestPart MultipartFile image) {
        try {
            itemService.addItemWithImage(item, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<Item> deleteItem (@PathVariable int id) {
        itemService.deleteItem(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
    }

}
