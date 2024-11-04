package com.gabcytn.toycommerce.Controller;

import com.gabcytn.toycommerce.Model.Item;
import com.gabcytn.toycommerce.Service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable int id) {
        Optional<Item> item = itemService.getItem(id);
        if (item.isPresent()) return ResponseEntity.status(HttpStatus.OK).body(item.get());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping(path = "/item", consumes = "multipart/form-data")
    public ResponseEntity<Item> fileUploadTest(@RequestPart Item item, @RequestPart MultipartFile image) {
        try {
            itemService.saveItem(item, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping(path = "/item/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Optional<Item>> updateItem(@PathVariable int id, @RequestPart Item item, @RequestPart MultipartFile image) {
        if (itemService.itemExists(id)) {
            item.setId(id);
            itemService.updateItem(item, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(itemService.getItem(item.getId()));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<Item> deleteItem(@PathVariable int id) {
        if (itemService.deleteItem(id)) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
