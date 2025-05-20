package in.krishnasritarun.BillingStore.Service;

import in.krishnasritarun.BillingStore.io.ItemRequest;
import in.krishnasritarun.BillingStore.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
