package in.krishnasritarun.BillingStore.Service;

import in.krishnasritarun.BillingStore.io.UserRequest;
import in.krishnasritarun.BillingStore.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
