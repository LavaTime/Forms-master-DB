<%@ Page Title="" Language="C#" MasterPageFile="~/master.Master" AutoEventWireup="true" CodeBehind="TicTacToe.aspx.cs" Inherits="hww.TicTacToe" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .cell
        {
            text-align: center;
        }
    </style>
    <script type="text/javascript">
        var p1Turn = true;
        var p1Won = false;
        var p2Won = false;
        var emptyCells = 9
        function clickedCell(id) {
            cell = document.getElementById("input" + id);
            if (p1Turn) {
                if (cell.value == "X") {
                    cell.disabled = true;
                    p1Turn = false
                    if (document.getElementById("input0").value == "X" && document.getElementById("input1").value == "X" && document.getElementById("input2").value == "X") {
                        p1Won = true;
                    } else if (document.getElementById("input3").value == "X" && document.getElementById("input4").value == "X" && document.getElementById("input5").value == "X") {
                        p1Won = true;
                    } else if (document.getElementById("input6").value == "X" && document.getElementById("input7").value == "X" && document.getElementById("input8").value == "X") {
                        p1Won = true;
                    } else if (document.getElementById("input0").value == "X" && document.getElementById("input3").value == "X" && document.getElementById("input6").value == "X") {
                        p1Won = true;
                    } else if (document.getElementById("input1").value == "X" && document.getElementById("input4").value == "X" && document.getElementById("input7").value == "X") {
                        p1Won = true;
                    } else if (document.getElementById("input2").value == "X" && document.getElementById("input5").value == "X" && document.getElementById("input8").value == "X") {
                        p1Won = true;
                    } else if (document.getElementById("input0").value == "X" && document.getElementById("input4").value == "X" && document.getElementById("input8").value == "X") {
                        p1Won = true;
                    } else if (document.getElementById("input2").value == "X" && document.getElementById("input4").value == "X" && document.getElementById("input6").value == "X") {
                        p1Won = true;
                    } 
                } else {
                    cell.value = "";
                }
            } else {
                if (cell.value == "O") {
                    cell.disabled = true;
                    p1Turn = true;
                    if (document.getElementById("input0").value == "O" && document.getElementById("input1").value == "O" && document.getElementById("input2").value == "O") {
                        p2Won = true;
                    } else if (document.getElementById("input3").value == "O" && document.getElementById("input4").value == "O" && document.getElementById("input5").value == "O") {
                        p2Won = true;
                    } else if (document.getElementById("input6").value == "O" && document.getElementById("input7").value == "O" && document.getElementById("input8").value == "O") {
                        p2Won = true;
                    } else if (document.getElementById("input0").value == "O" && document.getElementById("input3").value == "O" && document.getElementById("input6").value == "O") {
                        p2Won = true;
                    } else if (document.getElementById("input1").value == "O" && document.getElementById("input4").value == "O" && document.getElementById("input7").value == "O") {
                        p2Won = true;
                    } else if (document.getElementById("input2").value == "O" && document.getElementById("input5").value == "O" && document.getElementById("input8").value == "O") {
                        p2Won = true;
                    } else if (document.getElementById("input0").value == "O" && document.getElementById("input4").value == "O" && document.getElementById("input8").value == "O") {
                        p2Won = true;
                    } else if (document.getElementById("input2").value == "O" && document.getElementById("input4").value == "O" && document.getElementById("input6").value == "O") {
                        p2Won = true;
                    } 
                } else {
                    cell.value = "";
                }
            }
            if (p1Won) {
                window.alert("player 1 has won!");
                location.reload();
            }
            else if (p2Won) {
                window.alert("player 2 has won!");
                location.reload();
            }
            else if (document.getElementById("input" + 0).value != "" && document.getElementById("input" + 1).value != "" && document.getElementById("input" + 2).value != "" && document.getElementById("input" + 3).value != "" && document.getElementById("input" + 4).value != "" && document.getElementById("input" + 5).value != "" && document.getElementById("input" + 6).value != "" && document.getElementById("input" + 7).value != "" && document.getElementById("input" + 8).value != "")
            {
                window.alert("Tie");
                location.reload();
            }
        }
    </script>
    <style>
        .cell {
            border: 1px solid white;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceholderBody" runat="server">
    <table>
        <tr>
            <td>
                <input type="text" id="input0" class="cell" onchange="clickedCell(0)" size="1"/>
            </td>
            <td>
                <input type="text" id="input1" class="cell" onchange="clickedCell(1)" size="1" />
            </td>
            <td>
                <input type="text" id="input2" class="cell" onchange="clickedCell(2)" size="1" />
            </td>
        </tr>
                <tr>
            <td>
                <input type="text" id="input3" class="cell" onchange="clickedCell(3)" size="1" />
            </td>
            <td>
                <input type="text" id="input4" class="cell" onchange="clickedCell(4)" size="1" />
            </td>
            <td>
                <input type="text" id="input5" class="cell" onchange="clickedCell(5)" size="1" />
            </td>
        </tr>
                <tr>
            <td>
                <input type="text" id="input6" class="cell" onchange="clickedCell(6)" size="1" />
            </td>
            <td>
                <input type="text" id="input7" class="cell" onchange="clickedCell(7)" size="1" />
            </td>
            <td>
                <input type="text" id="input8" class="cell" onchange="clickedCell(8)" size="1" />
            </td>
        </tr>
    </table>
</asp:Content>
