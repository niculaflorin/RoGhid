package ro.ghid.java.web.rest;

import ro.ghid.java.RoGhidApp;

import ro.ghid.java.domain.EditRequest;
import ro.ghid.java.repository.EditRequestRepository;
import ro.ghid.java.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static ro.ghid.java.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EditRequestResource REST controller.
 *
 * @see EditRequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RoGhidApp.class)
public class EditRequestResourceIntTest {

    private static final Instant DEFAULT_REQUEST_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REQUEST_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_IS_APPROVED = false;
    private static final Boolean UPDATED_IS_APPROVED = true;

    @Autowired
    private EditRequestRepository editRequestRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEditRequestMockMvc;

    private EditRequest editRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EditRequestResource editRequestResource = new EditRequestResource(editRequestRepository);
        this.restEditRequestMockMvc = MockMvcBuilders.standaloneSetup(editRequestResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EditRequest createEntity(EntityManager em) {
        EditRequest editRequest = new EditRequest()
            .requestDate(DEFAULT_REQUEST_DATE)
            .isApproved(DEFAULT_IS_APPROVED);
        return editRequest;
    }

    @Before
    public void initTest() {
        editRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createEditRequest() throws Exception {
        int databaseSizeBeforeCreate = editRequestRepository.findAll().size();

        // Create the EditRequest
        restEditRequestMockMvc.perform(post("/api/edit-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editRequest)))
            .andExpect(status().isCreated());

        // Validate the EditRequest in the database
        List<EditRequest> editRequestList = editRequestRepository.findAll();
        assertThat(editRequestList).hasSize(databaseSizeBeforeCreate + 1);
        EditRequest testEditRequest = editRequestList.get(editRequestList.size() - 1);
        assertThat(testEditRequest.getRequestDate()).isEqualTo(DEFAULT_REQUEST_DATE);
        assertThat(testEditRequest.isIsApproved()).isEqualTo(DEFAULT_IS_APPROVED);
    }

    @Test
    @Transactional
    public void createEditRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = editRequestRepository.findAll().size();

        // Create the EditRequest with an existing ID
        editRequest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEditRequestMockMvc.perform(post("/api/edit-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editRequest)))
            .andExpect(status().isBadRequest());

        // Validate the EditRequest in the database
        List<EditRequest> editRequestList = editRequestRepository.findAll();
        assertThat(editRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEditRequests() throws Exception {
        // Initialize the database
        editRequestRepository.saveAndFlush(editRequest);

        // Get all the editRequestList
        restEditRequestMockMvc.perform(get("/api/edit-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(editRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].requestDate").value(hasItem(DEFAULT_REQUEST_DATE.toString())))
            .andExpect(jsonPath("$.[*].isApproved").value(hasItem(DEFAULT_IS_APPROVED.booleanValue())));
    }

    @Test
    @Transactional
    public void getEditRequest() throws Exception {
        // Initialize the database
        editRequestRepository.saveAndFlush(editRequest);

        // Get the editRequest
        restEditRequestMockMvc.perform(get("/api/edit-requests/{id}", editRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(editRequest.getId().intValue()))
            .andExpect(jsonPath("$.requestDate").value(DEFAULT_REQUEST_DATE.toString()))
            .andExpect(jsonPath("$.isApproved").value(DEFAULT_IS_APPROVED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEditRequest() throws Exception {
        // Get the editRequest
        restEditRequestMockMvc.perform(get("/api/edit-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEditRequest() throws Exception {
        // Initialize the database
        editRequestRepository.saveAndFlush(editRequest);
        int databaseSizeBeforeUpdate = editRequestRepository.findAll().size();

        // Update the editRequest
        EditRequest updatedEditRequest = editRequestRepository.findOne(editRequest.getId());
        updatedEditRequest
            .requestDate(UPDATED_REQUEST_DATE)
            .isApproved(UPDATED_IS_APPROVED);

        restEditRequestMockMvc.perform(put("/api/edit-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEditRequest)))
            .andExpect(status().isOk());

        // Validate the EditRequest in the database
        List<EditRequest> editRequestList = editRequestRepository.findAll();
        assertThat(editRequestList).hasSize(databaseSizeBeforeUpdate);
        EditRequest testEditRequest = editRequestList.get(editRequestList.size() - 1);
        assertThat(testEditRequest.getRequestDate()).isEqualTo(UPDATED_REQUEST_DATE);
        assertThat(testEditRequest.isIsApproved()).isEqualTo(UPDATED_IS_APPROVED);
    }

    @Test
    @Transactional
    public void updateNonExistingEditRequest() throws Exception {
        int databaseSizeBeforeUpdate = editRequestRepository.findAll().size();

        // Create the EditRequest

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEditRequestMockMvc.perform(put("/api/edit-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editRequest)))
            .andExpect(status().isCreated());

        // Validate the EditRequest in the database
        List<EditRequest> editRequestList = editRequestRepository.findAll();
        assertThat(editRequestList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEditRequest() throws Exception {
        // Initialize the database
        editRequestRepository.saveAndFlush(editRequest);
        int databaseSizeBeforeDelete = editRequestRepository.findAll().size();

        // Get the editRequest
        restEditRequestMockMvc.perform(delete("/api/edit-requests/{id}", editRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EditRequest> editRequestList = editRequestRepository.findAll();
        assertThat(editRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EditRequest.class);
        EditRequest editRequest1 = new EditRequest();
        editRequest1.setId(1L);
        EditRequest editRequest2 = new EditRequest();
        editRequest2.setId(editRequest1.getId());
        assertThat(editRequest1).isEqualTo(editRequest2);
        editRequest2.setId(2L);
        assertThat(editRequest1).isNotEqualTo(editRequest2);
        editRequest1.setId(null);
        assertThat(editRequest1).isNotEqualTo(editRequest2);
    }
}
