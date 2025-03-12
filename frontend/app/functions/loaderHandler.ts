import sleep from "./sleep";

export function startAni(loader: HTMLDivElement): void {
  loader.style.display = "inline";
}

export async function endAniSuccess(loader: HTMLDivElement): Promise<void> {
  loader.classList.add("green"); // make loader green

  await sleep(125); // short delay

  loader.classList.remove("green"); // back to normal color

  loader.style.display = "none"; // hide the loader
}

export async function endAniFail(loader: HTMLDivElement): Promise<void> {
  loader.classList.add("red"); // make loader red

  await sleep(175); // short delay

  loader.classList.remove("red"); // back to normal color

  loader.style.display = "none"; // hide the loader
}
