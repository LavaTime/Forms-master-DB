using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace hww
{
    public partial class pong : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Session["usernameData"] is null))
            {
                Session["CsErr"] = "שגיאה 401 - אינך מורשה להיכנס למשחק אלא אם אתה רשום";
                Response.Redirect("/ErrorPage.aspx");
            }
        }
    }
}