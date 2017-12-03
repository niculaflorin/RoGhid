package ro.ghid.java.repository;

import ro.ghid.java.domain.UserAccount;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

}
