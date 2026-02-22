const tabs = document.getElementById("tabs");
const idx = {"all": 0, "interview": 1, "rejected": 2};
const panels = document.getElementsByClassName("tab_panels");
const jobCounter = document.getElementsByClassName("jobs_visible")[0];
let selectedPanel = "all";

tabs.addEventListener("click", (e) => {
    if (e.target == e.currentTarget) {console.log("returned"); return};
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
        const mainElement = e.target.closest("li");
        const clonedElement = e.target.closest("li").cloneNode(true);
        updateStatus(mainElement, e.target.className);
        updateStatus(clonedElement, e.target.className);
        panels[idx[e.target.className]].appendChild(clonedElement);
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

function updateStatus(element, newStatus) {
    const status = element.getElementsByTagName("output")[0];
    for (const st of status.classList) {
        if(st.startsWith("status_")) status.classList.remove(st)
    }
    status.classList.add(`status_${newStatus}`);
    status.innerText = newStatus;
}
