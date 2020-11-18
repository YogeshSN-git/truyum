package com.cognizant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserId(String userId);

	Boolean existsByName(String name);

	Boolean existsByUserId(String userId);
	
	public User findByUserIdAndPassword(String userId, String password);

}
