package com.menuitem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.menuitem.models.ERole;
import com.menuitem.models.Role;
import com.menuitem.repository.RoleRepository;

@Service
public class RoleService {
	
	@Autowired
	RoleRepository roleRepository;

	public Optional<Role> findByName(ERole roleUser) {
		return roleRepository.findByName(roleUser);
	}

}
