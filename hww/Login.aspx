<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="hww.Login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">

    <form id="loginForm">
        <!--- remember to use method and action --->
        <table>
            <tr>
                <td>
                    שם משתמש
                </td>
                <td>
                    <!--- add client-side checking script for the username validation --->
                    <input type="text" id="username" name="username" required autocomplete="on" />
                </td>
                <td>
                    <p id="errUsername" class="err" style="color: red;">
                        
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    סיסמה
                </td>
                <td>
                    <!--- add client-side checking script for the password validation --->
                    <input type="password" id="password" name="password" required autocomplete="on" />
                </td>
                <td>
                    <p id="errPassword" class="err" style="color: red;">

                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <!--- add function for onclick validating all of the fields above --->
                    <input type="submit" id="sumbit" value="התחבר" />
                </td>
            </tr>
        </table>
    </form>

</asp:Content>
