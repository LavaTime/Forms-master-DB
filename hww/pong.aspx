<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="pong.aspx.cs" Inherits="hww.pong" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="styleSheets/homeStyleSheet.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
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
    <canvas id="pongCanvas" width="1280" height="720" style="padding: 30px;"></canvas>
    <script type="text/javascript" src="pongCanvas.js"></script>
</asp:Content>