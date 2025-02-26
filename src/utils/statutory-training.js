function getTextFromType(type) {
  return type === "fire"
    ? "Fire"
    : type === "firstAid"
    ? "First Aid"
    : type === "forkLift"
    ? "Forklift"
    : type === "mobileCrane"
    ? "Mobile Crane"
    : type === "overheadCrane"
    ? "Overhead Crane"
    : type === "siteRep"
    ? "Site Rep"
    : type === "workingHeights"
    ? "Working at Heights"
    : type;
}

export { getTextFromType };
