package in.krishnasritarun.BillingStore.Service;

import com.razorpay.RazorpayException;
import in.krishnasritarun.BillingStore.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
