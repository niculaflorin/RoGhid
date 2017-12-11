package ro.ghid.java.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A EditRequest.
 */
@Entity
@Table(name = "edit_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EditRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "request_date")
    private Instant requestDate;

    @Column(name = "is_approved")
    private Boolean isApproved;

    @ManyToOne
    private UserAccount userAccount;

    @ManyToOne
    private Objective objective;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getRequestDate() {
        return requestDate;
    }

    public EditRequest requestDate(Instant requestDate) {
        this.requestDate = requestDate;
        return this;
    }

    public void setRequestDate(Instant requestDate) {
        this.requestDate = requestDate;
    }

    public Boolean isIsApproved() {
        return isApproved;
    }

    public EditRequest isApproved(Boolean isApproved) {
        this.isApproved = isApproved;
        return this;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public EditRequest userAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
        return this;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Objective getObjective() {
        return objective;
    }

    public EditRequest objective(Objective objective) {
        this.objective = objective;
        return this;
    }

    public void setObjective(Objective objective) {
        this.objective = objective;
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
        EditRequest editRequest = (EditRequest) o;
        if (editRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), editRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EditRequest{" +
            "id=" + getId() +
            ", requestDate='" + getRequestDate() + "'" +
            ", isApproved='" + isIsApproved() + "'" +
            "}";
    }
}
