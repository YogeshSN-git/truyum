package com.cognizant.responce;

import java.util.Date;
import java.util.List;

public class JwtResponse {
	private int id;
	private String token;
	private Date expiryDate;
	private List<String> roles;

	public JwtResponse() {
		super();
	}

	public JwtResponse(int id,String token, Date expiryDate,List<String> roles) {
		super();
		this.id=id;
		this.token = token;
		this.expiryDate = expiryDate;
		this.roles=roles;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
}
