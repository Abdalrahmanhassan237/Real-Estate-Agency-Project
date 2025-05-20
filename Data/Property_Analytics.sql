---------------Property Analytics---------------
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


--Sales and Visits for each City
select Location, count(v.VisitID) as Visits_number, count(s.SaleID) as Sales_number, 
		case 
			 when count(distinct v.VisitDate) > 0 
				then round((cast(count(distinct s.SaleID) as numeric(10,2)) * 100.0 / count(distinct v.VisitID)), 2)
			 else 0.0
		end as visit_to_sale_ratio
from Properties p
left join Sales s
on p.PropertyID = s.PropertyID
left join Visits v
on p.PropertyID = v.PropertyID
group by Location
order by Visits_number desc, Sales_number desc


--Top 10 most visited properties
select p.PropertyID, p.PropertyType, p.Location, count(v.PropertyID) Number_of_visits
from Properties p
inner join Visits v
on v.PropertyID = p.PropertyID
group by p.PropertyID, p.PropertyType, p.Location
order by Number_of_visits desc;


--Total sales value over years
select DATEPART(year, SaleDate) as sales_year, sum(SalePrice) as total_sales
from Sales
group by DATEPART(year, SaleDate)
order by total_sales desc;


--Total sales value over quarters
select DATEPART(year, SaleDate) as sales_year, DATEPART(QUARTER, SaleDate) as sales_quarter, sum(SalePrice) as total_sales
from Sales
group by DATEPART(year, SaleDate), DATEPART(QUARTER, SaleDate)
order by sales_year desc, total_sales desc;


--Total sales value over months
select DATEPART(year, SaleDate) as sales_year, DATEPART(MONTH, SaleDate) as sales_month, sum(SalePrice) as total_sales
from Sales
group by DATEPART(year, SaleDate), DATEPART(month, SaleDate)
order by sales_year, total_sales desc;


--Average sale value per property type
select p.PropertyType, avg(s.SalePrice) as Average_sale_value
from Sales s
join Properties p
on p.PropertyID = s.PropertyID
group by PropertyType;


---------------Agent Performance---------------
--Agent Conversion rate (sales / visists)
select a.AgentID, a.FirstName, a.LastName, 
		case 
			 when count(distinct v.VisitDate) > 0 
				then round((cast(count(distinct s.SaleID) as numeric(10,2)) * 100.0 / count(distinct v.VisitID)), 2)
			 else 0.0
		end as Agent_conversion
from Agents a
left join Sales s
on s.AgentID = a.AgentID
left join Visits v
on v.AgentID = a.AgentID
group by a.AgentID, a.FirstName, a.LastName
order by Agent_conversion desc;


--Number of sales per agent
select a.AgentID, a.FirstName, a.LastName, count(SaleID) as Number_of_Sales
from Sales s
right join Agents a
on s.AgentID = a.AgentID
group by a.AgentID, a.FirstName, a.LastName
order by Number_of_Sales desc;


--Number of client visits per agent
select a.AgentID, a.FirstName, a.LastName, count(v.VisitID) as Number_of_Visits
from Visits v
right join Agents a
on v.AgentID = a.AgentID
group by a.AgentID, a.FirstName, a.LastName
order by Number_of_Visits desc;


--Avg sale value handled by each agent
select a.AgentID, a.FirstName, a.LastName, avg(SalePrice) as Average_Sale_Value
from Sales s
right join Agents a
on s.AgentID = a.AgentID
group by a.AgentID, a.FirstName, a.LastName
order by Average_Sale_Value desc;


---------------Client Engagement---------------
--Client Retention Within 30 Days
with FirstPurchase as (
  select
    ClientID,
    min(SaleDate) as FirstSaleDate
  from Sales
  group by ClientID
),
SecondPurchase as (
  select
    s.ClientID,
    min(s.SaleDate) as SecondSaleDate
  from Sales s
  join FirstPurchase fp on s.ClientID = fp.ClientID
  where s.SaleDate > fp.FirstSaleDate
  group by s.ClientID
),
Retention as (
  select
    fp.ClientID,
    datediff(day, fp.FirstSaleDate, sp.SecondSaleDate) AS DaysBetween
  from FirstPurchase fp
  join SecondPurchase sp on fp.ClientID = sp.ClientID
)
select
  (count(case when DaysBetween <= 30 then 1 end) * 100.0) / count(*) as RetentionRateWithin30Days
from Retention;


--Number of properties visited per client
select c.ClientID, c.FirstName, c.LastName, count(v.VisitID) as Visits_Number
from Visits v
right join Clients c
on v.ClientID = c.ClientID
group by c.ClientID, c.FirstName, c.LastName
order by Visits_Number desc;


--Top clients by sale value
select c.ClientID, c.FirstName, c.LastName, sum(s.SalePrice) as Total_Sale_Value
from Sales s
right join Clients c
on s.ClientID = c.ClientID
group by c.ClientID, c.FirstName, c.LastName
order by Total_Sale_Value desc;


--Buyer types
select c.ClientID, c.FirstName, c.LastName, 
	   case when count(SaleID) > 1
			then 'Frequent'
			else 'One time client'
	   end as Buyer_type
from Sales s
join Clients c
on s.ClientID = c.ClientID
group by c.ClientID, c.FirstName, c.LastName