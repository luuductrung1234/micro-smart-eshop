package com.example.eshop.product;

import com.example.eshop.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("api/v1/products")
@AllArgsConstructor
public class ProductsController {
    private final UserService userService;
    private final ProductService productService;

    @GetMapping
    public List<Product> getAll() {
        return productService.getAll();
    }

    @GetMapping(":suggestion")
    public ResponseEntity<List<Product>> suggestion(@Param("userId") Long userId) {
        var user = userService.getById(userId);
        if (user.isEmpty()) return ResponseEntity.notFound().build();

        var environment = user.get().getEnvironment();
        if (environment.isEmpty())
            return ResponseEntity.ok().body(new ArrayList<>());
        var sensors = environment.split(";");

        var result = new ArrayList<Product>();

        for (var sensor : sensors) {
            var sensorInfo = sensor.split(":");
            if (sensorInfo.length < 2) continue;

            var category = sensorInfo[0];
            if (Objects.equals(category, "light")) {
                var sensorValue = Integer.parseInt(sensorInfo[1]);
                if (sensorValue < 50)
                    result.addAll(productService.getByCategory("light"));
            } else if (Objects.equals(category, "temperature")) {
                var sensorValue = Float.parseFloat(sensorInfo[1]);
                if (sensorValue > 35)
                    result.addAll(productService.getByCategory("temperature"));
            } else if (Objects.equals(category, "sound")) {
                var sensorValue = Integer.parseInt(sensorInfo[1]);
                if (sensorValue > 1000)
                    result.addAll(productService.getByCategory("sound"));
            }
        }

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("{productId}")
    public ResponseEntity<Product> getById(@PathVariable("productId") String productId) {
        return productService.getById(Long.parseLong(productId))
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
