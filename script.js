const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

// Basic Auth (very important)
const AUTH = "Basic " + btoa("coalition:skills-test");

fetch(API_URL, {
  method: "GET",
  headers: {
    "Authorization": AUTH
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Find Jessica Taylor
    const patient = data.find(p => p.name === "Jessica Taylor");

    if (patient) {
      // Fill basic info
      document.getElementById("age").innerText = patient.age;
      document.getElementById("gender").innerText = patient.gender;

      // Blood pressure data
      const bpData = patient.diagnosis_history;

      // Labels (Month + Year)
      const labels = bpData.map(item => item.month + " " + item.year);

      // Systolic & Diastolic values
      const systolic = bpData.map(item => item.blood_pressure.systolic.value);
      const diastolic = bpData.map(item => item.blood_pressure.diastolic.value);

      // Create chart
      const ctx = document.getElementById("bpChart");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Systolic",
              data: systolic,
              borderWidth: 2
            },
            {
              label: "Diastolic",
              data: diastolic,
              borderWidth: 2
            }
          ]
        }
      });

    } else {
      console.log("Jessica Taylor not found");
    }
  })
  .catch(error => console.log(error));