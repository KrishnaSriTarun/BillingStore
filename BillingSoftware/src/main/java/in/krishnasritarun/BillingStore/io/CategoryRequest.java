package in.krishnasritarun.BillingStore.io;

import lombok.*;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequest {
    private String name;
    private String description;
    private String bgColor;

}
