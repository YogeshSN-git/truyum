package com.menuitem.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.menuitem.models.MenuItem;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

	@Query("SELECT m from MenuItem m WHERE m.active=1 AND m.dateOfLaunch < :today ")
	List<MenuItem> getMenuItemListCustomer(@Param("today") Date today);
}
