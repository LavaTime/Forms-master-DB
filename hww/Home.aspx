<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="hww.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="styleSheets/homeStyleSheet.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
    <h2 id="title"">ברוכים הבאים לאתר של עמית קרן</h2>
    <script type="text/javascript" >
        window.onscroll = function () { stickyness() };
        var navbar = document.getElementById("navbar");
        var sticky = navbar.offsetTop;
        
        function stickyness() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        }
    </script>
    <br />
    <p class="introduction">כאן אתם יכולים ליצור משתמש</p>
    <p class="introduction">בשביל ליצור משתמש לחצו בצד ימין למעלה על הרשמה</p>
    <p class="introduction">בשביל להתחבר אם יש לכם משתמש לחצו בצד ימין למעלה על התחברות</p>
    <p class="introduction">בשביל לראות את פרטי המשתמש שהמערכת שמרה התחברו</p>
    <p class="introduction">בשביל לחזור לעמוד הזה ממש לחצו על בית בצד ימין למעלה בכל אחד מדפי האתר</p>
    <p class="introduction">בנתיים תוכלו להנות מהתפריט הזה ומגיפים חמודים של חתולים מתוקים </p>
    <img class="catGif" src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif" />
    <img class="catGif" src="https://media.giphy.com/media/C9x8gX02SnMIoAClXa/giphy.gif" />
    <br />
    <img class="catGif" src="https://media.giphy.com/media/33OrjzUFwkwEg/giphy.gif" />
</asp:Content>