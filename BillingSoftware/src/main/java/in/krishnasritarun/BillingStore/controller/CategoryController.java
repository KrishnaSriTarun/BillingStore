package in.krishnasritarun.BillingStore.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.krishnasritarun.BillingStore.Service.CategoryService;
import in.krishnasritarun.BillingStore.io.CategoryRequest;
import in.krishnasritarun.BillingStore.io.CategoryResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private  final CategoryService categoryService;

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file") MultipartFile file){
        ObjectMapper objectMapper=new ObjectMapper();
        CategoryRequest request=null;
        try {
            request = objectMapper.readValue(categoryString, CategoryRequest.class);
            return categoryService.add(request,file);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occured while passing the json"+ e.getMessage());
        }

    }

    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories(){

        return categoryService.read();
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String categoryId){
        try{
            categoryService.delete(categoryId);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

}
