'-----------------------[Application Settings]-----------------------
'Name: MPP Dairy
'AddIns: Web
'Type: Web
'Browser: Internet Explorer
'Created by:   Paul Farris
'Created Date: 03/23/2017
'Browser: Internet Explorer
'--------------------------------------------------------------------
'---------------------------- Change Log ----------------------------
'' What: Updated password
'' When: 3/13/2018
'' By: Paul Farris
'--------------------------------------------------------------------

Dim vUserID, vPassword, vURL
On Error Resume Next
vUrl = "https://cert1-intranet-apps.fsa.usda.gov/Milc/mpp-web/"
vUserID = "TCO_AN071248"
vPassword = "4WDCtcoID#$1" 
'Close All IE Browsers - uncomment if needed
CloseBrowser("iexplore.exe")
'Calling Delete Cookies - uncomment if needed
'DeleteCookies() 
'Call SOSFunction - uncomment if needed
'Func_SSO_Override()
'varibale for screen shot location
Environment.Value("ENV_Screenshot_Loc") = "C:\Temp\image.bmp"
'launching URL
LaunchURL(vURL)
Set vURL = Nothing

' call the eAuth login function and pass it the UserID and Password
eAuthLogin vUserID, vPassword
Set vUserID = Nothing 
Set vPassword = Nothing

' check to see if the application loads.  if not, mark the smoke test as fail and end the script
If Not Browser("name:=MPP - MPP Main Menu").exist(30) Then	
	Browser("creationtime:=0").CaptureBitmap Environment.Value("ENV_Screenshot_Loc"), True
	Reporter.ReportEvent micFail, "MPP Dairy Smoke Test", "The MPP Dairy page did not load.  Smoke Test failed.", Environment.Value("ENV_Screenshot_Loc")
	CloseBrowser("iexplore.exe")
	ExitAction
Else	
' ============================ Action Starts here ================================================================
	With Browser("name:=MPP - MPP Main Menu").Page("title:=MPP - MPP Main Menu")
		.Sync
		.WebList("name:=stateFsaCode").Select "North Carolina (A)"
		.WebList("name:=countyFsaCode").Select "Vance (A)"
		.WebList("name:=yearId").Select "2017"
		.WebRadioGroup("name:=searchTypeSelected").Select "Contract:"
		.WebButton("name:=Continue").Click	
	End With
' ============================ Action ends here ==================================================================
' reporting with screenshot
	With Browser("name:=MPP - Contracts").Page("title:=MPP - Contracts")	
		If .Webtable("column names:=Select;DairyOperation;DairyOperationNumber;Farm;Tract;EstablishedProductionHistory;ContractStatus").Exist(30) Then ' check for existence of database results.  usually a table or page of results
			Wait(2)
			Browser("Creationtime:=0").CaptureBitmap Environment.Value("ENV_Screenshot_Loc"), True
			Reporter.ReportEvent MicPass, "MPP Dairy Smoke Test", "Database values were returned successfully for the MPP Dairy page", Environment.Value("ENV_Screenshot_Loc")
		Else
			Browser("creationtime:=0").CaptureBitmap Environment.Value("ENV_Screenshot_Loc"), True
			Reporter.ReportEvent MicFail, "MPP Dairy Smoke Test", "Database values were not returned for the MPP Dairy page", Environment.Value("ENV_Screenshot_Loc")	
		End If
	
	' eAuth Logout - this also closes the browser
		.Link("innerhtml:=Logout of eAuth").Click
		CloseBrowser("iexplore.exe")
	End With
End If


