let store = {
  user: {
    name: "Student",
  },
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  selectedRover: "",
};

const root = document.getElementById("root");

const render = (root, state) => {
  root.innerHTML = App(state);
};

const App = (state) => {
  return `
        <header>
          ${Navbar(state.selectedRover)}
        </header>
        <main>
          <section>
            ${RoverScreen()}
          </section>
        </main>
        <footer></footer>
    `;
};

const Navbar = (rover) => {
  return `
    <nav>
        ${rover ? NavMenu() : NavLogo()}
    </nav>
    `;
};

const NavMenu = () => {
  return `
        <div class='nav-menu'>
            <div id='curiosity'>Curiosity</div>
            <div id='opportunity'>Opportunity</div>
            <div id='spirit'>Spirit</div>
        </div>
    `;
};

const NavLogo = () => {
  return `
        <img src='./assets/mars-logo.png' alt='logo'>
    `;
};

const RoverScreen = () => {
  return `
    <div class="rover-screen">
      <h1>Mars Rovers Dashboard</h1>
      <div class='box-container'>
          <div id="curiosity" class='box' onclick={handleClick(event)}>Curiosity</div>
          <div id="opportunity" class='box' onclick={handleClick(event)}>Opportunity</div>
          <div id="spirit" class='box' onclick={handleClick(event)}>Spirit</div>
      </div>
    </div>
    `;
};

const handleClick = (event) => {
  const parent = event.target.parentNode;
  parent.innerHTML = spinner();
  const rover = event.target.id;
  fetch(`http://localhost:3000/${rover}`)
    .then((res) => res.json())
    .then((data) => {
      const { manifesto, photos, res } = data;
      // console.log({ manifesto, photos });
      console.log({ res });
      parent.innerHTML = ShowRover({ info: manifesto, photos });
    });
};

const spinner = () => {
  return `
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
};

const ShowRover = ({ info, photos }) => {
  return `
  <div class="rover">
    ${RoverInfo(info)}
    ${RoverPhotos(photos)}
  </div>
  `;
};

const RoverInfo = (info) => {
  const {
    name,
    launch_date,
    landing_date,
    status,
    max_sol,
    max_date,
    total_photos,
  } = info;

  return `
    <div class="rover-info-conatiner">
      <div class="info-value">Name: ${name}</div>
      <div class="info-value">Launch Date: ${launch_date}</div>
      <div class="info-value">Landing Date: ${landing_date}</div>
      <div class="info-value">Status: ${status}</div>
      <div class="info-value">No of sols on Mars: ${max_sol}</div>
      <div class="info-value">Last Earth Date: ${max_date}</div>
      <div class="info-value">Total Photos: ${total_photos}</div>
    </div>
  `;
};

const RoverPhotos = (photos) => {
  return `
    <div class="rover-photos-container">
      ${photos
        .map((photo) => {
          return `
            <img src=${photo} alt= 'rover photos'>
          `;
        })
        .join("")}
    </div>
  `;
};

window.addEventListener("load", () => {
  render(root, store);
});
