const trackerData = document.getElementsByTagName("dd");
const visibleJobs = document.getElementById("jobs_visible");
const tabs = document.getElementById("tabs");
const tabBtn = tabs.children;

const panels = document.getElementsByClassName("tab_panels");
const allJobs = panels[0].children;
const allInterview = panels[1].children;
const allRejected = panels[2].children;

const idx = {"all": 0, "interview": 1, "rejected": 2};
let selectedIdx = 0;

tabs.addEventListener("click", function(e){
    if (e.target === e.currentTarget) return;

    selectedIdx = idx[e.target.innerText.toLowerCase()];

    for (const btn of tabBtn) {
        btn.classList.remove("tab_selected");
    }

    e.target.classList.add("tab_selected");
    updateVisibleJobs();
});

function updateVisibleJobs() {
    for (const panel of panels) {
        panel.classList.add("hidden");
    }

    const len = panels[selectedIdx].childElementCount;
    panels[len != 0 ? selectedIdx : 3].classList.remove("hidden");

    visibleJobs.innerText = `${len} Jobs`;
}

const updateForms = document.getElementsByClassName("update_form");
const deleteForms = document.getElementsByClassName("delete_form");

for (const panel of panels) {
    panel.addEventListener("click", function(e) {
        if (e.target.matches(".update_form button") || e.target.matches(".delete_form button")){
            e.preventDefault();
            const value = e.target.value;
            const id = e.target.closest("li").dataset.id;
            let job;
            for (const j of allJobs) {
                if (j.dataset.id == id) {
                    job = j;
                    break;
                }
            }

            const statusVal = e.target.matches(".delete_form button") ? "Not Applied" : value;
            job.getElementsByClassName("job_status")[0].outerHTML = `<output class="job_status status_${statusVal}">${statusVal}</output>`;

            for (const j of allInterview) {
                if (j.dataset.id == id) j.remove();
            }
            for (const j of allRejected) {
                if (j.dataset.id == id) j.remove();
            }

            if (e.target.matches(".update_form button")) {
                panels[idx[value]].appendChild(job.cloneNode(true));
            } else if (selectedIdx == 0) {
                for (const j of allJobs) {
                    if (j.dataset.id == id) j.remove();
                }
            }
            updateVisibleJobs();
            updateTrackerData();
        }
    });
}

function updateTrackerData() {
    trackerData[0].innerText = allJobs.length;
    trackerData[1].innerText = allInterview.length;
    trackerData[2].innerText = allRejected.length;
}
