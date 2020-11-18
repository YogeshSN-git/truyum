package com.menuitem.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.menuitem.feign.AuthenticationServiceFeign;
import com.menuitem.models.ERole;
import com.menuitem.models.Role;
import com.menuitem.models.User;
import com.menuitem.payload.request.LoginRequest;
import com.menuitem.payload.request.SignupRequest;
import com.menuitem.payload.response.JwtResponse;
import com.menuitem.payload.response.MessageResponse;
import com.menuitem.service.MenuItemService;
import com.menuitem.service.RoleService;
import com.menuitem.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserService userService;

	@Autowired
	RoleService roleService;

	@Autowired
	MenuItemService menuItemService;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	AuthenticationServiceFeign authenticationServiceFeign;

	@PostMapping("/signin")
	public JwtResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		JwtResponse authenticateUser = null;
		try {
			authenticateUser = authenticationServiceFeign.authenticateUser(loginRequest);
		} catch (Exception e) {
			authenticateUser=new JwtResponse("Invalid Username Password");
//			new RuntimeException("Invalid Username Password");
		}
		return authenticateUser;
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		
		if (userService.existsByUserId(signUpRequest.getUserId())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		User user = new User(signUpRequest.getName(), signUpRequest.getUserId(),
				encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();
		
		

		try {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleService.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "user":
					Role userRole = roleService.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(new MessageResponse("Select role"));
		}

		user.setRoles(roles);
		userService.addUser(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public HashMap<String,String> handleValidationExceptions(MethodArgumentNotValidException ex) {
		
		HashMap<String,String> map=new HashMap<String,String>();
		
		for(ObjectError error:ex.getBindingResult().getAllErrors()) {
			map.put(error.getCodes()[1].split("\\.")[1], error.getDefaultMessage());
		}
		
		return map;
	}

}
