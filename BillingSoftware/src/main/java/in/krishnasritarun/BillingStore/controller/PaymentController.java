package in.krishnasritarun.BillingStore.controller;

import com.razorpay.RazorpayException;
import in.krishnasritarun.BillingStore.Service.OrderService;
import in.krishnasritarun.BillingStore.Service.RazorpayService;
import in.krishnasritarun.BillingStore.io.OrderResponse;
import in.krishnasritarun.BillingStore.io.PaymentRequest;
import in.krishnasritarun.BillingStore.io.PaymentVerficationRequest;
import in.krishnasritarun.BillingStore.io.RazorpayOrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
        return razorpayService.createOrder(request.getAmount(),request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerficationRequest request){
        return orderService.verifyPayment(request);
    }
}
