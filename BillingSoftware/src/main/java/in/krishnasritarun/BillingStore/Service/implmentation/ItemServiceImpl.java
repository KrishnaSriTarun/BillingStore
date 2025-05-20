package in.krishnasritarun.BillingStore.Service.implmentation;

import in.krishnasritarun.BillingStore.Service.FileUploaddService;
import in.krishnasritarun.BillingStore.Service.ItemService;
import in.krishnasritarun.BillingStore.entity.CategoryEntity;
import in.krishnasritarun.BillingStore.entity.ItemEntity;
import in.krishnasritarun.BillingStore.io.ItemRequest;
import in.krishnasritarun.BillingStore.io.ItemResponse;
import in.krishnasritarun.BillingStore.repository.CategoryRepository;
import in.krishnasritarun.BillingStore.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final FileUploaddService fileUploaddService;
    private final CategoryRepository categoryRepository;
    private  final ItemRepository itemRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl=fileUploaddService.uploadFile(file);
        ItemEntity newItem=convertToEntity(request);
        CategoryEntity existingCategory=categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(()->
                        new RuntimeException("Category not found"+request.getCategoryId()));
        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);
        newItem=itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity -> convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingItem=itemRepository.findByItemId(itemId)
                .orElseThrow(() ->
                        new RuntimeException("Item not found with id" + itemId));
        boolean isFileDelete=fileUploaddService.deleteFile(existingItem.getImgUrl());
        if(isFileDelete){
            itemRepository.delete(existingItem);
        }
        else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Unable to delete image");
        }
    }
}
