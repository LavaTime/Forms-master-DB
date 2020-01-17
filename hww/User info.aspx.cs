using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Threading;

namespace hww
{
    public partial class User_info : System.Web.UI.Page
    {
        protected string table = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["usernameData"] == null)
            {
                Session["CsErr"] = "שגיאה 404 אנא הכנס פרטי משתמש";
                Response.Redirect("ErrorPage.aspx");
            }
            if (Session["isAdmin"].ToString() == "True")
            {
                DataSet Data = new DataSet();
                Data.ReadXml(MapPath("adminTable.xml"));
                // thought about using a for loop as showen in DbExample but
                // I wanted to do it seperatily to have all of the values seperated with names
                // The R at the start stands for received
                foreach (DataRow row in Data.Tables[0].Rows)
                {
                    if (row["username"].ToString() == Session["usernameData"].ToString())
                    {
                        string Rusername = (string)Data.Tables[0].Rows[0]["username"];
                        string Rpassword = (string)Data.Tables[0].Rows[0]["userPassword"];
                        string RfirstName = (string)Data.Tables[0].Rows[0]["firstName"];
                        string RlastName = (string)Data.Tables[0].Rows[0]["lastName"];
                        string Remail = (string)Data.Tables[0].Rows[0]["email"];
                        string Rphone = Data.Tables[0].Rows[0]["phoneNum"].ToString();
                        if (Rphone == "0")
                            Rphone = "";
                        string Raddress = (string)Data.Tables[0].Rows[0]["homeAddress"];
                        string RGender = (string)Data.Tables[0].Rows[0]["Gender"];
                        string Rdob = Data.Tables[0].Rows[0]["dob"].ToString();
                        string Rage = (string)Data.Tables[0].Rows[0]["age"].ToString();
                        table = string.Format("<table cellpadding = \"5\" id = \"userInfoTable\"><tr><th class=\"cell\">שם משתמש</th><th class=\"cell\">סיסמה</th><th class=\"cell\">שם פרטי</th><th class=\"cell\">שם משפחה</th><th class=\"cell\">כתובת אימייל</th><th class=\"cell\">מספר טלפון</th><th class=\"cell\">כתובת</th><th class=\"cell\">מין</th><th class=\"cell\">תאריך לידה</th></tr><tr><td class=\"cell\">{0}</td><td class=\"cell\">{1}</td><td class=\"cell\">{2}</td><td class=\"cell\">{3}</td><td class=\"cell\">{4}</td><td class=\"cell\">{5}</td><td class=\"cell\">{6}</td><td class=\"cell\">{7}</td><td class=\"cell\">{8}</td></tr></table>", Rusername, Rpassword, RfirstName, RlastName, Remail, Rphone, Raddress, RGender, Rdob, Rage);
                    }
                }

            }
            else
            {
                // add an if to check for Session Admin
                string connStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\amitk\source\repos\LavaTime\Forms-master-DB\hww\App_Data\mainDB.mdf;Integrated Security=True";
                SqlConnection SqlConn = new SqlConnection(connStr);
                string cmdStr = string.Format("SELECT * FROM users WHERE (username = N'{0}')", Session["usernameData"]);
                SqlCommand SqlCmd = new SqlCommand(cmdStr, SqlConn);
                SqlConn.Open();
                SqlDataAdapter dataAdapter = new SqlDataAdapter(cmdStr, connStr);
                DataSet Data = new DataSet();
                dataAdapter.Fill(Data);
            // thought about using a for loop as showen in DbExample but
            // I wanted to do it seperatily to have all of the values seperated with names
            // The R at the start stands for received
            string Rusername = (string) Data.Tables[0].Rows[0]["username"];
            string Rpassword = (string) Data.Tables[0].Rows[0]["userPassword"];
            string RfirstName = (string) Data.Tables[0].Rows[0]["firstName"];
            string RlastName = (string) Data.Tables[0].Rows[0]["lastName"];
            string Remail = (string) Data.Tables[0].Rows[0]["email"];
            string Rphone = Data.Tables[0].Rows[0]["phoneNum"].ToString();
            if (Rphone == "0")
                Rphone = "";
            string Raddress = (string) Data.Tables[0].Rows[0]["homeAddress"];
            string RGender = (string) Data.Tables[0].Rows[0]["Gender"];
            string Rdob = Data.Tables[0].Rows[0]["dob"].ToString();
            string Rage = (string) Data.Tables[0].Rows[0]["age"].ToString();
            SqlConn.Close();
            table = string.Format("<table cellpadding = \"5\" id = \"userInfoTable\"><tr><th class=\"cell\">שם משתמש</th><th class=\"cell\">סיסמה</th><th class=\"cell\">שם פרטי</th><th class=\"cell\">שם משפחה</th><th class=\"cell\">כתובת אימייל</th><th class=\"cell\">מספר טלפון</th><th class=\"cell\">כתובת</th><th class=\"cell\">מין</th><th class=\"cell\">תאריך לידה</th></tr><tr><td class=\"cell\">{0}</td><td class=\"cell\">{1}</td><td class=\"cell\">{2}</td><td class=\"cell\">{3}</td><td class=\"cell\">{4}</td><td class=\"cell\">{5}</td><td class=\"cell\">{6}</td><td class=\"cell\">{7}</td><td class=\"cell\">{8}</td></tr></table>", Rusername, Rpassword, RfirstName, RlastName, Remail, Rphone, Raddress, RGender, Rdob, Rage);
            }
            if (Request.Form["updateInfo"] != null || Request.Form["updateInfoB"] != null)
            {
                Response.Redirect("/EditUserData.aspx");
            }
            if (Request.Form["deleteInfo"] != null)
            {
                // FIXE deleted message!!!
                string sqlConString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\amitk\source\repos\LavaTime\Forms-master-DB\hww\App_Data\mainDB.mdf;Integrated Security=True";
                SqlConnection sqlConnection = new SqlConnection(sqlConString);
                string SqlDeleteCmdString = string.Format("DELETE FROM users WHERE username = N'{0}'", Session["usernameData"]);
                SqlCommand SqlDeleteCmd = new SqlCommand(SqlDeleteCmdString, sqlConnection);
                sqlConnection.Open();
                int deleteLines = SqlDeleteCmd.ExecuteNonQuery();
                System.Diagnostics.Debug.WriteLine(deleteLines);
                sqlConnection.Close();
                if (deleteLines != 0)
                {
                    Response.Redirect("/Home.aspx");
                }
            }
        }
    }
}