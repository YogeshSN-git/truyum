package com.menuitem.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.menuitem.models.MenuItem;
import com.menuitem.models.User;
import com.menuitem.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MenuItemService menuItemService;

	public Set<MenuItem> addToCart(Integer userId, Integer MenuItemId) {
		User user = userRepository.findById(userId).get();
		user.getCartList().add(menuItemService.getMenuItem(MenuItemId));
		userRepository.save(user);
		return user.getCartList();
	}

	public Set<MenuItem> removeFromCart(int userId, int MenuItemId) {
		User user = userRepository.findById(userId).get();
		user.getCartList().remove(menuItemService.getMenuItem(MenuItemId));
		userRepository.save(user);
		return user.getCartList();
	}

	public User findById(int id) {
		return userRepository.findById(id).get();
	}

	public User addUser(User user) {
		return userRepository.save(user);
	}

	public User authenticate(User user) {
		return userRepository.findByUserIdAndPassword(user.getUserId(), user.getPassword());
	}

	public Set<MenuItem> getCart(int userId) {
		return userRepository.findById(userId).get().getCartList();
	}

	public boolean existsByUserId(String userId) {
		return userRepository.existsByUserId(userId);
	}

}
