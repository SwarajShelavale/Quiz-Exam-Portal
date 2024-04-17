
// Add Subjects List here
const subjects = ["Science", "Maths", "शरीरशास्त्र", "Medicines", "Anotomy", "Physiology"];


const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = generateRotationValues(subjects.length);

// Size of each piece
const data = generateData(subjects.length);

// Generate background colors for each piece based on the subjects array
const pieColors = generatePieColors(subjects.length);

// Create chart
let myChart = new Chart(wheel, {
    // Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    // Chart Type Pie
    type: "doughnut",
    data: {
        // Labels (values which are to be displayed on chart)
        labels: subjects,
        // Settings for dataset/pie
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        // Responsive chart
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            // Hide tooltip and legend
            tooltip: false,
            legend: {
                display: false,
            },
            // Display labels inside pie chart
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 20},
            },
        },
    },
});

// Display value based on the randomAngle
const valueGenerator = () => {
// finalValue.innerHTML = `<p>Spin Again !!</p>`;
spinBtn.disabled = false;
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    // Empty final value
    // finalValue.innerHTML = `<p>Good Luck!</p>`;
    // Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    // Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
        // Set rotation for pie chart
        myChart.options.rotation = myChart.options.rotation + resultValue;
        // Update chart with new value;
        myChart.update();
        // If rotation > 360 reset it back to 0
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});

// Function to generate rotation values based on the number of subjects
function generateRotationValues(subjectCount) {
    const rotationValues = [];
    const angleStep = 360 / subjectCount;

    for (let i = 0; i < subjectCount; i++) {
        const minDegree = i * angleStep;
        const maxDegree = (i + 1) * angleStep;
        rotationValues.push({ minDegree, maxDegree, index: i });
    }

    return rotationValues;
}

// Function to generate data array based on the number of subjects
function generateData(subjectCount) {
    const data = Array(subjectCount).fill(16);
    return data;
}

// Function to generate pie colors based on the number of subjects
function generatePieColors(subjectCount) {
    const colors = [];
    for (let i = 0; i < subjectCount; i++) {
        colors.push(i % 2 === 0 ? "#6200ea" : "#b163da");
    }
    return colors;
}