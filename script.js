const days = [];
let snowflakeCount = 0;
const prizes = [];

function Day(day, primaryPrize, snowflakes, snowflakeEquivalent, isOnlySnowflakes) {
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

days.forEach((day) => {
    const header = document.createElement("h2");
	header.textContent = `Day ${day.day}`;
    container.appendChild(header);
    if (day.isOnlySnowflakes) {
        const header = document.createElement("h2");
        header.textContent = `Day ${day.day}`;
        const label = document.createElement("p");
        label.textContent = `No choice for this day! You get ${day.snowflakes} snowflakes.`;
        container.appendChild(label);
    }
    else {
        const prize1 = document.createElement("input");
        prize1.type = "radio";
        prize1.name = day.day;
        prize1.textContent =
			day.snowflakes > 1
				? `${day.primaryPrize} + ${day.snowflakes} snowflakes!`
				: `${day.primaryPrize} + ${day.snowflakes} snowflake!`;
        const prize2 = document.createElement("input");
        prize2.type = "radio"
        prize2.name = day.day;
        prize2.textContent = `${day.snowflakes + day.snowflakeEquivalent} snowflakes!`;
        container.appendChild(prize1);
        container.appendChild(prize2);
    }
})