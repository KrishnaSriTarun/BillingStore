package in.krishnasritarun.BillingStore.Service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploaddService {

    String uploadFile(MultipartFile file);

    boolean deleteFile(String imgUrl);
}
