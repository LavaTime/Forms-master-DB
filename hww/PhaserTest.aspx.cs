using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace hww
{
    public partial class PhaserTest : System.Web.UI.Page
    {
        protected string cheats = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Session["usernameData"] is null))
            {
                Session["CsErr"] = "שגיאה 401 - אינך מורשה להיכנס למשחק אלא אם אתה רשום";
                Response.Redirect("/ErrorPage.aspx");
            } 
            if (Session["isAdmin"].ToString() == "True")
            {
                cheats = "<button type=\"button\" onclick=\"cheat(player1, 'ammo')\">Add 100,000 ammo to player1</button><br/><button type = \"button\" onclick = \"cheat(player2, 'ammo')\"> Add 100,000 ammo to player2 </button><br/><button type = \"button\" onclick = \"cheat(player1, 'pistol1')\">Give pistol1 to player1</button><br/><button type = \"button\" onclick = \"cheat(player2, 'pistol1')\">Give pistol1 to player2</button><br/><button type = \"button\" onclick = \"cheat(player1, 'assaultRifle1')\">Give assaultRifle1 to player1</button><br/><button type = \"button\" onclick = \"cheat(player2, 'assaultRifle1')\">Give assaultRifle1 to player2</button><br/><button type = \"button\" onclick = \"cheat(player1, 'sniperRifle1')\">Give sniperRifle1 to player1</button><br/><button type = \"button\" onclick = \"cheat(player2, 'sniperRifle1')\">Give sniperRifle1 to player2</button><br/><br/>";
            }
            
        }
    }
}