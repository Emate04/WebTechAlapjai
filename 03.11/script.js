const tippInput = document.getElementById("tippInput");
const tippGomb = document.getElementById("tippGomb");
const visszajelzes = document.getElementById("visszajelzes");

let celSzam;
let probalkozasok;
const maxProbalkozasok = 20;

function ujJatek() {
  celSzam = Math.floor(Math.random() * 1000001);
  probalkozasok = 0;
  visszajelzes.textContent = "";
  tippInput.value = "";
  tippInput.disabled = false;
  tippGomb.disabled = false;
}

function ellenorizTipp() {
  const tipp = parseInt(tippInput.value);

  if (isNaN(tipp)) {
    visszajelzes.textContent = "Érvénytelen bevitel! Kérem, adjon meg egy számot.";
    return;
  }

  probalkozasok++;

  if (tipp === celSzam) {
    visszajelzes.textContent = `Gratulálok, ${probalkozasok} lépésből eltaláltad!`;
    tippInput.disabled = true;
    tippGomb.disabled = true;
  } else if (tipp < celSzam) {
    visszajelzes.textContent = `${probalkozasok}. tipp nem talált: A megoldás nagyobb.`;
  } else {
    visszajelzes.textContent = `${probalkozasok}. tipp nem talált: A megoldás kisebb.`;
  }

  if (probalkozasok >= maxProbalkozasok) {
    visszajelzes.textContent = `Sajnos ez most nem sikerült! A gondolt szám a ${celSzam} volt.`;
    tippInput.disabled = true;
    tippGomb.disabled = true;
  }
}

tippGomb.addEventListener("click", ellenorizTipp);
ujJatek();