-- explore tables columns
exec sp_columns Agents ;
exec sp_columns Clients ; 
exec sp_columns Properties ; 
exec sp_columns Sales ; 
exec sp_columns Visits ; 
go 
-- Totla  Deals
CREATE VIEW [ Total Deals ]
AS (
select count(SaleID) as[ Total Deals ]
from [dbo].[Sales] ) ; 
