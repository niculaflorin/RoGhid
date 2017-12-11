package ro.ghid.java.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserGroup.
 */
@Entity
@Table(name = "user_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_group_users",
               joinColumns = @JoinColumn(name="user_groups_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="users_id", referencedColumnName="id"))
    private Set<UserAccount> users = new HashSet<>();

    @OneToOne(mappedBy = "assignedGroup")
    @JsonIgnore
    private ObjectiveWishList assignedWishlist;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public UserGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserAccount> getUsers() {
        return users;
    }

    public UserGroup users(Set<UserAccount> userAccounts) {
        this.users = userAccounts;
        return this;
    }

    public UserGroup addUsers(UserAccount userAccount) {
        this.users.add(userAccount);
        userAccount.getGroups().add(this);
        return this;
    }

    public UserGroup removeUsers(UserAccount userAccount) {
        this.users.remove(userAccount);
        userAccount.getGroups().remove(this);
        return this;
    }

    public void setUsers(Set<UserAccount> userAccounts) {
        this.users = userAccounts;
    }

    public ObjectiveWishList getAssignedWishlist() {
        return assignedWishlist;
    }

    public UserGroup assignedWishlist(ObjectiveWishList objectiveWishList) {
        this.assignedWishlist = objectiveWishList;
        return this;
    }

    public void setAssignedWishlist(ObjectiveWishList objectiveWishList) {
        this.assignedWishlist = objectiveWishList;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserGroup userGroup = (UserGroup) o;
        if (userGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
