package com.menuitem.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.menuitem.payload.request.LoginRequest;
import com.menuitem.payload.response.JwtResponse;
@FeignClient("zuul-gateway")
public interface AuthenticationServiceFeign {
	
	@PostMapping("authentication-service/api/auth/signin")
	public JwtResponse authenticateUser(@RequestBody LoginRequest loginRequest) ;
	
	@PostMapping("authentication-service/api/auth/validate")
	public boolean validateJwtToken(@RequestBody String token);

	@PostMapping("authentication-service/api/auth/username")
	public String getUserNameFromJwtToken(@RequestBody String token);
	
	
	
}
