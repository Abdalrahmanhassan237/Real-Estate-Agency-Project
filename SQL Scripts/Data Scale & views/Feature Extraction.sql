-- Create a view for Sales Analysis 

CREATE VIEW SalesAnalysisView AS
SELECT 
    s.SaleID,
    s.PropertyID,
    s.ClientID,
    s.AgentID,
    s.SaleDate,
    s.SalePrice,
    p.PropertyType,
    p.Location,
    p.Size_sqm,
    p.PriceUSD AS ListingPrice,
    (s.SalePrice - p.PriceUSD) AS PriceDifference,
    ((s.SalePrice - p.PriceUSD) * 100.0 / NULLIF(p.PriceUSD, 0)) AS PriceChangePercentage,
    -- Extract location components
    SUBSTRING(p.Location, 1, CHARINDEX(',', p.Location + ',') - 1) AS City,
    -- Time dimensions
    YEAR(s.SaleDate) AS SaleYear,
    MONTH(s.SaleDate) AS SaleMonth,
    DATEPART(QUARTER, s.SaleDate) AS SaleQuarter,
    CASE 
        WHEN MONTH(s.SaleDate) IN (12, 1, 2) THEN 'Winter'
        WHEN MONTH(s.SaleDate) IN (3, 4, 5) THEN 'Spring'
        WHEN MONTH(s.SaleDate) IN (6, 7, 8) THEN 'Summer'
        ELSE 'Fall'
    END AS Season,
    -- Agent information
    a.FirstName + ' ' + a.LastName AS AgentName,
    -- Client information
    c.FirstName + ' ' + c.LastName AS ClientName
FROM Sales s
JOIN Properties p ON s.PropertyID = p.PropertyID
JOIN Agents a ON s.AgentID = a.AgentID
JOIN Clients c ON s.ClientID = c.ClientID;
GO
-- retrieve view data
select *
from [dbo].[SalesAnalysisView] ; 
go 


-- create view for scale property table
CREATE VIEW RealEstate_Enriched AS
SELECT
    *,
    PriceUSD * 1.0 / NULLIF(Size_sqm, 0) AS Price_per_sqm,

    CASE 
        WHEN Size_sqm < 100 THEN 'Small'
        WHEN Size_sqm < 250 THEN 'Medium'
        WHEN Size_sqm < 400 THEN 'Large'
        ELSE 'Very Large'
    END AS Size_Category,

    CASE 
        WHEN PriceUSD / NULLIF(Size_sqm, 0) > 2000 THEN 'Luxury'
        WHEN PriceUSD / NULLIF(Size_sqm, 0) > 1000 THEN 'Mid-Range'
        ELSE 'Budget'
    END AS Price_Segment,

    CASE Location
        WHEN 'New York' THEN 'Northeast'
        WHEN 'Chicago' THEN 'Midwest'
        WHEN 'Miami' THEN 'Southeast'
        WHEN 'Houston' THEN 'South'
        WHEN 'Los Angeles' THEN 'West'
        ELSE 'Unknown'
    END AS Region,

    CASE 
        WHEN PropertyType IN ('Villa', 'Apartment') THEN 'Residential'
        WHEN PropertyType IN ('Office', 'Retail', 'Warehouse') THEN 'Commercial'
        ELSE 'Other'
    END AS Property_Category

FROM [dbo].[Properties];
go 



-- retrive data

select * 
from [dbo].[RealEstate_Enriched] ; 
go 


