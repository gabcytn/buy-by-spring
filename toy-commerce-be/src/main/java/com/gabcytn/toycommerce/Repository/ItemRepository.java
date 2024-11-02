package com.gabcytn.toycommerce.Repository;

import com.gabcytn.toycommerce.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
