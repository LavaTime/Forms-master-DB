<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="User info.aspx.cs" Inherits="hww.User_info" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" href="UserInfoStyleSheet.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">

    <table id="userInfoTable">
        <tr>
            <th class="cell">
                שם משתמש
            </th>
            <th class="cell">
                סיסמה
            </th>
            <th class="cell">
                שם פרטי
            </th>
            <th class="cell">
                שם משפחה
            </th>
            <th class="cell">
                כתובת אימייל
            </th>
            <th class="cell">
                מספר טלפון
            </th>
            <th class="cell">
                כתובת
            </th>
            <th class="cell">
                מין
            </th>
            <th class="cell">
                תאריך לידה
            </th>
        </tr>
        <tr>
            <td class="cell">
                שם משתמש לדוגמה
            </td>
            <td class="cell">
                סיסמה לדוגמה
            </td>
            <td class="cell">
                שם פרטי לדוגמה
            </td>
            <td class="cell">
                שם משפחה לדוגמה
            </td>
            <td class="cell">
                כתובת אימייל לדוגמה
            </td>
            <td class="cell">
                מספר טלפון לדוגמה
            </td>
            <td class="cell">
                כתובת לדוגמה
            </td>
            <td class="cell">
                מין לדוגמה
            </td>
            <td class="cell">
                תאריך לידה לדוגמה
            </td>
        </tr>
    </table>

</asp:Content>
