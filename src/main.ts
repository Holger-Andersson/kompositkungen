import './style.css'
//import { calculate } from './services/calcService';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

// `

//const dropdown = document.getElementById("dropdown") as HTMLSelectElement;

const select = document.createElement("select");

const option1 = document.createElement("option"); 
option1.value = "855";
option1.text = "Material1";
select.appendChild(option1);

const option2 = document.createElement("option");
option2.value = "858";
option2.text = "Material2";
select.appendChild(option2);

document.body.appendChild(select);