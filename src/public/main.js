const root = document.getElementById("root");
const rovers = ["curiosity", "opportunity", "spirit"];

const App = ({ manifesto, photos }) => {
  return `
    <div>
        <div>name ${manifesto.name}</div>
        <div>landing date ${manifesto.landing_date}</div>
        <div>lunch date ${manifesto.lunch_date}</div>
        <div>max date${manifesto.max_date}</div>
        <div>max sol ${manifesto.max_sol}</div>
        <div>status ${manifesto.status}</div>
        <div>total photos ${manifesto.total_photos}</div>
    </div>
    <div class='imgs-container'>
      ${photos
        .map((photo) => {
          return `<img src=${photo}>`;
        })
        .join(" ")}
    </div>
    `;
};

const render = (data) => {
  root.innerHTML = App(data);
};

const addListeners = (rovers) => {
  rovers.forEach((rover) => {
    const element = document.getElementById(rover);
    element.addEventListener("click", () => {
      console.log("clicked");
      fetch(`http://localhost:3000/${rover}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          render(data);
        });
    });
  });
};

addListeners(rovers);
