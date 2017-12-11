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
 * A ObjectiveWishList.
 */
@Entity
@Table(name = "objective_wish_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ObjectiveWishList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private UserAccount userAccount;

    @OneToOne
    @JoinColumn(unique = true)
    private UserGroup assignedGroup;

    @OneToMany(mappedBy = "objectiveWishList")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Objective> objectives = new HashSet<>();

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

    public ObjectiveWishList name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public ObjectiveWishList userAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
        return this;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public UserGroup getAssignedGroup() {
        return assignedGroup;
    }

    public ObjectiveWishList assignedGroup(UserGroup userGroup) {
        this.assignedGroup = userGroup;
        return this;
    }

    public void setAssignedGroup(UserGroup userGroup) {
        this.assignedGroup = userGroup;
    }

    public Set<Objective> getObjectives() {
        return objectives;
    }

    public ObjectiveWishList objectives(Set<Objective> objectives) {
        this.objectives = objectives;
        return this;
    }

    public ObjectiveWishList addObjectives(Objective objective) {
        this.objectives.add(objective);
        objective.setObjectiveWishList(this);
        return this;
    }

    public ObjectiveWishList removeObjectives(Objective objective) {
        this.objectives.remove(objective);
        objective.setObjectiveWishList(null);
        return this;
    }

    public void setObjectives(Set<Objective> objectives) {
        this.objectives = objectives;
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
        ObjectiveWishList objectiveWishList = (ObjectiveWishList) o;
        if (objectiveWishList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), objectiveWishList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ObjectiveWishList{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
