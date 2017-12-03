package ro.ghid.java.web.rest;

import com.codahale.metrics.annotation.Timed;
import ro.ghid.java.domain.EditRequest;

import ro.ghid.java.repository.EditRequestRepository;
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
 * REST controller for managing EditRequest.
 */
@RestController
@RequestMapping("/api")
public class EditRequestResource {

    private final Logger log = LoggerFactory.getLogger(EditRequestResource.class);

    private static final String ENTITY_NAME = "editRequest";

    private final EditRequestRepository editRequestRepository;

    public EditRequestResource(EditRequestRepository editRequestRepository) {
        this.editRequestRepository = editRequestRepository;
    }

    /**
     * POST  /edit-requests : Create a new editRequest.
     *
     * @param editRequest the editRequest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new editRequest, or with status 400 (Bad Request) if the editRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/edit-requests")
    @Timed
    public ResponseEntity<EditRequest> createEditRequest(@RequestBody EditRequest editRequest) throws URISyntaxException {
        log.debug("REST request to save EditRequest : {}", editRequest);
        if (editRequest.getId() != null) {
            throw new BadRequestAlertException("A new editRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EditRequest result = editRequestRepository.save(editRequest);
        return ResponseEntity.created(new URI("/api/edit-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /edit-requests : Updates an existing editRequest.
     *
     * @param editRequest the editRequest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated editRequest,
     * or with status 400 (Bad Request) if the editRequest is not valid,
     * or with status 500 (Internal Server Error) if the editRequest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/edit-requests")
    @Timed
    public ResponseEntity<EditRequest> updateEditRequest(@RequestBody EditRequest editRequest) throws URISyntaxException {
        log.debug("REST request to update EditRequest : {}", editRequest);
        if (editRequest.getId() == null) {
            return createEditRequest(editRequest);
        }
        EditRequest result = editRequestRepository.save(editRequest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, editRequest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /edit-requests : get all the editRequests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of editRequests in body
     */
    @GetMapping("/edit-requests")
    @Timed
    public List<EditRequest> getAllEditRequests() {
        log.debug("REST request to get all EditRequests");
        return editRequestRepository.findAll();
        }

    /**
     * GET  /edit-requests/:id : get the "id" editRequest.
     *
     * @param id the id of the editRequest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the editRequest, or with status 404 (Not Found)
     */
    @GetMapping("/edit-requests/{id}")
    @Timed
    public ResponseEntity<EditRequest> getEditRequest(@PathVariable Long id) {
        log.debug("REST request to get EditRequest : {}", id);
        EditRequest editRequest = editRequestRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(editRequest));
    }

    /**
     * DELETE  /edit-requests/:id : delete the "id" editRequest.
     *
     * @param id the id of the editRequest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/edit-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteEditRequest(@PathVariable Long id) {
        log.debug("REST request to delete EditRequest : {}", id);
        editRequestRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
