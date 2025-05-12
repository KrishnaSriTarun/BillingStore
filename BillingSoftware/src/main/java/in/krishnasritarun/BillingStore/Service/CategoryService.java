package in.krishnasritarun.BillingStore.Service;

import in.krishnasritarun.BillingStore.io.CategoryRequest;
import in.krishnasritarun.BillingStore.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
