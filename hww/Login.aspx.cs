using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
// imports
using System.Data;
using System.Data.SqlClient;

namespace hww
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Form["submitLogin"] != null)
            {
                // pull the username and passwords from the form
                string username = Request.Form["username"];
                string password = Request.Form["password"];
                // check to see if the username exists

                if (IsCorrect(username, password))
                {
                    Session["usernameData"] = username;
                    Session["passwordData"] = password;
                    Response.Redirect("/User%20info.aspx");
                }
                else
                {
                    Session["CsErr"] = "שגיאה 401 המשתמש לא נמצא או שסיסמא לא נכונה";
                    Response.Redirect("/ErrorPage.aspx");
                }
                
            }
        }

        public bool IsCorrect(string usern, string pass)
        {
            /*
             * Check the sql database for any row that contains both the entered username and the entered password
             * */

            bool correct = false;
            // use the connection string recevied from the mainDB properties
            string SQLConnStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\amitk\Source\Repos\LavaTime\Forms-master-DB\hww\App_Data\mainDB.mdf;Integrated Security=True";
            // convert the SQLConn to an SqlConnection Object
            SqlConnection SQLConn = new SqlConnection(SQLConnStr);
            // create the command to look for fields that have the same username and password as the user entered
            string SQLCmdStr = string.Format("SELECT * FROM users WHERE username=N'{0}' AND userPassword=N'{1}'", usern, pass);
            // convert the SqlCmdStr to an SqlCommand Object
            SqlCommand SQLCmd = new SqlCommand(SQLCmdStr, SQLConn);
            // Open the connection to the mainDB database
            SQLConn.Open();
            // execute the query in sql on the mainDB database and save the result
            SqlDataReader reader = SQLCmd.ExecuteReader();

            if (reader.HasRows)
            {
                correct = true;
            }
            // Close to the connection to the mainDB database
            SQLConn.Close();
            // return the result
            return correct;
        }
    }
}