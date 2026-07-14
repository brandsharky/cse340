-- Create organization table
create table organization (
	organization_id serial primary key,
	name varchar(150) not null,
	description text not null,
	contact_email varchar(255) not null,
	logo_filename varchar(255) not null
);

-- Create content
insert into organization (name, description, contact_email, logo_filename)
values
	('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
	('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
	('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- Check if data was inserted
select * from organization;





-- Create service_project table
create table service_project(
	project_id serial primary key,
	organization_id int not null,
	title varchar(150) not null,
	description text not null,
	location varchar(255) not null,
	project_date date not null,

	foreign key (organization_id)
		references organization(organization_id)
);

-- Create service_project content
insert into service_project(organization_id, title, description, location, project_date)
values
	-- Organization 1
	(1, 'Building Chicken Coops', 'Built sturdy chicken coops for local families and small farms to provide safe shelter for poultry and support sustainable food production.', 'Cedar City Community Farm', '2026-03-15'),
	(1, 'Sanding Park Benches', 'Sanded and prepared aging park benches for repainting, helping improve the appearance and safety of local parks.', 'Main Street Park', '2026-04-05'),
	(1, 'Repainting Cemetery Fences', 'Cleaned, primed, and repainted cemetery fences to preserve the grounds and honor the community''s history.', 'Cedar City Cemetery', '2026-05-10'),
	(1, 'Refurbishing Park Trash Cans', 'Restored weathered park trash cans with fresh paint and repairs to improve cleanliness and appearance.', 'Canyon Park', '2026-06-07'),
	(1, 'Building Book Donation Boxes', 'Constructed and installed community book-sharing boxes to encourage literacy and neighborhood engagement.', 'Cedar City Public Library', '2026-07-19'),
	-- Organization 2
	(2, 'Tending to Chicken Hatcheries', 'Assisted hatchery staff with feeding, cleaning, and maintaining healthy environments for young chicks.', 'Iron County Hatchery', '2026-03-22'),
	(2, 'Tending Local Gardens', 'Helped plant, weed, water, and maintain community gardens that provide fresh produce for local residents.', 'Heritage Community Garden', '2026-04-19'),
	(2, 'Building Pollinator Habitats', 'Created pollinator-friendly habitats by planting native flowers and assembling bee and butterfly shelters.', 'Three Peaks Recreation Area', '2026-05-24'),
	(2, 'Farrier Work Assistance', 'Assisted experienced farriers by preparing equipment, handling horses, and maintaining safe working areas.', 'Cedar Ridge Ranch', '2026-06-14'),
	(2, 'Sheep Shearing Assistance', 'Supported local ranchers during sheep shearing by organizing wool, assisting with livestock handling, and cleaning work areas.', 'Parowan Valley Ranch', '2026-07-10'),
	-- Organization 3
	(3, 'Hospital Visits', 'Visited patients to provide companionship, conversation, and encouragement while delivering small care packages.', 'Cedar City Hospital', '2026-03-29'),
	(3, 'Egg Deliveries to Food Shelters', 'Collected and delivered fresh eggs from local farms to food shelters, helping provide nutritious meals to families in need.', 'Iron County Food Pantry', '2026-04-26'),
	(3, 'Volunteer at the Bishop Storehouse', 'Assisted with organizing inventory, stocking shelves, and preparing food orders for families in need.', 'Bishop''s Storehouse', '2026-05-17'),
	(3, 'Community Clothing Drive', 'Collected, sorted, and organized donated clothing for distribution to individuals and families facing financial hardship.', 'Cedar City Community Center', '2026-06-21'),
	(3, 'Write Get Well Soon Cards', 'Created heartfelt cards with encouraging messages to brighten the days of patients recovering from illness or injury.', 'Community Service Center', '2026-07-26')
;

-- Check if data was inserted
select * from service_project;





-- Create category table
create table category (
  category_id serial primary key,
  name varchar(100) not null
);

-- Create category content
insert into category (name)
values
	('Construction'),
	('Agriculture'),
	('Community Service'),
	('Healthcare'),
	('Environmental'),
	('Education'),
	('Animal Care')
;

-- Check if data was inserted
select * from category;





-- Create service_project_category table
create table service_project_category (
  project_id int not null,
  category_id int not null,

  primary key (project_id, category_id),

  foreign key (project_id)
  	references service_project(project_id),

  foreign key (category_id)
    references category(category_id)
);

-- Create service_project_category content
insert into service_project_category (project_id, category_id)
values
	(1, 1),
	(1, 2),
	(2, 1),
	(2, 3),
	(3, 1),
	(3, 3),
	(4, 1),
	(4, 5),
	(5, 1),
	(5, 6),
	(6, 2),
	(7, 2),
	(7, 5),
	(8, 2),
	(8, 5),
	(9, 2),
	(10, 2),
	(11, 4),
	(11, 3),
	(12, 3),
	(12, 2),
	(13, 3),
	(14, 3),
	(15, 4),
	(15, 3)
;

-- Check if data was inserted
select * from service_project_category;


