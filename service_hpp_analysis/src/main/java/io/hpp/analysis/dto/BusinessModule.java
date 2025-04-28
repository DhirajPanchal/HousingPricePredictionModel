package io.hpp.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BusinessModule {

    private Integer moduleId;

    private String moduleName;

    private String route;

    private String location;

}
