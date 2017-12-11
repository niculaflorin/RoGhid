package ro.ghid.java.repository;

import ro.ghid.java.domain.EditRequest;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EditRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EditRequestRepository extends JpaRepository<EditRequest, Long> {

}
