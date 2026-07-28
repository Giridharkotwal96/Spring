package com.giri.backend.services;

import com.giri.backend.model.Product;
import com.giri.backend.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepo repository;
    public List<Product> getAllProducts(){
        return repository.findAll();
    }

    public Product getProductById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return repository.save(product);
    }


    public Product updateProduct(int id,
                                 Product product,
                                 MultipartFile imageFile)
            throws IOException {

        Product existingProduct =
                repository.findById(id).orElse(null);

        if(existingProduct == null){
            return null;
        }

        product.setId(id);

        if(imageFile != null && !imageFile.isEmpty()){

            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());

        }else{

            product.setImageName(existingProduct.getImageName());
            product.setImageType(existingProduct.getImageType());
            product.setImageData(existingProduct.getImageData());

        }

        return repository.save(product);
    }

    public void deleteProduct(int id){
        repository.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        return repository.searchProducts(keyword);
    }
}
