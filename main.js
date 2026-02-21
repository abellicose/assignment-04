const tabs = document.getElementById("tabs");
const idx = {"all": 0, "interview": 1, "rejected": 2};
const panels = document.getElementsByClassName("tab_panels");
const jobCounter = document.getElementsByClassName("jobs_visible")[0];
let selectedPanel = "all";

tabs.addEventListener("click", (e) => {
    if (e.target == e.currentTarget) return;
    for (const tab of tabs.children) {
        tab.classList.remove("tab_selected");
    }
    e.target.classList.add("tab_selected");
    selectedPanel = e.target.innerText.toLowerCase();
    updateVisiblePanel();
});

// updating cards

const updateForms = document.getElementsByClassName("update_form");

for (const form of updateForms) {
    form.addEventListener("click", (e) => {
        if (e.target == e.currentTarget) return;
        e.preventDefault();
        const job = e.target.closest("li");
        panels[idx[e.target.className]].appendChild(job);
        updateTracker();
        updateVisiblePanel();
    });
}

// deleting cards

const deleteForms = document.getElementsByClassName("delete_form");
for (const form of deleteForms) {
    form.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) return;
        event.preventDefault();
        e.target.closest("li").remove();
        updateTracker();
        updateVisiblePanel();
    });
}

const trackerData = document.getElementsByTagName("dd");
function updateTracker() {
    for (let i = 0; i < 3; i++) {
        trackerData[i].innerText = panels[i].childElementCount;
    }
}

function updateVisiblePanel() {
    for (const panel of panels) {
        panel.classList.add("hidden");
    }

    const i = idx[selectedPanel];
    const length = panels[i].childElementCount;

    jobCounter.innerText = `${length} Jobs`;

    panels[length == 0 ? 3 : i].classList.remove("hidden");

}
