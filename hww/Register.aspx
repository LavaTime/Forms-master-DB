﻿<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="hww.Register" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="styleSheets/regiStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
    <script type="text/javascript" src="checkRegisScript.js">
    </script>
            <form id="regis" action="Register.aspx" method="POST">
        <table>
            <tr>
                <td>שם משתמש</td>
                <td><input type="text" id="username" name="username" required autocomplete="on" onchange="checkUsername()"/></td>
                <td><p id="errUsername" class="err"></p></td>
            </tr>
                <tr>
                <td>סיסמה</td>
                <td><input type="password" id="password" name="password" required autocomplete="on" onchange="checkPassword()"/></td>
                <td><p id="errPassword" class="err"></p></td>
            </tr>
            <tr>
                <td>שם פרטי</td>
                <td><input type="text" id="firstName" name="firstName" required autocomplete="on" onchange="checkFirstName()"/></td>
                <td><p id="errFirstName" class="err"></p></td>
            </tr>
            <tr>
                <td>שם משפחה</td>
                <td><input type="text" id="lastName" name="lastName" required autocomplete="on" onchange="checkLastName()"/></td>
                <td><p id="errLastName" class="err"></p></td>
            </tr>
            <tr>
                <td>כתובת אימייל</td>
                <td><input type="email" id="email" name="email" required autocomplete="on" onchange="checkEmail()"/></td>  <!--- add onchange checkEmail --->
                <td><p id="errEmail" class="err"></p></td>
            </tr>
            <tr>

                <td>טלפון</td>
                <td><input type="tel" id="phone" name="phone" autocomplete="on" onchange="checkPhone()"/></td>  <!--- add onchange check phone --->
                <td><p id="errPhone" class="err"></p></td>
            </tr>
            <tr>
                <td>כתובת</td>
                <td><input type="text" id="address" name="address" autocomplete="on" /></td> <!--- add onchange check address --->
                <td><p id="errAddress" class="err"></p></td>
            </tr>
            <tr>
                <td>מין</td>
                <td>
                    <input type="radio" id="male" name="gender" value="זכר" onchange="otherGender();"/>
                    <label for="male">זכר</label>
                     <input type="radio" id="female" name="gender" value="נקבה" onchange="otherGender();"/>
                    <label for="female">נקבה</label>
                    <input type="radio" id="other" name="gender" value="אחר" onchange="otherGender();"/>
                    <label for="other">אחר</label>
                </td>
                <td>
                    <input type="text" id="notListedGender" name="gender" autocomplete="on" style="visibility: hidden;" placeholder="הכניסו את המין שלכם"/>
                </td>
                <td>
                    <p id="errGender" class="err"></p>
                </td>
            </tr>
            <tr>
                <td>תאריך לידה</td>
                <td><input type="date" id="birthdate" name="birthdate" onchange="updateAge();" required autocomplete="on" onmouseout="checkBirthdate();"/></td>
                <td><p id="errBirthdate" class="err"></p></td>
            </tr>

            <tr>
                <td>גיל</td>
                <td><input type="number" value="" name="ageInput" id="ageInput" readonly/></td>
            </tr>
            <tr>
                <td>
                    <input type="submit" id="Submit" name="Submit" onclick="return checkAll();" value="רשום" />
                </td>
            </tr>
            <tr>
                <td>
                </td>
            </tr>
        </table>
    </form>
</asp:Content>
