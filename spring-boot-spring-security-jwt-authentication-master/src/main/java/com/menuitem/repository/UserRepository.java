package com.menuitem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.menuitem.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUserId(String userId);

	Boolean existsByName(String name);

	Boolean existsByUserId(String userId);
	
	public User findByUserIdAndPassword(String userId, String password);

}
