import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from "./controllers/organizations.js";
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from "./controllers/projects.js";
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard } from './controllers/users.js';
import { testErrorPage } from "./controllers/errors.js";



const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage); // Route for organization details page
router.get('/new-organization', showNewOrganizationForm); // Route for new organization page
router.post('/new-organization', organizationValidation, processNewOrganizationForm); // Route to handle new organization form submission
router.get('/edit-organization/:id', showEditOrganizationForm); // Route to display the edit organization form
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm); // Route to handle the edit organization form submission

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage); // Route for project details page
router.get("/new-project", showNewProjectForm); // Route for new project page
router.post('/new-project', projectValidation, processNewProjectForm); // Route to handle new project form submission
router.get('/edit-project/:id', showEditProjectForm); // Route to display the edit project form
router.post('/edit-project/:id', projectValidation, processEditProjectForm); // Route to handle the edit project form submission

router.get('/categories', showCategoriesPage); // Route for categories page
router.get('/category/:id', showCategoryDetailsPage); // Route for category details page
router.get('/assign-categories/:projectId', showAssignCategoriesForm); // Route to display the assign categories to project form
router.post('/assign-categories/:projectId', processAssignCategoriesForm); // Route to handle the assign categories to project form
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

router.get('/register', showUserRegistrationForm); // Route for user register form
router.post('/register', processUserRegistrationForm); // Route to handle the user register form
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard); // Protected dashboard route

// error-handling routes
router.get('/test-error', testErrorPage);



export default router;