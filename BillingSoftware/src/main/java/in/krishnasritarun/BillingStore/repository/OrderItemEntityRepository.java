package in.krishnasritarun.BillingStore.repository;

import in.krishnasritarun.BillingStore.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity,Long> {
}
