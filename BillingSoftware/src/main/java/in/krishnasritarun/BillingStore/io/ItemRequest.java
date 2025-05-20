package in.krishnasritarun.BillingStore.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemRequest {

    private String name;
    private BigDecimal price;
    private String categoryId;
    private String description;
}
