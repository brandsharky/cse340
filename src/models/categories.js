import db from './db.js';



const getAllCategories = async() => {
  const query = `
    SELECT category_id, name
    FROM category
    ORDER BY name
  `;
  const result = await db.query(query);

  return result.rows;
};


const getCategoryDetails = async(id) => {
  const query = `
    SELECT category_id, name
    FROM category
    WHERE category_id = $1;
  `;
  const queryParams = [id];
  const result = await db.query(query, queryParams);

  return result.rows[0];
};


const getCategoriesByProjectId = async(projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM category c
      JOIN service_project_category spc
        ON c.category_id = spc.category_id
    WHERE spc.project_id = $1
    ORDER BY c.name;
  `;
  const queryParams = [projectId];
  const result = await db.query(query, queryParams);

  return result.rows;
};


const getProjectsByCategoryId = async(categoryId) => {
  const query = `
    SELECT sp.project_id, sp.title
    FROM service_project sp
      JOIN service_project_category spc
        ON sp.project_id = spc.project_id
    WHERE spc.category_id = $1
    ORDER BY sp.project_date
  `;
  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);

  return result.rows;
};



export { getAllCategories, getCategoryDetails, getCategoriesByProjectId, getProjectsByCategoryId };