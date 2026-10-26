package com.store.orders.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CustomerData {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "First last name is required")
    private String firstLastName;

    private String secondLastName;

    @Email(message = "Invalid email address format")
    @NotBlank(message = "Email address is required")
    private String email;
}