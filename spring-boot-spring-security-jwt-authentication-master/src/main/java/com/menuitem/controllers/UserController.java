package com.menuitem.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.menuitem.models.Cart;
import com.menuitem.models.MenuItem;
import com.menuitem.payload.response.MessageResponse;
import com.menuitem.service.MenuItemService;
import com.menuitem.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private MenuItemService menuItemService;

	@Autowired
	private UserService userService;

	@GetMapping("/menuitems")
	public List<MenuItem> getMenuItemListCustomer() {
		return menuItemService.getMenuItemListCustomer();
	}

	@PostMapping("/addtocart")
	public ResponseEntity<?> addToCart(@RequestBody Cart cart) {
		userService.addToCart(cart.getUserId(), cart.getMenuItemId());
		return ResponseEntity.ok(new MessageResponse("Added to cart"));
	}

	@PostMapping("/removefromcart")
	public ResponseEntity<?> removeFromCart(@RequestBody Cart cart) {
		userService.removeFromCart(cart.getUserId(), cart.getMenuItemId());
		return ResponseEntity.ok(new MessageResponse("Removed from cart"));
	}

	@GetMapping("/cart/{userId}")
	public Set<MenuItem> getCart(@PathVariable(value="userId")Integer userId) {
		return userService.getCart(userId);
	}

}
