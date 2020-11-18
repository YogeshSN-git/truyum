package com.menuitem.controllers;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.menuitem.models.MenuItem;
import com.menuitem.payload.response.MessageResponse;
import com.menuitem.service.MenuItemService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private MenuItemService menuItemService;

	@GetMapping("/menuitems")
	public List<MenuItem> getMenuItemAdmin() {
		return menuItemService.getMenuItemAdmin();
	}

	@GetMapping("/menuitem/{menuItemId}")
	public MenuItem getMenuItem(@PathVariable Integer menuItemId) {
		System.out.println(menuItemId);
		return menuItemService.getMenuItem(menuItemId);
	}

	@PostMapping("/addmenuitem")
	public ResponseEntity<?> addMenuItem(@Valid @RequestBody MenuItem menuItem) {
		menuItemService.setMenuItem(menuItem);
		return ResponseEntity.ok(new MessageResponse("MenuItem Added"));
	}

	@PostMapping("/editmenuitem")
	public ResponseEntity<?> editMenuItem(@Valid @RequestBody MenuItem menuItem) {
		menuItemService.setMenuItem(menuItem);
		return ResponseEntity.ok(new MessageResponse("MenuItem Edited"));

	}

	@DeleteMapping("/deletemenuitem/{menuItemId}")
	public ResponseEntity<?> deleteMenuItem(@PathVariable(value = "menuItemId") Integer menuItemId,
			HttpServletRequest request) {

		menuItemService.deleteMenuItem(menuItemId);
		return ResponseEntity.ok(new MessageResponse("MenuItem Deleted"));
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
