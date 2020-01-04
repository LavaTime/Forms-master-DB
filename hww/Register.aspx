<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="hww.Register" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="styleSheets/regiStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
    <script type="text/javascript">
        const heABC = "אבגדהוזחטיכלמנסעפצקרשתךםןףץ ";
const ABC = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890"
function checkAll() {
    /*
    define an array that will contain all of the results of the check functions and then loop tru it and check if there are a false (errs)
    if there are no error return true
    if there are errors then return false and not refresh the page
    */
    // add the email phone and address checks
    var validation = [checkUsername(), checkPassword(), checkFirstName(), checkLastName(), checkBirthdate(), checkEmail(), checkPhone()];

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
        if (password[i] == password[i].toUpperCase())
            includesCapital = true;
        if (password[i] == password[i].toLowerCase())
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

function checkFirstName() {
    /*
     * Check the first name accordiang to all of the validations
     * */
    var firstName = document.getElementById("firstName").value;
    if (firstName == "") {
        document.getElementById("errFirstName").innerHTML = "בבקשה הכנס שם פרטי"
        return false;
    }
    for (var i = 0; i < firstName.length; i++) {
        if (!heABC.includes(firstName[i])) {
            // Check if the Hebrew Alphabet contains all of the letters from the first name
            document.getElementById("errFirstName").innerHTML = "השם הפרטי אינו תקין";
            return false;
        }
    }
    document.getElementById("errFirstName").innerHTML = "";
    return true;
}

function checkLastName() {
    /*
    * Check the last name accordiang to all of the validations
    * */
    var lastName = document.getElementById("lastName").value;
    if (lastName == "") {
        document.getElementById("errLastName").innerHTML = "בבקשה הכנס שם משפחה"
        return false;
    }
    for (var i = 0; i < lastName.length; i++) {
        if (!heABC.includes(lastName[i])) {
            // Check if the Hebrew Alphabet contains all of the letters from the last name
            document.getElementById("errLastName").innerHTML = "שם המשפחה אינו תקין";
            return false;
        }
    }
    document.getElementById("errLastName").innerHTML = "";
    return true;
}

function checkEmail() {
    /*
     * check if the email cotanis ony english letters, numbers, ONE @ and one .
     * */
    var email = document.getElementById("email").value;
    var atCount = 0;
    var dotCount = 0;
    if (email == "") {
        // Check if the user even typed an email
        document.getElementById("errEmail").innerHTML = "בבקשה הכנס כתובת אימייל";
        return false;
    }

    for (var i = 0; i < email.length; i++) {
        // loop thru all the email and check if it's in the ABC var that contains all of the English Alphabet (Capitale or not) and @ and .
        if (!"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@.123456789".includes(email[i])) {
            document.getElementById("errEmail").innerHTML = "האימייל אינו תקין";
            return false;
        }
        if (email[i] == "@") {
            atCount += 1;
        } else if (email[i] == ".") {
            dotCount += 1;
        }
    }
    if (atCount == 1 && dotCount == 1) {
        document.getElementById("errEmail").innerHTML = "";
        return true;
    } else {
        document.getElementById("errEmail").innerHTML = "האימייל אינו תקין";
        return false;
    }
}

function checkPhone() {
    var phone = document.getElementById("phone").value;
    if (phone.length == 10 || phone.length == 0) {
        document.getElementById("errPhone").innerHTML = "";
        return true;
    } else {
        document.getElementById("errPhone").innerHTML = "מספר הטלפון אינו תקין";
        return false;
    }
}

function otherGender() {
    /*
     * Check if the "Other" gender radio button pressed, and if it did change the visibility of the input text to write a custom gender
     * */
    if (document.getElementById("other").checked) {
        document.getElementById("notListedGender").style.visibility = "visible"
    }
    else {
        document.getElementById("notListedGender").style.visibility = "hidden"
    }
}


function checkBirthdate() {
    /*
     * Check for the birthdate to see if it's after 1960 using convertion of the date to a Date object from the class Date, and the method getFullYear which returns the full year of the date
     * */
    var birthDate = document.getElementById('birthdate').value;
    if (new Date(birthDate).getFullYear() <= 1960) {
        document.getElementById("errBirthdate").innerHTML = "תאריך הלידה אינו תקין";
        return false;
    } else {
        document.getElementById("errBirthdate").innerHTML = "";
        return true;
    }
}




// ADD THE UPDATE AGE TESTING FOR THE MONTHS AND DATES FIXED

function updateAge() {
    /*
     * update the age field according the birthdate that user typed, check the month, and if the month is after/is the current month check the day 
     * to see if the users birthdate this year occured,
     * if non apply then calculate the substraction of the time since Epoch (global computer time starting point) and the users birthdate converted to miliseconds
     * */
    var birthDate = new Date(document.getElementById("birthdate").value);
    var timeSinceEpoch = Date.now();
    var timeAlive = timeSinceEpoch - birthDate;
    var timeAliveConverted = new Date(timeAlive);
    var age = Math.abs(timeAliveConverted.getUTCFullYear() - 1970)
    if (birthDate.getMonth > timeSinceEpoch.getMonth)
    {
        age--;
    } else if (birthDate.getMonth == timeSinceEpoch.getMonth)
    {
        if (birthDate.getDate < timeSinceEpoch.getDate) {
            age--;
        }
    }
    document.getElementById("ageInput").value = age;
}

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
