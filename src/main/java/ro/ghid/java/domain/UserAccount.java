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
 * A UserAccount.
 */
@Entity
@Table(name = "user_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @OneToOne
    @JoinColumn(unique = true)
    private User baseUser;

    @OneToMany(mappedBy = "poster")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Rating> postedRatings = new HashSet<>();

    @OneToMany(mappedBy = "poster")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> postedComments = new HashSet<>();

    @OneToMany(mappedBy = "userAccount")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EditRequest> editRequests = new HashSet<>();

    @OneToMany(mappedBy = "userAccount")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ObjectiveWishList> wishlists = new HashSet<>();

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserGroup> groups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public UserAccount username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public UserAccount firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public UserAccount lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public UserAccount email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User getBaseUser() {
        return baseUser;
    }

    public UserAccount baseUser(User user) {
        this.baseUser = user;
        return this;
    }

    public void setBaseUser(User user) {
        this.baseUser = user;
    }

    public Set<Rating> getPostedRatings() {
        return postedRatings;
    }

    public UserAccount postedRatings(Set<Rating> ratings) {
        this.postedRatings = ratings;
        return this;
    }

    public UserAccount addPostedRating(Rating rating) {
        this.postedRatings.add(rating);
        rating.setPoster(this);
        return this;
    }

    public UserAccount removePostedRating(Rating rating) {
        this.postedRatings.remove(rating);
        rating.setPoster(null);
        return this;
    }

    public void setPostedRatings(Set<Rating> ratings) {
        this.postedRatings = ratings;
    }

    public Set<Comment> getPostedComments() {
        return postedComments;
    }

    public UserAccount postedComments(Set<Comment> comments) {
        this.postedComments = comments;
        return this;
    }

    public UserAccount addPostedComments(Comment comment) {
        this.postedComments.add(comment);
        comment.setPoster(this);
        return this;
    }

    public UserAccount removePostedComments(Comment comment) {
        this.postedComments.remove(comment);
        comment.setPoster(null);
        return this;
    }

    public void setPostedComments(Set<Comment> comments) {
        this.postedComments = comments;
    }

    public Set<EditRequest> getEditRequests() {
        return editRequests;
    }

    public UserAccount editRequests(Set<EditRequest> editRequests) {
        this.editRequests = editRequests;
        return this;
    }

    public UserAccount addEditRequests(EditRequest editRequest) {
        this.editRequests.add(editRequest);
        editRequest.setUserAccount(this);
        return this;
    }

    public UserAccount removeEditRequests(EditRequest editRequest) {
        this.editRequests.remove(editRequest);
        editRequest.setUserAccount(null);
        return this;
    }

    public void setEditRequests(Set<EditRequest> editRequests) {
        this.editRequests = editRequests;
    }

    public Set<ObjectiveWishList> getWishlists() {
        return wishlists;
    }

    public UserAccount wishlists(Set<ObjectiveWishList> objectiveWishLists) {
        this.wishlists = objectiveWishLists;
        return this;
    }

    public UserAccount addWishlists(ObjectiveWishList objectiveWishList) {
        this.wishlists.add(objectiveWishList);
        objectiveWishList.setUserAccount(this);
        return this;
    }

    public UserAccount removeWishlists(ObjectiveWishList objectiveWishList) {
        this.wishlists.remove(objectiveWishList);
        objectiveWishList.setUserAccount(null);
        return this;
    }

    public void setWishlists(Set<ObjectiveWishList> objectiveWishLists) {
        this.wishlists = objectiveWishLists;
    }

    public Set<UserGroup> getGroups() {
        return groups;
    }

    public UserAccount groups(Set<UserGroup> userGroups) {
        this.groups = userGroups;
        return this;
    }

    public UserAccount addGroups(UserGroup userGroup) {
        this.groups.add(userGroup);
        userGroup.getUsers().add(this);
        return this;
    }

    public UserAccount removeGroups(UserGroup userGroup) {
        this.groups.remove(userGroup);
        userGroup.getUsers().remove(this);
        return this;
    }

    public void setGroups(Set<UserGroup> userGroups) {
        this.groups = userGroups;
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
        UserAccount userAccount = (UserAccount) o;
        if (userAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAccount{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
