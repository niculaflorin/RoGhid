package ro.ghid.java.web.rest;

import ro.ghid.java.RoGhidApp;

import ro.ghid.java.domain.Objective;
import ro.ghid.java.repository.ObjectiveRepository;
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
 * Test class for the ObjectiveResource REST controller.
 *
 * @see ObjectiveResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RoGhidApp.class)
public class ObjectiveResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_PATH = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_RATING = 1F;
    private static final Float UPDATED_RATING = 2F;

    @Autowired
    private ObjectiveRepository objectiveRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restObjectiveMockMvc;

    private Objective objective;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ObjectiveResource objectiveResource = new ObjectiveResource(objectiveRepository);
        this.restObjectiveMockMvc = MockMvcBuilders.standaloneSetup(objectiveResource)
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
    public static Objective createEntity(EntityManager em) {
        Objective objective = new Objective()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .imagePath(DEFAULT_IMAGE_PATH)
            .creationDate(DEFAULT_CREATION_DATE)
            .rating(DEFAULT_RATING);
        return objective;
    }

    @Before
    public void initTest() {
        objective = createEntity(em);
    }

    @Test
    @Transactional
    public void createObjective() throws Exception {
        int databaseSizeBeforeCreate = objectiveRepository.findAll().size();

        // Create the Objective
        restObjectiveMockMvc.perform(post("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isCreated());

        // Validate the Objective in the database
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeCreate + 1);
        Objective testObjective = objectiveList.get(objectiveList.size() - 1);
        assertThat(testObjective.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testObjective.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testObjective.getImagePath()).isEqualTo(DEFAULT_IMAGE_PATH);
        assertThat(testObjective.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testObjective.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createObjectiveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = objectiveRepository.findAll().size();

        // Create the Objective with an existing ID
        objective.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObjectiveMockMvc.perform(post("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isBadRequest());

        // Validate the Objective in the database
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = objectiveRepository.findAll().size();
        // set the field null
        objective.setName(null);

        // Create the Objective, which fails.

        restObjectiveMockMvc.perform(post("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isBadRequest());

        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = objectiveRepository.findAll().size();
        // set the field null
        objective.setDescription(null);

        // Create the Objective, which fails.

        restObjectiveMockMvc.perform(post("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isBadRequest());

        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = objectiveRepository.findAll().size();
        // set the field null
        objective.setCreationDate(null);

        // Create the Objective, which fails.

        restObjectiveMockMvc.perform(post("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isBadRequest());

        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllObjectives() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);

        // Get all the objectiveList
        restObjectiveMockMvc.perform(get("/api/objectives?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(objective.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imagePath").value(hasItem(DEFAULT_IMAGE_PATH.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));
    }

    @Test
    @Transactional
    public void getObjective() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);

        // Get the objective
        restObjectiveMockMvc.perform(get("/api/objectives/{id}", objective.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(objective.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.imagePath").value(DEFAULT_IMAGE_PATH.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingObjective() throws Exception {
        // Get the objective
        restObjectiveMockMvc.perform(get("/api/objectives/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObjective() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);
        int databaseSizeBeforeUpdate = objectiveRepository.findAll().size();

        // Update the objective
        Objective updatedObjective = objectiveRepository.findOne(objective.getId());
        updatedObjective
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .imagePath(UPDATED_IMAGE_PATH)
            .creationDate(UPDATED_CREATION_DATE)
            .rating(UPDATED_RATING);

        restObjectiveMockMvc.perform(put("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObjective)))
            .andExpect(status().isOk());

        // Validate the Objective in the database
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeUpdate);
        Objective testObjective = objectiveList.get(objectiveList.size() - 1);
        assertThat(testObjective.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testObjective.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testObjective.getImagePath()).isEqualTo(UPDATED_IMAGE_PATH);
        assertThat(testObjective.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testObjective.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void updateNonExistingObjective() throws Exception {
        int databaseSizeBeforeUpdate = objectiveRepository.findAll().size();

        // Create the Objective

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restObjectiveMockMvc.perform(put("/api/objectives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objective)))
            .andExpect(status().isCreated());

        // Validate the Objective in the database
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteObjective() throws Exception {
        // Initialize the database
        objectiveRepository.saveAndFlush(objective);
        int databaseSizeBeforeDelete = objectiveRepository.findAll().size();

        // Get the objective
        restObjectiveMockMvc.perform(delete("/api/objectives/{id}", objective.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Objective> objectiveList = objectiveRepository.findAll();
        assertThat(objectiveList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Objective.class);
        Objective objective1 = new Objective();
        objective1.setId(1L);
        Objective objective2 = new Objective();
        objective2.setId(objective1.getId());
        assertThat(objective1).isEqualTo(objective2);
        objective2.setId(2L);
        assertThat(objective1).isNotEqualTo(objective2);
        objective1.setId(null);
        assertThat(objective1).isNotEqualTo(objective2);
    }
}
