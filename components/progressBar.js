export function move(element, finished, total){
  let width = ((finished/total) * 100);
  element.style.width = width + "%";
  if(width >= 2) element.innerHTML = Math.round(width) + "%";
}