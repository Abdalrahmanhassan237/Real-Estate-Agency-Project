-- Create the database
CREATE DATABASE RealEstateAgency;
GO

USE RealEstateAgency;
GO

-- Properties table
CREATE TABLE Properties (
    PropertyID INT PRIMARY KEY,
    PropertyType VARCHAR(255),
    Location VARCHAR(255),
    Size_sqm INT CHECK (Size_sqm > 0),
    PriceUSD INT CHECK (PriceUSD >= 0)
);
GO

-- Clients table
CREATE TABLE Clients (
    ClientID INT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Phone VARCHAR(255),
    Email VARCHAR(255)
);
GO

-- Agents table
CREATE TABLE Agents (
    AgentID INT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Phone VARCHAR(255),
    Email VARCHAR(255)
);
GO

-- Sales table
CREATE TABLE Sales (
    SaleID INT PRIMARY KEY,
    PropertyID INT,
    ClientID INT,
    AgentID INT,
    SaleDate DATE,
    SalePrice INT CHECK (SalePrice >= 0),
    FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID),
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (AgentID) REFERENCES Agents(AgentID)
);
GO

-- Visits table
CREATE TABLE Visits (
    VisitID INT PRIMARY KEY,
    PropertyID INT,
    ClientID INT,
    AgentID INT,
    VisitDate DATE,
    FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID),
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
    FOREIGN KEY (AgentID) REFERENCES Agents(AgentID)
);
GO
