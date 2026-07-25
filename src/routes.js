import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from "./controllers/organizations.js";
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation } from "./controllers/projects.js";
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
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
router.get('/categories', showCategoriesPage); // Route for categories page
router.get('/category/:id', showCategoryDetailsPage); // Route for category details page
router.get('/assign-categories/:projectId', showAssignCategoriesForm); // Route to display the assign categories to project form
router.post('/assign-categories/:projectId', processAssignCategoriesForm); // Route to handle the assign categories to project form

// error-handling routes
router.get('/test-error', testErrorPage);



export default router;