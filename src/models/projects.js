import db from './db.js';



const getAllServiceProjects = async() => {
  const query = `
  SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.project_date, o.name AS organization_name
  FROM service_project sp
    JOIN organization o
      ON sp.organization_id = o.organization_id
  ORDER BY sp.project_date
  `;
  const result = await db.query(query);

  return result.rows;
}


const getProjectsByOrganizationId = async(organizationId) => {
  const query = `
  SELECT project_id, organization_id, title, description, location, project_date
  FROM service_project
  WHERE organization_id = $1
  ORDER BY project_date;
  `;
  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};


const getUpcomingProjects = async(number_of_projects) => {
  const query = `
  SELECT sp.project_id, sp.title, sp.description, sp.project_date, sp.location, sp.organization_id, o.name AS organization_name
  FROM service_project sp
    JOIN organization o
      ON sp.organization_id = o.organization_id
  WHERE sp.project_date >= CURRENT_DATE
  ORDER BY sp.project_date
  LIMIT $1;
  `;
  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);

  return result.rows;
};


const getProjectDetails = async(id) => {
  const query = `
  SELECT sp.project_id, sp.title, sp.description, sp.project_date, sp.location, o.organization_id, o.name AS organization_name
  FROM service_project sp
    JOIN organization o
      ON sp.organization_id = o.organization_id
  WHERE sp.project_id = $1;
  `;
  const queryParams = [id];
  const result = await db.query(query, queryParams);

  return result.rows[0];
};


const createProject = async(title, description, location, date, organizationId) => {
  const query = `
  INSERT INTO service_project (organization_id, title, description, location, project_date)
  VALUES
    ($1, $2, $3, $4, $5)
  RETURNING project_id;
  `;
  const queryParams = [organizationId, title, description, location, date];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID: ', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
};


const updateProject = async(project_id, organization_id, title, description, location, project_date) => {
  const query = `
  UPDATE service_project
  SET
    organization_id = $1,
    title = $2,
    description = $3,
    location = $4,
    project_date = $5
  WHERE project_id = $6
  RETURNING project_id;
  `;
  const queryParams = [organization_id, title, description, location, project_date, project_id];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to update project");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log("Updated project with ID: ", result.rows[0].project_id);
  }

  return result.rows[0].project_id;
};














const addVolunteer = async(projectId, userId) => {
  const query = `
  INSERT INTO user_service_project (user_id, project_id)
  VALUES
    ($1, $2)
  ON CONFLICT (user_id, project_id) DO NOTHING;
  `;

  const queryParams = [userId, projectId];
  await db.query(query, queryParams);
};

const removeVolunteer = async(projectId, userId) => {
  const query = `
  DELETE FROM user_service_project
  WHERE user_id = $1
    AND project_id = $2;
  `;
  const queryParams = [userId, projectId];
  await db.query(query, queryParams);
};

const isVolunteer = async(projectId, userId) => {
  const query = `
  SELECT user_id, project_id
  FROM user_service_project
  WHERE user_id = $1
    AND project_id = $2;
  `;
  const queryParams = [userId, projectId];
  const result = await db.query(query, queryParams);

  return result.rows.length > 0;
};

const getVolunteerProjects = async(userId) => {
  const query = `
  SELECT sp.project_id, sp.title, sp.description, sp.location, sp.project_date, o.name AS organization_name
  FROM user_service_project usp
    JOIN service_project sp
      ON usp.project_id = sp.project_id
    JOIN organization o
      ON sp.organization_id = o.organization_id
  WHERE usp.user_id = $1
  ORDER BY sp.project_date;
  `;
  const queryParams = [userId];
  const result = await db.query(query, queryParams);

  return result.rows;
};
















export { getAllServiceProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject, addVolunteer, removeVolunteer, isVolunteer, getVolunteerProjects };