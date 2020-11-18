package com.cognizant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.repository.RoleRepository;
import com.cognizant.repository.UserRepository;
import com.cognizant.request.LoginRequest;
import com.cognizant.responce.JwtResponse;
import com.cognizant.security.JwtUtils;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public JwtResponse authenticateUser(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUserId(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		return jwtUtils.generateJwtToken(authentication);

	}

	@PostMapping("/validate")
	public boolean validateJwtToken(@RequestBody String token) {
		return jwtUtils.validateJwtToken(token);
	}

	@PostMapping("/username")
	public String getUserNameFromJwtToken(@RequestBody String token) {
		return jwtUtils.getUserNameFromJwtToken(token);
	}

}
