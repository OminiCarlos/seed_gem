--!!! drop in this order to prevent errors caused by violation of referential integrity 
drop trigger enforce_total_participation_location;
drop trigger prevent_orphaned_location;

drop table Plant_event_records_user_batch;

-- Userr is not a typo; user is a reserved name in Oracle so cannot be used 
drop table Userr;
drop table batch_is_at_Stage;
drop table Batch;
drop table Order_item;
drop table Supplier;
-- Orderr is not a typo; order is a reserved name in Oracle so cannot be used 
drop table Orderr;
drop table distinguished_by;
drop table Soil_condition;
drop table Location_irrigation;
drop table Location;
drop table Stage;
drop table plant_has_tags;
drop table Tag;
drop table Cultivar;
drop table Plant;


CREATE TABLE Plant (
    plant_ID INTEGER PRIMARY KEY,
    yield_type VARCHAR(50),
    common_name VARCHAR(50) UNIQUE,
    scientific_name VARCHAR(50) UNIQUE,
    overview_notes VARCHAR(3000)
);

INSERT INTO Plant (plant_ID, yield_type, common_name, scientific_name, overview_notes)
VALUES
    (1, 'Fruit', 'Apple', 'Malus domestica', 'Apple is a widely cultivated tree known for its sweet, edible fruit.');
INSERT INTO Plant (plant_ID, yield_type, common_name, scientific_name, overview_notes)
VALUES    
    (2, 'Vegetable', 'Carrot', 'Daucus carota', 'Carrots are root vegetables, typically orange in color, known for their high vitamin A content.');
INSERT INTO Plant (plant_ID, yield_type, common_name, scientific_name, overview_notes)
VALUES    
    (3, 'Herb', 'Basil', 'Ocimum basilicum', 'Basil is a culinary herb commonly used in Italian and Southeast Asian cuisines.');
INSERT INTO Plant (plant_ID, yield_type, common_name, scientific_name, overview_notes)
VALUES
    (4, 'Flower', 'Sunflower', 'Helianthus annuus', 'Sunflowers are known for their large, bright yellow flower heads and seeds rich in oil.');
INSERT INTO Plant (plant_ID, yield_type, common_name, scientific_name, overview_notes)
VALUES
    (5, 'Cereal', 'Wheat', 'Triticum aestivum', 'Wheat is a staple cereal grain used worldwide for making bread and other foods.');


-- CREATE TABLE Cultivar (
--     plant_ID INTEGER PRIMARY KEY,
--     yield_type VARCHAR(50),
--     common_name VARCHAR(50),
--     scientific_name VARCHAR(50),
--     overview_notes VARCHAR(3000),
--     cultivar_name VARCHAR(50),
--     FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID),
--     UNIQUE (cultivar_name, common_name)
-- );

CREATE TABLE Cultivar (
    plant_ID INTEGER PRIMARY KEY,
    cultivar_name VARCHAR(50),
    FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID)
);

CREATE TABLE Tag (
    tag VARCHAR(50) PRIMARY KEY
);

CREATE TABLE plant_has_tags (
    plant_ID INTEGER,
    label VARCHAR(50),
    PRIMARY KEY (plant_ID, label),
    FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID),
    FOREIGN KEY (label) REFERENCES Tag(label)
);

CREATE TABLE Stage (
    stage_name VARCHAR(50),
    plant_ID INTEGER,
    PRIMARY KEY (stage_name, plant_ID),
    FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID)
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
    pH NUMBER(5, 2),
    organic_matter_concentration NUMBER(5, 2)
);

CREATE TABLE distinguished_by (
    soil_type VARCHAR(50),
    field_name VARCHAR(50),
    zone_ID INTEGER,
    PRIMARY KEY (soil_type, field_name, zone_ID),
    FOREIGN KEY (soil_type) REFERENCES Soil_condition(soil_type),
    FOREIGN KEY (field_name, zone_ID) REFERENCES Location(field_name, zone_ID)
);

CREATE TABLE Orderr (
    order_id INTEGER PRIMARY KEY,
    order_date DATE,
    order_comment VARCHAR(3000)
);

CREATE TABLE Supplier (
    supplier_ID INTEGER PRIMARY KEY,
    supplier_name VARCHAR(50),
    supplier_address VARCHAR(50),
    supplier_tel VARCHAR(50) CHECK (supplier_tel IS NOT NULL)
);

