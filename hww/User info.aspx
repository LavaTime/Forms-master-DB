<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="User info.aspx.cs" Inherits="hww.User_info" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" href="/styleSheets/UserInfoStyleSheet.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">

    <%=table %>

    <!--- <table id="userInfoTable"><tr><th class="cell">שם משתמש</th><th class="cell">סיסמה</th><th class="cell">שם פרטי</th><th class="cell">שם משפחה</th><th class="cell">כתובת אימייל</th><th class="cell">מספר טלפון</th><th class="cell">כתובת</th><th class="cell">מין</th><th class="cell">תאריך לידה</th></tr><tr><td class="cell">{0}</td><td class="cell">{1</td><td class="cell">{2}</td><td class="cell">{3}</td><td class="cell">{4}</td><td class="cell">{5}</td><td class="cell">{6}</td><td class="cell">{7}</td><td class="cell">{8}</td></tr></table> --->

</asp:Content>
