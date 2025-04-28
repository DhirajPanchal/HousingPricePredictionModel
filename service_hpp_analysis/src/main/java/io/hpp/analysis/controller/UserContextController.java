package io.hpp.analysis.controller;

import io.hpp.analysis.dto.BusinessModule;
import io.hpp.analysis.dto.LoginDTO;
import io.hpp.analysis.dto.UserContext;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping("api")
public class UserContextController {

    @Operation(summary = "User Context")
    @PostMapping("context")
    public ResponseEntity<UserContext> getUserContext(@RequestBody LoginDTO loginDTO) {
        UserContext context = new UserContext();
        context.setUserName("");
        context.setModules(new ArrayList<>());
        if (loginDTO != null && loginDTO.getUserName() != null) {

            if (loginDTO.getUserName().toLowerCase().contains("tom")) {
                context.setUserName("Tom");
                context.setModules(Arrays.asList(
                        new BusinessModule(1, "Property Value Estimator", "estimation", "http://localhost:8007"),
                        new BusinessModule(2, "Property Market Analysis", "market-analysis", "http://localhost:8008")
                ));
            } else if (loginDTO.getUserName().toLowerCase().contains("jerry")) {
                context.setUserName("Jerry");
                context.setModules(Arrays.asList(
                        new BusinessModule(1, "Property Value Estimator", "estimation", "http://localhost:8007"),
                        new BusinessModule(2, "Property Market Analysis", "market-analysis", "http://localhost:8008"),
                        new BusinessModule(3, "Home Loan EMI Calculator", "emi-calculator", "http://localhost:8009")
                ));
            }


        }

        return ResponseEntity.status(HttpStatus.OK).body(context);
    }
}