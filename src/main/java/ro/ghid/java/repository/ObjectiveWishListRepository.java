package ro.ghid.java.repository;

import ro.ghid.java.domain.ObjectiveWishList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ObjectiveWishList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObjectiveWishListRepository extends JpaRepository<ObjectiveWishList, Long> {

}
