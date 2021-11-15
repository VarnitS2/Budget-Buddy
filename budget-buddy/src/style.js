import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  // Global styles
  root: {
    fontFamily: "BlinkMacSystemFont",
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
  dashboardView_title: {
    marginTop: "20px",
    fontSize: "60px",
  },
  dashboardView_buttons: {
    borderRadius: "100px",
    marginLeft: "10px",
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
