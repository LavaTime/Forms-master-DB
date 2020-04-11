<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="showAllUsers.aspx.cs" Inherits="hww.showAllUsers" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="styleSheets/UserInfoStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
    <%=Table %>
    <script type="text/javascript" src="checkBoxScript.js"></script>
    <br />
    <br />
    <br />
    <form id="filterForm" name="filterForm" method="POST" action="showAllUsers.aspx">
    <input type="text" id="filterText" name="filterText" placeholder="% אז הסנן שלך" />
    <input type="submit" id="submitFilter" name="submitFilter" value="סנן" />
    <input type="submit" id="deleteChecked" name="deleteChecked" value="מחק משתמשים מסומנים" />
    <input type="hidden" id="removeList" name="removeList" />
    </form>
</asp:Content>
