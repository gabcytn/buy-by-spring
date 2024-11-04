package com.gabcytn.toycommerce.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.gabcytn.toycommerce.Model.Item;
import com.gabcytn.toycommerce.Repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Service
public class ItemService {
    private final Cloudinary cloudinary;

    private final ItemRepository itemRepository;

    public ItemService (ItemRepository itemRepository, Cloudinary cloudinary) {
        this.itemRepository = itemRepository;
        this.cloudinary = cloudinary;
    }

    public List<Item> getAllItems () { return itemRepository.findAll(); }

    public Optional<Item> getItem (int id) { return itemRepository.findById(id); }

    public void saveItem (Item item, MultipartFile image) {
        checkContentTypeValidity(image.getContentType());
        String[] imageProperties = uploadImageToCloudinary(image);
        if (imageProperties.length > 0) {
            item.setImage(imageProperties[0]);
            item.setImagePublicID(imageProperties[1]);
            item.setDate(LocalDate.now());
            itemRepository.save(item);
            return;
        }

        throw new RuntimeException("No image found");
    }

    public void updateItem (Item item, MultipartFile image) {
        try {
            deleteImageInCloudinary(item.getId());
            saveItem(item, image);
        } catch (IOException e) {
            System.err.println("Update error: " + e.getMessage());
        }
    }

    public boolean deleteItem (int id) {
        try {
            deleteImageInCloudinary(id);
            itemRepository.deleteById(id);
            return true;
        }
        catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
            return false;
        }
    }

    public boolean itemExists (int id) {
        return itemRepository.existsById(id);
    }


    // PRIVATE METHODS

    private void deleteImageInCloudinary (int id) throws IOException {
        Optional<Item> item = itemRepository.findById(id);
        if (item.isPresent()) {
            final String publicID = item.get().doGetImagePublicID();
            cloudinary.uploader().destroy(publicID, null);
        }
    }

    private String[] uploadImageToCloudinary (MultipartFile image) {
        final Map uploadParams = ObjectUtils.asMap(
                "use_filename", false,
                "unique_filename", true,
                "overwrite", true
        );
        try {
            final Map uploadReturnValue = cloudinary.uploader().upload(image.getBytes(), uploadParams);
            final String imageURL = uploadReturnValue.get("secure_url").toString();
            final String publicID = uploadReturnValue.get("public_id").toString();
            return new String[]{imageURL, publicID};
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
            return new String[0];
        }
    }

    private void checkContentTypeValidity (String contentType) {
        if (!isImageContentTypeValid(contentType))
            throw new IllegalArgumentException();
    }

    private boolean isImageContentTypeValid (String contentType) {
        String[] contentTypes = { "image", "image/jpeg", "image/png", "image/gif", "image/webp" };
        boolean isValid = false;

        for (String type : contentTypes) {
            if (type.equals(contentType)) {
                isValid = true;
                break;
            }
        }

        return isValid;
    }
}

