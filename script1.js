let cards = document.querySelectorAll(".card");
let tabs = document.querySelectorAll(".tab");

let interviewCount = 0;
let rejectedCount = 0;

function updateDashboard() {
    document.getElementById("interviewCount").innerText = interviewCount;
    document.getElementById("rejectedCount").innerText = rejectedCount;
    document.getElementById("totalCount").innerText = document.querySelectorAll(".card").length;
}

cards.forEach(card => {

    let interviewBtn = card.querySelector(".interview");
    let rejectedBtn = card.querySelector(".rejected");
    let statusText = card.querySelector(".status");
    let deleteBtn = card.querySelector(".delete");

    interviewBtn.addEventListener("click", function () {

        if (card.dataset.status === "interview") {
            card.dataset.status = "none";
            statusText.innerText = "NOT APPLIED";
            interviewCount--;
        } else {
            if (card.dataset.status === "rejected") rejectedCount--;
            card.dataset.status = "interview";
            statusText.innerText = "INTERVIEW";
            interviewCount++;
        }

        updateDashboard();
    });

    rejectedBtn.addEventListener("click", function () {

        if (card.dataset.status === "rejected") {
            card.dataset.status = "none";
            statusText.innerText = "NOT APPLIED";
            rejectedCount--;
        } else {
            if (card.dataset.status === "interview") interviewCount--;
            card.dataset.status = "rejected";
            statusText.innerText = "REJECTED";
            rejectedCount++;
        }

        updateDashboard();
    });

    deleteBtn.addEventListener("click", function () {
        if (card.dataset.status === "interview") interviewCount--;
        if (card.dataset.status === "rejected") rejectedCount--;

        card.remove();
        updateDashboard();
    });
});


// TAB FILTER (very simple)
tabs.forEach(tab => {
    tab.addEventListener("click", function () {

        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        this.classList.add("active");

        let type = this.dataset.tab;

        document.querySelectorAll(".card").forEach(card => {

            if (type === "all") {
                card.style.display = "block";
            } else {
                if (card.dataset.status === type) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }

        });

    });
});

let visibleCards = 0;

document.querySelectorAll(".card").forEach(card => {
    if (card.style.display !== "none") {
        visibleCards++;
    }
});

let container = document.getElementById("jobContainer");

let oldMsg = document.querySelector(".empty");
if (oldMsg) oldMsg.remove();

if (visibleCards === 0) {
    let msg = document.createElement("div");
    msg.className = "empty";
    msg.innerHTML = `
        <h3>No jobs available</h3>
        <p>Check again later</p>
    `;
    container.appendChild(msg);
}