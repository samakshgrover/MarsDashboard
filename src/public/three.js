//global store for app state

let store = Immutable.fromJS({
  user: {
    name: "student",
  },
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  selectedRover: null,
  loading: false,
  data: {
    manifesto: {},
    photos: [],
  },
});

// HTML root element(not functional)
const root = document.getElementById("root");

// This function will be called every time state changes
const render = (root, state) => {
  root.innerHTML = App(state);
};

// Our state will be updated using this method(not via direct mutation)
//and app will re-render after state changes
const updateState = (newState) => {
  store = store.mergeDeep(newState);
  console.log(store.toJS());
  render(root, store);
};

// our app ui will be defined here
const App = (state) => {
  return `
        <header>
            ${NavBar(state)}
        </header>
        <main>
            <section>              
              ${RoverComponent(state)}
            </section>
        </main>
    `;
};

//Navbar ui
const NavBar = (state) => {
  const selectedRover = state.get("selectedRover");
  return `
    <nav>
        <div class="logo" onclick={hadleHomeClick(event)}>
            <img src="./assets/mars-logo.png" alt="logo">
            <span>Mars</span>
        </div>
        ${
          selectedRover
            ? `<div class="tabs">
              <span onclick={handleTabClick(event)}>Curiosity</span>
              <span onclick={handleTabClick(event)}>Opportunity</span>
              <span onclick={handleTabClick(event)}>Spirit</span>
          </div>`
            : ""
        }
    </nav>
    `;
};

// This component will decide what to show on screen using state of the app

const RoverComponent = (state) => {
  const selectedRover = state.get("selectedRover");

  return `
            ${selectedRover ? RoverItem(state) : RoverMenu(state)}   
    `;
};

// Rover Menu component

const RoverMenu = (state) => {
  const loading = state.get("loading");
  const rovers = state.get("rovers");
  return `
  <div class="rover">
    <div class="container">
            ${
              loading
                ? spinner()
                : `<div class="text-container">
                     <h1>Discover Mars Rovers</h1>
                    </div>
                  <div class="box-container">
                      ${rovers
                        .map((rover) => {
                          return `<div id=${rover} onclick={handleClick(event)}>
                                    <span onclick={event.stopPropagation()}>${rover}</span>
                                  </div>`;
                        })
                        .join(" ")}
                  </div>`
            }
      </div>
    </div>
    `;
};

// Rover UI(Info and Photos)
// On hovering photos it will show spacific details regarding particular photo
const RoverItem = (state) => {
  debugger;
  const manifesto = state.getIn(["data", "manifesto"]).toJS();
  const photos = state.getIn(["data", "photos"]).toJS();
  console.log({ manifesto, photos });
  const { landing_date, launch_date, max_sol, name, status, total_photos } =
    manifesto;

  return `
  <div class="rover-container">
        <div class="info">
            <h1>${name}</h1>
            <ul>
                <li>Launch Date:<span>${launch_date}</span> </li>
                <li>Landing Date:<span>${landing_date}</span></li>
                <li>Status:<span>${status}</span></li>
                <li>Sol(Soler Days on Mars):<span>${max_sol}</span></li>
                <li>Total Photos Clicked(on Mars):<span>${total_photos}</span></li>
            </ul>
        </div>
        <div class="photos-container">
            <h1>Latest photos</h1>
            <div class="photos">
                ${photos.map((photo) => {
                  return `
                    <div class="photo">
                      <img src=${photo.img_src} alt="rover photo">
                      <div>
                        <ul>
                            <li>Rover:<span>${photo.rover.name}</span></li>
                            <li>Camera:<span>${photo.camera.name}</span></li>
                            <li>Date:<span>${photo.earth_date}</span></li>
                            <li>Sol:<span>${photo.sol}</span></li>
                        </ul>
                      </div>
                    </div>
                    `;
                })}               
            </div>
        </div>
    </div>
    `;
};

// spinner used when loading state is true
const spinner = () => {
  return `
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      `;
};

//click handler on rover menu componet
const handleClick = async (event) => {
  updateState({ loading: true });

  const rover = event.target.id;
  const dataState = await fetchData(rover);
  updateState({ data: dataState, selectedRover: rover, loading: false });
};

// async function for feching data
const fetchData = async (rover) => {
  const res = await fetch(`http://localhost:3000/${rover}`);
  const data = await res.json();
  return data;
};

const hadleHomeClick = (event) => {
  console.log("click");
  updateState({ selectedRover: null });
};

const handleTabClick = async (event) => {
  const rover = event.target.textContent;
  if (store.get("selectedRover") === rover) {
    return;
  }

  updateState({
    loading: true,
    selectedRover: null,
    data: { manifesto: {}, photos: [] },
  });

  const dataState = await fetchData(rover);
  updateState({ data: dataState, selectedRover: rover, loading: false });
};

// html load event handler
window.addEventListener("load", () => {
  render(root, store);
});