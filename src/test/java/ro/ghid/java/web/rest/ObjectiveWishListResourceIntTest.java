package ro.ghid.java.web.rest;

import ro.ghid.java.RoGhidApp;

import ro.ghid.java.domain.ObjectiveWishList;
import ro.ghid.java.repository.ObjectiveWishListRepository;
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
import java.util.List;

import static ro.ghid.java.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ObjectiveWishListResource REST controller.
 *
 * @see ObjectiveWishListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RoGhidApp.class)
public class ObjectiveWishListResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ObjectiveWishListRepository objectiveWishListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restObjectiveWishListMockMvc;

    private ObjectiveWishList objectiveWishList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ObjectiveWishListResource objectiveWishListResource = new ObjectiveWishListResource(objectiveWishListRepository);
        this.restObjectiveWishListMockMvc = MockMvcBuilders.standaloneSetup(objectiveWishListResource)
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
    public static ObjectiveWishList createEntity(EntityManager em) {
        ObjectiveWishList objectiveWishList = new ObjectiveWishList()
            .name(DEFAULT_NAME);
        return objectiveWishList;
    }

    @Before
    public void initTest() {
        objectiveWishList = createEntity(em);
    }

    @Test
    @Transactional
    public void createObjectiveWishList() throws Exception {
        int databaseSizeBeforeCreate = objectiveWishListRepository.findAll().size();

        // Create the ObjectiveWishList
        restObjectiveWishListMockMvc.perform(post("/api/objective-wish-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objectiveWishList)))
            .andExpect(status().isCreated());

        // Validate the ObjectiveWishList in the database
        List<ObjectiveWishList> objectiveWishListList = objectiveWishListRepository.findAll();
        assertThat(objectiveWishListList).hasSize(databaseSizeBeforeCreate + 1);
        ObjectiveWishList testObjectiveWishList = objectiveWishListList.get(objectiveWishListList.size() - 1);
        assertThat(testObjectiveWishList.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createObjectiveWishListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = objectiveWishListRepository.findAll().size();

        // Create the ObjectiveWishList with an existing ID
        objectiveWishList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObjectiveWishListMockMvc.perform(post("/api/objective-wish-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objectiveWishList)))
            .andExpect(status().isBadRequest());

        // Validate the ObjectiveWishList in the database
        List<ObjectiveWishList> objectiveWishListList = objectiveWishListRepository.findAll();
        assertThat(objectiveWishListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllObjectiveWishLists() throws Exception {
        // Initialize the database
        objectiveWishListRepository.saveAndFlush(objectiveWishList);

        // Get all the objectiveWishListList
        restObjectiveWishListMockMvc.perform(get("/api/objective-wish-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(objectiveWishList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getObjectiveWishList() throws Exception {
        // Initialize the database
        objectiveWishListRepository.saveAndFlush(objectiveWishList);

        // Get the objectiveWishList
        restObjectiveWishListMockMvc.perform(get("/api/objective-wish-lists/{id}", objectiveWishList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(objectiveWishList.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingObjectiveWishList() throws Exception {
        // Get the objectiveWishList
        restObjectiveWishListMockMvc.perform(get("/api/objective-wish-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObjectiveWishList() throws Exception {
        // Initialize the database
        objectiveWishListRepository.saveAndFlush(objectiveWishList);
        int databaseSizeBeforeUpdate = objectiveWishListRepository.findAll().size();

        // Update the objectiveWishList
        ObjectiveWishList updatedObjectiveWishList = objectiveWishListRepository.findOne(objectiveWishList.getId());
        updatedObjectiveWishList
            .name(UPDATED_NAME);

        restObjectiveWishListMockMvc.perform(put("/api/objective-wish-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObjectiveWishList)))
            .andExpect(status().isOk());

        // Validate the ObjectiveWishList in the database
        List<ObjectiveWishList> objectiveWishListList = objectiveWishListRepository.findAll();
        assertThat(objectiveWishListList).hasSize(databaseSizeBeforeUpdate);
        ObjectiveWishList testObjectiveWishList = objectiveWishListList.get(objectiveWishListList.size() - 1);
        assertThat(testObjectiveWishList.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingObjectiveWishList() throws Exception {
        int databaseSizeBeforeUpdate = objectiveWishListRepository.findAll().size();

        // Create the ObjectiveWishList

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restObjectiveWishListMockMvc.perform(put("/api/objective-wish-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objectiveWishList)))
            .andExpect(status().isCreated());

        // Validate the ObjectiveWishList in the database
        List<ObjectiveWishList> objectiveWishListList = objectiveWishListRepository.findAll();
        assertThat(objectiveWishListList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteObjectiveWishList() throws Exception {
        // Initialize the database
        objectiveWishListRepository.saveAndFlush(objectiveWishList);
        int databaseSizeBeforeDelete = objectiveWishListRepository.findAll().size();

        // Get the objectiveWishList
        restObjectiveWishListMockMvc.perform(delete("/api/objective-wish-lists/{id}", objectiveWishList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ObjectiveWishList> objectiveWishListList = objectiveWishListRepository.findAll();
        assertThat(objectiveWishListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ObjectiveWishList.class);
        ObjectiveWishList objectiveWishList1 = new ObjectiveWishList();
        objectiveWishList1.setId(1L);
        ObjectiveWishList objectiveWishList2 = new ObjectiveWishList();
        objectiveWishList2.setId(objectiveWishList1.getId());
        assertThat(objectiveWishList1).isEqualTo(objectiveWishList2);
        objectiveWishList2.setId(2L);
        assertThat(objectiveWishList1).isNotEqualTo(objectiveWishList2);
        objectiveWishList1.setId(null);
        assertThat(objectiveWishList1).isNotEqualTo(objectiveWishList2);
    }
}
