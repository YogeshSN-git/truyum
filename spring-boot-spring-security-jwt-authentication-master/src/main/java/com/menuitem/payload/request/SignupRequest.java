package com.menuitem.payload.request;

import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class SignupRequest {

	@NotBlank(message = "Enter name")
	private String name;

	@NotBlank(message = "Enter user id")
	private String userId;

	@NotNull(message = "Select role")
	private Set<String> role;

	@NotBlank(message = "Enter password")
	private String password;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRole() {
		return this.role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}
}
