// Daret — simulateur. Ton code commence ici.

// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.
const CercleNom = document.querySelector("#nom-cercle");
const erreurNom = document.querySelector("#nom-cercle-erreur");
const ParticipantsList = document.querySelector("#participants-liste");
const ParticipantsCounter = document.querySelector("#participants-compteur");
const BouttonAjouter = document.querySelector("#ajouter-participant");
const resumeCagnotte = document.querySelector("#resume-cagnotte");
const resumeTotalCycle = document.querySelector("#resume-total-cycle");
const resumeNbTours = document.querySelector("#resume-nb-tours");
const GenererButton = document.querySelector("#generer");
const ResumeDates = document.querySelector("#resume-dates");
const calendriercorps = document.querySelector("#calendrier-corps");

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

    creeParticipant();
    creeParticipant();
    creeParticipant();

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

const formulaire = document.querySelector("#daret-form");
const cotisation = document.querySelector("#cotisation");
const cotisationError = document.querySelector("#cotisation-erreur");
const dateDebut = document.querySelector("#date-debut");
const dateDebutError = document.querySelector("#date-debut-erreur");
const Period = document.querySelector("#periodicite");
const PeriodError = document.querySelector("#periodicite-erreur");
const regleNom = /^[\p{L}\p{M}0-9 -]{3,40}$/u;

function validerNom(){
    const nom = CercleNom.value.trim();
    const valide = regleNom.test(nom);

    if(valide){
        erreurNom.textContent = "";
        erreurNom.classList.add("hidden");
        CercleNom.classList.remove("champ-invalide");
        CercleNom.setAttribute("aria-invalid", "false");
        return true;
    }
    else{
        erreurNom.textContent = "Le nom doit contenir entre 3 et 40 caractères autorisés.";
        erreurNom.classList.remove("hidden");
        CercleNom.classList.add("champ-invalide");
        CercleNom.setAttribute("aria-invalid", "true");
        return false;
    }
}
CercleNom.addEventListener("input", function(){
    validerNom();
});

function validerCotisation(){
    const montant = Number(cotisation.value)
    const valid = cotisation.value.trim() != "" &&
    Number.isInteger(montant) &&
    montant >= 100 &&
    montant <= 50000;

    if(valid)
    {
        cotisationError.textContent = "";
        cotisationError.classList.add("hidden");
        cotisation.classList.remove("champ-invalide");
        cotisation.setAttribute("aria-invalid", "false");
        return true;
    }
    else{
        cotisationError.textContent = "La cotisation doit être un entier entre 100 et 50 000 MAD.";
        cotisationError.classList.remove("hidden");
        cotisation.classList.add("champ-invalide");
        cotisation.setAttribute("aria-invalid", "true");
        return false
    }
}
cotisation.addEventListener("input", function(){
    validerCotisation();
});

function validerDate(){
    const date = dateDebut.value;
    const aujourdhui = new Date().toISOString().split("T")[0];
    const valid = date != "" && date >= aujourdhui;

    if(valid)
    {
        dateDebutError.textContent = "";
        dateDebutError.classList.add("hidden");
        dateDebut.classList.remove("champ-invalide");
        dateDebut.setAttribute("aria-invalid", "false");
        return true;
    }
    else{
        dateDebutError.textContent = "La date doit être aujourd'hui ou dans le future.";
        dateDebutError.classList.remove("hidden");
        dateDebut.classList.add("champ-invalide");
        dateDebut.setAttribute("aria-invalid", "true");
        return false;
    }
}
dateDebut.addEventListener("input", function(){
    validerDate();
});

function validerPeriode(){
    const valeur = Period.value;
    const valid = ["hebdomadaire", "quinzaine", "mensuelle"].includes(valeur);

    if(valid){
        PeriodError.textContent = "";
        PeriodError.classList.add("hidden");
        Period.classList.remove("champ-invalide");
        Period.setAttribute("aria-invalid", "false");
        return true;
    }
    else{
        PeriodError.textContent = "Veuillez choisir une périodicité.";
        PeriodError.classList.remove("hidden");
        Period.classList.add("champ-invalide");
        Period.setAttribute("aria-invalid", "true");
        return false;
    }
}
Period.addEventListener("input", function(){
    validerPeriode();
});

