const days = [];
let snowflakeCount = 0;
const prizes = [];
const claimedDays = [];

function Day(
	day,
	workshop,
	primaryPrize,
	snowflakes,
	snowflakeEquivalent,
	isOnlySnowflakes
) {
	this.day = day;
	this.workshop = workshop;
	this.primaryPrize = primaryPrize;
	this.snowflakes = snowflakes;
	this.snowflakeEquivalent = snowflakeEquivalent;
	this.isOnlySnowflakes = isOnlySnowflakes;
}

days.push(
	new Day(
		1,
		"Create a Christmas Clicker Game using React",
		"$7.50 Domain Grant",
		1,
		2,
		false
	)
);
days.push(
	new Day(
		2,
		"(PCB) Printed Christmas Board Workshop",
		"$10 PCB Grant",
		1,
		2,
		false
	)
);
days.push(
	new Day(
		3,
		"Design a 3D printable keyring with Onshape",
		"3D Printed Keychain",
		1,
		2,
		false
	)
);
days.push(new Day(4, "Make a backend API with Hono", null, 3, 0, true));
days.push(
	new Day(
		5,
		"Make a Full Stack App with Flask",
		"$10 Hosting Credits",
		2,
		2,
		false
	)
);
days.push(
	new Day(6, "Design a 3D printable ruler", "3D Printed Ruler", 2, 1, false)
);
days.push(new Day(7, "Make an interactive Christmas tree", null, 3, 0, true));
days.push(
	new Day(8, "Automating Cookie Clicker!", "5$ Cookie Grant", 3, 1, false)
);
days.push(new Day(9, "TUI app with Textual", null, 3, 0, true));
days.push(
	new Day(
		10,
		"Building a Runner Game in Love2D",
		"$8 itch.io Grant",
		1,
		2,
		false
	)
);
days.push(
	new Day(
		11,
		"Let's make a blog with Astro and Markdown!",
		"$10 Domain Grant",
		1,
		3,
		false
	)
);
days.push(new Day(12, "Polygon", "$10 Grant to go to the movies", 1, 3, false));

const container = document.querySelector("#content");
const snowflakeCounter = document.querySelector(".snowflakeCounter");
const prizeList = document.querySelector(".prizesList");

days.forEach((day) => {
	const dayDiv = document.createElement("div");
	dayDiv.classList.add("day");
	container.appendChild(dayDiv);
	const header = document.createElement("h2");
	header.textContent = `Day ${day.day}: ${day.workshop}`;
	dayDiv.appendChild(header);
	if (day.isOnlySnowflakes) {
		const button = document.createElement("button");
		button.textContent = `${day.snowflakes} snowflakes!`;
		button.addEventListener("click", () => {
			if (!claimedDays.includes(day.day)) {
				button.classList.add("selected");
				claimedDays.push(day.day);
				snowflakeCount += day.snowflakes;
			}
			updateRewards();
		});
		const cancel = document.createElement("button");
		cancel.textContent = "X";
		cancel.classList.add("red");
		cancel.addEventListener("click", () => {
			if (claimedDays.includes(day.day)) {
				button.classList.remove("selected");
				const index = claimedDays.indexOf(day.day);
				claimedDays.splice(index, 1);
				snowflakeCount -= day.snowflakes;
				updateRewards();
			}
		});
		dayDiv.appendChild(button);
		dayDiv.appendChild(cancel);
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
		const cancel = document.createElement("button");
		cancel.textContent = "X";
		cancel.classList.add("red");
		cancel.addEventListener("click", () => {
			if (prize1.checked) {
				prizeIndex = prizes.indexOf(day.primaryPrize);
				prizes.splice(prizeIndex, 1);
				snowflakeCount -= day.snowflakes;
			} else if (prize2.checked) {
				snowflakeCount -= day.snowflakes + day.snowflakeEquivalent;
			}
			prize1.checked = false;
			prize2.checked = false;
			const index = claimedDays.indexOf(day.day);
			claimedDays.splice(index, 1);
			updateRewards();
		});
		dayDiv.appendChild(cancel);
	}
});

function updateRewards() {
	snowflakeCounter.textContent = `Current snowflake count: ${snowflakeCount}`;
	prizeList.innerHTML = "<h4>Prizes:</h4>";
	prizes.forEach((prize) => {
		const e = document.createElement("p");
		e.textContent = prize;
		prizeList.appendChild(e);
	});
	const otherPrizes = [];
	if (claimedDays.length >= 3) {
		otherPrizes.push("Exclusive Haxmas Sticker");
	}
	if (claimedDays.length >= 6) {
		otherPrizes.push("Exclusive Haxmas Sticker Sheet");
	}
	if (claimedDays.length >= 9) {
		otherPrizes.push("Hack Club Socks");
	}
	if (claimedDays.length == 12) {
		otherPrizes.push("Orpheus Plushie!");
	}
	otherPrizes.forEach((prize) => {
		const e = document.createElement("p");
		e.textContent = prize;
		prizeList.appendChild(e);
	});
}
