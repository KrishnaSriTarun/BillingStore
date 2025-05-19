package in.krishnasritarun.BillingStore.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String userId;
    private  String name;
    private  String email;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String role;
}
