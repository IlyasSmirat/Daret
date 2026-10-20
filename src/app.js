// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.
const CercleNom = document.querySelector("#nom-cercle");
const erreurNom = document.querySelector("#nom-cercle-erreur");
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

    if (!nomValide) {
        CercleNom.focus();
    } else if (!cotisationValide) {
        cotisation.focus();
    } else if (!dateValide) {
        dateDebut.focus();
    } else if (!periodeValide) {
        Period.focus();
    }
});
