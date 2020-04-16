 <%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="PhaserTest.aspx.cs" Inherits="hww.PhaserTest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="phaserActualStupidFile.js"></script>--%>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.22.0/dist/phaser.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
    <script type="text/javascript" src="StickFightTheGameScript.js"></script>
    <button type="button" onclick="cheat(player1, 'ammo')">Add 100,000 ammo to player1</button>
    <br />
    <button type="button" onclick="cheat(player2, 'ammo')">Add 100,000 ammo to player2</button>
    <br />
    <button type="button" onclick="cheat(player1, 'pistol1')">Give pistol1 to player1</button>
    <br />
    <button type="button" onclick="cheat(player2, 'pistol1')">Give pistol1 to player2</button>
    <br />
    <button type="button" onclick="cheat(player1, 'assaultRifle1')">Give assaultRifle1 to player1</button>
    <br />
    <button type="button" onclick="cheat(player2, 'assaultRifle1')">Give assaultRifle1 to player2</button>
    <br />
    <button type="button" onclick="cheat(player1, 'sniperRifle1')">Give sniperRifle1 to player1</button>
    <br />
    <button type="button" onclick="cheat(player2, 'sniperRifle1')">Give sniperRifle1 to player2</button>
    <br />

</asp:Content>
