﻿ <%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="PhaserTest.aspx.cs" Inherits="hww.PhaserTest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="phaserActualStupidFile.js"></script>--%>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.22.0/dist/phaser.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
    <script type="text/javascript" src="StickFightTheGameScript.js"></script>
    <%= cheats%>

</asp:Content>
