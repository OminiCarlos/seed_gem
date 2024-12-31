--!!! drop in this order to prevent errors caused by violation of referential integrity 
DROP TABLE IF EXISTS Plant_event_records_user_batch;
DROP TABLE IF EXISTS App_user;
DROP TABLE IF EXISTS batch_is_at_Stage;
DROP TABLE IF EXISTS Batch;
DROP TABLE IF EXISTS Order_item;
DROP TABLE IF EXISTS Supplier;
DROP TABLE IF EXISTS Seed_orders;
DROP TABLE IF EXISTS distinguished_by;
DROP TABLE IF EXISTS Soil_condition;
DROP TABLE IF EXISTS Location_irrigation;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Stage;
DROP TABLE IF EXISTS plant_has_tags;
DROP TABLE IF EXISTS Tag;
DROP TABLE IF EXISTS Plant;


CREATE TABLE Plant (
    plant_ID INTEGER PRIMARY KEY,
    yield_type VARCHAR(50),
    common_name VARCHAR(50),
    cultivar_name VARCHAR(50) NOT NULL,
    scientific_name VARCHAR(50),
    overview_notes TEXT,
    UNIQUE (cultivar_name, common_name)
);

CREATE TABLE Tag (
    tag VARCHAR(50) PRIMARY KEY
);

