package ro.ghid.java.repository;

import ro.ghid.java.domain.UserGroup;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the UserGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    @Query("select distinct user_group from UserGroup user_group left join fetch user_group.users")
    List<UserGroup> findAllWithEagerRelationships();

    @Query("select user_group from UserGroup user_group left join fetch user_group.users where user_group.id =:id")
    UserGroup findOneWithEagerRelationships(@Param("id") Long id);

}
