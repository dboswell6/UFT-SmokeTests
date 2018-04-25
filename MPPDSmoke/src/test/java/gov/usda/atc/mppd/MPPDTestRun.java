package gov.usda.atc.mppd;

import cucumber.api.CucumberOptions;


@CucumberOptions(strict = true, features = "src/test/resources/", glue ="gov.usda.atc.mppd", monochrome = true)

public class MPPDTestRun {

}