CREATE TABLE plant_has_tags (
    plant_ID INTEGER,
    tag VARCHAR(50),
    PRIMARY KEY (plant_ID, tag),
    FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (tag) REFERENCES Tag(tag)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE Stage (
    stage_name VARCHAR(50),
    plant_ID INTEGER,
    PRIMARY KEY (stage_name, plant_ID),
    FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Location (
	field_name VARCHAR(50),
	zone_id INTEGER,
	is_outdoor INTEGER,
	PRIMARY KEY (field_name, zone_id)
);

CREATE TABLE Location_irrigation (
	is_outdoor INTEGER PRIMARY KEY,
	is_irrigated INTEGER
);

INSERT INTO Location_irrigation (is_outdoor, is_irrigated)
VALUES (1, 0);

INSERT INTO Location_irrigation (is_outdoor, is_irrigated)
VALUES (0, 1);

CREATE TABLE Soil_condition (
    soil_type VARCHAR(50) PRIMARY KEY,
    pH NUMERIC (5, 2),
    organic_matter_concentration NUMERIC (5, 2)
);

CREATE TABLE distinguished_by (
    soil_type VARCHAR(50),
    field_name VARCHAR(50),
    zone_ID INTEGER,
    PRIMARY KEY (soil_type, field_name, zone_ID),
    FOREIGN KEY (soil_type) REFERENCES Soil_condition(soil_type) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (field_name, zone_ID) REFERENCES Location(field_name, zone_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Seed_orders (
    order_ID INTEGER PRIMARY KEY,
    order_date DATE,
    order_comment VARCHAR(3000)
);


CREATE TABLE Supplier (
    supplier_ID INTEGER PRIMARY KEY,
    supplier_name VARCHAR(50),
    supplier_address VARCHAR(50),
    supplier_tel VARCHAR(50) NOT NULL
);

CREATE TABLE Order_item (
    order_ID INTEGER,
    item_ID INTEGER,
    plant_ID INTEGER NOT NULL,
    quantity DECIMAL(10,2),
    unit VARCHAR(50),
    item_price DECIMAL(10,2),
    supplier_ID INTEGER NOT NULL,
    item_comment VARCHAR(500),
    PRIMARY KEY (order_ID, item_ID),
    FOREIGN KEY (order_ID) REFERENCES Seed_orders(order_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (supplier_ID) REFERENCES Supplier(supplier_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Batch (
    batch_ID INTEGER PRIMARY KEY,
    care_notes VARCHAR(3000),
    plant_date DATE NOT NULL,
    yield_weight INTEGER,
    planted_quantity INTEGER,
    survived_quantity INTEGER,
    item_ID INTEGER NOT NULL,
    order_ID INTEGER NOT NULL,
    field_name VARCHAR(50) NOT NULL,
    zone_ID INTEGER NOT NULL,
    FOREIGN KEY (item_ID, order_ID) REFERENCES Order_item(item_ID, order_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (field_name, zone_ID) REFERENCES Location(field_name, zone_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    UNIQUE (plant_date, item_ID, order_ID, field_name, zone_ID)
);

--how to ensure only the plant_id included in that batch is commited to the database?
CREATE TABLE batch_is_at_Stage (
    batch_ID INTEGER,
    plant_ID INTEGER,
    stage_name VARCHAR(50),
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (batch_ID, plant_ID, stage_name),
    FOREIGN KEY (batch_ID) REFERENCES Batch(batch_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (stage_name, plant_ID) REFERENCES Stage(stage_name, plant_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE App_user (
    user_id INTEGER PRIMARY KEY,
    user_name VARCHAR(50),
    user_note VARCHAR(3000),
);

CREATE TABLE Plant_event_records_user_batch (
    event_id INTEGER PRIMARY KEY,
    event_title VARCHAR(400),
    event_date DATE,
    event_instruction VARCHAR(3000),
    event_observation VARCHAR(3000),
    batch_ID INTEGER NOT NULL,
    user_ID INTEGER NOT NULL,
    FOREIGN KEY (batch_ID) REFERENCES Batch(batch_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_ID) REFERENCES App_user(user_id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (1, 'Fruit', 'Apple', 'Granny Smith', 'Malus domestica', 'Apple is a widely cultivated tree known for its sweet, edible fruit. Need good care');
INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES    
    (2, 'Vegetable', 'Carrot', 'Nantes', 'Daucus carota', 'Carrots are root vegetables, typically orange in color, known for their high vitamin A content Need good care.');
INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES    
    (3, 'Herb', 'Basil', 'Genovese', 'Ocimum basilicum', 'Basil is a culinary herb commonly used in Italian and Southeast Asian cuisines.');
INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (4, 'Flower', 'Sunflower', 'Autumn Beauty', 'Helianthus annuus', 'Sunflowers are known for their large, bright yellow flower heads and seeds rich in oil Need good care.');
INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (5, 'Cereal', 'Wheat', 'Durum Wheat', 'Triticum aestivum', 'Wheat is a staple cereal grain used worldwide for making bread and other foods Need good care.');
INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (6, 'Fruit', 'Banana', 'Cavendish', 'Musa acuminata', 'Bananas are tropical fruits known for their sweetness and ease of care in cultivation Need good care.');
    
INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (7, 'Vegetable', 'Spinach', 'Giant Noble', 'Spinacia oleracea', 'Spinach is a leafy green vegetable that requires proper care for optimal growth Need good care.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (8, 'Herb', 'Mint', 'Peppermint', 'Mentha', 'Mint is a fragrant herb commonly used in teas and desserts, requiring regular watering and care.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (9, 'Flower', 'Rose', 'Knock Out', 'Rosa', 'Roses are popular garden flowers admired for their beauty and fragrance, but they need careful pruning.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (10, 'Cereal', 'Rice', 'Jasmine Rice', 'Oryza sativa', 'Rice is a staple food crop that thrives in wet conditions and demands careful irrigationNeed good care.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (11, 'Fruit', 'Cherry', 'N/A', 'Prunus avium', 'Cherries are small, sweet fruits often grown in temperate regions Need good care.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (12, 'Vegetable', 'Potato', 'Russet', 'Solanum tuberosum', 'Potatoes are tuberous crops that store well and are easy to grow with minimal care.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (13, 'Herb', 'Parsley', 'Curly Leaf Parsley', 'Petroselinum crispum', 'Parsley is a herb often used as a garnish or flavor enhancer in many dishes.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (14, 'Flower', 'Lily', 'Stargazer', 'Lilium', 'Lilies are elegant flowers that symbolize purity and require specific care for long-lasting blooms.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (15, 'Cereal', 'Barley', 'Two-Row Barley', 'Hordeum vulgare', 'Barley is a versatile cereal grain used for food, beverages, and livestock feed.');


INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (16, 'Cereal', 'Barley', 'N/A', 'Hordeum vulgare2', 'Barley is a versatile cereal grain used for food, beverages, and livestock feed.');

INSERT INTO Plant (plant_ID, yield_type, common_name, cultivar_name, scientific_name, overview_notes)
VALUES
    (18, 'Flower', 'Lily', 'N/A', 'Lilium', 'Lilies are elegant flowers that symbolize purity and require specific care for long-lasting blooms.');

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Sandy', 6.50, 1.20);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Loamy', 7.00, 2.30);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Clay', 5.80, 3.10);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Silt', 6.80, 2.50);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Peaty', 5.50, 4.00);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Chalky', 7.20, 1.10);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Saline', 8.00, 0.50);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Gravelly', 6.00, 1.80);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Humus-rich', 6.90, 3.50);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Alluvial', 7.50, 2.80);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Acidic', 4.50, 3.00);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Alkaline', 8.20, 1.00);


INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 1, 0); 
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 2, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 3, 0);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 4, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 5, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 6, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 7, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 8, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 9, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 10, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 11, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 12, 1);

INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('South Field', 1, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('South Field', 2, 0);

INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('Middle Field', 1, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('Middle Field', 2, 0);

INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('East Field', 1, 0);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('East Field', 2, 1);

INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('West Field', 1, 1);
INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('West Field', 2, 1);



INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 1, 'Sandy');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 2, 'Loamy');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 3, 'Clay');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 4, 'Silt');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 5, 'Peaty');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 6, 'Chalky');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 7, 'Saline');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 8, 'Gravelly');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 9, 'Humus-rich');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 10, 'Alluvial');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 11, 'Acidic');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 12, 'Alkaline');

INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('South Field', 1, 'Saline');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('South Field', 2, 'Saline');

INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('Middle Field', 2, 'Alkaline');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('Middle Field', 1, 'Acidic');

INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('West Field', 2, 'Alkaline');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('West Field', 1, 'Acidic');

INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('East Field', 2, 'Peaty');
INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('East Field', 1, 'Chalky');

INSERT INTO Supplier (supplier_ID, supplier_name, supplier_address, supplier_tel) VALUES (1,'Green Dragon Seed Co.', 'UBC-V', '5139149968');
INSERT INTO Supplier (supplier_ID, supplier_name, supplier_address, supplier_tel) VALUES (2,'White Tiger Seed Co.', 'UBC-V', '6045123736');
INSERT INTO Supplier (supplier_ID, supplier_name, supplier_address, supplier_tel) VALUES (3,'Red Phenix Seed Co.', 'UBC-V', '7787624300');
INSERT INTO Supplier (supplier_ID, supplier_name, supplier_address, supplier_tel) VALUES (4,'Black Tortoise Seed Co.', 'UBC-V', '2362133304');

INSERT INTO Seed_orders (order_ID, order_date, order_comment) VALUES (12,'2024-10-01', 'Why so serious?');
INSERT INTO Seed_orders (order_ID, order_date, order_comment) VALUES (1,'2024-11-28', 'Nb!');
INSERT INTO Seed_orders (order_ID, order_date, order_comment) VALUES (2,'2024-11-24', '666');

INSERT INTO Order_item (order_ID, item_ID, plant_ID, quantity, unit, item_price, supplier_ID, item_comment)
VALUES (12, 1, 3, 11, 'g', 16, 3, 'smells good.');
INSERT INTO Order_item (order_ID, item_ID, plant_ID, quantity, unit, item_price, supplier_ID, item_comment)
VALUES (12, 2, 2, 12, 'g', 12.5, 1, 'almost done.');

INSERT INTO Stage (plant_ID, stage_name) VALUES (1, 'flower');
INSERT INTO Stage (plant_ID, stage_name) VALUES (1, 'seed');
INSERT INTO Stage (plant_ID, stage_name) VALUES (1, 'harvest');
INSERT INTO Stage (plant_ID, stage_name) VALUES (2, 'flower');
INSERT INTO Stage (plant_ID, stage_name) VALUES (2, 'seed');
INSERT INTO Stage (plant_ID, stage_name) VALUES (2, 'harvest');

INSERT INTO Batch (batch_ID, care_notes, plant_date, yield_weight, planted_quantity, 
    survived_quantity, order_ID, item_ID, field_name, zone_ID) 
VALUES (1, 'Don''t worry, be happy :)', '2023-09-04', 5,3,1, 12,1, 'South Field', 1);

INSERT INTO batch_is_at_Stage (batch_ID, plant_ID, stage_name, start_date, end_date) 
VALUES (1, 2, 'seed', '2024-10-01',  '2024-10-30');
INSERT INTO batch_is_at_Stage (batch_ID, plant_ID, stage_name, start_date, end_date) 
VALUES (1, 2, 'flower', '2024-10-31',  '2024-12-21');

INSERT INTO Tag (tag) VALUES ('cold-resistant');
INSERT INTO Tag (tag) VALUES ('big');

INSERT INTO plant_has_tags (plant_ID, tag) VALUES (1, 'cold-resistant');
INSERT INTO plant_has_tags (plant_ID, tag) VALUES (1, 'big');