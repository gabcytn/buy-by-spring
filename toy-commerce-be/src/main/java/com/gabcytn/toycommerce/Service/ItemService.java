package com.gabcytn.toycommerce.Service;

import com.gabcytn.toycommerce.Model.Item;
import com.gabcytn.toycommerce.Repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService (ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAllItems () {
        return itemRepository.findAll();
    }

    public void deleteItem (int id) {
        itemRepository.deleteById(id);
    }
}

