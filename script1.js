let jobs = [
    {
        id: 1,
        company: "Mobile First Corp",
        role: "React Native Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$130k - $175k",
        desc: "Build mobile apps used worldwide.",
        status: "none"
    },
    {
        id: 2,
        company: "WebFlow Agency",
        role: "Web Designer",
        location: "Los Angeles",
        type: "Part-time",
        salary: "$80k - $120k",
        desc: "Design modern websites.",
        status: "none"
    },
    {
        id: 3,
        company: "DataViz Solutions",
        role: "Data Specialist",
        location: "Boston",
        type: "Full-time",
        salary: "$120k",
        desc: "Work with analytics.",
        status: "none"
    },
    {
        id: 4,
        company: "Innovation Labs",
        role: "UI/UX Engineer",
        location: "Austin",
        type: "Full-time",
        salary: "$110k",
        desc: "Create user interfaces.",
        status: "none"
    },
    {
        id: 5,
        company: "MegaCorp",
        role: "JS Developer",
        location: "New York",
        type: "Full-time",
        salary: "$130k",
        desc: "Build enterprise apps.",
        status: "none"
    },
    {
        id: 6,
        company: "StartupXYZ",
        role: "Full Stack Dev",
        location: "Remote",
        type: "Full-time",
        salary: "$120k",
        desc: "Startup environment.",
        status: "none"
    },
    {
        id: 7,
        company: "TechCorp",
        role: "Frontend Dev",
        location: "San Francisco",
        type: "Full-time",
        salary: "$140k",
        desc: "React apps.",
        status: "none"
    },
    {
        id: 8,
        company: "CloudNet",
        role: "Backend Dev",
        location: "Seattle",
        type: "Full-time",
        salary: "$135k",
        desc: "Server systems.",
        status: "none"
    }
];

let currentTab = "all";

function renderJobs() {
    let container = document.getElementById("jobContainer");
    container.innerHTML = "";

    let filtered = jobs.filter(j => {
        if (currentTab === "all") return true;
        return j.status === currentTab;
    });

    document.getElementById("jobCount").innerText = filtered.length + " jobs";

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <h3>No jobs available</h3>
                <p>Check back later</p>
            </div>
        `;
        return;
    }

    filtered.forEach(job => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <span class="delete" onclick="deleteJob(${job.id})">🗑</span>
            <h4>${job.company}</h4>
            <p>${job.role}</p>
            <small>${job.location} • ${job.type} • ${job.salary}</small>
            <p>${job.desc}</p>

            <button class="btn interview" onclick="setStatus(${job.id}, 'interview')">Interview</button>
            <button class="btn rejected" onclick="setStatus(${job.id}, 'rejected')">Rejected</button>
        `;

        container.appendChild(div);
    });

    updateDashboard();
}

function setStatus(id, status) {
    let job = jobs.find(j => j.id === id);

    if (job.status === status) {
        job.status = "none";
    } else {
        job.status = status;
    }

    renderJobs();
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderJobs();
}

function updateDashboard() {
    let interview = jobs.filter(j => j.status === "interview").length;
    let rejected = jobs.filter(j => j.status === "rejected").length;

    document.getElementById("interview").innerText = interview;
    document.getElementById("rejected").innerText = rejected;
    document.getElementById("total").innerText = jobs.length;
}

function showTab(tab) {
    currentTab = tab === "all" ? "all" : tab.replace("Tab", "");

    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(t => t.classList.remove("active"));
    event.target.classList.add("active");

    renderJobs();
}

renderJobs();