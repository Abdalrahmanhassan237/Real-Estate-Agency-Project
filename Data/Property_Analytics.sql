--Number of listed properties by type and location
select Location, PropertyType, count(PropertyID) Number_of_Properties
from Properties
group by PropertyType, Location
order by Number_of_Properties desc


--Average price per square meter per city
select Location, avg(PriceUSD/Size_sqm) as Average_price_per_sqm
from Properties
group by Location
order by Average_price_per_sqm desc


--Top 10 most expensive properties for each city
with t as (
	select Location, 
		   PropertyID, 
		   PropertyType, 
		   PriceUSD, 
		   ROW_NUMBER() over(partition by location order by PriceUSD desc) as PriceRank
	from Properties
)
select * from t
where PriceRank <= 10;


--Top 10 most visited properties
select p.PropertyID, p.PropertyType, p.Location, count(v.PropertyID) Number_of_visits
from Properties p
inner join Visits v
on v.PropertyID = p.PropertyID
group by p.PropertyID, p.PropertyType, p.Location
order by Number_of_visits desc;
