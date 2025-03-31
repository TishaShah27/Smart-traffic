-- Trigger example
CREATE TRIGGER UpdateTrafficFlowAfterIncident
AFTER UPDATE ON Incidents
FOR EACH ROW
BEGIN
    IF NEW.resolved = true THEN
        UPDATE Traffic_Flows SET vehicle_count = vehicle_count - 10 WHERE intersection_id = NEW.intersection_id;
    END IF;
END;

-- Stored Procedure example
CREATE PROCEDURE GetTrafficLightState (IN intersection INT)
BEGIN
    SELECT state FROM Traffic_Lights WHERE intersection_id = intersection;
END;
