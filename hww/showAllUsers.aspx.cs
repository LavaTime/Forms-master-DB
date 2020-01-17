using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

namespace hww
{
    public partial class showAllUsers : System.Web.UI.Page
    {
        protected string Table = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["isAdmin"].ToString() == "True")
            {
                Table += "<table cellpadding = \"5\" id = \"AlluserInfoTable\"><tr><th class=\"cell\">שם משתמש</th><th class=\"cell\">סיסמה</th><th class=\"cell\">שם פרטי</th><th class=\"cell\">שם משפחה</th><th class=\"cell\">כתובת אימייל</th><th class=\"cell\">מספר טלפון</th><th class=\"cell\">כתובת</th><th class=\"cell\">מין</th><th class=\"cell\">תאריך לידה</th></tr>";
                System.Diagnostics.Debug.WriteLine(Table);
                string connStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\amitk\source\repos\LavaTime\Forms-master-DB\hww\App_Data\mainDB.mdf;Integrated Security=True";
                SqlConnection SqlConn = new SqlConnection(connStr);
                string cmdStr = string.Format("SELECT * FROM users");
                SqlCommand SqlCmd = new SqlCommand(cmdStr, SqlConn);
                SqlConn.Open();
                SqlDataAdapter dataAdapter = new SqlDataAdapter(cmdStr, connStr);
                DataSet Data = new DataSet();
                dataAdapter.Fill(Data);
                foreach (DataRow row in Data.Tables[0].Rows)
                {
                    string Rusername = (string)row["username"];
                    string Rpassword = (string)row["userPassword"];
                    string RfirstName = (string)row["firstName"];
                    string RlastName = (string)row["lastName"];
                    string Remail = (string)row["email"];
                    string Rphone = row["phoneNum"].ToString();
                    if (Rphone == "0")
                        Rphone = "";
                    string Raddress = (string)row["homeAddress"];
                    string RGender = (string)row["Gender"];
                    string Rdob = row["dob"].ToString();
                    string Rage = (string)row["age"].ToString();
                    string tempRow = string.Format("<tr><td class=\"cell\">{0}</td><td class=\"cell\">{1}</td><td class=\"cell\">{2}</td><td class=\"cell\">{3}</td><td class=\"cell\">{4}</td><td class=\"cell\">{5}</td><td class=\"cell\">{6}</td><td class=\"cell\">{7}</td><td class=\"cell\">{8}</td><td class=\"cell\">{9}</td></tr>", Rusername, Rpassword, RfirstName, RlastName, Remail, Rphone, Raddress, RGender, Rdob, Rage);
                    Table += tempRow;
                }
                Table += "</table>";
            }
            else
            {
                Table = "<p style=\"color: white;\">שגיאה חזרו לעמוד הבית</p>";
            }
        }
    }
}