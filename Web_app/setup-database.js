// This script generates SQL commands to set up your RealEstateAgency database
// You can run these commands in SQL Server Management Studio or another SQL client

import fs from "fs"

// SQL script to create the database and tables
const createDatabaseScript = `
USE [master]
GO

-- Check if database exists and create it if it doesn't
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'RealEstateAgency')
BEGIN
    CREATE DATABASE [RealEstateAgency]
END
GO

USE [RealEstateAgency]
GO

-- Create Properties table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Properties]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Properties](
        [PropertyID] [int] IDENTITY(1,1) PRIMARY KEY,
        [PropertyType] [nvarchar](50) NOT NULL,
        [Location] [nvarchar](100) NOT NULL,
        [Size_sqm] [int] NOT NULL,
        [PriceUSD] [decimal](18, 2) NOT NULL,
        [Description] [nvarchar](max) NULL,
        [Bedrooms] [int] NULL,
        [Bathrooms] [int] NULL,
        [YearBuilt] [int] NULL,
        [ListingDate] [date] DEFAULT GETDATE()
    )
END
GO

-- Create Clients table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Clients]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Clients](
        [ClientID] [int] IDENTITY(1,1) PRIMARY KEY,
        [FirstName] [nvarchar](50) NOT NULL,
        [LastName] [nvarchar](50) NOT NULL,
        [Email] [nvarchar](100) NOT NULL,
        [Phone] [nvarchar](20) NOT NULL,
        [RegistrationDate] [date] DEFAULT GETDATE()
    )
END
GO

-- Create Agents table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Agents]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Agents](
        [AgentID] [int] IDENTITY(1,1) PRIMARY KEY,
        [FirstName] [nvarchar](50) NOT NULL,
        [LastName] [nvarchar](50) NOT NULL,
        [Email] [nvarchar](100) NOT NULL,
        [Phone] [nvarchar](20) NOT NULL,
        [HireDate] [date] DEFAULT GETDATE()
    )
END
GO

-- Create Sales table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Sales]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Sales](
        [SaleID] [int] IDENTITY(1,1) PRIMARY KEY,
        [PropertyID] [int] NOT NULL,
        [ClientID] [int] NOT NULL,
        [AgentID] [int] NOT NULL,
        [SaleDate] [date] NOT NULL,
        [SalePrice] [decimal](18, 2) NOT NULL,
        CONSTRAINT [FK_Sales_Properties] FOREIGN KEY([PropertyID]) REFERENCES [dbo].[Properties] ([PropertyID]),
        CONSTRAINT [FK_Sales_Clients] FOREIGN KEY([ClientID]) REFERENCES [dbo].[Clients] ([ClientID]),
        CONSTRAINT [FK_Sales_Agents] FOREIGN KEY([AgentID]) REFERENCES [dbo].[Agents] ([AgentID])
    )
END
GO

-- Create Visits table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Visits]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Visits](
        [VisitID] [int] IDENTITY(1,1) PRIMARY KEY,
        [PropertyID] [int] NOT NULL,
        [ClientID] [int] NOT NULL,
        [AgentID] [int] NOT NULL,
        [VisitDate] [datetime] NOT NULL,
        CONSTRAINT [FK_Visits_Properties] FOREIGN KEY([PropertyID]) REFERENCES [dbo].[Properties] ([PropertyID]),
        CONSTRAINT [FK_Visits_Clients] FOREIGN KEY([ClientID]) REFERENCES [dbo].[Clients] ([ClientID]),
        CONSTRAINT [FK_Visits_Agents] FOREIGN KEY([AgentID]) REFERENCES [dbo].[Agents] ([AgentID])
    )
END
GO
`

// SQL script to insert sample data
const sampleDataScript = `
USE [RealEstateAgency]
GO

-- Insert sample agents
IF NOT EXISTS (SELECT TOP 1 * FROM Agents)
BEGIN
    INSERT INTO Agents (FirstName, LastName, Email, Phone)
    VALUES 
        ('John', 'Smith', 'john.smith@realestatepro.com', '(123) 456-7890'),
        ('Sarah', 'Johnson', 'sarah.johnson@realestatepro.com', '(123) 456-7891'),
        ('Michael', 'Brown', 'michael.brown@realestatepro.com', '(123) 456-7892');
END
GO

-- Insert sample properties
IF NOT EXISTS (SELECT TOP 1 * FROM Properties)
BEGIN
    INSERT INTO Properties (PropertyType, Location, Size_sqm, PriceUSD, Bedrooms, Bathrooms, YearBuilt, Description)
    VALUES 
        ('Apartment', 'New York, NY', 85, 350000, 2, 1, 2010, 'Modern apartment in the heart of New York City.'),
        ('House', 'Los Angeles, CA', 180, 750000, 3, 2, 2005, 'Spacious family home with a beautiful garden.'),
        ('Villa', 'Miami, FL', 250, 1200000, 4, 3, 2015, 'Luxury villa with a swimming pool and ocean view.'),
        ('Land', 'Austin, TX', 1000, 500000, NULL, NULL, NULL, 'Prime development land in a growing area.'),
        ('Commercial', 'Chicago, IL', 300, 900000, NULL, NULL, 2000, 'Commercial space perfect for retail or office.'),
        ('Apartment', 'San Francisco, CA', 70, 650000, 1, 1, 2018, 'Cozy apartment with modern amenities.');
END
GO

-- Insert sample clients
IF NOT EXISTS (SELECT TOP 1 * FROM Clients)
BEGIN
    INSERT INTO Clients (FirstName, LastName, Email, Phone)
    VALUES 
        ('David', 'Wilson', 'david.wilson@example.com', '(123) 456-7893'),
        ('Emily', 'Davis', 'emily.davis@example.com', '(123) 456-7894'),
        ('Robert', 'Miller', 'robert.miller@example.com', '(123) 456-7895');
END
GO

-- Insert sample visits
IF NOT EXISTS (SELECT TOP 1 * FROM Visits)
BEGIN
    INSERT INTO Visits (PropertyID, ClientID, AgentID, VisitDate)
    VALUES 
        (1, 1, 1, '2023-05-15 10:00:00'),
        (2, 2, 2, '2023-05-16 14:00:00'),
        (3, 3, 3, '2023-05-17 11:00:00');
END
GO

-- Insert sample sales
IF NOT EXISTS (SELECT TOP 1 * FROM Sales)
BEGIN
    INSERT INTO Sales (PropertyID, ClientID, AgentID, SaleDate, SalePrice)
    VALUES 
        (4, 1, 2, '2023-04-20', 490000),
        (5, 3, 1, '2023-04-25', 880000);
END
GO
`

// Write the scripts to files
fs.writeFileSync("create-database.sql", createDatabaseScript)
fs.writeFileSync("sample-data.sql", sampleDataScript)

console.log("Database setup scripts generated successfully!")
console.log("1. create-database.sql - Creates the database and tables")
console.log("2. sample-data.sql - Inserts sample data")
console.log("\nInstructions:")
console.log("1. Open SQL Server Management Studio")
console.log("2. Connect to your local SQL Server using Windows Authentication")
console.log("3. Open and execute the create-database.sql script")
console.log("4. Open and execute the sample-data.sql script")
console.log("5. Your RealEstateAgency database is now ready to use with the application")
