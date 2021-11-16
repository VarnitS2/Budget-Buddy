import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  // Global styles
  root: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    backgroundColor: "white",
    color: "#161519",
  },
  displayColumn: {
    display: "flex",
    flexDirection: "column",
  },
  displayCenter: {
    display: "flex",
    justifyContent: "center",
  },
  textFieldItemOne: {
    width: "350px",
    marginTop: "50px",
  },
  textFieldItemTwo: {
    width: "350px",
    marginTop: "10px",
  },
  pad: {
    padding: "10px",
  },

  // Home View styles
  homeView_headerColumn: {
    display: "flex",
    flexDirection: "column",
  },
  homeView_budgetBuddyHeader: {
    display: "flex",
    justifyContent: "center",
    marginTop: "300px",
    fontSize: "80px",
  },
  homeView_budgetBuddyDesc: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    fontSize: "40px",
  },
  homeView_topNavBar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  homeView_signUpButton: {
    width: "150px",
    height: "50px",
    marginTop: "30px",
    marginRight: "30px",
    borderRadius: "100px",
    color: "#161519",
    borderColor: "#161519",
  },

  // Register View styles
  registerView_alertContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    marginTop: "150px",
    marginLeft: "33px",
  },
  registerView_signUpText: {
    display: "flex",
    justifyContent: "center",
    fontSize: "40px",
    marginTop: "300px",
  },
  registerView_signUpButton: {
    width: "150px",
    height: "50px",
    marginTop: "20px",
    borderRadius: "100px",
  },
  registerView_bottomText: {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    color: "gray",
    marginTop: "260px",
  },
  registerView_linkContainer: {
    marginTop: "262px",
    marginLeft: "6px",
    fontSize: "20px",
    color: "gray",
  },

  // Login View styles
  loginView_alertContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    marginTop: "150px",
    marginLeft: "80px",
  },
  loginView_loginText: {
    display: "flex",
    justifyContent: "center",
    fontSize: "40px",
    marginTop: "300px",
  },
  loginView_loginButton: {
    width: "150px",
    height: "50px",
    marginTop: "20px",
    borderRadius: "100px",
  },
  loginView_bottomText: {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    color: "gray",
    marginTop: "388px",
  },
  loginView_linkContainer: {
    marginTop: "390.7px",
    marginLeft: "6px",
    fontSize: "20px",
    color: "gray",
  },

  // Dashboard View styles
  dashboardView_topNavBarContainer: {
    padding: "10px",
  },
  dashboardView_topNavBar: {
    display: "flex",
    justifyContent: "space-between",
    height: "100px",
    backgroundColor: "#344756",
    borderRadius: "15px",
  },
  dashboardView_title: {
    width: "99.5%",
    textAlign: "center",
    position: "absolute",
    marginTop: "15px",
    fontSize: "45px",
    fontFamily: "verdana",
  },
  dashboardView_buttons__addTransaction: {
    position: "relative",
    marginTop: "30px",
    marginLeft: "30px",
    borderRadius: "100px",
    color: "#DBD8E3",
    borderColor: "#DBD8E3",
    zIndex: "1",
  },
  dashboardView_buttons__userSettings: {
    marginTop: "30px",
    marginRight: "20px",
    borderRadius: "100px",
    color: "#DBD8E3",
    borderColor: "#DBD8E3",
  },
  dashboardView_buttons__signOut: {
    marginTop: "30px",
    marginRight: "30px",
    borderRadius: "100px",
    color: "#DBD8E3",
    borderColor: "#DBD8E3",
  },
  dashboardView_midRowContainer: {
    height: "600px",
    display: "flex",
    padding: "10px",
  },
  dashboardView_transactionsContainer: {
    width: "70%",
    marginTop: "-10px",
    backgroundColor: "#344756",
    borderRadius: "15px",
  },
  dashboardView_transactionsContainerInner: {
    marginTop: "30px",
    marginLeft: "5px",
  },
  dashboardView_dateRangeContainer: {
    width: "30%",
    marginTop: "-10px",
    marginLeft: "10px",
    backgroundColor: "#344756",
    borderRadius: "15px",
  },
  dashboardView_dateRangeTitle: {
    fontSize: "22px",
    fontFamily: "verdana",
    marginTop: "20px",
    marginLeft: "30px",
  },
  dashboardView_dateRangeInner: {
    width: "340px",
    height: "462px",
    borderRadius: "10px",
    marginTop: "20px",
    marginLeft: "145px",
    backgroundColor: "white",
  },
  dashboardView_dateRangeInnerInner: {
    marginLeft: "10px",
  },
  dashboardView_dateRangeFetchButton: {
    marginTop: "20px",
    marginLeft: "270px",
    borderRadius: "100px",
    color: "#DBD8E3",
    borderColor: "#DBD8E3",
  },
  dashboardView_bottomRowContainer: {
    marginTop: "-10px",
    height: "462px",
    backgroundColor: "#344756",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
  },
  dashboardView_lastPaycheckText: {
    marginLeft: "100px",
    fontSize: 35,
  },

  // User Settings View styles
  userSettingsView_alertContainer: {
    position: "absolute",
    marginTop: "480px",
  },
  userSettingsView_backButton: {
    position: "absolute",
    width: "150px",
    height: "50px",
    marginTop: "30px",
    marginLeft: "30px",
    borderRadius: "100px",
  },
  userSettingsView_settings: {
    marginTop: "20px",
    fontSize: "60px",
  },
  userSettingsView_currentUserText: {
    marginTop: "200px",
    fontSize: "30px",
  },
  userSettingsView_deleteAccountButton: {
    width: "200px",
    height: "50px",
    marginTop: "700px",
    borderRadius: "100px",
    color: "red",
  },
  userSettingsView_passwordContainer: {
    position: "absolute",
    marginTop: "560px",
  },
  userSettingsView_passwordText: {
    marginTop: "20px",
  },
});

export default useStyles;
