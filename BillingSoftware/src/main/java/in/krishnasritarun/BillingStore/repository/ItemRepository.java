package in.krishnasritarun.BillingStore.repository;

import in.krishnasritarun.BillingStore.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String Id);

    Integer countByCategoryId(Long categoryId);
}
