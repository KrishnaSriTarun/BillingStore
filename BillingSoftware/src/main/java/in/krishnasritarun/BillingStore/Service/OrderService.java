package in.krishnasritarun.BillingStore.Service;

import in.krishnasritarun.BillingStore.entity.OrderEntity;
import in.krishnasritarun.BillingStore.io.OrderRequest;
import in.krishnasritarun.BillingStore.io.OrderResponse;
import in.krishnasritarun.BillingStore.io.PaymentVerficationRequest;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerficationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}
