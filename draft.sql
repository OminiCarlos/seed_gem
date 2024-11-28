/*


 SELECT 
    Location.field_name, location.zone_ID,
    Soil_condition.organic_matter_concentration 
FROM 
    distinguished_by, Location, Soil_condition
WHERE 
    distinguished_by.field_name = Location.field_name
    AND 
    distinguished_by.zone_id = Location.zone_id
    AND 
    distinguished_by.soil_type = Soil_condition.soil_type
    AND
    Soil_condition.organic_matter_concentration >= ALL (
        SELECT 
            AVG(Soil_condition.organic_matter_concentration)
        FROM 
            distinguished_by
        JOIN 
            Location 
        ON 
            distinguished_by.field_name = Location.field_name
            AND distinguished_by.zone_id = Location.zone_id
        JOIN 
            Soil_condition 
        ON 
            distinguished_by.soil_type = Soil_condition.soil_type
        GROUP BY 
            Location.field_name
    );

    */

SELECT DISTINCT d.field_name, d.zone_id
FROM distinguished_by d
WHERE NOT EXISTS (
    SELECT s.soil_type
    FROM Soil_condition s
    WHERE NOT EXISTS (
        SELECT 1
        FROM distinguished_by d2
        WHERE d2.field_name = d.field_name
          AND d2.soil_type = s.soil_type
    )
);




