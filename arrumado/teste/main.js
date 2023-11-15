document.addEventListener("DOMContentLoaded", function () {
  const reminders = document.querySelectorAll("textarea");

  reminders.forEach((reminder, index) => {
    const savedReminder = localStorage.getItem(`reminder${index}`);
    const savedDone = localStorage.getItem(`done${index}`);
    const savedColor = localStorage.getItem(`color${index}`); //cor no localStorage

    if (savedReminder) {
      reminder.value = savedReminder;
    }

    if (savedDone === "true") {
      reminder.classList.add("done");
    }

    //aplica a cor
    if (savedColor) {
      reminder.classList.add(savedColor);
    }

    reminder.addEventListener("input", function () {
      localStorage.setItem(`reminder${index}`, reminder.value);
    });

    reminder.addEventListener("click", function () {
      const colors = [
        "reminder-blue",
        "reminder-pink",
        "reminder-green",
        "reminder-white",
      ];
      for (const color of colors) {
        reminder.classList.remove(color);
      }
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];
      reminder.classList.add(selectedColor);
      //salva a cor no localStorage
      localStorage.setItem(`color${index}`, selectedColor);
    });

    const doneButton = document.createElement("button");
    doneButton.innerHTML = " ✔️";
    doneButton.addEventListener("click", function () {
      if (reminder.classList.contains("done")) {
        reminder.classList.remove("done");
        localStorage.setItem(`done${index}`, "false");
      } else {
        reminder.classList.add("done");
        localStorage.setItem(`done${index}`, "true");
      }
    });

    reminder.parentNode.appendChild(doneButton);
  });

  const obsButtons = document.querySelectorAll(".obs-button");

  obsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      openObsPopup(button);
    });
  });

  function openObsPopup(obsButton) {
    const popup = document.querySelector(".popup");
    popup.style.display = "block";
  }

  const addEventButton = document.getElementById("addEventButton");

  addEventButton.addEventListener("click", function () {
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventCategory = document.getElementById("eventCategory").value;
    const eventObservation = document.getElementById("eventObservation").value;

    if (!eventName || !eventDate || !eventCategory) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const event = {
      nome: eventName,
      data: eventDate,
      categoria: eventCategory,
      observacao: eventObservation,
      concluido: false,
    };

    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventCategory").value = "blue";
    document.getElementById("eventObservation").value = "";

    const popup = document.querySelector(".popup");
    popup.style.display = "none";
  });

  const fontSizeInput = document.getElementById("fontSize");
  const fontColorSelect = document.getElementById("fontColor");
  const eventObservation = document.getElementById("eventObservation");

  fontSizeInput.addEventListener("change", () => {
    const newSize = fontSizeInput.value + "px";
    eventObservation.style.fontSize = newSize;
  });

  fontColorSelect.addEventListener("change", () => {
    const newColor = fontColorSelect.value;
    eventObservation.style.color = newColor;
  });

  const fecharPopupButton = document.getElementById("fecharPopupButton");

  fecharPopupButton.addEventListener("click", function () {
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
  });
  document.addEventListener("DOMContentLoaded", function () {
  
    const events = JSON.parse(localStorage.getItem('events')) || [];

    const obsButtons = document.querySelectorAll(".obs-button");

    obsButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            // Abre a popup de observações
            openObsPopup(button, index);
        });
    });

    function openObsPopup(obsButton, index) {
        const popup = document.querySelector('.popup');
        popup.style.display = 'block';

        const saveObsButton = document.getElementById("saveObsButton");

        saveObsButton.addEventListener("click", function () {
            const eventObservation = document.getElementById("eventObservation").value;

           
            events[index].observacao = eventObservation;

          
            document.getElementById("eventObservation").value = "";

            
            popup.style.display = 'none';

           
            displayEventList();
            
        
            localStorage.setItem('events', JSON.stringify(events));
        });
    }

    const addEventButton = document.getElementById("addEventButton");

    addEventButton.addEventListener("click", function () {
        const eventName = document.getElementById("eventName").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventCategory = document.getElementById("eventCategory").value;

        const event = {
            nome: eventName,
            data: eventDate,
            categoria: eventCategory,
            observacao: "", 
            concluido: false
        };
        
        events.push(event); 

        
        displayEventList();

        localStorage.setItem('events', JSON.stringify(events));

       

    });

    displayEventList();

    

});

function displayEventList() {
    const eventListContainer = document.getElementById("eventList");
    eventListContainer.innerHTML = ""; 

    events.forEach(event => {
        const listItem = document.createElement("li");
        listItem.textContent = `${event.nome} - ${event.data} - ${event.categoria} - ${event.observacao}`;
        eventListContainer.appendChild(listItem);
    });
}       });
