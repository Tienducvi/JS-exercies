    //popup the input        
        function popup(e) {
            const popupForm = document.querySelector('.popup-form')
            popupForm.style.setProperty('display', 'flex');
        }

        function cancelation(e) {
            e.preventDefault();
            const popupForm = document.querySelector('.popup-form');
            popupForm.style.setProperty('display', 'none');
            document.querySelector('.inputInfo').reset();
        }
    const form = document.querySelector('.add');
    const cancel = document.querySelector('#cancel-button');
    form.addEventListener('click', popup);
    cancel.addEventListener('click', cancelation)

    //data
        let people = [
            {name: "Dinh Tien Hoang", description: "ZXxczx"},
            {name: "Hoang Tin", description: "ZXxczx"},
            {name: "Hoang vuong", description: "ZXxczx"},
            {name: "Hoang tan", description: "ZXxczx"},
        ];
        
        //render info to display
        function renderUser() {
            //get data from localstorage
            people.innerHTML = null
            const display = document.querySelector('#displayMonitor tbody');
            const html = people.map((user, index) => {
                return `
                <tr> 
                    <td>${index +1}</td> 
                    <td>${user.name}</td> 
                    <td>${user.description}</td> 
                    <td class="changeContent">
                        <div class="toggle-box" onclick="changeColor(this)" id=${index}>
                            <i class="fas fa-lightbulb yellow" id=${index}></i>
                        </div>
                        
                        <button class="edit" id="${index}" onclick=edit(${index})>Edit</button>
                        <button class="delete" id="${index}" onclick="del(this)" >Delete</button>
                    </td>
                </tr>`
            }).join('');
            display.innerHTML = html;
        }

        //change color of bulb
        function changeColor(e) {
            e.classList.toggle('icon-pressed');
        }

        //delete row
        function del(item) {
            console.log(item);
        
            people.splice(item.id, 1);
            console.log(item.id);
            renderUser(people); 
        }
 
        //input data into arr people
    const name = document.getElementById('Name');
    const description = document.getElementById('Mo-ta');   
        function input() {
            const myObj = new Object();
            myObj.name = `${name.value}`
            myObj.description = `${description.value}`
            console.log(myObj)
            people.push(myObj);
            console.log(people);
            renderUser(input)   
        }

        //display to the monitor
        function displayName(e) {
            const nameInput = name.value;
            const descriptionInput = description.value;
            if(nameInput === "" || descriptionInput === "") {
                alert("Your info is missing")
            } else {
                e.preventDefault();
            input(people);
            document.querySelector('.inputInfo').reset();    
            cancelation(e); 
            }         
        }
    const add = document.querySelector('#confirm-button');
    console.log(add)
    add.addEventListener('click', displayName) 
    
        //edit the data
        const editTab = document.querySelector('.edit-table');
        function edit(index) {
            var person = people[index];
            const editForm = `
            <form autocomplete="off">
                <div class="form-group">
                    <label for="Name">Ho va ten</label>
                    <input type="text" class="search" id="editName" placeholder="your name" required>
                </div>
                <div class="form-group">
                    <label for="Mo-ta">Mo ta</label>
                    <input type="text" class="search" id="editDescription" placeholder="description" required>
                </div>
                <div class="confirm">
                    <button id="edit-button" onclick=editData(${index})>Edit</button>
                </div>
            </form>
            ` 
            editTab.innerHTML = editForm;
            const editName = document.getElementById('editName')
            const editDescription = document.getElementById('editDescription')
            editName.value = person.name;
            editDescription.value = person.description; 
            editTab.classList.remove('edit-table-active');
        }

        //click edit button
        function editData(e) {
            const editName = document.getElementById('editName')
            const editDescription = document.getElementById('editDescription')
            const newObj = {
                "name": editName.value, "description": editDescription.value
            };
            people.splice(e, 1, newObj)
            event.preventDefault();
            console.log(people);
            renderUser(people);
            editTab.classList.add('edit-table-active');
        }

        //sort name
        function sortByName(e) {
            renderUser(e)
            function compare(a, b) {
                const nameA = a.name.split(" ")[a.name.split(" ").length-1].toUpperCase();
                const nameB = b.name.split(" ")[b.name.split(" ").length-1].toUpperCase();

                let comparison = 0;
                if (nameA > nameB) {
                    comparison = 1;
                } else if (nameA < nameB) {
                    comparison = -1;
                }
                return comparison;
                }

                people.sort(compare);
                renderUser(people)
            }
    const sortIcon = document.querySelector('.sort-icon');
    sortIcon.addEventListener('click', sortByName);
    
            //search name
            function matchWord(wordToMatch, people) {
                return people.filter(person => {
                    const regex = new RegExp(wordToMatch, 'gi');
                    return person.name.match(regex) || person.description.match(regex);
                })
            }              
            function displayMatches() {
                const matchArray = matchWord(this.value, people);
                const html = matchArray.map(person => {
                  const regex = new RegExp(this.value, 'gi');
                  const name = person.name.replace(regex, `<span class="hl">${this.value}</span>`);
                  const description = person.description.replace(regex, `<span class="hl">${this.value}</span>`);
                  return `
                    <li>
                      <span class="name">${name}, ${description}</span>
                    </li>
                    `;
                }).join('');
                suggestions.innerHTML = html;
              }
              const searchInput = document.querySelector('.search-info');
              const suggestions = document.querySelector('.suggestions');            
              searchInput.addEventListener('change', displayMatches);
              searchInput.addEventListener('keyup', displayMatches);