formulaire.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomValide = validerNom();
    const cotisationValide = validerCotisation();
    const dateValide = validerDate();
    const periodeValide = validerPeriode();
    const nombreParticipants = ParticipantsList.children.length;
    const nombreTours = calculerTours(nombreParticipants);
    const montantBeneficiaire = CalculermontantBeneficiaire(Number(cotisation.value), nombreParticipants);
    const TotalParticipants = calculerTotalParticipants(Number(cotisation.value), nombreTours);

    if (!nomValide) {
        CercleNom.focus();
    } else if (!cotisationValide) {
        cotisation.focus();
    } else if (!dateValide) {
        dateDebut.focus();
    } else if (!periodeValide) {
        Period.focus();
    }else if (nombreParticipants >= 2){
        resumeCagnotte.textContent = montantBeneficiaire + " MAD";
        resumeTotalCycle.textContent = TotalParticipants + " MAD";
        resumeNbTours.textContent = nombreTours;

        const dates = CalculerDates(Period.value, nombreTours, dateDebut.value);
        ResumeDates.textContent = dates.PremierDate.toLocaleDateString("fr-FR") + "-" +
        dates.DernierDate.toLocaleDateString("fr-FR");

        document.querySelector("#etat-vide").classList.add("hidden");
        document.querySelector("#contenu-resultat").classList.remove("hidden");

        calendriercorps.textContent = "";
        for(let i = 0; i < nombreTours; i++){
        const numeroTour = i + 1;
        const dateTour = CalculerDateTour(Period.value, numeroTour, dateDebut.value);
        const ligne = document.createElement("tr");
        ligne.dataset.tour = numeroTour;
        const cellulenumero = document.createElement("td");
        cellulenumero.textContent = numeroTour;
        cellulenumero.classList.add("px-4", "py-3");
        ligne.appendChild(cellulenumero);
        const celluleDate = document.createElement("td");
        celluleDate.textContent = dateTour.toLocaleDateString("fr-FR", {day: "numeric", month: "long", year: "numeric"});
        celluleDate.classList.add("px-4", "py-3");
        ligne.appendChild(celluleDate);
        const participants = document.querySelectorAll('input[name = "participants"]');
        const nomBenificiaire = participants[numeroTour - 1].value;
        const celluleBeneficiaire = document.createElement("td");
        celluleBeneficiaire.textContent = nomBenificiaire;
        ligne.appendChild(celluleBeneficiaire);
        const Cellulemontant = document.createElement("td");
        Cellulemontant.textContent = `${Number(cotisation.value) * nombreTours } MAD`;
        Cellulemontant.classList.add("px-4", "py-3");
        ligne.appendChild(Cellulemontant);
        const CelluleStatus = document.createElement("td");
        CelluleStatus.textContent = "A venir";
        CelluleStatus.classList.add("px-4", "py-3");
        ligne.appendChild(CelluleStatus);
        calendriercorps.appendChild(ligne);
        const CelluleAction = document.createElement("td");
        CelluleAction.classList.add("px-4", "py-3");

        const ButtonDetails = document.createElement("button")
        ButtonDetails.textContent = "Détails";
        ButtonDetails.type = "button";
        ButtonDetails.dataset.action = "ouvrir-details";
        ButtonDetails.classList.add("rounded-md", "border", "px-3", "py-2");

        CelluleAction.appendChild(ButtonDetails);
        ligne.appendChild(CelluleAction);
    }
    }
});

function CalculermontantBeneficiaire(cotisation, nombreParticipants) {
    return cotisation * nombreParticipants;
}

function calculerTotalParticipants(cotisation, nombreTours) {
    return cotisation * nombreTours;
}

function calculerTours(nombreParticipants) {
    return nombreParticipants;
}

function CalculerDates(Period, nombreTours, dateDebut){
    const PremierDate = new Date(dateDebut);
    const DernierDate = new Date(dateDebut);

    if(Period === "hebdomadaire"){
        DernierDate.setDate(PremierDate.getDate() + (nombreTours - 1) * 7);
    }
    else if (Period === "quinzaine"){
        DernierDate.setDate(PremierDate.getDate() + (nombreTours - 1) * 15);
    }
    else if (Period === "mensuelle"){
        DernierDate.setMonth(PremierDate.getMonth() + (nombreTours - 1));
    }
    return {PremierDate: PremierDate, DernierDate: DernierDate};
}

function CalculerDateTour (Period, numeroTour, dateDebut){
    const date = new Date(dateDebut);
    if (Period === "hebdomadaire")
    {
        date.setDate(date.getDate() + (numeroTour - 1) * 7);
    }
    else if (Period === "quinzaine")
    {
        date.setDate(date.getDate() + (numeroTour - 1) * 15);
    }
    else if(Period === "mensuelle")
    {
        date.setMonth(date.getMonth() + (numeroTour - 1));
    }
    return date;
}