CREATE TABLE Order_item (
    order_ID INTEGER,
    item_ID INTEGER,
    quantity INTEGER,
    unit VARCHAR(50),
    item_price INTEGER,
    item_comment VARCHAR(500),
    plant_ID INTEGER NOT NULL,
    supplier_ID INTEGER NOT NULL,
    PRIMARY KEY (order_ID, item_ID),
    FOREIGN KEY (order_ID) REFERENCES Orderr(order_ID),
    FOREIGN KEY (plant_ID) REFERENCES Plant(plant_ID),
    FOREIGN KEY (supplier_ID) REFERENCES Supplier(supplier_ID)
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
    FOREIGN KEY (item_ID, order_ID) REFERENCES Order_item(item_ID, order_ID),
    FOREIGN KEY (field_name, zone_ID) REFERENCES Location(field_name, zone_ID),
    UNIQUE (plant_date, item_ID, order_ID, field_name, zone_ID)
);

CREATE TABLE batch_is_at_Stage (
    batch_ID INTEGER,
    plant_ID INTEGER,
    stage_name VARCHAR(50),
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (batch_ID, plant_ID, stage_name),
    FOREIGN KEY (batch_ID) REFERENCES Batch(batch_ID),
    FOREIGN KEY (stage_name, plant_ID) REFERENCES Stage(stage_name, plant_ID)
);

CREATE TABLE Userr (
    user_id INTEGER PRIMARY KEY,
    user_name VARCHAR(50),
    user_note VARCHAR(3000)
);

CREATE TABLE Plant_event_records_user_batch (
    event_id INTEGER PRIMARY KEY,
    event_title VARCHAR(400),
    event_date DATE,
    event_instruction VARCHAR(3000),
    event_observation VARCHAR(3000),
    batch_ID INTEGER NOT NULL,
    user_ID INTEGER NOT NULL,
    FOREIGN KEY (batch_ID) REFERENCES Batch(batch_ID),
    FOREIGN KEY (user_ID) REFERENCES Userr(user_id)
);


INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Sandy', 6.50, 1.20);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Loamy', 7.00, 2.30);

INSERT INTO Soil_condition (soil_type, pH, organic_matter_concentration)
VALUES ('Clay', 5.80, 3.10);

INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('North Field', 1, 0); 

INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('Middle Field', 2, 1);

INSERT INTO Location (field_name, zone_id, is_outdoor) VALUES ('South Field', 3, 1);

INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('Middle Field', 2, 'Clay');

INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('North Field', 1, 'Loamy');

INSERT INTO distinguished_by (field_name, zone_ID, soil_type) VALUES ('South Field', 3, 'Loamy');


-- CREATE OR REPLACE TRIGGER prevent_orphaned_location
-- BEFORE DELETE ON distinguished_by
-- FOR EACH ROW
-- DECLARE
--     v_count NUMBER;
-- BEGIN
--     -- Check if the deletion will leave the Location without any distinguished_by entries
--     SELECT COUNT(*) INTO v_count
--     FROM distinguished_by
--     WHERE field_name = :OLD.field_name AND zone_ID = :OLD.zone_ID;
    
--     -- If this is the last entry, raise an error
--     IF v_count = 1 THEN
--         RAISE_APPLICATION_ERROR(-20002, 'Cannot delete the last distinguished_by entry for a Location.');
--     END IF;
-- END;
-- /

-- !!! This will be prevented due to the trigegr above.
-- just for testing purposes
-- DELETE FROM distinguished_by
-- WHERE soil_type = 'Clay'
--   AND field_name = 'Middle Field'
--   AND zone_ID = 0;

-- !!! Be sure to only enforce it after you have created the first entry of every distinct instance in table Location
-- CREATE OR REPLACE TRIGGER enforce_total_participation_location
-- AFTER INSERT ON Location
-- FOR EACH ROW
-- DECLARE
--     v_count NUMBER;
-- BEGIN
--     -- Check if the new location has a corresponding entry in soil_condition
--     SELECT COUNT(*) INTO v_count
--     FROM distinguished_by
--     WHERE field_name = :NEW.field_name AND zone_ID = :NEW.zone_ID;
    
--     -- If no entry exists, raise an error
--     IF v_count = 0 THEN
--         RAISE_APPLICATION_ERROR(-20001, 'Location must be distinguished by at least one soil condition.');
--     END IF;
-- END;
-- /
