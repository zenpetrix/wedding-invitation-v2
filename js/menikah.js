// Get that hamburger menu cookin' //

document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Smooth Anchor Scrolling
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});


// Preloader


//komentar
// =================== FIREBASE KOMENTAR ===================
let db;

// INIT FIREBASE
document.addEventListener("DOMContentLoaded", function () {
  const firebaseConfig = {
    apiKey: "AIzaSyByHikI_6s9bdwv_9dkOLTbZP9VUiJdx8s",
    authDomain: "undangan-cece.firebaseapp.com",
    databaseURL: "https://undangan-cece-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "undangan-cece",
    storageBucket: "undangan-cece.firebasestorage.app",
    messagingSenderId: "679637776486",
    appId: "1:679637776486:web:933f4b56400646acad95a7"
  };

  firebase.initializeApp(firebaseConfig);
  db = firebase.database();

  // LISTEN KOMENTAR (REALTIME)
  db.ref("ucapan").on("value", function(snapshot) {
    const list = document.getElementById("list-ucapan");
    if (!list) return;

    list.innerHTML = "";

    snapshot.forEach(function(child) {
      const data = child.val();
      const div = document.createElement("div");
      div.className = "box";
      div.innerHTML = `
        <strong>${data.nama}</strong>
        <p>${data.pesan}</p>
      `;
      list.prepend(div); // terbaru di atas
    });
  });
});

// =================== KIRIM UCAPAN (GLOBAL) ===================
function kirimUcapan() {
  if (!db) {
    alert("Database belum siap, coba refresh halaman");
    return;
  }

  const nama = document.getElementById("nama").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  if (!nama || !pesan) {
    alert("Nama dan ucapan wajib diisi");
    return;
  }

  db.ref("ucapan").push({
    nama: nama,
    pesan: pesan,
    waktu: Date.now()
  });

  document.getElementById("nama").value = "";
  document.getElementById("pesan").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const nama = params.get("to");

  const target = document.getElementById("nama-undangan");

  if (nama && target) {
    target.innerText = decodeURIComponent(nama.replace(/\+/g, " "));
  } else if (target) {
    target.innerText = "Tamu Undangan";
  }
});


