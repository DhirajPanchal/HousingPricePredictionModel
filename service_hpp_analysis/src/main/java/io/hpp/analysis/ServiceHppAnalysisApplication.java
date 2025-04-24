package io.hpp.analysis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ServiceHppAnalysisApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceHppAnalysisApplication.class, args);
	}

}
