export default function autocomplete(input, array) {
  if (array) {
    let curFocus;

    input.addEventListener("input", function(e) {
    let a,
      b,
      i,
      val = input.value;

    //Closes any open list of autocomplete values
    closeAllLists();
    if (!val) {
      return false;
    }
    curFocus = -1;
    a = document.createElement("div");

    //div that contains suggestions
    a.setAttribute("id", input.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);

        for(i = 0; i < array.length; i++) {
            //Check if item starts with same letters as text field value
            if(array[i].title.substring(0, val.length).toUpperCase() === val.toUpperCase()) {
                //Make div for matching element
                b = document.createElement("div");
                //Make matching letters bold
                b.innerHTML = "<strong>" + array[i].title.substring(0, val.length) + "</strong>";
                b.innerHTML += array[i].title.substring(val.length);
                b.innerHTML += "  (" + array[i].release_date.substring(0, 4) + ")";
                //Make new input field that holds current array item's value
                b.innerHTML += "<input type='hidden' value='" + array[i].title + " (" + array[i].release_date.substring(0, 4) + ")' data-mid=" + array[i].id + ">";
                //Execute function when someone clicks on a suggestion
                b.addEventListener("click", function(e) {
                    //Insert value for autocomplete text field
                    input.value = this.getElementsByTagName("input")[0].defaultValue;
                    //Close list of autocompleted values
                    closeAllLists();
                    //Returns data-mid with the movie id
                    // return this.children[1].getAttribute("data-mid");
                    input.setAttribute("data-mid", this.children[1].getAttribute("data-mid"));
                });
                a.appendChild(b);
            }
        }
    });

        //Execute a function on keypresses
        let fired = false;
        input.addEventListener("keydown", function(e) {
            if(!fired) {
                fired = true;
                let x = document.getElementById(input.id + "autocomplete-list");
                if(x) {
                    x = x.getElementsByTagName("div");
                }
                if(e.keyCode === 40) {
                    //Down key press => increase curFocus
                    curFocus++;
                    //Make current item more visible
                    addActive(x);
                } else if(e.keyCode === 38) {
                    //Up key press => decrease curFocus
                    curFocus--;
                    //Make current item more visible
                    addActive(x);
                } else if(e.keyCode === 13) {
                    //Enter key is pressed, prevent form from being submitted
                    e.preventDefault();
                    if(curFocus > -1) {
                        //Simulate a click on active item
                        if(x) {
                            x[curFocus].click();
                            // return x[curFocus].children[1].getAttribute("data-mid");
                            input.setAttribute("data-mid", x[curFocus].children[1].getAttribute("data-mid"));
                        }
                    }
                }
            }
        });
        // a.appendChild(b);

    input.addEventListener("keyup", function (e) {
      fired = false;
    });

    function addActive(x) {
      //Function to classify if item is active
      if (!x) {
        return false;
      }
      removeActive(x);
      if (curFocus >= x.length) {
        curFocus = 0;
      }
      if (curFocus < 0) {
        curFocus = x.length - 1;
      }

      //Add class "autocomplete-active"
      x[curFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      //Function to remove active class from autocomplete list
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elt) {
      //Close all autocomplete lists
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elt !== x[i] && elt !== input) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }
}
