package com.menuitem.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.menuitem.models.MenuItem;
import com.menuitem.repository.MenuItemRepository;

@Service
public class MenuItemService  {
	
	@Autowired
	MenuItemRepository menuRepo;
	
	public MenuItem setMenuItem(MenuItem menu){
		return menuRepo.save(menu);
	}
	
	public List<MenuItem> getMenuItemAdmin(){
		return menuRepo.findAll();
	}
	
	public List<MenuItem> getMenuItemListCustomer(){
		Date today = new Date();
		return menuRepo.getMenuItemListCustomer(today);
	}
	
	public MenuItem getMenuItem(long id) {
		return menuRepo.findById(id).get();
	}
	
	public void editMenuItem(MenuItem menu) {
		menuRepo.save(menu);
	}

	public void deleteMenuItem(long menuItemId) {
		menuRepo.deleteById(menuItemId);
	}
	
}
