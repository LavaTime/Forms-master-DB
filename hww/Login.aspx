﻿<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="hww.Login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="styleSheets/loginStyleSheet.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">

    <form id="loginForm" action="Login.aspx" method="POST">
        <table>
            <tr>
                <td>
                    שם משתמש
                </td>
                <td>
                    <!--- add client-side checking script for the username validation FIXED --->
                    <input type="text" id="username" name="username" onchange="checkUsername();" required autocomplete="on" />
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
                    <!--- add client-side checking script for the password validation FIXED--->
                    <input type="password" id="password" name="password" onchange="checkPassword();" required autocomplete="on" />
                </td>
                <td>
                    <p id="errPassword" class="err" style="color: red;">

                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <!--- add function for onclick validating all of the fields above FIXED--->
                    <input type="submit" id="submitLogin" name="submitLogin" onclick="return checkAll();" value="התחבר" />
                </td>
            </tr>
        </table>
    </form>
    <script type="text/javascript" >
        const ABC = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890"
function checkAll() {
    /*
    define an array that will contain all of the results of the check functions and then loop tru it and check if there are a false (errs)
    if there are no error return true
    if there are errors then return false and not refresh the page
    */
    // add the email phone and address checks
    var validation = [checkUsername(), checkPassword()];

    for (var i = 0; i < validation.length; i++) {
        if (!validation[i]) {
            return false;
        }
    }
    return true;
}

function checkUsername() {
    /*
     * checks to see if the username is valid and isn't set the err message
     * 
     * */
    var username = document.getElementById("username").value;
    if (username == "") {
        // Check if the user even typed a username
        document.getElementById("errUsername").innerHTML = "בבקשה הכנס שם משתמש";
        return false;
    }

    for (var i = 0; i < username.length; i++) {
        // loop thru all the username and check if it's in the ABC var that contains all of the English Alphabet (Capitale or not) and _ and numbers
        if (!ABC.includes(username[i])) {
            document.getElementById("errUsername").innerHTML = "שם המשתמש אינו תקין";
            return false;
        }
    }
    document.getElementById("errUsername").innerHTML = "";
    return true;
}

function checkPassword() {
    /*
     * Check for the validation of the password field and if isn't return an error message
     * */
    var includesCapital = false;
    var includesLower = false;
    var password = document.getElementById("password").value;
    if (password == "") {
        // check if the user even enterd a password
        document.getElementById("errPassword").innerHTML = "בבקשה הכנס סיסמה!";
        return false;
    }
    for (var i = 0; i < password.length; i++) {
        // check for all the credentials (the ABC var containing all of the letters of the password, and for the length to make sure it's not too short or too long_
        if (!ABC.includes(password[i]) || password.length > 10 || password.length < 6) {
            document.getElementById("errPassword").innerHTML = "הסיסמה אינה תקינה";
            return false;
        }
        // check if the current letter is capitale or not, and then if there is a capital and a non-capitale then return True for both of the variables
        if (password[i] == password.toUpperCase())
            includesCapital = true;
        if (password[i] == passsword.toLowerCase())
            includesLower = true;
    }
    if (!includesCapital && !includesLower) {
        // Check too see if both of the Bool var are true (meaing there are atleast 1 capitale and 1 non-capitale)
        document.getElementById("errPassword").innerHTML = "הסיסמה לא מכילה לפחות אות אחת גדולה ואות אחת קטנה";
        return false;
    }
    document.getElementById("errPassword").innerHTML = "";
    return true;
}

    </script>

</asp:Content>
