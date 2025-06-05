package in.krishnasritarun.BillingStore.controller;

import in.krishnasritarun.BillingStore.Service.OrderService;
import in.krishnasritarun.BillingStore.io.OrderRequest;
import in.krishnasritarun.BillingStore.io.OrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse creteOrder(@RequestBody OrderRequest request){
        return orderService.createOrder(request);

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable String orderId) {
        orderService.deleteOrder(orderId);
    }

    @GetMapping("/latest")
    public List<OrderResponse> getLatestOrders(){
        return orderService.getLatestOrders();

    }

}
