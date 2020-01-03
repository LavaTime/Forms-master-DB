using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
// importing the libraries for SQL
using System.Data;
using System.Data.SqlClient;

namespace hww
{
    public partial class Register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Form["Submit"] != null)
            {
                string username = Request.Form["username"];
                string password = Request.Form["password"];
                string firstName = Request.Form["firstName"];
                string lastName = Request.Form["lastName"];
                string email = Request.Form["email"];
                string phoneNum = Request.Form["phone"];
                string address = Request.Form["address"];
                string gender = Request.Form["gender"];
                string dob = Request.Form["birthdate"];
                string age = Request.Form["ageInput"];

                if (email != "" && username != "")
                {
                    if (!isEmailUnique(email))
                    {
                        Session["CsErr"] = "Email isn't unique!";
                        Response.Redirect("../ErrorPage.aspx");
                    }
                    if (!isUsernameUnique(username))
                    {
                        Session["CsErr"] = "The username isn't unique";
                        Response.Redirect("../ErrorPage.aspx");
                    }
                }
                // Connection string taken from the server explorer
                string SQLconnectionStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\amitk\source\repos\LavaTime\Forms-master-DB\hww\App_Data\mainDB.mdf;Integrated Security=True";
                // Insert query to insert the corresponding data from the post to the database
                string SQLQuery = string.Format("INSERT INTO users " +
                    "(username, userPassword, firstName, lastName, email, phoneNum, homeAddress, Gender, dob, age) " +
                    "VALUES (N'{0}', N'{1}', N'{2}', N'{3}', N'{4}', N'{5}', N'{6}', N'{7}', N'{8}', N'{9}')", username, password, firstName, lastName, email, phoneNum, address, gender, dob, age);
                // define the objects from the class SqlConnection and SqlCommand an pass as the parameter the variables previously defined
                SqlConnection connectionObj = new SqlConnection(SQLconnectionStr);
                SqlCommand queryObj = new SqlCommand(SQLQuery, connectionObj);
                connectionObj.Open();
                int rowsAffected = queryObj.ExecuteNonQuery();
                connectionObj.Close();
                if (rowsAffected == 1)
                {
                    Response.Redirect("../Login.aspx");
                }
            }
        }

        bool isEmailUnique(string mail)
        {
            /*
             * Check in the databse if the sumbitted emial exists or if it's unique,
             * */
            bool exists = false;
            // Sql database connection string
            string sqlConnectionStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\amitk\Source\Repos\LavaTime\Forms-master-DB\hww\App_Data\mainDB.mdf;Integrated Security=True";
            SqlConnection SqlConn = new SqlConnection(sqlConnectionStr);
            string sqlCmdString = string.Format("SELECT * FROM users WHERE (email = N'{0}')", mail);
            SqlCommand sqlCmd = new SqlCommand(sqlCmdString, SqlConn);
            SqlConn.Open();
            SqlDataReader reader = sqlCmd.ExecuteReader();
            if (reader.HasRows)
                exists = true;
            SqlConn.Close();
            return (!exists);
        }

        bool isUsernameUnique(string user)
        {
            /*
             * 
             * */
            bool exists = false;
            //Sql databse connection string
            string sqlConnectionStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\amitk\Source\Repos\LavaTime\Forms-master-DB\hww\App_Data\mainDB.mdf;Integrated Security=True";
            SqlConnection SqlConn = new SqlConnection(sqlConnectionStr);
            string sqlCmdString = string.Format("SELECT * FROM users WHERE (username = N'{0}')", user);
            SqlCommand SqlCmd = new SqlCommand(sqlCmdString, SqlConn);
            SqlConn.Open();
            SqlDataReader reader = SqlCmd.ExecuteReader();
            if (reader.HasRows)
                exists = true;
            SqlConn.Close();
            return (!exists);
        }
    }
}