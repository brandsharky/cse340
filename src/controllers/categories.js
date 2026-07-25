import { body, validationResult } from 'express-validator';

// Import any needed model functions
import { getAllCategories, getCategoryDetails, getProjectsByCategoryId, getCategoriesByProjectId, updateCategoryAssignments, createCategory, updateCategory } from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";



// Define validation and sanitization rules for categories form
// Define validation rules for categories form
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be between 3 and 100 characters'),
];



// Define any controller functions
const showCategoriesPage = async(req, res) => {
  const categories = await getAllCategories();
  const title = "Service Project Categories";

  res.render("categories", { title, categories });
};


const showCategoryDetailsPage = async(req, res) => {
  const categoryId = req.params.id;
  const categoryDetails = await getCategoryDetails(categoryId);
  const projects = await getProjectsByCategoryId(categoryId);
  const title = categoryDetails.name;

  res.render("category", { title, categoryDetails, projects });
};


const showAssignCategoriesForm = async(req, res) => {
  const projectId = req.params.projectId;
  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);
  const title = 'Assign Categories to Project';

  res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};


const processAssignCategoriesForm = async(req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];

  // Ensure selectedCategoryIds is an array
  const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, categoryIdsArray);
  req.flash("success", "Categories updated successfully.");
  res.redirect(`/project/${projectId}`);
};


const showNewCategoryForm = async(req, res) => {
  const title = "Add New Category";

  res.render('new-category', { title });
};


const processNewCategoryForm = async (req, res) => {
  // Check for validation errors
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // Validation failed - loop through errors
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the new organization from
    return res.redirect(`/new-category`);
  }

  const { name } = req.body;
  const categoryId = await createCategory(name);

  req.flash("success", "Category created successfully!");

  res.redirect(`/category/${categoryId}`);
};


const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const categoryDetails = await getCategoryDetails(categoryId);
  const title = "Edit Category";

  res.render("edit-category", { title, categoryDetails });
};


const processEditCategoryForm = async (req, res) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect(`/edit-category/${req.params.id}`);
  }

  const categoryId = req.params.id;
  const { name } = req.body;

  await updateCategory(categoryId, name);

  req.flash("success", "Category updated successfully!");

  res.redirect(`/category/${categoryId}`);
};


// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm };