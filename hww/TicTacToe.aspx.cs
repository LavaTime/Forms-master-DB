﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace hww
{
    public partial class TicTacToe : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["usernameData"] is null)
            {
                Session["CsErr"] = "אנא התחבר לפני היכנסות לעמוד";
                Response.Redirect("/ErrorPage.aspx");
            }
        }
    }
}