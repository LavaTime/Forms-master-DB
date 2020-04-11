using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Xml.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hww
{
    public partial class EditUserData : System.Web.UI.Page
    {
        protected string Rusername;
        protected string Rpassword;
        protected string RfirstName;
        protected string RlastName;
        protected string Remail;
        protected int Rphone;
        protected string Raddress;
        protected string RGender;
        protected string Rdob;
        protected string Rage;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!(bool)Session["isAdmin"])
            {
                string connStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\mainDB.mdf;Integrated Security=True";
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

                Rusername = (string)Data.Tables[0].Rows[0]["username"];
                Rpassword = (string)Data.Tables[0].Rows[0]["userPassword"];
                RfirstName = (string)Data.Tables[0].Rows[0]["firstName"];
                RlastName = (string)Data.Tables[0].Rows[0]["lastName"];
                Remail = (string)Data.Tables[0].Rows[0]["email"];
                string RphoneStr = Data.Tables[0].Rows[0]["phoneNum"].ToString();
                Rphone = int.Parse(RphoneStr);
                if (Rphone == 0)
                    Rphone = 0000000000;
                Raddress = (string)Data.Tables[0].Rows[0]["homeAddress"];
                RGender = (string)Data.Tables[0].Rows[0]["Gender"];
                Rdob = Data.Tables[0].Rows[0]["dob"].ToString();
                Rage = (string)Data.Tables[0].Rows[0]["age"].ToString();
                SqlConn.Close();
            }
            else
            {
                DataSet xmlSet = new DataSet();
                xmlSet.ReadXml(System.Web.HttpContext.Current.Server.MapPath("adminTable.xml"));
                foreach (DataRow row in xmlSet.Tables[0].Rows)
                {
                    if (Session["usernameData"].ToString() == row["username"].ToString())
                    {
                        Rusername = (string)row["username"];
                        Rpassword = (string)row["userPassword"];
                        RfirstName = (string)row["firstName"];
                        RlastName = (string)row["lastName"];
                        Remail = (string)row["email"];
                        Rphone = int.Parse(row["phoneNum"].ToString());
                        if (Rphone == 0)
                            Rphone = 0;
                        Raddress = (string)row["homeAddress"];
                        RGender = (string)row["Gender"];
                        Rdob = row["dob"].ToString();
                        Rage = (string)row["age"].ToString();

                    }
                }
            }
            System.Diagnostics.Debug.WriteLine("Form[\"SubmitEdit\"] is " + Request.Form["SubmitEdit"]);
            if (Request.Form["SubmitEdit"] != null)
            {
                string username = Rusername;
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
                    if (!isEmailUnique(email) && Remail != email)
                    {
                        Session["CsErr"] = "כתובת האימייל קיימת כבר במערכת, השתמשו בדף הרשם במקום עדכון";
                        Response.Redirect("/ErrorPage.aspx");
                    }
                    if (!isUsernameUnique(username) && Rusername != username)
                    {
                        Session["CsErr"] = "שם המשתמש קיים כבר במערכת, השתמשו בדך הרשם במקום עדכון";
                        Response.Redirect("/ErrorPage.aspx");
                    }
                    if (!(bool)Session["isAdmin"])
                    {
                        String SQLConstr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\mainDB.mdf;Integrated Security=True";
                        string sqlq = string.Format("UPDATE users SET username = N'{0}', userPassword = N'{1}', firstName = N'{2}', lastName = N'{3}', email = N'{4}', phoneNum = N'{5}', homeAddress = N'{6}', Gender = N'{7}', dob = N'{8}', age = N'{9}' WHERE username = N'{10}'", username, password, firstName, lastName, email, phoneNum, address, gender, dob, age, username);
                        System.Diagnostics.Debug.WriteLine(sqlq);
                        SqlConnection SqlCon = new SqlConnection(SQLConstr);
                        SqlCommand updateQuery = new SqlCommand(sqlq, SqlCon);
                        SqlCon.Open();
                        int updatedRows = updateQuery.ExecuteNonQuery();
                        SqlCon.Close();
                        if (updatedRows == 1)
                        {
                            Response.Redirect("/Login.aspx");
                        }
                    }
                    else
                    {
                        var xmlFile = XDocument.Load(MapPath("adminTable.xml"));
                        var userNode = xmlFile.Descendants("CD").FirstOrDefault(cd => cd.Element("username").Value == username);
                        userNode.SetElementValue("userPassword", password);
                        userNode.SetElementValue("firstName", firstName);
                        userNode.SetElementValue("lastName", lastName);
                        userNode.SetElementValue("email", email);
                        userNode.SetElementValue("phoneNum", phoneNum);
                        userNode.SetElementValue("homeAddress", address);
                        userNode.SetElementValue("Gender", gender);
                        userNode.SetElementValue("dob", dob);
                        userNode.SetElementValue("age", age);
                    }
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
            string sqlConnectionStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\mainDB.mdf;Integrated Security=True";
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
            string sqlConnectionStr = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\mainDB.mdf;Integrated Security=True";
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