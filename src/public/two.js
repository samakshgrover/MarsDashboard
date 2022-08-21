let store = {
  user: {
    name: "Student",
  },
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  data: {
    manifesto: {},
    photos: [],
  },
  selectedRover: null,
  loading: false,
};

const root = document.getElementById("root");

const render = (root, state) => {
  root.innerHTML = App(state);
};

const updateState = (newState) => {
  state = { ...state, ...newState };
  render(root, state);
};

const App = (state) => {
  return `
  <header>
    ${NavBar(state)}
  </header>
  <main>
    <section>
      <div class = 'rover'>
        ${RoverMenu(state)}
      </div>
    </section>
  </main>
    `;
};

const NavBar = (state) => {
  const show = state.show;
  return `
    <nav>
        <div class="logo">
            <img src="./assets/mars-logo.png" alt="logo">
            <span>Mars</span>
        </div>
        ${
          show
            ? `<div class="tabs">
              <span>Curiosity</span>
              <span>Opportunity</span>
              <span>Spirit</span>
          </div>`
            : ""
        }
    </nav>
    `;
};

const RoverMenu = (state) => {
  const rovers = state.rovers;
  return `
    <div class="container">
            <div class="text-container">
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
            </div>
        </div>
    `;
};

const Rover = (data) => {
  const { manifesto, photos } = data;
  const {
    landing_date,
    launch_date,
    max_sol,
    name,
    status,
    total_photos,
  } = manifesto;

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
                        <img src=${photo.img_src} alt="">
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
                }).join(" ")}
                
            </div>
        </div>
    </div>
    `;
};

const spinner = () => {
  return `
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
};

const handleClick = (event) => {
  console.log("clicked");
  const rover = event.target.id;
  console.log(rover);
  const element = event.target.parentNode.parentNode.parentNode;
  console.log(element);
  event.target.parentNode.parentNode.innerHTML = spinner();

  fetch(`http://localhost:3000/${rover}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      element.innerHTML = Rover(data);
    });
};

render(root, store);
