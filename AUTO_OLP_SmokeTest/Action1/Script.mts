'-----------------------[Application Settings]-----------------------
'Name: OLP
'AddIns: Web
'Type: Web
'Browser: Internet Explorer
'Created by:   Paul Farris
'Created Date: 03/23/2017
'Browser: Internet Explorer
'--------------------------------------------------------------------
'------------------------CHANGE LOG ---------------------------------
'' What: Changed password
''When: 4/2/2018
''By: Paul Farris
'--------------------------------------------------------------------
Dim vUserID, vPassword, vURL
On Error Resume Next
vUrl = "https://cert1-intranet-apps.fsa.usda.gov/OnlinePayment/login.do"
vUserID = "tco_CK018670"
vPassword = "4FSAtcoID#$8"
'Close All IE Browsers - uncomment if needed
CloseBrowser("iexplore.exe")
'varibale for screen shot location
Environment.Value("ENV_Screenshot_Loc") = "C:\Temp\image.bmp"
'launching URL
LaunchURL(vURL)
Set vURL = Nothing
' call the eAuth login function and pass it the UserID  nd Password
eAuthLogin vUserID, vPassword
Set vUserID = Nothing 
Set vPassword = Nothing
' check to see if the application loads.  if not, mark the smoke test as fail and end the script
If Not Browser("name:=Online Payment Welcome").exist(60) Then	' home    page takes exceptionally long to load
	Browser("Creationtime:=0").CaptureBitmap Environment.Value("ENV_Screenshot_Loc"), True
	Reporter.ReportEvent micFail, "OLP Smoke Test", "The OLP page did not load.  Smoke Test failed.", Environment.Value("ENV_Screenshot_Loc")
	CloseBrowser("iexplore.exe")
	ExitAction
Else	
' ============================ Action Starts here ================================================================
Browser("name:=Online Payment Welcome").Page("title:=Online Payment Welcome").Link("name:=Search Payments").Click
	With Browser("name:=Online Payment").Page("title:=Online Payment")
		.Sync
		.WebEdit("name:=paymentId").Set "480479"
		Browser("Online Payment").Page("Online Payment_2").WebButton("Search").Click

'		.webButton("outerhtml:=<INPUT onclick=""setAction\(this\.form,'Search2'\);"" title=""Search payment record"" type=submit value=Search name=buttonAction>").Click
	' ============================ Action ends here ==================================================================
' reporting with screenshot
		If .Webtable("column names:=ALEC J SMITH;Payment ID:;52398292").Exist(30) Then ' check for existence of database results.  usually a table or page of results
			Browser("Creationtime:=0").CaptureBitmap Environment.Value("ENV_Screenshot_Loc"), True
			Reporter.ReportEvent MicPass, "OLP Smoke Test", "Database values were returned successfully for the OLP page", Environment.Value("ENV_Screenshot_Loc")
		Else
			Browser("Creationtime:=0").CaptureBitmap Environment.Value("ENV_Screenshot_Loc"), True
			Reporter.ReportEvent MicFail, "OLP Smoke Test", "Database values were not returned for the OLP page", Environment.Value("ENV_Screenshot_Loc")	
		End If	
		.Link("innerhtml:=Logout of eAuth").Click
		CloseBrowser("iexplore.exe")
	End With 
End If
