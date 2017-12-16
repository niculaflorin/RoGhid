package ro.ghid.java.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Objective.
 */
@Entity
@Table(name = "objective")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Objective implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(min = 10)
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "image_path")
    private String imagePath;

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private Instant creationDate;

    @DecimalMin(value = "1")
    @DecimalMax(value = "10")
    @Column(name = "rating")
    private Float rating;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Lob
    @Column(name = "cover_image")
    private byte[] coverImage;

    @Column(name = "cover_image_content_type")
    private String coverImageContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private UserAccount creator;

    @OneToMany(mappedBy = "objective")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Rating> ratings = new HashSet<>();

    @OneToMany(mappedBy = "objective")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "objective")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EditRequest> editRequests = new HashSet<>();

    @ManyToOne
    private City city;

    @ManyToOne
    private ObjectiveWishList objectiveWishList;

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

    public Objective name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Objective description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public Objective imagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Objective creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Float getRating() {
        return rating;
    }

    public Objective rating(Float rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Objective latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Objective longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public byte[] getCoverImage() {
        return coverImage;
    }

    public Objective coverImage(byte[] coverImage) {
        this.coverImage = coverImage;
        return this;
    }

    public void setCoverImage(byte[] coverImage) {
        this.coverImage = coverImage;
    }

    public String getCoverImageContentType() {
        return coverImageContentType;
    }

    public Objective coverImageContentType(String coverImageContentType) {
        this.coverImageContentType = coverImageContentType;
        return this;
    }

    public void setCoverImageContentType(String coverImageContentType) {
        this.coverImageContentType = coverImageContentType;
    }

    public UserAccount getCreator() {
        return creator;
    }

    public Objective creator(UserAccount userAccount) {
        this.creator = userAccount;
        return this;
    }

    public void setCreator(UserAccount userAccount) {
        this.creator = userAccount;
    }

    public Set<Rating> getRatings() {
        return ratings;
    }

    public Objective ratings(Set<Rating> ratings) {
        this.ratings = ratings;
        return this;
    }

    public Objective addRatings(Rating rating) {
        this.ratings.add(rating);
        rating.setObjective(this);
        return this;
    }

    public Objective removeRatings(Rating rating) {
        this.ratings.remove(rating);
        rating.setObjective(null);
        return this;
    }

    public void setRatings(Set<Rating> ratings) {
        this.ratings = ratings;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Objective comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Objective addComments(Comment comment) {
        this.comments.add(comment);
        comment.setObjective(this);
        return this;
    }

    public Objective removeComments(Comment comment) {
        this.comments.remove(comment);
        comment.setObjective(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<EditRequest> getEditRequests() {
        return editRequests;
    }

    public Objective editRequests(Set<EditRequest> editRequests) {
        this.editRequests = editRequests;
        return this;
    }

    public Objective addEditRequests(EditRequest editRequest) {
        this.editRequests.add(editRequest);
        editRequest.setObjective(this);
        return this;
    }

    public Objective removeEditRequests(EditRequest editRequest) {
        this.editRequests.remove(editRequest);
        editRequest.setObjective(null);
        return this;
    }

    public void setEditRequests(Set<EditRequest> editRequests) {
        this.editRequests = editRequests;
    }

    public City getCity() {
        return city;
    }

    public Objective city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public ObjectiveWishList getObjectiveWishList() {
        return objectiveWishList;
    }

    public Objective objectiveWishList(ObjectiveWishList objectiveWishList) {
        this.objectiveWishList = objectiveWishList;
        return this;
    }

    public void setObjectiveWishList(ObjectiveWishList objectiveWishList) {
        this.objectiveWishList = objectiveWishList;
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
        Objective objective = (Objective) o;
        if (objective.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), objective.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Objective{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", imagePath='" + getImagePath() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", rating='" + getRating() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", longitude='" + getLongitude() + "'" +
            ", coverImage='" + getCoverImage() + "'" +
            ", coverImageContentType='" + coverImageContentType + "'" +
            "}";
    }
}
