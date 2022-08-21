let store = {
  user: {
    name: "samaksh",
  },
  photos: [],
  info: {},
  show: false,
};

const render = (root, state) => {
  root.innerHTML = App(state);
};

const App = (state) => {
  return `
        <header>
            ${navbar(state.show)}
        </header>
        <main>
            <section>
                ${rovers()}
            </section>
        </main>
        <footer></footer>
    `;
};

const navbar1 = () => {
  return `
        <nav>
            <ul>
              <li>Curiosity</li>
              <li>Opportunity</li>
              <li>Spirit</li>
            </ul>
        </nav>
    `;
};

const navbar2 = () => {
  return `
        <nav>
            <img src= '' alt='logo'>
        </nav>
    `;
};

const rovers = () => {
  return `
        <div>
            <div>Curiosity</div>
            <div>Opportunity</div>
            <div>Spirit</div>
        </div>
    `;
};

const roverInfo = (info) => {
  return `
        <div>
            <div>name</div>
            <div>Lunch_date</div>
            <div>Landing_date</div>
            <div>max_earth_date</div>
            <div>max_sol</div>
            <div>Total photos</div>
        </div>
    `;
};
