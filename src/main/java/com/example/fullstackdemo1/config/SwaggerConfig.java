package com.example.fullstackdemo1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("Full-Stack Demo API")
                .description("API reference for developers")
                .termsOfServiceUrl("https://github.com/AmazingEnergy/full-stack-demo-01")
                .contact(new Contact("thomas", "https://github.com/luuductrung1234", "luuductrung1234@gmail.com"))
                .license("MIT License")
                .licenseUrl("https://github.com/AmazingEnergy/full-stack-demo-01/blob/main/LICENSE")
                .version("1.0.0").build();
    }
}