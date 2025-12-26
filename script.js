const days = [];
let snowflakeCount = 0;
const prizes = [];
const claimedDays = [];

function Day(
	day,
	primaryPrize,
	snowflakes,
	snowflakeEquivalent,
	isOnlySnowflakes
) {
	this.day = day;
	this.primaryPrize = primaryPrize;
	this.snowflakes = snowflakes;
	this.snowflakeEquivalent = snowflakeEquivalent;
	this.isOnlySnowflakes = isOnlySnowflakes;
}

days.push(new Day(1, "$7.50 Domain Grant", 1, 2, false));
days.push(new Day(2, "$10 PCB Grant", 1, 2, false));
days.push(new Day(3, "3D Printed Keychain", 1, 2, false));
days.push(new Day(4, null, 3, 0, true));
days.push(new Day(5, "$10 Hosting Credits", 2, 2, false));
days.push(new Day(6, "3D Printed Ruler", 2, 1, false));
days.push(new Day(7, null, 3, 0, true));
days.push(new Day(8, "5$ Cookie Grant", 3, 1, false));
days.push(new Day(9, null, 3, 0, true));
days.push(new Day(10, "$8 itch.io Grant", 1, 2, false));
days.push(new Day(11, "$10 Domain Grant", 1, 3, false));
days.push(new Day(12, "$10 Grant to go to the movies", 1, 3, false));

const container = document.querySelector("#content");
const snowflakeCounter = document.querySelector(".snowflakeCounter");
const prizeList = document.querySelector(".prizesList");

days.forEach((day) => {
	const dayDiv = document.createElement("div");
	dayDiv.classList.add("day");
	container.appendChild(dayDiv);
	const header = document.createElement("h2");
	header.textContent = `Day ${day.day}`;
	dayDiv.appendChild(header);
	if (day.isOnlySnowflakes) {
		const header = document.createElement("h2");
		header.textContent = `Day ${day.day}`;
		const label = document.createElement("p");
		label.textContent = `No choice for this day! You get ${day.snowflakes} snowflakes.`;
		dayDiv.appendChild(label);
	} else {
		const prize1 = document.createElement("input");
		prize1.addEventListener("change", () => {
			if (!claimedDays.includes(day.day)) {
				claimedDays.push(day.day);
				prizes.push(day.primaryPrize);
				snowflakeCount += day.snowflakes;
			} else {
				snowflakeCount -= day.snowflakeEquivalent;
				prizes.push(day.primaryPrize);
			}
            updateRewards();
		});
		prize1.type = "radio";
		prize1.name = day.day;
		prize1.id = `prize1day${day.day}`;
		const prize1Label = document.createElement("label");
		prize1Label.htmlFor = `prize1day${day.day}`;
		prize1Label.textContent =
			day.snowflakes > 1
				? `${day.primaryPrize} + ${day.snowflakes} snowflakes!`
				: `${day.primaryPrize} + ${day.snowflakes} snowflake!`;
		const prize2 = document.createElement("input");
		prize2.addEventListener("change", () => {
			if (!claimedDays.includes(day.day)) {
				claimedDays.push(day.day);
				snowflakeCount += day.snowflakes + day.snowflakeEquivalent;
			} else {
				prizeIndex = prizes.indexOf(day.primaryPrize);
				prizes.splice(prizeIndex, 1);
				snowflakeCount += day.snowflakeEquivalent;
			}
            updateRewards();
		});
		prize2.type = "radio";
		prize2.name = day.day;
		prize2.id = `prize2day${day.day}`;
		const prize2Label = document.createElement("label");
		prize2Label.htmlFor = `prize2day${day.day}`;
		prize2Label.textContent = `${
			day.snowflakes + day.snowflakeEquivalent
		} snowflakes!`;
		dayDiv.appendChild(prize1);
		dayDiv.appendChild(prize1Label);
		dayDiv.appendChild(prize2);
		dayDiv.appendChild(prize2Label);
	}
	const cancel = document.createElement("button");
	cancel.textContent = "X";
	cancel.classList.add("red");
	dayDiv.appendChild(cancel);
});

function updateRewards() {
    snowflakeCounter.textContent = `Current snowflake count: ${snowflakeCount}`;
    prizeList.textContent = `Prizes: ${prizes}`;
}