package com.menuitem.payload.request;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
	@NotBlank(message = "Enter user id")
	private String userId;

	@NotBlank(message = "Enter password")
	private String password;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
