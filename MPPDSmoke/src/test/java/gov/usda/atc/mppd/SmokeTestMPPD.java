package gov.usda.atc.mppd;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.When;
import cucumber.api.java.en.Then;
import cucumber.api.PendingException;
import cucumber.api.java.en.And;
import cucumber.api.java.en.But;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.interactions.SendKeysAction;
import org.openqa.selenium.support.ui.Select;

public class SmokeTestMPPD {
	
	
	WebDriver driver;
	

	@Given("^We Login with a UserName and Password to the MPPD URL$")
	public void we_Login_with_a_UserName_and_Password_to_the_MPPD_URL() {
		// Write code here that turns the phrase above into concrete actions
		try {
			
			String URL = "https://cert1-intranet-apps.fsa.usda.gov/Milc/mpp-web/contract/producer/load";
			String UserName = "TCO_AN071248";
			String PassWord = "4WDCtcoID#$1";
			System.setProperty("webdriver.ie.driver", "./src/test/resources/drivers/IEDriverServer.exe");
			driver = new InternetExplorerDriver();
			
			System.out.println(URL);
			driver.get(URL);
			driver.manage().window().maximize();
			
			System.out.println(UserName);
			driver.findElement(By.xpath("//*[@id=\"USERID\"]")).sendKeys(UserName);
			System.out.println(PassWord);
			driver.findElement(By.xpath("//*[@id=\"PASS\"]")).sendKeys(PassWord);
			System.out.println("going to click login");
			driver.findElement(By.xpath("//*[@id=\"ibLogin\"]")).click();
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Error trying to Login");
		}
	}

	@When("^we Enter the StateFSACode$")
	public void we_Enter_the_StateFSACode() {
		// Write code here that turns the phrase above into concrete actions
		try {
			String StateFSACode = "North Carolina (A)";
			// //*[@id="stateFsaCode"]
			//*[@id="stateFsaCode"]
			driver.findElement(By.xpath("//*[@id='stateFsaCode']")).sendKeys(StateFSACode);
//			Select drpDownbyStateFSACode = new Select(driver.findElement(By.xpath("//*[@id='stateFsaCode']")));
//	    	drpDownbyStateFSACode.selectByVisibleText(StateFSACode);
		} catch (Exception e) {
			System.out.println("Error in State FSA Code: " );
			System.out.println(e.toString());
		}
	}

	@When("^we Enter the CountyCode$")
	public void we_Enter_the_CountyCode()  {
		// Write code here that turns the phrase above into concrete actions
		try {
			String CountyCode = "Vance (A)";
			System.out.println(CountyCode);
			//*[@id="countyCode"]	
			//*[@id="countyCode"]
			driver.findElement(By.xpath("//*[@id='countyCode']")).sendKeys(CountyCode);
			Select drpDownbyProgramYear = new Select(driver.findElement(By.xpath("//*[@id='countyCode']")));
	    	drpDownbyProgramYear.selectByVisibleText(CountyCode);
			
		} catch (Exception e) {
			System.out.println("Error in the County Code");
			System.out.println(e);
		}
	}

	@When("^we Enter the ProgramYear$")
	public void we_Enter_the_ProgramYear()  {
		// Write code here that turns the phrase above into concrete actions
		try {
			String ProgramYear = "2017";
			
			// //*[@id="year"]
			driver.findElement(By.xpath("//*[@id='year']")).sendKeys(ProgramYear);
			
		} catch (Exception e) {
			System.out.println("Error in Program Year");
			System.out.println(e);
		}
	}
	
	@When("^we Select Contract$")
	public void we_Select_Contract()  {
	    // Write code here that turns the phrase above into concrete actions
	    try {
			// //*[@id="searchTypeSelected2"]
	    	WebElement radioStartwith = driver.findElement(By.xpath("//*[@id='searchTypeSelected2']"));
	    	radioStartwith.click();
	    	
		} catch (Exception e) {
			System.out.println("Error setting the radio buttons to Contract");
			System.out.println(e);
		}
	}

	@Then("^we Click Continue$")
	public void we_Click_Continue()  {
	    // Write code here that turns the phrase above into concrete actions
	    try {
			// /html/body/div/div[6]/div[2]/div[1]/form/div[6]/input
	    	// /html/body/div/div[6]/div[2]/div[1]/form/div[4]/input
	    	
	    	driver.findElement(By.xpath("/html/body/div/div[6]/div[2]/div[1]/form/div[4]/input")).click();
	    	
	    } catch (Exception e) {
			System.out.println("Error clicking Continue");
			System.out.println(e);
		}
	}
	
	@Then("^We are on the Contracts Page$")
	public void we_are_on_the_Contracts_Page()  {
	    // Write code here that turns the phrase above into concrete actions
	    try {
			// /html/body/div/div[6]/div[2]/h1
	    	String innerMenuMain = driver.findElement(By.xpath("/html/body/div/div[6]/div[2]/h1")).getAttribute("innerText");
	    	System.out.println(innerMenuMain);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@Then("^we Close the Browser$")
	public void we_Close_the_Browser()  {
	    // Write code here that turns the phrase above into concrete actions
	    try {
			driver.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
