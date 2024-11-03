package com.gabcytn.toycommerce.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.gabcytn.toycommerce.Model.Item;
import com.gabcytn.toycommerce.Repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ItemService {
    private final Cloudinary cloudinary;

    private final ItemRepository itemRepository;

    public ItemService (ItemRepository itemRepository, Cloudinary cloudinary) {
        this.itemRepository = itemRepository;
        this.cloudinary = cloudinary;
    }

    public List<Item> getAllItems () {
        return itemRepository.findAll();
    }

    public Optional<Item> getItem (int id) {
        return itemRepository.findById(id);
    }

    public void addItem (Item item) {
        itemRepository.save(item);
    }

    public void deleteItem (int id) {
        try {
            if (itemRepository.findById(id).isPresent()) {
                Item itemToBeDeleted = itemRepository.findById(id).get();
                final String publicID = itemToBeDeleted.getImagePublicID();
                cloudinary.uploader().destroy(publicID, null);
                itemRepository.deleteById(id);
            }
        }
        catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }

    }

    public void addItemWithImage (Item item, MultipartFile image) {
        final List<String> contentTypes = new ArrayList<>(Arrays.asList("image/jpeg", "image/png", "image"));
        if (!contentTypes.contains(image.getContentType()))
            throw new IllegalArgumentException();

        final Map params1 = ObjectUtils.asMap(
                "use_filename", false,
                "unique_filename", true,
                "overwrite", true
        );

        try {
            final Map uploadReturnValue = cloudinary.uploader().upload(image.getBytes(), params1);
            final String imageURL = uploadReturnValue.get("secure_url").toString();
            final String publicID = uploadReturnValue.get("public_id").toString();
            item.setImage(imageURL);
            item.setImagePublicID(publicID);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }

        itemRepository.save(item);
    }
}

