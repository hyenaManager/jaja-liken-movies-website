export function getRandomInt() {
    const bgColors = [
        "red",
        "green",
        "blue",
        "orange",
        "yellow",
        "slate",
        "sky",
        "amber",
        "lime",
        "cyan",
      ];
    return bgColors[Math.floor(Math.random() * (9 - 0)) + 0];
  }
