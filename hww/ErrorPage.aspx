<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="ErrorPage.aspx.cs" Inherits="hww.ErrorPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
    <script type="text/javascript">
        localErr = "<%= Session["CsErr"]%>"
        document.write("<p style='color: red;' id='errData'>" + localErr + "</p>");
    </script>
</asp:Content>
