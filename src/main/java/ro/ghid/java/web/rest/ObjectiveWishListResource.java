package ro.ghid.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import ro.ghid.java.domain.ObjectiveWishList;

import ro.ghid.java.repository.ObjectiveWishListRepository;
import ro.ghid.java.web.rest.errors.BadRequestAlertException;
import ro.ghid.java.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ObjectiveWishList.
 */
@RestController
@RequestMapping("/api")
public class ObjectiveWishListResource {

    private final Logger log = LoggerFactory.getLogger(ObjectiveWishListResource.class);

    private static final String ENTITY_NAME = "objectiveWishList";

    private final ObjectiveWishListRepository objectiveWishListRepository;

    public ObjectiveWishListResource(ObjectiveWishListRepository objectiveWishListRepository) {
        this.objectiveWishListRepository = objectiveWishListRepository;
    }

    /**
     * POST  /objective-wish-lists : Create a new objectiveWishList.
     *
     * @param objectiveWishList the objectiveWishList to create
     * @return the ResponseEntity with status 201 (Created) and with body the new objectiveWishList, or with status 400 (Bad Request) if the objectiveWishList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/objective-wish-lists")
    @Timed
    public ResponseEntity<ObjectiveWishList> createObjectiveWishList(@RequestBody ObjectiveWishList objectiveWishList) throws URISyntaxException {
        log.debug("REST request to save ObjectiveWishList : {}", objectiveWishList);
        if (objectiveWishList.getId() != null) {
            throw new BadRequestAlertException("A new objectiveWishList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ObjectiveWishList result = objectiveWishListRepository.save(objectiveWishList);
        return ResponseEntity.created(new URI("/api/objective-wish-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /objective-wish-lists : Updates an existing objectiveWishList.
     *
     * @param objectiveWishList the objectiveWishList to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated objectiveWishList,
     * or with status 400 (Bad Request) if the objectiveWishList is not valid,
     * or with status 500 (Internal Server Error) if the objectiveWishList couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/objective-wish-lists")
    @Timed
    public ResponseEntity<ObjectiveWishList> updateObjectiveWishList(@RequestBody ObjectiveWishList objectiveWishList) throws URISyntaxException {
        log.debug("REST request to update ObjectiveWishList : {}", objectiveWishList);
        if (objectiveWishList.getId() == null) {
            return createObjectiveWishList(objectiveWishList);
        }
        ObjectiveWishList result = objectiveWishListRepository.save(objectiveWishList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, objectiveWishList.getId().toString()))
            .body(result);
    }

    /**
     * GET  /objective-wish-lists : get all the objectiveWishLists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of objectiveWishLists in body
     */
    @GetMapping("/objective-wish-lists")
    @Timed
    public List<ObjectiveWishList> getAllObjectiveWishLists() {
        log.debug("REST request to get all ObjectiveWishLists");
        return objectiveWishListRepository.findAll();
        }

    /**
     * GET  /objective-wish-lists/:id : get the "id" objectiveWishList.
     *
     * @param id the id of the objectiveWishList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the objectiveWishList, or with status 404 (Not Found)
     */
    @GetMapping("/objective-wish-lists/{id}")
    @Timed
    public ResponseEntity<ObjectiveWishList> getObjectiveWishList(@PathVariable Long id) {
        log.debug("REST request to get ObjectiveWishList : {}", id);
        ObjectiveWishList objectiveWishList = objectiveWishListRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(objectiveWishList));
    }

    /**
     * DELETE  /objective-wish-lists/:id : delete the "id" objectiveWishList.
     *
     * @param id the id of the objectiveWishList to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/objective-wish-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteObjectiveWishList(@PathVariable Long id) {
        log.debug("REST request to delete ObjectiveWishList : {}", id);
        objectiveWishListRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
