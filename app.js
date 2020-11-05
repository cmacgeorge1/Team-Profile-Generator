const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array to store employee data
const allEmployees = [];
// Array to verify that no IDs that are created are the same
const idArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

generateEmployee();

function generateEmployee() {
    inquirer.prompt(
        {
            type: "list",
            name: "role",
            message: "What is your company title?",
            choices: ["Manager", "Engineer", "Intern", "Quit"]
        }).then(function ({ role }) {
            switch (role) {
                case "Manager":
                    createManager();
                    break;

                case "Engineer":
                    createEngineer();
                    break;

                case "Intern":
                    createIntern();
                    break;

                default:
                    buildTeam();
            }
        });
};

// Create Manager
function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your first and last name?",
            validate: answer => {
                if (answer !== "") {
                    return true
                }
                return "Please enter Manager name"
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your company ID?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                )
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID number is not valid"
                    } else {
                        return true
                    }
                }
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your company Email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                )
                if (pass) {
                    return true
                }
                return "Please enter a valid email address"
            }
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your company Office Number?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                )
                if (pass) {
                    return true
                }
                return "Please enter a valid office number"
            }
        }
    ]).then(answers => {
        const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        allEmployees.push(manager)
        idArray.push(answers.managerId)

        generateEmployee();
    })
};


// Create Engineer


// Create Intern



// Render to HTML

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
