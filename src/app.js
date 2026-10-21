// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.
const CercleNom = document.querySelector("#nom-cercle");
const erreurNom = document.querySelector("#nom-cercle-erreur");
const ParticipantsList = document.querySelector("#participants-liste");
const ParticipantsCounter = document.querySelector("#participants-compteur");
const BouttonAjouter = document.querySelector("#ajouter-participant");
let prochainId = 1;

function participantsCounter (){
    const nombre = ParticipantsList.children.length;
    ParticipantsCounter.textContent = nombre + " " + (nombre === 1 ? "participant" : "participants");
}

function creeParticipant(){
    const id = prochainId++;
    const li = document.createElement("li");
    li.className = "flex items-center gap-3";
    
    const input = document.createElement("input");
    input.type = "text";
    input.name = "participants";
    input.placeholder = `Prénom du participant ${id}`;
    input.required = true;
    input.className = "w-full rounded-md border p-2";

    const ButtonSupprimer = document.createElement("button");
    ButtonSupprimer.type = "button";
    ButtonSupprimer.textContent = "Supprimer";
    ButtonSupprimer.className = "rounded-md border px-3 py-2";

    li.appendChild(input);
    li.appendChild(ButtonSupprimer);
    ParticipantsList.appendChild(li);
    participantsCounter();
}

BouttonAjouter.addEventListener("click", function(){
    if (ParticipantsList.children.length < 20)
    {
        creeParticipant();
    }
});

ParticipantsList.addEventListener("click", function(event){
    if(event.target.textContent === "Supprimer"){
        if(ParticipantsList.children.length > 2){
            event.target.parentElement.remove();
            participantsCounter();
        }
    }
});
