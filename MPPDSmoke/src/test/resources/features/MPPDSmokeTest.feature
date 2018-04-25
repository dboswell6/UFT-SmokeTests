#Author: dan.boswell@kcc.usda.gov
#Keywords Summary :MPP Dairy Smoke Test
#Feature: List of scenarios.

Feature: Create a smoke test for MPP Dairy 

Scenario: Create a contract for MPPD for Fuctional Regression #
		Given We Login with a UserName and Password to the MPPD URL
     When we Enter the StateFSACode
 		  And we Enter the CountyCode
 		  And we Enter the ProgramYear
 		  And we Select Contract
 		 Then we Click Continue 
 		  And We are on the Contracts Page
 		 Then we Close the Browser
